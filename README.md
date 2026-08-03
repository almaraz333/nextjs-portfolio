# The Colton Channel

The personal portfolio of Colton Almaraz ([coltonalmaraz.com](https://coltonalmaraz.com)), styled as a Nintendo Wii Menu: a grid of channels, a glossy bottom bar with a live clock, and synthesized UI blips. And at least one secret.

## Architecture

- **Next.js 16 (App Router), React 19, strict TypeScript, Tailwind CSS 4, framer-motion 12.** No UI component libraries.
- **Client Wii shell.** The server renders `/` and `/c/[slug]`; from there `components/wii/WiiShell.tsx` takes over. Opening a channel is a client-side zoom that updates the URL with `pushState`, and Back/Forward are handled via `popstate` — no server round-trips while browsing.
- **Lazy-loaded sections.** Each channel body lives in `components/sections/` and is code-split with `next/dynamic` behind a "Now loading…" placeholder (`components/sections/registry.tsx`).
- **Fully static.** Every route prerenders — there is no database, no API surface, and no server state to operate.
- **Design tokens.** The whole look lives in `app/globals.css` as Tailwind theme tokens (`wii-bg`, `wii-blue`, `shadow-wii`, `rounded-channel`, …). Fonts are Fredoka and Varela Round via `next/font`.
- **Sound.** UI blips are synthesized with the WebAudio API (`lib/sound.ts`) — no audio files, off by default, toggled from the bottom bar.

## Local development

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000. No environment variables or services are required.

## Deployment

Built for Vercel, but any Node host (or static host) works — push to the default branch and it deploys. No environment variables are required.

## Scripts

| Script              | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Dev server (bound to `0.0.0.0`) |
| `npm run build`     | Production build                |
| `npm run start`     | Serve the production build      |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | `tsc --noEmit`                  |
| `npm run prettier`  | Format the repo                 |

## Accessibility & performance

- Full keyboard navigation: tiles and controls are real buttons, focus is visible everywhere (Wii-blue ring), and closing a channel returns focus to the tile that opened it.
- `prefers-reduced-motion` is respected — zooms, pulses, and easter-egg flourishes reduce to fades or disappear entirely.
- Audio is strictly opt-in and synthesized on demand; nothing autoplays.
- Channel sections are code-split so the first paint ships only the shell and grid.

## Content honesty

All biographical and résumé content on the site comes from [`cv.md`](./cv.md) — the single source of truth, transcribed from the résumé PDF. If a fact isn't in that file, it doesn't go on the site.
