/**
 * Québec Hangouts — sign-up backend.
 *
 * Lives inside a Google Sheet (Extensions → Apps Script) and is deployed as a
 * Web app ("Execute as: Me", "Who has access: Anyone").
 *
 * Public GET  → headcounts only: { ok, today, counts: { "<activityId>|<yyyy-mm-dd>": n } } (JSONP with ?callback=)
 * Public POST → join / leave one activity on one date, or suggest a place / movie.
 * Trigger     → sendPendingNotifications() every 5 minutes (installed by setup()): 30 minutes after a
 *               sign-up that wasn't cancelled, emails the participant Qiwei's contact and the organizer a summary.
 *               The participant email follows the page language (English, French or Chinese).
 *               Cancelling after that email went out also tells the organizer, who may already have added them to a chat.
 * QR.gs       → optional second file with Qiwei's WhatsApp / WeChat QR images and links (kept out of git).
 *               Emails stay in the Sheet; they are never returned to the page.
 */

const VERSION = 8;
const SITE = 'https://peter-awe.github.io/quebec-hangouts/';
const SHEET_NAME = 'signups';
const SUGGEST_SHEET = 'suggestions';
const SUGGEST_HEADERS = ['Timestamp', 'Kind', 'Name', 'When', 'Link', 'Note', 'Email', 'Status'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TZ = 'America/Montreal';
const NOTIFY_ORGANIZER = true;          // email the Sheet owner about sign-ups
const NOTIFY_DELAY_MIN = 30;            // wait this long, so quick cancellations never reach the inbox
const MAX_DAYS_AHEAD = 400;
const HEADERS = ['Timestamp', 'Email', 'Name', 'Activity ID', 'Activity', 'Date', 'Car seats', 'Status', 'Chat', 'Notified', 'Lang', 'Activity (page language)'];
const COL = { email: 2, name: 3, activityId: 4, activity: 5, date: 6, seats: 7, status: 8, chat: 9, notified: 10, lang: 11, activityLocal: 12 };

/**
 * Run once from the editor (and again after pasting a new version):
 * creates the tabs, installs the 5-minute email trigger, and triggers the permission prompt.
 */
function setup() {
  sheet_();
  suggestSheet_();
  ScriptApp.getProjectTriggers()
    .filter(function (t) { return t.getHandlerFunction() === 'sendPendingNotifications'; })
    .forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('sendPendingNotifications').timeBased().everyMinutes(5).create();
  Logger.log('Ready. Email trigger installed. Organizer email: %s', Session.getEffectiveUser().getEmail());
}

/**
 * Runs every 5 minutes (and at most every 2 minutes on page loads, as a backup).
 * For sign-ups at least NOTIFY_DELAY_MIN old and still active: emails each participant a confirmation
 * with Qiwei's WhatsApp / WeChat, and the organizer one summary per activity and date.
 * Sign-ups cancelled in the meantime are skipped. Only rows marked 'pending' are considered.
 */
function sendPendingNotifications() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;
  try {
    const sh = sheet_();
    const rows = sh.getDataRange().getValues();
    const cutoff = Date.now() - NOTIFY_DELAY_MIN * 60 * 1000;
    const groups = {};
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (r[COL.notified - 1] !== 'pending') continue;
      const ts = r[0] instanceof Date ? r[0].getTime() : Date.parse(r[0]);
      if (!(ts <= cutoff)) continue;
      if (r[COL.status - 1] !== 'active') {
        sh.getRange(i + 1, COL.notified).setValue('skipped (cancelled)');
        continue;
      }
      const g = r[COL.activityId - 1] + '|' + dateText_(r[COL.date - 1]);
      (groups[g] = groups[g] || []).push(i);
    }

    Object.keys(groups).forEach(function (g) {
      const parts = g.split('|');
      const activityId = parts[0];
      const date = parts[1];
      const idx = groups[g];
      const activity = String(rows[idx[0]][COL.activity - 1] || activityId);
      const everyone = rows.filter(function (r, i) {
        return i > 0 && r[COL.status - 1] === 'active' && String(r[COL.activityId - 1]) === activityId && dateText_(r[COL.date - 1]) === date;
      });
      const apps = { WhatsApp: 0, WeChat: 0, 'No preference': 0 };
      everyone.forEach(function (r) { apps[r[COL.chat - 1] || 'No preference']++; });
      const lines = idx.map(function (i) {
        const r = rows[i];
        const seats = parseInt(r[COL.seats - 1], 10) || 0;
        return '- ' + (r[COL.name - 1] || r[COL.email - 1]) + ' <' + r[COL.email - 1] + '>' +
          (r[COL.chat - 1] ? ', prefers ' + r[COL.chat - 1] : '') + (seats ? ', has a car with ' + seats + ' free seat(s)' : '') +
          ({ zh: ', signed up on the Chinese page', fr: ', signed up on the French page' }[r[COL.lang - 1]] || '');
      });
      const stamp = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm');
      if (MailApp.getRemainingDailyQuota() < idx.length + 1) return;   // out of email quota today: retry later
      idx.forEach(function (i) {
        const r = rows[i];
        try {
          sendParticipantEmail_({
            to: String(r[COL.email - 1]), name: String(r[COL.name - 1] || ''), chat: String(r[COL.chat - 1] || ''),
            lang: String(r[COL.lang - 1] || 'en'), activityLocal: String(r[COL.activityLocal - 1] || ''),
            activityId: activityId, activity: activity, date: date, going: everyone.length
          });
          sh.getRange(i + 1, COL.notified).setValue('sent ' + stamp);
        } catch (err) {
          console.error('participant mail failed', err);
          sh.getRange(i + 1, COL.notified).setValue('error ' + stamp + ': ' + String(err).slice(0, 80));
        }
      });
      if (NOTIFY_ORGANIZER) {
        MailApp.sendEmail({
          to: Session.getEffectiveUser().getEmail(),
          subject: ascii_('[Quebec Hangouts] ' + activity + ' on ' + date + ': ' + idx.length + ' new, ' + everyone.length + ' going'),
          body: 'New for ' + activity + ' on ' + date + ':\n' + lines.join('\n') + '\n\n' +
                'Headcount for that day: ' + everyone.length + '.\n' +
                'Chat apps: WhatsApp ' + apps.WhatsApp + ', WeChat ' + apps.WeChat + ', no preference ' + apps['No preference'] + '.\n\n' +
                'Everyone listed above was emailed your contact for the app they picked.\n\n' +
                'Open the Sheet to see everyone.'
        });
      }
    });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  maybeRunPending_();
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
  const lang = body.lang === 'zh' || body.lang === 'fr' ? body.lang : 'en';
  const activityLocal = lang === 'en' ? '' : String(body.activityLocal || '').trim().slice(0, 80);

  if (email.length > 254 || !EMAIL_RE.test(email)) return json_({ ok: false, error: 'email' });
  if (!/^[a-z0-9-]{2,40}$/.test(activityId)) return json_({ ok: false, error: 'activity' });
  if (!validDate_(date)) return json_({ ok: false, error: 'date' });
  if (!rateOk_(email)) return json_({ ok: false, error: 'rate' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  let lateCancel = null;   // the row, when someone cancels after already getting Qiwei's contact
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
      // 'pending': sendPendingNotifications() emails the organizer after NOTIFY_DELAY_MIN if still active.
      sh.appendRow([new Date(), cell_(email), cell_(name), activityId, cell_(activity), date, seats, 'active', chat, 'pending', lang, cell_(activityLocal)]);
      CacheService.getScriptCache().remove('counts');
    }
    if (action === 'leave' && rowNumber !== -1) {
      sh.getRange(rowNumber, COL.status).setValue('cancelled');
      CacheService.getScriptCache().remove('counts');
      if (/^sent /.test(String(rows[rowNumber - 1][COL.notified - 1]))) lateCancel = rows[rowNumber - 1];
    }
  } finally {
    lock.releaseLock();
  }

  const counts = counts_();
  if (lateCancel && NOTIFY_ORGANIZER) {
    try {
      const left = counts[activityId + '|' + date] || 0;
      const who = (lateCancel[COL.name - 1] || lateCancel[COL.email - 1]) + ' <' + lateCancel[COL.email - 1] + '>';
      const what = String(lateCancel[COL.activity - 1] || activityId);
      MailApp.sendEmail({
        to: Session.getEffectiveUser().getEmail(),
        subject: ascii_('[Quebec Hangouts] Cancelled: ' + what + ' on ' + date + ', ' + left + ' going'),
        body: who + ' cancelled ' + what + ' on ' + date + ' after they had already been emailed your contact' +
              (lateCancel[COL.chat - 1] ? ' (' + lateCancel[COL.chat - 1] + ')' : '') + '.\n\n' +
              'Headcount for that day is now ' + left + '. If you already added them to a group chat, you may want to check in with them.'
      });
    } catch (err) {
      console.error('late cancel mail failed', err);
    }
  }

  return json_({ ok: true, action: action, counts: counts });
}

// ---------- helpers ----------

// Participant email text in each page language. Subjects stay English ASCII (see sendParticipantEmail_).
const EMAIL_COPY = {
  en: {
    hi: function (n) { return n ? 'Hi ' + n + ',' : 'Hi,'; },
    youreIn: function (place, date, going) { return 'You’re in for ' + place + ' on ' + date + '. ' + going + (going === 1 ? ' person is' : ' people are') + ' going so far.'; },
    addHost: function (apps) { return 'Add Qiwei, the organizer, on ' + apps + ' so he can put you in the group chat'; },
    stop: '. ', colon: ':', or: ' or ',
    howTo: 'On your phone, tap the button; on a computer, scan the code:',
    noApps: 'Qiwei, the organizer, will get in touch to set up the group chat.',
    details: 'Prices, hours and official links: ',
    linkText: function (place) { return place + ' on Québec Hangouts'; },
    detailsText: 'Details: ',
    change: 'Changed your mind? Open the site in the same browser and tap Cancel under My plans, or reply to this email.',
    safety: 'These are informal outings: everyone pays their own way and looks after their own safety.',
    app: { WhatsApp: 'WhatsApp', WeChat: 'WeChat' },
    open: function (app) { return 'Open ' + app; },
    alt: function (app) { return 'Qiwei on ' + app; }
  },
  fr: {
    hi: function (n) { return n ? 'Bonjour ' + n + ',' : 'Bonjour,'; },
    youreIn: function (place, date, going) { return 'C’est confirmé : ' + place + ', le ' + date + '. ' + going + (going === 1 ? ' personne inscrite' : ' personnes inscrites') + ' pour l’instant.'; },
    addHost: function (apps) { return 'Ajoute Qiwei, l’organisateur, sur ' + apps + ' pour qu’il t’ajoute à la discussion de groupe'; },
    stop: '. ', colon: ' :', or: ' ou ',
    howTo: 'Sur ton téléphone, touche le bouton; sur un ordinateur, scanne le code :',
    noApps: 'Qiwei, l’organisateur, te contactera pour créer la discussion de groupe.',
    details: 'Prix, heures et liens officiels : ',
    linkText: function (place) { return place + ' sur Québec Hangouts'; },
    detailsText: 'Détails : ',
    change: 'Tu as changé d’idée? Ouvre le site dans le même navigateur et touche Annuler sous Mes sorties, ou réponds à ce courriel.',
    safety: 'Ce sont des sorties informelles : chacun paie sa part et est responsable de sa propre sécurité.',
    app: { WhatsApp: 'WhatsApp', WeChat: 'WeChat' },
    open: function (app) { return 'Ouvrir ' + app; },
    alt: function (app) { return 'Qiwei sur ' + app; }
  },
  zh: {
    hi: function (n) { return n ? '你好，' + n + '：' : '你好：'; },
    youreIn: function (place, date, going) { return '你已报名 ' + place + '，时间是 ' + date + '。目前有 ' + going + ' 人报名。'; },
    addHost: function (apps) { return '请加组织者 Qiwei 的' + apps + '，他会拉你进群'; },
    stop: '。', colon: '：', or: ' 或 ',
    howTo: '手机上直接点按钮，电脑上用手机扫码：',
    noApps: '组织者 Qiwei 会联系你，拉你进群。',
    details: '价格、开放时间和官方链接：',
    linkText: function (place) { return '在 Québec Hangouts 上查看' + place; },
    detailsText: '详情：',
    change: '改主意了？用报名时的浏览器打开网站，在“我的活动”里点“取消”，或者直接回复这封邮件。',
    safety: '这些是朋友之间自发组织的活动，费用自理，注意安全。',
    app: { WhatsApp: 'WhatsApp', WeChat: '微信' },
    open: function (app) { return '打开' + app; },
    alt: function (app) { return 'Qiwei 的' + app + '二维码'; }
  }
};

/** "Sat, Sep 19, 2026" · "samedi 19 septembre 2026" · "2026年9月19日（周六）" */
function emailDate_(date, lang) {
  const p = date.split('-').map(Number);
  const dow = new Date(Date.UTC(p[0], p[1] - 1, p[2], 12)).getUTCDay();
  if (lang === 'zh') return p[0] + '年' + p[1] + '月' + p[2] + '日（周' + '日一二三四五六'.charAt(dow) + '）';
  if (lang === 'fr') {
    return ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][dow] + ' ' + (p[2] === 1 ? '1er' : p[2]) + ' ' +
      ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'][p[1] - 1] + ' ' + p[0];
  }
  return Utilities.formatDate(new Date(date + 'T12:00:00'), TZ, 'EEE, MMM d, yyyy');
}

function sendParticipantEmail_(m) {
  const lang = EMAIL_COPY[m.lang] ? m.lang : 'en';
  const c = EMAIL_COPY[lang];
  const nice = emailDate_(m.date, 'en');
  const when = emailDate_(m.date, lang);
  const place = lang !== 'en' && m.activityLocal ? m.activityLocal : m.activity;
  const qr = typeof QR !== 'undefined' ? QR : {};
  // Only the app the participant picked; both only for old sign-ups made before picking was required.
  const apps = [
    { key: 'whatsapp', label: 'WhatsApp', data: qr.whatsapp },
    { key: 'wechat', label: 'WeChat', data: qr.wechat }
  ].filter(function (a) { return a.data && a.data.link && (!m.chat || a.label === m.chat); });
  const appNames = apps.map(function (a) { return c.app[a.label]; }).join(c.or);

  const inlineImages = {};
  const cells = apps.map(function (a) {
    // The original image file, attached as-is (no cropping, no re-compression).
    if (a.data.b64) inlineImages[a.key] = Utilities.newBlob(Utilities.base64Decode(a.data.b64), 'image/jpeg', a.data.file || a.key + '.jpg');
    return '<td style="padding:0 16px 8px 0;vertical-align:top;text-align:center">' +
      (a.data.b64 ? '<img src="cid:' + a.key + '" width="320" alt="' + esc_(c.alt(c.app[a.label])) + '" style="display:block;max-width:100%;height:auto"><br>' : '') +
      '<a href="' + a.data.link + '" style="display:inline-block;background:#1d4b3c;color:#ffffff;text-decoration:none;padding:8px 14px;border-radius:6px;font-weight:bold">' + esc_(c.open(c.app[a.label])) + '</a></td>';
  }).join('');
  const link = SITE + (lang === 'en' ? '' : '?lang=' + lang) + '#act-' + m.activityId;

  const html =
    '<div style="font-family:Arial,Helvetica,\'PingFang SC\',\'Microsoft YaHei\',sans-serif;font-size:15px;line-height:1.6;color:#16201b;max-width:560px">' +
    '<p>' + esc_(c.hi(m.name)) + '</p>' +
    '<p>' + c.youreIn('<b>' + esc_(place) + '</b>', '<b>' + when + '</b>', m.going) + '</p>' +
    (apps.length ? '<p>' + c.addHost(appNames) + c.stop + c.howTo + '</p>' +
      '<table cellpadding="0" cellspacing="0" role="presentation"><tr>' + cells + '</tr></table>' : '<p>' + c.noApps + '</p>') +
    '<p>' + c.details + '<a href="' + link + '">' + esc_(c.linkText(place)) + '</a></p>' +
    '<p style="color:#57635d;font-size:13px">' + c.change + (lang === 'zh' ? '' : ' ') + c.safety + '</p>' +
    '</div>';

  const text = c.hi(m.name) + '\n\n' +
    c.youreIn(place, when, m.going) + '\n\n' +
    (apps.length ? c.addHost(appNames) + c.colon + '\n' + apps.map(function (a) { return c.app[a.label] + c.colon + ' ' + a.data.link; }).join('\n') + '\n\n' : '') +
    c.detailsText + link + '\n\n' +
    c.change;

  MailApp.sendEmail({
    to: m.to,
    // Always ASCII: Apple Mail garbles non-ASCII subjects from Apps Script. The English name stays recognizable.
    subject: ascii_('You\'re in: ' + m.activity + ' on ' + nice),
    name: 'Quebec Hangouts',
    replyTo: Session.getEffectiveUser().getEmail(),
    body: text,
    htmlBody: html,
    inlineImages: inlineImages
  });
}

function esc_(s) {
  return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
}

/** Backup for the time trigger: page loads also process due emails, at most every 2 minutes. */
function maybeRunPending_() {
  const cache = CacheService.getScriptCache();
  if (cache.get('pendingRun')) return;
  cache.put('pendingRun', '1', 120);
  try {
    if (!cache.get('trigger')) {
      cache.put('trigger', '1', 21600);
      const has = ScriptApp.getProjectTriggers().some(function (t) { return t.getHandlerFunction() === 'sendPendingNotifications'; });
      if (!has) ScriptApp.newTrigger('sendPendingNotifications').timeBased().everyMinutes(5).create();
    }
    sendPendingNotifications();
  } catch (err) {
    console.error('pending run failed', err);
  }
}

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

/**
 * At most 40 changes per email per clock hour, and 120 per minute overall.
 * Fixed windows: an attempt never extends the lock (the old sliding window could lock someone out indefinitely).
 */
function rateOk_(email) {
  const cache = CacheService.getScriptCache();
  const now = new Date();
  const minuteKey = 'g:' + Utilities.formatDate(now, TZ, 'yyyyMMddHHmm');
  const g = parseInt(cache.get(minuteKey) || '0', 10);
  if (g >= 120) return false;
  cache.put(minuteKey, String(g + 1), 120);

  const key = 'e:' + email + ':' + Utilities.formatDate(now, TZ, 'yyyyMMddHH');
  const n = parseInt(cache.get(key) || '0', 10);
  if (n >= 40) return false;
  cache.put(key, String(n + 1), 3700);
  return true;
}

function ascii_(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-')
    .replace(/[^\x20-\x7E]/g, '');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
