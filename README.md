# THE DETAILING Kings — Static React Experience

A responsive Vite + React + Tailwind single-page experience modelled after a premium vehicle protection studio. The app is designed for static hosting on GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

`vite.config.js` uses `base: './'`, so generated asset references work under a repository subpath such as `https://<user>.github.io/demo/`.

```bash
npm run deploy
```

Then set **Settings → Pages → Build and deployment → Source** to the `gh-pages` branch / root folder.

## Static-client behaviour

The browser's `localStorage` persists appointment requests, cancelled bookings, preferred studio selections, franchise enquiries, and contact messages. This is an intentionally client-only demo; it does not submit personally identifiable information to a server.
