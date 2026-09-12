# Québec Hangouts

Pick a place and a day around Montréal. When other people pick the same one, we go together.

**Live site:** https://peter-awe.github.io/quebec-hangouts/

## How it works

- `index.html`, `styles.css`, `app.js`: the static page served by GitHub Pages.
- `data.js`: every place, deal, price, opening rule and source link. Facts were checked on the official pages on the date in `CHECKED`.
- `backend/Code.gs`: a Google Apps Script web app bound to a private Google Sheet. It stores sign-ups (email, optional name, chat app, car seats) and returns headcounts only.

## Adding a place

Add an object to `ACTIVITIES` in `data.js` with an `id` (lowercase letters, digits and dashes), a category, facts, a `schedule` and at least one source. Put a 1200×800 photo in `assets/img/` and credit its author and license in `img.credit`.

## Photos

All photos come from Wikimedia Commons and keep their original licenses (CC0, CC BY, CC BY-SA). Each card links to the photo's Commons page with author and license; the versions here are cropped and resized.
