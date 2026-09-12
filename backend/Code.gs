/**
 * Québec Hangouts — sign-up backend.
 *
 * Lives inside a Google Sheet (Extensions → Apps Script) and is deployed as a
 * Web app ("Execute as: Me", "Who has access: Anyone").
 *
 * Public GET  → headcounts only: { ok, today, counts: { "<activityId>|<yyyy-mm-dd>": n } } (JSONP with ?callback=)
 * Public POST → join / leave one activity on one date, or suggest a place / movie.
 *               Emails stay in the Sheet; they are never returned to the page.
 */

const VERSION = 3;
const SHEET_NAME = 'signups';
const SUGGEST_SHEET = 'suggestions';
const SUGGEST_HEADERS = ['Timestamp', 'Kind', 'Name', 'When', 'Link', 'Note', 'Email', 'Status'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TZ = 'America/Montreal';
const NOTIFY_ORGANIZER = true;          // email the Sheet owner on every new sign-up
const MAX_DAYS_AHEAD = 400;
const HEADERS = ['Timestamp', 'Email', 'Name', 'Activity ID', 'Activity', 'Date', 'Car seats', 'Status', 'Chat'];
const COL = { email: 2, activityId: 4, date: 6, status: 8, chat: 9 };

/** Run once from the editor: creates the tab and triggers the permission prompt. */
function setup() {
  sheet_();
  suggestSheet_();
  Logger.log('Ready. Sheet tab "%s" exists. Organizer email: %s', SHEET_NAME, Session.getEffectiveUser().getEmail());
}

function doGet(e) {
  let payload;
  try {
    payload = { ok: true, version: VERSION, today: today_(), counts: counts_() };
  } catch (err) {
    console.error(err);
    payload = { ok: false, error: 'server' };
  }
  // ?callback=name returns JSONP, for browsers whose extensions break CORS on fetch().
  const cb = e && e.parameter && e.parameter.callback;
  if (cb && /^[A-Za-z_$][\w$]{0,60}$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + JSON.stringify(payload) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return json_(payload);
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad_request' });
  }

  // Honeypot field: real visitors never fill it.
  if (body.website) return json_({ ok: true, counts: counts_() });
  if (body.action === 'suggest') return json_(suggest_(body));

  const action = body.action === 'leave' ? 'leave' : 'join';
  const email = String(body.email || '').trim().toLowerCase();
  const name = String(body.name || '').trim().slice(0, 40);
  const activityId = String(body.activityId || '').trim();
  const activity = String(body.activity || '').trim().slice(0, 80);
  const date = String(body.date || '').trim();
  const seats = Math.max(0, Math.min(8, parseInt(body.seats, 10) || 0));
  const chat = { whatsapp: 'WhatsApp', wechat: 'WeChat' }[String(body.chat || '').toLowerCase()] || '';

  if (email.length > 254 || !EMAIL_RE.test(email)) return json_({ ok: false, error: 'email' });
  if (!/^[a-z0-9-]{2,40}$/.test(activityId)) return json_({ ok: false, error: 'activity' });
  if (!validDate_(date)) return json_({ ok: false, error: 'date' });
  if (!rateOk_(email)) return json_({ ok: false, error: 'rate' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet_();
    const rows = sh.getDataRange().getValues();
    let rowNumber = -1;
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (String(r[COL.email - 1]).toLowerCase() === email &&
          String(r[COL.activityId - 1]) === activityId &&
          dateText_(r[COL.date - 1]) === date &&
          r[COL.status - 1] === 'active') {
        rowNumber = i + 1;
        break;
      }
    }

    if (action === 'join' && rowNumber === -1) {
      sh.appendRow([new Date(), cell_(email), cell_(name), activityId, cell_(activity), date, seats, 'active', chat]);
      CacheService.getScriptCache().remove('counts');
      // One email per person/activity/day, so join-leave-join doesn't flood the organizer.
      const noteKey = 'n:' + email + '|' + activityId + '|' + date;
      if (NOTIFY_ORGANIZER && !CacheService.getScriptCache().get(noteKey)) {
        CacheService.getScriptCache().put(noteKey, '1', 21600);
        notify_(name || email, activityId, activity || activityId, date, chat);
      }
    }
    if (action === 'leave' && rowNumber !== -1) {
      sh.getRange(rowNumber, COL.status).setValue('cancelled');
      CacheService.getScriptCache().remove('counts');
    }
  } finally {
    lock.releaseLock();
  }

  return json_({ ok: true, action: action, counts: counts_() });
}

// ---------- helpers ----------

function suggest_(b) {
  const kind = b.kind === 'movie' ? 'movie' : 'place';
  const name = clean_(b.name, 120);
  const when = clean_(b.when, 120);
  const link = clean_(b.link, 500);
  const note = clean_(b.note, 500);
  const email = clean_(b.email, 254).toLowerCase();
  if (name.length < 2) return { ok: false, error: 'name' };
  if (link && !/^https?:\/\/\S+$/i.test(link)) return { ok: false, error: 'link' };
  if (email && !EMAIL_RE.test(email)) return { ok: false, error: 'email' };

  // At most 30 suggestions an hour in total.
  const cache = CacheService.getScriptCache();
  const hourKey = 's:' + Utilities.formatDate(new Date(), TZ, 'yyyyMMddHH');
  const n = parseInt(cache.get(hourKey) || '0', 10);
  if (n >= 30) return { ok: false, error: 'rate' };
  cache.put(hourKey, String(n + 1), 3700);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    suggestSheet_().appendRow([new Date(), kind, cell_(name), cell_(when), cell_(link), cell_(note), cell_(email), 'new']);
  } finally {
    lock.releaseLock();
  }
  try {
    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      subject: ascii_('[Quebec Hangouts] New ' + kind + ' suggestion: ' + name),
      body: 'Name: ' + name + '\nWhen: ' + (when || '-') + '\nLink: ' + (link || '-') + '\nNote: ' + (note || '-') +
            '\nFrom: ' + (email || 'no email given') + '\n\nIt is also in the "suggestions" tab of the Sheet.'
    });
  } catch (err) {
    console.error('suggest mail failed', err);
  }
  return { ok: true };
}

function suggestSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SUGGEST_SHEET);
  if (!sh) {
    sh = ss.insertSheet(SUGGEST_SHEET);
    sh.appendRow(SUGGEST_HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function clean_(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
}

/** Stops text typed by visitors from being read as a spreadsheet formula. */
function cell_(v) {
  const s = String(v == null ? '' : v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange('F:F').setNumberFormat('@');   // keep dates as plain text
  }
  if (sh.getLastColumn() < HEADERS.length) {    // older sheet without the Chat column
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  return sh;
}

function counts_() {
  const cache = CacheService.getScriptCache();
  const hit = cache.get('counts');
  if (hit) return JSON.parse(hit);

  const today = today_();
  const out = {};
  const rows = sheet_().getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const d = dateText_(r[COL.date - 1]);
    if (r[COL.status - 1] !== 'active' || d < today) continue;
    const key = r[COL.activityId - 1] + '|' + d;
    out[key] = (out[key] || 0) + 1;
  }
  cache.put('counts', JSON.stringify(out), 30);
  return out;
}

function today_() {
  return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
}

function validDate_(d) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  const max = Utilities.formatDate(new Date(Date.now() + MAX_DAYS_AHEAD * 864e5), TZ, 'yyyy-MM-dd');
  return d >= today_() && d <= max;
}

function dateText_(v) {
  return v instanceof Date ? Utilities.formatDate(v, TZ, 'yyyy-MM-dd') : String(v);
}

/** At most 20 actions per email per hour, and 120 per minute overall. */
function rateOk_(email) {
  const cache = CacheService.getScriptCache();
  const minuteKey = 'g:' + Utilities.formatDate(new Date(), TZ, 'yyyyMMddHHmm');
  const g = parseInt(cache.get(minuteKey) || '0', 10);
  if (g >= 120) return false;
  cache.put(minuteKey, String(g + 1), 120);

  const key = 'e:' + email;
  const n = parseInt(cache.get(key) || '0', 10);
  if (n >= 20) return false;
  cache.put(key, String(n + 1), 3600);
  return true;
}

function notify_(who, activityId, activity, date, chat) {
  try {
    const n = counts_()[activityId + '|' + date] || 1;
    const apps = { WhatsApp: 0, WeChat: 0, 'No preference': 0 };
    sheet_().getDataRange().getValues().slice(1).forEach(function (r) {
      if (r[COL.status - 1] === 'active' && String(r[COL.activityId - 1]) === activityId && dateText_(r[COL.date - 1]) === date) {
        apps[r[COL.chat - 1] || 'No preference']++;
      }
    });
    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      // Plain ASCII subject: some mail apps garble accented letters in subjects sent by MailApp.
      subject: ascii_('[Quebec Hangouts] ' + activity + ' on ' + date + ': now ' + n + (n === 1 ? ' person' : ' people')),
      body: who + ' signed up for ' + activity + ' on ' + date + (chat ? ' (prefers ' + chat + ')' : '') + '.\n' +
            'Headcount for that day: ' + n + '.\n' +
            'Chat apps so far: WhatsApp ' + apps.WhatsApp + ', WeChat ' + apps.WeChat + ', no preference ' + apps['No preference'] + '.\n\n' +
            'Open the Sheet to see everyone and their emails.'
    });
  } catch (err) {
    console.error('notify failed', err);
  }
}

function ascii_(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-')
    .replace(/[^\x20-\x7E]/g, '');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
