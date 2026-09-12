# Québec Hangouts

Pick a place and a day around Montréal. When other people pick the same one, we go together.

**Live site:** https://peter-awe.github.io/quebec-hangouts/

## How it works

- `index.html`, `styles.css`, `app.js`: the static page served by GitHub Pages.
- `data.js`: every place, deal, price, opening rule and source link. Facts were checked on the official pages on the date in `CHECKED`.
- `data.fr.js`, `data.zh.js`: the same content in French and Simplified Chinese, keyed by id; arrays line up with the English ones. Update them whenever a fact in `data.js` changes.
- `i18n.js`: interface text in English, French and Chinese. The page picks the visitor's browser language (French or Chinese, otherwise English), and the EN / FR / 中文 switch at the top overrides it. `?lang=fr` or `?lang=zh` in a link opens that language.
- `backend/Code.gs`: a Google Apps Script web app bound to a private Google Sheet. It stores sign-ups (email, optional name, chat app, page language) and returns headcounts only.

## Releasing a change

Bump the `?v=` value on the CSS and script tags in `index.html` whenever you change those files, so returning visitors don't pair a cached old script with the new page.

## Adding a place

Add an object to `ACTIVITIES` in `data.js` with an `id` (lowercase letters, digits and dashes), a category, facts, a `schedule` and at least one source. Give seasonal places a `to` date (and `closed` dates) so the date picker never offers a day they are closed. A tag with `left: 'dates'` or `left: 'games'` shows a live count of what is still ahead. Add the same entry, keyed by id, to `data.fr.js` and `data.zh.js`. For the picture, use one of: `img` (a 1200×800 photo in `assets/img/`, with its author and license in `img.credit`), `board` (the chalkboard used for restaurants) or `art` (`tennis`, `badminton`, `rink`, `gym`, `boulder`).

## Photos

All photos come from Wikimedia Commons and keep their original licenses (CC0, CC BY, CC BY-SA). Each card links to the photo's Commons page with author and license; the versions here are cropped and resized.
