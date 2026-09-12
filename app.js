(function () {
  'use strict';

  const API = 'https://script.google.com/macros/s/AKfycbwmn6O9Z7EU3n93CkJVROyf9W-IgcjxRGTtSuuRTtKTgMshdM6mk1NCoQmdLNBft-Vr/exec';
  const TZ = 'America/Montreal';
  const DAYS_SHOWN = 10;
  const LOOKAHEAD_DAYS = 150;
  const { ACTIVITIES, CATEGORIES, DEALS, CHECKED } = window.QH_DATA;

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
    mine: new Set(store.get('qh.mine', [])),
    filter: 'all',
    busy: new Set(),
    pending: null
  };

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

  function renderPicker(act) {
    const wrap = el('div', { class: 'pick' });
    const days = upcomingDays(act);
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
    for (const d of days) row.append(dayButton(act, d));
    wrap.append(row);

    if (act.schedule.type === 'weekly') {
      const input = el('input', { type: 'date', min: todayISO, max: lastDay(act.schedule) || addDays(todayISO, 365), 'aria-label': 'Another date for ' + act.name });
      const go = el('button', {
        class: 'btn ghost', type: 'button', text: 'Join that day',
        onclick: () => {
          if (!input.value) { toast('Choose a date first.', true); return; }
          if (!openOn(act, input.value)) { toast(act.name + ' isn’t open on ' + longDate(input.value) + '. Pick one of its open days.', true); return; }
          toggle(act, input.value);
        }
      });
      wrap.append(el('div', { class: 'other-date' }, el('span', { text: 'Another day:' }), input, go));
    }
    return wrap;
  }

  function dayButton(act, d) {
    const k = key(act.id, d.date);
    const n = countFor(act.id, d.date);
    const mine = state.mine.has(k);
    const going = !state.countsLoaded ? '' : mine ? 'You’re in' + (n > 1 ? ' +' + (n - 1) : '') : n ? n + ' going' : 'Be first';
    const label = longDate(d.date) + (d.note ? ', ' + d.note : '') + '. ' + (mine ? 'You’re going. Press to leave.' : n + ' going. Press to join.');
    return el('button', {
      type: 'button', class: 'day' + (mine ? ' mine' : '') + (state.busy.has(k) ? ' busy' : ''),
      'aria-pressed': String(mine), 'aria-label': label, 'data-key': k,
      onclick: () => toggle(act, d.date)
    },
      el('span', { class: 'dow', text: fmt(d.date, { weekday: 'short' }) }),
      el('span', { class: 'dnum', text: fmt(d.date, { day: 'numeric' }) }),
      el('span', { class: 'mon', text: fmt(d.date, { month: 'short' }) }),
      el('span', { class: 'going' + (n && !mine ? ' has' : ''), text: going }),
      d.note ? el('span', { class: 'note', text: d.note }) : null
    );
  }

  function refreshDay(act, iso) {
    const k = key(act.id, iso);
    document.querySelectorAll('[data-key="' + CSS.escape(k) + '"]').forEach((btn) => {
      const d = upcomingDays(act).find((x) => x.date === iso) || { date: iso };
      btn.replaceWith(dayButton(act, d));
    });
  }

  function renderUpcoming() {
    const list = document.getElementById('upcoming-list');
    const empty = document.getElementById('upcoming-empty');
    list.replaceChildren();
    if (!state.countsLoaded) { empty.textContent = 'Loading headcounts…'; empty.hidden = false; return; }
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
        onclick: () => { state.filter = 'all'; renderFilters(); renderGroups(); document.getElementById('act-' + r.act.id).scrollIntoView({ behavior: 'smooth', block: 'start' }); }
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
  async function loadCounts() {
    try {
      const res = await fetch(API, { cache: 'no-store' });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'bad');
      state.counts = data.counts || {};
      state.countsLoaded = true;
    } catch (e) {
      state.countsLoaded = true;
      toast('Headcounts couldn’t load. You can still sign up; refresh later to see who’s going.', true);
    }
    renderUpcoming();
    renderGroups();
  }

  const ERRORS = {
    email: 'That email address doesn’t look right. Fix it and try again.',
    date: 'That day is no longer open for sign-ups. Pick another one.',
    rate: 'Too many changes in a short time. Wait a few minutes and try again.',
    activity: 'Something is off with this activity. Refresh the page and try again.'
  };

  function toggle(act, iso) {
    if (!state.profile || !state.profile.email) { openDialog({ act, iso }); return; }
    send(act, iso, state.mine.has(key(act.id, iso)) ? 'leave' : 'join');
  }

  async function send(act, iso, action) {
    const k = key(act.id, iso);
    if (state.busy.has(k)) return;
    const before = { n: state.counts[k] || 0, mine: state.mine.has(k) };

    // optimistic
    state.busy.add(k);
    if (action === 'join' && !before.mine) { state.mine.add(k); state.counts[k] = before.n + 1; }
    if (action === 'leave' && before.mine) { state.mine.delete(k); state.counts[k] = Math.max(0, before.n - 1); }
    refreshDay(act, iso);

    try {
      const p = state.profile;
      const res = await fetch(API, {
        method: 'POST',
        body: JSON.stringify({ action, email: p.email, name: p.name || '', chat: p.chat || '', seats: p.seats || 0, website: p.website || '', activityId: act.id, activity: act.name, date: iso })
      });
      const data = await res.json();
      if (!data.ok) throw Object.assign(new Error(data.error), { code: data.error });
      state.counts = data.counts || state.counts;
      store.set('qh.mine', [...state.mine]);
      toast(action === 'join'
        ? 'You’re in: ' + act.name + ', ' + longDate(iso) + '. Peter will email you a group-chat link once the day has company.'
        : 'You left ' + act.name + ' on ' + longDate(iso) + '.');
    } catch (e) {
      if (before.mine) state.mine.add(k); else state.mine.delete(k);
      state.counts[k] = before.n;
      toast(ERRORS[e.code] || 'Couldn’t reach the sign-up sheet. Check your connection and try again.', true);
    } finally {
      state.busy.delete(k);
      refreshDay(act, iso);
      renderUpcoming();
    }
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
    f.chat().forEach((r) => { r.checked = r.value === (p.chat || ''); });
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { f.email.setCustomValidity('Enter an email like name@example.com'); f.email.reportValidity(); return; }
    f.email.setCustomValidity('');
    state.profile = {
      email, name: f.name.value.trim().slice(0, 40),
      chat: (f.chat().find((r) => r.checked) || {}).value || '', seats: parseInt(f.seats.value, 10) || 0,
      website: f.website.value
    };
    store.set('qh.profile', state.profile);
    dlg.close();
    renderProfileBar();
    if (state.pending) { const { act, iso } = state.pending; state.pending = null; send(act, iso, 'join'); }
  });
  document.getElementById('join-cancel').addEventListener('click', () => { state.pending = null; dlg.close(); });
  f.email.addEventListener('input', () => f.email.setCustomValidity(''));

  // ---------- toast ----------
  let toastTimer;
  function toast(msg, isErr) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast' + (isErr ? ' err' : '');
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, isErr ? 7000 : 5000);
  }

  // ---------- boot ----------
  document.getElementById('checked-date').textContent = fmt(CHECKED, { month: 'long', day: 'numeric', year: 'numeric' });
  renderProfileBar();
  renderFilters();
  renderGroups();
  renderDeals();
  renderUpcoming();
  loadCounts();
})();
