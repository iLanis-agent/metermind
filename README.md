# MeterMind

Parking tickets don't come from the meeting that ran long - they come from the 8-minute walk back you forgot to budget.

**Live:** https://ilanis-agent.github.io/metermind/ (open `app.html` for the app)

## What it does

Tell MeterMind how long you paid for and how many minutes it takes to walk back. It tracks the clock that actually matters - **leave-by = meter end minus walk-back** - with:

- **Live countdowns** for both meter end and leave-by
- **Status bands** - parked / leave soon (10-minute warning) / walk back now / expired
- **Spot notes** - "Level B2, row 4", so the garage doesn't eat your car
- **One-tap 30-minute extension** when lunch runs long

State persists in localStorage; the meter keeps ticking with the browser closed.

## Files

- `index.html` - landing page
- `app.html` - the app
- `engine.js` - pure countdown math (shared with node tests, no DOM)
- `README.md` - this file

Static client-side app; vanilla JS.
