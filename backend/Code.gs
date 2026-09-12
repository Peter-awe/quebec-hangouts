/**
 * Québec Hangouts — sign-up backend.
 *
 * Lives inside a Google Sheet (Extensions → Apps Script) and is deployed as a
 * Web app ("Execute as: Me", "Who has access: Anyone").
 *
 * Public GET  → headcounts only: { ok, today, counts: { "<activityId>|<yyyy-mm-dd>": n } }
 * Public POST → join / leave one activity on one date. Emails stay in the Sheet;
 *               they are never returned to the page.
 */

const SHEET_NAME = 'signups';
const TZ = 'America/Montreal';
const NOTIFY_ORGANIZER = true;          // email the Sheet owner on every new sign-up
const MAX_DAYS_AHEAD = 400;
const HEADERS = ['Timestamp', 'Email', 'Name', 'Activity ID', 'Activity', 'Date', 'Car seats', 'Status', 'Chat'];
const COL = { email: 2, activityId: 4, date: 6, status: 8, chat: 9 };

/** Run once from the editor: creates the tab and triggers the permission prompt. */
function setup() {
  sheet_();
  Logger.log('Ready. Sheet tab "%s" exists. Organizer email: %s', SHEET_NAME, Session.getEffectiveUser().getEmail());
}

function doGet() {
  try {
    return json_({ ok: true, today: today_(), counts: counts_() });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server' });
  }
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

  const action = body.action === 'leave' ? 'leave' : 'join';
  const email = String(body.email || '').trim().toLowerCase();
  const name = String(body.name || '').trim().slice(0, 40);
  const activityId = String(body.activityId || '').trim();
  const activity = String(body.activity || '').trim().slice(0, 80);
  const date = String(body.date || '').trim();
  const seats = Math.max(0, Math.min(8, parseInt(body.seats, 10) || 0));
  const chat = { whatsapp: 'WhatsApp', wechat: 'WeChat' }[String(body.chat || '').toLowerCase()] || '';

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json_({ ok: false, error: 'email' });
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
      sh.appendRow([new Date(), email, name, activityId, activity, date, seats, 'active', chat]);
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
      subject: '[Québec Hangouts] ' + activity + ' on ' + date + ': now ' + n + (n === 1 ? ' person' : ' people'),
      body: who + ' signed up for ' + activity + ' on ' + date + (chat ? ' (prefers ' + chat + ')' : '') + '.\n' +
            'Headcount for that day: ' + n + '.\n' +
            'Chat apps so far: WhatsApp ' + apps.WhatsApp + ', WeChat ' + apps.WeChat + ', no preference ' + apps['No preference'] + '.\n\n' +
            'Open the Sheet to see everyone and their emails.'
    });
  } catch (err) {
    console.error('notify failed', err);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
