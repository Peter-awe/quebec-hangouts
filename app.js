(function () {
  'use strict';

  const API = 'https://script.google.com/macros/s/AKfycbwmn6O9Z7EU3n93CkJVROyf9W-IgcjxRGTtSuuRTtKTgMshdM6mk1NCoQmdLNBft-Vr/exec';
  const TZ = 'America/Montreal';
  const DAYS_SHOWN = 10;
  const LOOKAHEAD_DAYS = 150;
  const { ACTIVITIES, CATEGORIES, DEALS, CHECKED, MOVIES, MOVIE_COUNTRIES, MOVIE_DECADES, MOVIE_GENRES } = window.QH_DATA;

  // ---------- storage (never throws) ----------
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ }
    }
  };

  const state = {
    counts: {},
    countsLoaded: false,
    profile: store.get('qh.profile', null),
    mine: loadPlans(),   // Map: 'activityId|date' → email used to sign up
    filter: 'all',
    busy: new Set(),
    selected: {},        // activityId → date tapped in that card's picker
    pending: null,
    apiVersion: 0
  };

  function loadPlans() {
    const saved = store.get('qh.plans', null);
    if (Array.isArray(saved)) return new Map(saved.filter((e) => Array.isArray(e) && e[0]).map((e) => [e[0], e[1] || '']));
    // Older versions kept only the keys; assume the saved profile email.
    const old = store.get('qh.mine', []);
    const email = (store.get('qh.profile', null) || {}).email || '';
    return new Map((Array.isArray(old) ? old : []).map((k) => [k, email]));
  }
  const savePlans = () => store.set('qh.plans', [...state.mine]);

  // ---------- dates (all as yyyy-mm-dd strings, Montréal time) ----------
  const todayISO = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const toUTC = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d, 12)); };
  const toISO = (dt) => dt.toISOString().slice(0, 10);
  const addDays = (iso, n) => { const dt = toUTC(iso); dt.setUTCDate(dt.getUTCDate() + n); return toISO(dt); };
  const fmt = (iso, opts) => new Intl.DateTimeFormat('en-CA', Object.assign({ timeZone: 'UTC' }, opts)).format(toUTC(iso));
  const longDate = (iso) => fmt(iso, { weekday: 'short', month: 'short', day: 'numeric' });

  function openOn(act, iso) {
    const s = act.schedule;
    if (iso < todayISO) return false;
    if (s.type === 'dates') return s.dates.some((d) => d.date === iso);
    if ((s.closed || []).includes(iso)) return false;
    if ((s.extraOpen || []).includes(iso)) return true;
    const dow = toUTC(iso).getUTCDay();
    // A weekly schedule is either one pattern (days/from/to) or several `periods` of them.
    return (s.periods || [s]).some((p) =>
      (!p.from || iso >= p.from) && (!p.to || iso <= p.to) && p.days.includes(dow));
  }

  const weekDays = (s) => [...new Set((s.periods || [s]).flatMap((p) => p.days))];
  const firstDay = (s) => (s.periods || [s]).map((p) => p.from).filter(Boolean).sort()[0];
  const lastDay = (s) => { const t = (s.periods || [s]).map((p) => p.to); return t.includes(undefined) ? undefined : t.sort().pop(); };

  function upcomingDays(act) {
    const s = act.schedule;
    if (s.type === 'dates') return s.dates.filter((d) => d.date >= todayISO).map((d) => ({ date: d.date, note: d.note }));
    const out = [];
    const start = firstDay(s);
    let iso = start && start > todayISO ? start : todayISO;
    const end = addDays(iso, LOOKAHEAD_DAYS);
    while (iso <= end && out.length < DAYS_SHOWN) {
      if (openOn(act, iso)) out.push({ date: iso, note: (s.dayNotes || {})[toUTC(iso).getUTCDay()] });
      iso = addDays(iso, 1);
    }
    return out;
  }

  const key = (actId, iso) => actId + '|' + iso;
  const countFor = (actId, iso) => state.counts[key(actId, iso)] || 0;

  // ---------- tiny DOM helper ----------
  function el(tag, attrs, ...kids) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      node.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return node;
  }

  // Facts may contain {metro:[line, station]} objects or plain strings.
  function factValue(v) {
    if (typeof v === 'string') return v;
    return el('span', {}, ...v.map((part) => {
      if (typeof part === 'string') return part;
      if (part.metro) return el('span', { class: 'metro' }, el('i', { class: part.metro, 'aria-hidden': 'true' }), part.station);
      if (part.link) return el('a', { href: part.link, target: '_blank', rel: 'noopener' }, part.label);
      return '';
    }));
  }

  // Court and rink line drawings for the CEPSUM cards (proportions from the regulation sizes).
  const ART = {
    tennis: '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#2f6690"/><rect x="20" y="40" width="260" height="120" fill="#3a7bab"/><g fill="none" stroke="#fff" stroke-width="2.4"><rect x="20" y="40" width="260" height="120"/><line x1="20" y1="55" x2="280" y2="55"/><line x1="20" y1="145" x2="280" y2="145"/><line x1="80" y1="55" x2="80" y2="145"/><line x1="220" y1="55" x2="220" y2="145"/><line x1="80" y1="100" x2="220" y2="100"/><line x1="20" y1="100" x2="26" y2="100"/><line x1="274" y1="100" x2="280" y2="100"/></g><line x1="150" y1="30" x2="150" y2="170" stroke="#e9eef2" stroke-width="4"/></svg>',
    badminton: '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#1f5a44"/><rect x="20" y="41" width="260" height="118" fill="#2a7457"/><g fill="none" stroke="#fff" stroke-width="2.4"><rect x="20" y="41" width="260" height="118"/><line x1="20" y1="50" x2="280" y2="50"/><line x1="20" y1="150" x2="280" y2="150"/><line x1="112" y1="41" x2="112" y2="159"/><line x1="188" y1="41" x2="188" y2="159"/><line x1="35" y1="41" x2="35" y2="159"/><line x1="265" y1="41" x2="265" y2="159"/><line x1="20" y1="100" x2="112" y2="100"/><line x1="188" y1="100" x2="280" y2="100"/></g><line x1="150" y1="32" x2="150" y2="168" stroke="#f1f3ef" stroke-width="4"/></svg>',
    rink: '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#dce8ef"/><rect x="20" y="44" width="260" height="112" rx="37" fill="#f6fafc" stroke="#9fb3bf" stroke-width="3"/><g stroke-width="3"><line x1="150" y1="44" x2="150" y2="156" stroke="#c0301f"/><line x1="117" y1="44" x2="117" y2="156" stroke="#1c6590"/><line x1="183" y1="44" x2="183" y2="156" stroke="#1c6590"/><line x1="34" y1="52" x2="34" y2="148" stroke="#c0301f" stroke-width="2"/><line x1="266" y1="52" x2="266" y2="148" stroke="#c0301f" stroke-width="2"/></g><g fill="none" stroke="#c0301f" stroke-width="2"><circle cx="150" cy="100" r="20" stroke="#1c6590"/><circle cx="66" cy="72" r="15"/><circle cx="66" cy="128" r="15"/><circle cx="234" cy="72" r="15"/><circle cx="234" cy="128" r="15"/></g></svg>',
    boulder: '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#2b3531"/><polygon points="0,0 120,0 150,150 0,150" fill="#d9d4cb"/><polygon points="120,0 230,0 205,150 150,150" fill="#c7c1b6"/><polygon points="230,0 300,0 300,150 205,150" fill="#e3ded5"/><rect x="0" y="150" width="300" height="50" fill="#1d2622"/><rect x="0" y="150" width="300" height="6" fill="#3f4b46"/><g><circle cx="34" cy="120" r="7" fill="#c0301f"/><circle cx="62" cy="92" r="6" fill="#c0301f"/><circle cx="48" cy="60" r="8" fill="#c0301f"/><circle cx="86" cy="36" r="7" fill="#c0301f"/><ellipse cx="140" cy="118" rx="9" ry="6" fill="#f3c969"/><ellipse cx="160" cy="84" rx="8" ry="5" fill="#f3c969"/><ellipse cx="150" cy="48" rx="10" ry="6" fill="#f3c969"/><ellipse cx="176" cy="20" rx="9" ry="6" fill="#f3c969"/><circle cx="232" cy="124" r="6" fill="#1c6590"/><circle cx="262" cy="98" r="8" fill="#1c6590"/><circle cx="240" cy="66" r="6" fill="#1c6590"/><circle cx="276" cy="34" r="7" fill="#1c6590"/><circle cx="104" cy="128" r="5" fill="#2a7457"/><circle cx="196" cy="110" r="5" fill="#2a7457"/><circle cx="214" cy="40" r="5" fill="#2a7457"/></g></svg>',
    gym: '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#16201b"/><g fill="#e6ece8"><rect x="60" y="96" width="180" height="8" rx="3"/><rect x="72" y="62" width="16" height="76" rx="4"/><rect x="92" y="72" width="12" height="56" rx="4"/><rect x="212" y="62" width="16" height="76" rx="4"/><rect x="196" y="72" width="12" height="56" rx="4"/></g><rect x="48" y="92" width="12" height="16" rx="3" fill="#c0301f"/><rect x="240" y="92" width="12" height="16" rx="3" fill="#c0301f"/></svg>'
  };

  // ---------- rendering ----------
  function renderFilters() {
    const bar = document.getElementById('filter-bar');
    bar.replaceChildren();
    const cats = [{ id: 'all', label: 'Everything' }].concat(CATEGORIES);
    for (const c of cats) {
      const n = c.id === 'all' ? ACTIVITIES.length : ACTIVITIES.filter((a) => a.cat === c.id).length;
      if (!n) continue;
      bar.append(el('button', {
        class: 'chip', type: 'button', 'aria-pressed': String(state.filter === c.id),
        onclick: () => { state.filter = c.id; renderFilters(); renderGroups(); }
      }, c.label, el('span', { class: 'count', text: String(n) })));
    }
  }

  function renderGroups() {
    const root = document.getElementById('groups');
    root.replaceChildren();
    for (const c of CATEGORIES) {
      if (state.filter !== 'all' && state.filter !== c.id) continue;
      const acts = ACTIVITIES.filter((a) => a.cat === c.id);
      if (!acts.length) continue;
      root.append(
        el('h2', { class: 'group-title', id: 'cat-' + c.id }, c.label, el('small', { text: c.note })),
        el('div', { class: 'grid' }, acts.map(renderCard))
      );
    }
  }

  function renderCard(act) {
    const card = el('article', { class: 'card', id: 'act-' + act.id });
    let fig;
    if (act.img) {
      fig = el('figure', {},
        el('img', { src: act.img.src, alt: act.img.alt, loading: 'lazy', decoding: 'async', width: '900', height: '600' }),
        el('figcaption', {}, el('a', { href: act.img.page, target: '_blank', rel: 'noopener' }, act.img.credit)));
    } else if (act.board) {
      // Restaurants: a chalkboard instead of someone else's food photo.
      fig = el('figure', { class: 'board', 'aria-hidden': 'true' },
        el('span', { class: 'board-kicker', text: act.board.kicker }),
        el('span', { class: 'board-title', text: act.board.title }),
        el('span', { class: 'board-rule' }),
        el('span', { class: 'board-sub', text: act.board.sub }),
        el('span', { class: 'board-price', text: act.board.price }));
    } else {
      fig = el('figure', { class: 'art art-' + act.art, 'aria-hidden': 'true' });
      fig.innerHTML = ART[act.art] || '';
    }

    const tags = el('div', { class: 'eyebrow' }, (act.tags || []).map((t) =>
      el('span', { class: 'tag' + (t.kind ? ' ' + t.kind : ''), text: t.label })));

    const facts = el('dl', { class: 'facts' });
    for (const [label, value] of act.facts) facts.append(el('dt', { text: label }), el('dd', {}, factValue(value)));

    card.append(fig, el('div', { class: 'card-body' },
      tags,
      el('h3', { text: act.name }),
      act.local ? el('p', { class: 'local', text: act.local }) : null,
      el('p', { class: 'blurb', text: act.blurb }),
      facts,
      renderPicker(act),
      el('details', {},
        el('summary', { text: 'Sources · checked ' + fmt(CHECKED, { month: 'short', day: 'numeric', year: 'numeric' }) }),
        el('ul', {}, act.sources.map((s) => el('li', {}, el('a', { href: s.url, target: '_blank', rel: 'noopener' }, s.label))))
      )
    ));
    return card;
  }

  // The date a card's picker has selected: what the visitor tapped, else their earliest plan there.
  function selectedDate(act) {
    const picked = state.selected[act.id];
    if (picked && picked >= todayISO) return picked;
    return [...state.mine.keys()]
      .filter((k) => k.startsWith(act.id + '|'))
      .map((k) => k.split('|')[1])
      .filter((d) => d >= todayISO)
      .sort()[0] || null;
  }

  function renderPicker(act) {
    const wrap = el('div', { class: 'pick', 'data-act': act.id });
    const days = upcomingDays(act);
    const sel = selectedDate(act);
    const head = el('div', { class: 'pick-head' },
      el('p', { class: 'section-label', text: act.schedule.type === 'dates' ? 'Pick a date' : 'Pick a day' }));
    if (act.schedule.type === 'weekly') {
      const week = el('span', { class: 'week', 'aria-label': 'Open days' });
      const open = weekDays(act.schedule);
      ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach((d, i) => week.append(el('b', { class: open.includes(i) ? 'on' : '', text: d })));
      head.append(week);
    }
    wrap.append(head);

    if (!days.length) {
      wrap.append(el('p', { class: 'upcoming-empty', text: act.schedule.endedNote || 'No open dates left this season.' }));
      return wrap;
    }

    const row = el('div', { class: 'days', role: 'group', 'aria-label': 'Available days for ' + act.name });
    for (const d of days) row.append(dayButton(act, d, sel));
    wrap.append(row);

    if (act.schedule.type === 'weekly') {
      const input = el('input', {
        type: 'date', min: todayISO, max: lastDay(act.schedule) || addDays(todayISO, 365), value: sel && !days.some((d) => d.date === sel) ? sel : '',
        'aria-label': 'Another date for ' + act.name,
        onchange: () => {
          if (!input.value) return;
          if (!openOn(act, input.value)) { toast(act.name + ' isn’t open on ' + longDate(input.value) + '. Pick one of its open days.', true); input.value = ''; return; }
          state.selected[act.id] = input.value;
          refreshPicker(act);
        }
      });
      wrap.append(el('label', { class: 'other-date' }, el('span', { text: 'Another day:' }), input));
    }

    wrap.append(pickAction(act, sel));
    return wrap;
  }

  // Confirm / Cancel bar under the dates. Nothing is saved until Confirm.
  function pickAction(act, iso) {
    if (!iso) return el('div', { class: 'pick-action' }, el('span', { class: 'pick-hint', text: 'Tap a date, then confirm.' }));
    const k = key(act.id, iso);
    const mine = state.mine.has(k);
    const busy = state.busy.has(k);
    const n = countFor(act.id, iso);
    const status = mine ? 'You’re in' : !state.countsLoaded ? '' : n ? n + (n === 1 ? ' person going' : ' people going') : 'Nobody yet';
    return el('div', { class: 'pick-action' + (mine ? ' is-mine' : ''), 'aria-live': 'polite' },
      el('span', { class: 'pick-summary' }, el('strong', { text: longDate(iso) }), status ? ' · ' + status : ''),
      el('button', {
        class: 'btn ' + (mine ? 'ghost' : 'confirm'), type: 'button', disabled: busy,
        text: busy ? (mine ? 'Saving…' : 'Saving…') : mine ? 'Cancel' : 'Confirm',
        'aria-label': (mine ? 'Cancel ' : 'Confirm ') + act.name + ' on ' + longDate(iso),
        onclick: () => toggle(act, iso)
      }));
  }

  function dayButton(act, d, sel) {
    const k = key(act.id, d.date);
    const n = countFor(act.id, d.date);
    const mine = state.mine.has(k);
    const selected = d.date === sel;
    const going = !state.countsLoaded ? '' : mine ? 'You’re in' + (n > 1 ? ' +' + (n - 1) : '') : n ? n + ' going' : 'Be first';
    const label = longDate(d.date) + (d.note ? ', ' + d.note : '') + '. ' + (mine ? 'You’re going.' : n + ' going.') + ' Press to select.';
    return el('button', {
      type: 'button', class: 'day' + (mine ? ' mine' : '') + (selected ? ' selected' : '') + (state.busy.has(k) ? ' busy' : ''),
      'aria-pressed': String(selected), 'aria-label': label, 'data-key': k,
      onclick: () => { state.selected[act.id] = d.date; refreshPicker(act); }
    },
      el('span', { class: 'dow', text: fmt(d.date, { weekday: 'short' }) }),
      el('span', { class: 'dnum', text: fmt(d.date, { day: 'numeric' }) }),
      el('span', { class: 'mon', text: fmt(d.date, { month: 'short' }) }),
      el('span', { class: 'going' + (n && !mine ? ' has' : ''), text: going }),
      d.note ? el('span', { class: 'note', text: d.note }) : null
    );
  }

  function refreshPicker(act) {
    const old = document.querySelector('.pick[data-act="' + CSS.escape(act.id) + '"]');
    if (!old) return;
    const scroll = (old.querySelector('.days') || {}).scrollLeft || 0;
    const fresh = renderPicker(act);
    old.replaceWith(fresh);
    const row = fresh.querySelector('.days');
    if (row) row.scrollLeft = scroll;
  }
  const refreshDay = (act) => refreshPicker(act);

  function renderUpcoming() {
    const list = document.getElementById('upcoming-list');
    const empty = document.getElementById('upcoming-empty');
    list.replaceChildren();
    if (!state.countsLoaded) { empty.textContent = 'Loading headcounts…'; empty.hidden = false; return; }
    if (state.countsFailed) { empty.textContent = 'Headcounts didn’t load in this browser. Refresh to try again; an ad blocker or a CORS extension can cause this.'; empty.hidden = false; return; }
    const rows = Object.entries(state.counts)
      .map(([k, n]) => { const [id, date] = k.split('|'); return { act: ACTIVITIES.find((a) => a.id === id), date, n }; })
      .filter((r) => r.act && r.n > 0 && r.date >= todayISO)
      .sort((a, b) => a.date.localeCompare(b.date) || b.n - a.n)
      .slice(0, 12);
    empty.hidden = rows.length > 0;
    empty.textContent = 'No plans yet. Pick a place and a day below, and you’ll be the first.';
    for (const r of rows) {
      list.append(el('button', {
        class: 'upcoming-item', type: 'button',
        onclick: () => { state.selected[r.act.id] = r.date; state.filter = 'all'; renderFilters(); renderGroups(); document.getElementById('act-' + r.act.id).scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      },
        el('span', { class: 'when', text: longDate(r.date) }),
        el('span', { class: 'what', text: r.act.name }),
        el('span', { class: 'n', text: r.n + (r.n === 1 ? ' person going' : ' people going') })
      ));
    }
  }

  function renderDeals() {
    const root = document.getElementById('deals');
    root.replaceChildren();
    for (const d of DEALS) {
      root.append(el('div', { class: 'deal' },
        el('h4', { text: d.name }),
        el('div', { class: 'what', text: d.what }),
        el('div', { class: 'who' }, d.who, ' ', el('a', { href: d.url, target: '_blank', rel: 'noopener' }, 'Source'))
      ));
    }
  }

  function renderProfileBar() {
    const who = document.getElementById('who');
    who.replaceChildren();
    if (state.profile && state.profile.email) {
      who.append(el('span', { text: 'Signing up as ' + state.profile.email }),
        el('button', { class: 'linkish', type: 'button', text: 'Change', onclick: () => openDialog(null) }));
    } else {
      who.append(el('span', { text: 'No account needed' }));
    }
  }

  // ---------- network ----------
  // Browser extensions that rewrite CORS headers (e.g. "Allow CORS", ModHeader) make fetch() throw
  // even though the sheet received the request. JSONP reads and no-cors writes don't depend on those headers.
  function jsonp(url) {
    return new Promise((resolve, reject) => {
      const cb = 'qhCounts' + Date.now() + Math.floor(Math.random() * 1e6);
      const script = document.createElement('script');
      const done = () => { clearTimeout(timer); delete window[cb]; script.remove(); };
      const timer = setTimeout(() => { done(); reject(new Error('timeout')); }, 15000);
      window[cb] = (data) => { done(); resolve(data); };
      script.onerror = () => { done(); reject(new Error('jsonp')); };
      script.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + cb + '&t=' + Date.now();
      document.head.append(script);
    });
  }

  async function fetchCounts() {
    try {
      const res = await fetch(API, { cache: 'no-store' });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'bad');
      state.apiVersion = data.version || 1;
      return data.counts || {};
    } catch (e) {
      const data = await jsonp(API);
      if (!data || !data.ok) throw new Error('bad');
      state.apiVersion = data.version || 1;
      return data.counts || {};
    }
  }

  async function loadCounts() {
    try {
      state.counts = await fetchCounts();
      state.countsLoaded = true;
    } catch (e) {
      state.countsLoaded = true;
      state.countsFailed = true;
      toast('Headcounts couldn’t load. You can still sign up; refresh later to see who’s going.', true);
    }
    renderUpcoming();
    renderGroups();
    renderMyPlans();
    renderSuggestAvailability();
  }

  const ERRORS = {
    email: 'That email address doesn’t look right. Fix it and try again.',
    date: 'That day is no longer open for sign-ups. Pick another one.',
    rate: 'Too many changes in a short time. Wait a few minutes and try again.',
    activity: 'Something is off with this activity. Refresh the page and try again.',
    unconfirmed: 'Your browser blocked the reply from the sign-up sheet, so this couldn’t be confirmed. Try again in a private window or with ad-blocking and CORS extensions turned off.'
  };

  function toggle(act, iso) {
    const joining = !state.mine.has(key(act.id, iso));
    // Joining needs an email and a chat app (older saved profiles may not have picked one yet).
    if (!state.profile || !state.profile.email || (joining && !state.profile.chat)) { openDialog({ act, iso }); return; }
    send(act, iso, state.mine.has(key(act.id, iso)) ? 'leave' : 'join');
  }

  async function send(act, iso, action) {
    const k = key(act.id, iso);
    if (state.busy.has(k)) return;
    const p = state.profile;
    const before = { n: state.counts[k] || 0, mine: state.mine.has(k), email: state.mine.get(k) };
    // Leave with the email this plan was made with, even if the profile email changed since.
    const email = action === 'leave' && before.email ? before.email : p.email;

    // optimistic
    state.busy.add(k);
    if (action === 'join' && !before.mine) { state.mine.set(k, email); state.counts[k] = before.n + 1; }
    if (action === 'leave' && before.mine) { state.mine.delete(k); state.counts[k] = Math.max(0, before.n - 1); }
    refreshDay(act, iso);
    renderMyPlans();

    try {
      const body = JSON.stringify({ action, email, name: p.name || '', chat: p.chat || '', seats: p.seats || 0, website: p.website || '', activityId: act.id, activity: act.name, date: iso });
      let data;
      try {
        const res = await fetch(API, { method: 'POST', body });
        data = await res.json();
      } catch (netErr) {
        // Couldn't read the reply. Send again without CORS (the sheet ignores duplicates), then check the headcount.
        await fetch(API, { method: 'POST', mode: 'no-cors', body }).catch(() => {});
        const counts = await fetchCounts().catch(() => null);
        const n = counts ? (counts[k] || 0) : null;
        const confirmed = n !== null && (action === 'join' ? n >= before.n + 1 : n <= Math.max(0, before.n - 1));
        if (!confirmed) throw Object.assign(new Error('unconfirmed'), { code: n === null ? 'unconfirmed' : 'network' });
        data = { ok: true, counts };
      }
      if (!data.ok) throw Object.assign(new Error(data.error), { code: data.error });
      state.counts = data.counts || state.counts;
      savePlans();
      toast(action === 'join'
        ? 'You’re in: ' + act.name + ', ' + longDate(iso) + '. In 30 minutes you’ll get an email with Peter’s ' + (p.chat === 'wechat' ? 'WeChat' : 'WhatsApp') + '. Cancel before then and nothing is sent.'
        : 'You left ' + act.name + ' on ' + longDate(iso) + '.',
        false, { label: 'Undo', run: () => send(act, iso, action === 'join' ? 'leave' : 'join') });
    } catch (e) {
      if (before.mine) state.mine.set(k, before.email); else state.mine.delete(k);
      state.counts[k] = before.n;
      toast(ERRORS[e.code] || 'Couldn’t reach the sign-up sheet. Check your connection and try again.', true);
    } finally {
      state.busy.delete(k);
      refreshDay(act, iso);
      renderUpcoming();
      renderMyPlans();
    }
  }

  // ---------- my plans ----------
  function renderMyPlans() {
    const box = document.getElementById('my-plans');
    const list = document.getElementById('my-plans-list');
    const link = document.getElementById('my-plans-link');
    let pruned = false;
    const plans = [];
    for (const k of state.mine.keys()) {
      const [id, date] = k.split('|');
      const act = ACTIVITIES.find((a) => a.id === id);
      // Drop plans that are past, unknown, or no longer on the sheet (headcount 0 means nobody, you included).
      const goneFromSheet = state.countsLoaded && !state.countsFailed && !state.busy.has(k) && !(state.counts[k] > 0);
      if (!act || date < todayISO || goneFromSheet) { state.mine.delete(k); pruned = true; continue; }
      plans.push({ k, act, date });
    }
    if (pruned) savePlans();
    plans.sort((a, b) => a.date.localeCompare(b.date));

    box.hidden = !plans.length;
    link.hidden = !plans.length;
    link.textContent = 'My plans (' + plans.length + ')';
    list.replaceChildren(...plans.map((pl) => {
      const n = countFor(pl.act.id, pl.date);
      return el('li', { class: 'plan' },
        el('span', { class: 'plan-when', text: longDate(pl.date) }),
        el('a', {
          class: 'plan-what', href: '#act-' + pl.act.id, text: pl.act.name,
          onclick: (ev) => { ev.preventDefault(); state.filter = 'all'; renderFilters(); renderGroups(); document.getElementById('act-' + pl.act.id).scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }),
        el('span', { class: 'plan-n', text: state.countsLoaded ? n + (n === 1 ? ' person going' : ' people going') : '' }),
        el('button', { class: 'btn ghost plan-cancel', type: 'button', text: 'Cancel', 'aria-label': 'Cancel ' + pl.act.name + ' on ' + longDate(pl.date), onclick: () => send(pl.act, pl.date, 'leave') })
      );
    }));
  }

  // ---------- dialog ----------
  const dlg = document.getElementById('join-dialog');
  const form = document.getElementById('join-form');
  const f = {
    email: document.getElementById('f-email'),
    name: document.getElementById('f-name'),
    seats: document.getElementById('f-seats'),
    website: document.getElementById('f-website'),
    chat: () => [...form.querySelectorAll('input[name="chat"]')]
  };

  function openDialog(pending) {
    state.pending = pending;
    const p = state.profile || {};
    f.email.value = p.email || '';
    f.name.value = p.name || '';
    f.seats.value = String(p.seats || 0);
    f.website.value = '';
    f.chat().forEach((r) => { r.checked = !!p.chat && r.value === p.chat; });
    document.getElementById('f-chat-error').hidden = true;
    f.chat().forEach((r) => { r.onchange = () => { document.getElementById('f-chat-error').hidden = true; }; });
    document.getElementById('join-for').textContent = pending
      ? pending.act.name + ' · ' + longDate(pending.iso)
      : 'Update the details used for your next sign-ups.';
    document.getElementById('join-submit').textContent = pending ? 'Save and join' : 'Save';
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    f.email.focus();
  }

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const email = f.email.value.trim();
    const chat = (f.chat().find((r) => r.checked) || {}).value || '';
    document.getElementById('f-chat-error').hidden = !!chat;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { f.email.setCustomValidity('Enter an email like name@example.com'); f.email.reportValidity(); return; }
    f.email.setCustomValidity('');
    if (!chat) { f.chat()[0].focus(); return; }
    state.profile = {
      email, name: f.name.value.trim().slice(0, 40),
      chat, seats: parseInt(f.seats.value, 10) || 0,
      website: f.website.value
    };
    store.set('qh.profile', state.profile);
    dlg.close();
    renderProfileBar();
    if (state.pending) { const { act, iso } = state.pending; state.pending = null; send(act, iso, 'join'); }
  });
  document.getElementById('join-cancel').addEventListener('click', () => { state.pending = null; dlg.close(); });
  f.email.addEventListener('input', () => f.email.setCustomValidity(''));

  // ---------- roll the dice (outings) ----------
  const TIERS = [
    { v: 0, label: 'Free', hint: '$0' },
    { v: 1, label: '$', hint: 'up to $25' },
    { v: 2, label: '$$', hint: 'up to $75' },
    { v: 3, label: '$$$', hint: 'no limit' }
  ];
  const dice = Object.assign({ when: 'weekend', date: '', part: 'either', hours: 4, weekend: false, tier: 2, noCar: false }, store.get('qh.dice', {}));

  function weekendDates() {
    const dow = toUTC(todayISO).getUTCDay();
    if (dow === 6) return [todayISO, addDays(todayISO, 1)];
    if (dow === 0) return [todayISO];
    return [addDays(todayISO, 6 - dow), addDays(todayISO, 7 - dow)];
  }

  function diceDates() {
    if (dice.when === 'today') return [todayISO];
    if (dice.when === 'tomorrow') return [addDays(todayISO, 1)];
    if (dice.when === 'weekend') return weekendDates();
    return dice.date && dice.date >= todayISO ? [dice.date] : [];
  }

  // Is this part of the day ('day' | 'evening') possible for this activity on this date?
  function partOk(act, iso, part) {
    const d = act.dice;
    if (d.day === undefined && d.evening === undefined && !(act.schedule.dates || []).some((x) => x.part)) return part === 'either';
    const check = (p) => {
      if (act.schedule.type === 'dates') {
        const entry = act.schedule.dates.find((x) => x.date === iso);
        if (entry && entry.part) return entry.part === p;
      }
      const v = d[p];
      return Array.isArray(v) ? v.includes(toUTC(iso).getUTCDay()) : !!v;
    };
    return part === 'either' ? check('day') || check('evening') : check(part);
  }

  function diceMatches() {
    const dates = diceDates();
    return ACTIVITIES.filter((a) => a.dice).map((act) => {
      const d = act.dice;
      if (d.tier > dice.tier) return null;
      if (dice.noCar && d.car) return null;
      if (d.weekend && !dice.weekend) return null;
      if (!dice.weekend && d.hours > dice.hours) return null;
      const ok = dates.filter((iso) => openOn(act, iso) && partOk(act, iso, dice.part));
      return ok.length ? { act, dates: ok } : null;
    }).filter(Boolean);
  }

  function seg(name, options, current, onPick) {
    return el('div', { class: 'seg', role: 'radiogroup' }, options.map((o) =>
      el('label', {},
        el('input', { type: 'radio', name, value: String(o.v), checked: String(current) === String(o.v), onchange: () => onPick(o.v) }),
        el('span', {}, o.label, o.hint ? el('small', { text: ' ' + o.hint }) : null))));
  }

  function renderDice() {
    const root = document.getElementById('dice-form');
    root.replaceChildren();
    const save = () => { store.set('qh.dice', dice); renderDice(); };

    const dateInput = el('input', { type: 'date', min: todayISO, value: dice.date, 'aria-label': 'Pick a date',
      onchange: (ev) => { dice.date = ev.target.value; dice.when = 'date'; save(); } });
    const hours = el('input', { type: 'range', min: '1', max: '12', step: '1', value: String(dice.hours), disabled: dice.weekend, 'aria-label': 'Hours you have',
      oninput: (ev) => { dice.hours = +ev.target.value; hoursOut.textContent = hoursLabel(); countOut.textContent = countLabel(); },
      onchange: () => save() });
    const hoursLabel = () => dice.weekend ? 'A whole weekend' : 'Up to ' + dice.hours + (dice.hours === 1 ? ' hour' : ' hours');
    const hoursOut = el('output', { class: 'dice-out', text: hoursLabel() });
    const countLabel = () => { const n = diceMatches().length; return n + (n === 1 ? ' place fits' : ' places fit'); };
    const countOut = el('span', { class: 'dice-count', 'aria-live': 'polite', text: countLabel() });

    root.append(
      el('fieldset', { class: 'dice-field' }, el('legend', { text: 'When' }),
        seg('d-when', [{ v: 'today', label: 'Today' }, { v: 'tomorrow', label: 'Tomorrow' }, { v: 'weekend', label: 'This weekend' }, { v: 'date', label: 'Pick a date' }],
          dice.when, (v) => { dice.when = v; save(); }),
        dice.when === 'date' ? dateInput : null),
      el('fieldset', { class: 'dice-field' }, el('legend', { text: 'Time of day' }),
        seg('d-part', [{ v: 'day', label: 'Daytime' }, { v: 'evening', label: 'Evening' }, { v: 'either', label: 'Either' }],
          dice.part, (v) => { dice.part = v; save(); })),
      el('fieldset', { class: 'dice-field' }, el('legend', { text: 'Time you have' }),
        el('div', { class: 'dice-hours' }, hours, hoursOut),
        el('label', { class: 'check' }, el('input', { type: 'checkbox', checked: dice.weekend, onchange: (ev) => { dice.weekend = ev.target.checked; save(); } }), ' I have a whole weekend')),
      el('fieldset', { class: 'dice-field' }, el('legend', { text: 'Budget per person' }),
        seg('d-tier', TIERS, dice.tier, (v) => { dice.tier = v; save(); }),
        el('label', { class: 'check' }, el('input', { type: 'checkbox', checked: dice.noCar, onchange: (ev) => { dice.noCar = ev.target.checked; save(); } }), ' No car')),
      el('div', { class: 'dice-go' },
        countOut,
        el('button', { class: 'btn roll', type: 'button', onclick: rollOuting }, dieIcon(), 'Roll the dice'))
    );
  }

  function dieIcon() {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true'); s.classList.add('die');
    s.innerHTML = '<rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="8" r="1.6" fill="currentColor"/><circle cx="16" cy="16" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="16" cy="8" r="1.6" fill="currentColor"/><circle cx="8" cy="16" r="1.6" fill="currentColor"/>';
    return s;
  }

  function spin(btn) {
    const die = btn.querySelector('.die');
    if (die && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      die.classList.remove('spinning'); void die.getBoundingClientRect(); die.classList.add('spinning');
    }
  }

  function pickOne(list) { return list[Math.floor(Math.random() * list.length)]; }

  function rollOuting(ev) {
    spin(ev.currentTarget);
    const out = document.getElementById('dice-result');
    const matches = diceMatches();
    out.replaceChildren();
    if (!matches.length) {
      out.append(el('p', { class: 'dice-empty', text: 'Nothing fits all of that. Try a bigger budget, more time, or another day.' }));
      return;
    }
    const prev = out.dataset.last;
    const pool = matches.length > 1 ? matches.filter((m) => m.act.id !== prev) : matches;
    const { act, dates } = pickOne(pool);
    out.dataset.last = act.id;
    const d = act.dice;
    const chips = [
      dates.map((iso) => longDate(iso)).join(' or '),
      dice.part === 'either' ? null : dice.part === 'day' ? 'Daytime' : 'Evening',
      d.weekend ? 'Weekend trip' : '~' + d.hours + ' h',
      TIERS[d.tier].label,
      d.car ? 'Car needed' : null
    ].filter(Boolean);
    out.append(el('div', { class: 'dice-card' },
      el('p', { class: 'section-label', text: 'The dice say' }),
      el('h3', { text: act.name }),
      act.local ? el('p', { class: 'local', text: act.local }) : null,
      el('div', { class: 'eyebrow' }, chips.map((c) => el('span', { class: 'tag', text: c }))),
      el('p', { class: 'blurb', text: act.blurb }),
      el('div', { class: 'dice-actions' },
        el('button', { class: 'btn', type: 'button', text: 'See details and dates',
          onclick: () => { state.filter = 'all'; renderFilters(); renderGroups(); document.getElementById('act-' + act.id).scrollIntoView({ behavior: 'smooth', block: 'start' }); } }),
        el('button', { class: 'btn ghost', type: 'button', onclick: rollOuting }, dieIcon(), 'Roll again'))
    ));
  }

  // ---------- movie night ----------
  const movie = Object.assign({ country: '', decade: '', genre: '' }, store.get('qh.movie', {}));

  function movieMatches() {
    return MOVIES.filter((m) =>
      (!movie.country || (m.countries || []).includes(movie.country)) &&
      (!movie.decade || Math.floor(m.year / 10) * 10 === +movie.decade || (movie.decade === 'earlier' && m.year < Math.min(...MOVIE_DECADES))) &&
      (!movie.genre || (m.genres || []).includes(movie.genre)));
  }

  function renderMovies() {
    const root = document.getElementById('movie-form');
    root.replaceChildren();
    const select = (label, key, options) => el('label', { class: 'movie-select' }, el('span', { text: label }),
      el('select', { onchange: (ev) => { movie[key] = ev.target.value; store.set('qh.movie', movie); renderMovies(); } },
        [el('option', { value: '', text: 'Any' })].concat(options.map((o) => el('option', { value: String(o.v), selected: String(movie[key]) === String(o.v), text: o.label })))));
    const n = movieMatches().length;
    root.append(
      select('Country', 'country', MOVIE_COUNTRIES.map((c) => ({ v: c, label: c }))),
      select('Decade', 'decade', MOVIE_DECADES.map((y) => ({ v: y, label: y + 's' })).concat([{ v: 'earlier', label: 'Earlier' }])),
      select('Genre', 'genre', MOVIE_GENRES.map((g) => ({ v: g, label: g }))),
      el('div', { class: 'dice-go' },
        el('span', { class: 'dice-count', text: MOVIES.length ? n + (n === 1 ? ' movie fits' : ' movies fit') : 'List coming soon' }),
        el('button', { class: 'btn roll', type: 'button', disabled: !n, onclick: rollMovie }, dieIcon(), 'Roll a movie'))
    );
    const out = document.getElementById('movie-result');
    if (!MOVIES.length && !out.childElementCount) {
      out.append(el('div', { class: 'dice-empty' },
        el('p', { text: 'The movie list is brand new and still empty. Tell us a film you love and it’ll be added.' }),
        el('button', { class: 'btn ghost', type: 'button', text: 'Suggest a movie', onclick: () => openSuggest('movie') })));
    }
  }

  function rollMovie(ev) {
    spin(ev.currentTarget);
    const list = movieMatches();
    const out = document.getElementById('movie-result');
    out.replaceChildren();
    if (!list.length) { out.append(el('p', { class: 'dice-empty', text: 'No movie fits those filters yet. Loosen one of them.' })); return; }
    const m = pickOne(list);
    out.append(el('div', { class: 'dice-card' },
      el('p', { class: 'section-label', text: 'Tonight you’re watching' }),
      el('h3', { text: m.title }),
      m.original && m.original !== m.title ? el('p', { class: 'local', text: m.original }) : null,
      el('div', { class: 'eyebrow' }, [String(m.year)].concat(m.countries || [], m.genres || [], m.minutes ? [m.minutes + ' min'] : []).map((c) => el('span', { class: 'tag', text: c }))),
      m.link ? el('p', {}, el('a', { href: m.link, target: '_blank', rel: 'noopener' }, 'About this film')) : null,
      el('div', { class: 'dice-actions' }, el('button', { class: 'btn ghost', type: 'button', onclick: rollMovie }, dieIcon(), 'Roll again'))
    ));
  }

  // ---------- suggestions ----------
  const sdlg = document.getElementById('suggest-dialog');
  const sform = document.getElementById('suggest-form');
  const sf = {
    name: document.getElementById('s-name'), when: document.getElementById('s-when'), link: document.getElementById('s-link'),
    note: document.getElementById('s-note'), email: document.getElementById('s-email'), website: document.getElementById('s-website')
  };
  let suggestKind = 'place';

  function renderSuggestAvailability() {
    const ready = state.apiVersion >= 3;
    document.querySelectorAll('[data-suggest]').forEach((b) => { b.disabled = !ready; b.title = ready ? '' : 'Opening in a moment'; });
    const note = document.getElementById('suggest-soon');
    if (note) note.hidden = ready || !state.countsLoaded;
  }

  function openSuggest(kind) {
    if (state.apiVersion < 3) { toast('Suggestions open once the sign-up sheet finishes updating. Try again a bit later.', true); return; }
    suggestKind = kind === 'movie' ? 'movie' : 'place';
    document.getElementById('suggest-title').textContent = suggestKind === 'movie' ? 'Suggest a movie' : 'Suggest a place';
    document.getElementById('s-name-label').firstChild.textContent = suggestKind === 'movie' ? 'Movie title ' : 'Place or activity ';
    document.getElementById('s-when-label').firstChild.textContent = suggestKind === 'movie' ? 'Year ' : 'Rough time ';
    sf.when.placeholder = suggestKind === 'movie' ? 'e.g. 1994' : 'e.g. Saturdays in October, or all winter';
    sf.name.value = ''; sf.when.value = ''; sf.link.value = ''; sf.note.value = ''; sf.website.value = '';
    sf.email.value = (state.profile && state.profile.email) || '';
    if (typeof sdlg.showModal === 'function') sdlg.showModal(); else sdlg.setAttribute('open', '');
    sf.name.focus();
  }

  sform.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const payload = { action: 'suggest', kind: suggestKind, name: sf.name.value.trim(), when: sf.when.value.trim(), link: sf.link.value.trim(), note: sf.note.value.trim(), email: sf.email.value.trim(), website: sf.website.value };
    if (payload.name.length < 2) { sf.name.setCustomValidity('Give it a name'); sf.name.reportValidity(); return; }
    if (payload.link && !/^https?:\/\/\S+$/i.test(payload.link)) { sf.link.setCustomValidity('Links start with http:// or https://'); sf.link.reportValidity(); return; }
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) { sf.email.setCustomValidity('Enter an email like name@example.com, or leave it empty'); sf.email.reportValidity(); return; }
    const btn = document.getElementById('suggest-submit');
    btn.disabled = true; btn.textContent = 'Sending…';
    const body = JSON.stringify(payload);
    try {
      let data;
      try {
        const res = await fetch(API, { method: 'POST', body });
        data = await res.json();
      } catch (netErr) {
        await fetch(API, { method: 'POST', mode: 'no-cors', body });
        data = { ok: true, unconfirmed: true };
      }
      if (!data.ok) throw Object.assign(new Error(data.error), { code: data.error });
      sdlg.close();
      toast(data.unconfirmed
        ? 'Sent. Your browser hid the confirmation, but the suggestion should have reached Peter.'
        : 'Thanks! Peter gets your suggestion by email and adds it once the details check out.');
    } catch (e) {
      const msg = { name: 'Give it a name of at least 2 characters.', link: 'That link doesn’t look right. It should start with https://', email: 'That email doesn’t look right. Fix it or leave it empty.', rate: 'Lots of suggestions just came in. Try again in an hour.' }[e.code];
      toast(msg || 'Couldn’t send the suggestion. Check your connection and try again.', true);
    } finally {
      btn.disabled = false; btn.textContent = 'Send suggestion';
    }
  });
  [sf.name, sf.link, sf.email].forEach((i) => i.addEventListener('input', () => i.setCustomValidity('')));
  document.getElementById('suggest-cancel').addEventListener('click', () => sdlg.close());
  document.querySelectorAll('[data-suggest]').forEach((b) => b.addEventListener('click', () => openSuggest(b.dataset.suggest)));

  // ---------- toast ----------
  let toastTimer;
  function toast(msg, isErr, action) {
    const t = document.getElementById('toast');
    t.replaceChildren(el('span', { text: msg }));
    if (action) {
      t.append(el('button', { class: 'toast-action', type: 'button', text: action.label, onclick: () => { t.hidden = true; clearTimeout(toastTimer); action.run(); } }));
    }
    t.className = 'toast' + (isErr ? ' err' : '') + (action ? ' has-action' : '');
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, action ? 9000 : isErr ? 7000 : 5000);
  }

  // "Montréal · Fall 2026", "Montréal · Winter 2026–27", computed from today's date in Montréal.
  function seasonLabel(iso) {
    const [y, m] = iso.split('-').map(Number);
    if (m === 12) return 'Winter ' + y + '–' + String(y + 1).slice(2);
    if (m <= 2) return 'Winter ' + (y - 1) + '–' + String(y).slice(2);
    if (m <= 5) return 'Spring ' + y;
    if (m <= 8) return 'Summer ' + y;
    return 'Fall ' + y;
  }

  // ---------- boot ----------
  document.getElementById('season').textContent = 'Montréal · ' + seasonLabel(todayISO);
  document.getElementById('checked-date').textContent = fmt(CHECKED, { month: 'long', day: 'numeric', year: 'numeric' });
  renderProfileBar();
  renderMyPlans();
  renderFilters();
  renderGroups();
  renderDeals();
  renderUpcoming();
  renderDice();
  renderMovies();
  renderSuggestAvailability();
  loadCounts();
})();
