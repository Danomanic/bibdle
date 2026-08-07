# Bibdle

A daily word-guessing game where the answer is always a 5-letter
Bible-related word. Same word for everyone each day (UTC), no backend,
no accounts — a static site. 366 words in rotation (one per day of the
year, leap years included). Once a round ends, a panel shows where the
word appears in the Bible — a book/chapter/verse citation only, never
quoted verse text, so it's copyright-safe regardless of translation.

## Run locally

Any static file server works, e.g.:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000

## Run with Docker

```sh
docker build -t bibdle .
docker run -p 8080:80 bibdle
```

Then open http://localhost:8080

## Deploy on Coolify

1. Push this repo to GitHub (or any git host Coolify can reach).
2. In Coolify: **New Resource** → choose the repo → build pack **Dockerfile**.
3. Coolify builds the `Dockerfile` in this repo (nginx serving the static
   files) and exposes port 80 — no extra configuration or env vars needed.
4. Deploy. Every push to the tracked branch can trigger a redeploy if you
   enable Coolify's auto-deploy webhook.

## Changing the word list

Edit `ANSWERS` in `words.js`. The word of the day is derived from the current
UTC date modulo the list length, so the daily word rotates automatically as
the list grows — no other code changes needed. Every word in `ANSWERS` needs
a matching entry in `REFERENCES` (same file) — a `"Book Chapter:Verse"`
citation shown once the round ends. These are the best-known/most
recognizable occurrence of each word, not an exhaustive list, and a few
reflect classic KJV wording (marked `(KJV)`) rather than more modern
translations — spot-check before treating one as authoritative.
