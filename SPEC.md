# SPEC — What's My Problem?

Discipline document. Future edits stay inside these lines.

## Core tension

"Knowing the cage but still being trapped in it." Everything ruled, gridded, constrained. The reader sits inside the structure and cannot leave. No softness. No marketing.

## Forbidden

Emoji. Gradients. Rounded corners. Drop shadows. Glass effects. Pastels. Hero images. Illustrations. Icons. UI libraries (shadcn / Radix / Headless UI). CMS. Database. JS frameworks beyond Astro islands. Google Fonts CDN. Tags. Categories. Search. Comments. Newsletter signups. Share buttons. Related posts. Analytics. Cookie banners. RSS UI surface (the feed file is fine).

## Tokens

```
Cell (default)
  --bg     #F1ECE2   yellowed bone
  --ink    #1A1613   pressed ink
  --rule   rgba(26,22,19,.2)
  --muted  #6B645B
  --wound  #6B1A1A

Night
  --bg     #0D0C0A
  --ink    #D9D2C4
  --rule   rgba(217,210,196,.13)
  --muted  #837C70
  --wound  #9B3030
```

Do not change them "to look better." The palette is the point.

## Typography

- Body: EB Garamond variable, 18px, line-height 1.7, measure 62ch.
- Display: Cormorant Garamond, post titles + wordmark only.
- Mono: JetBrains Mono, metadata only (dates, post numbers, footnote markers, mode toggle).
- Drop cap: first paragraph of every post, 3 lines, display serif, `var(--wound)`.

## Structure rules

- All borders 1px solid. Never thicker. Never softer.
- `border-radius: 0` everywhere. `box-shadow: none` everywhere. Enforced globally in `global.css`.
- Two 1px vertical hairlines run full viewport height at the left and right of the content column. They are the cage bars and are always visible, including on mobile. Implemented via `.cage-bars::before/::after` on `<body>`.
- Generous vertical whitespace inside the column. Tight horizontal margins outside it.
- Focus rings: 1px solid `var(--wound)` outline. No glow.

## Motion

- Link hover: underline 1px → 2px over 300ms. Gestures at escape, does not release.
- Page transitions: 250ms fade through bg, slide up 8px. Astro `<ClientRouter />`.
- No scroll-triggered animation. No parallax.
- `prefers-reduced-motion` disables transitions.

## Information architecture

Four pages. No more.

- `/` — wordmark, epigraph, ledger.
- `/posts/[slug]` — metadata strip, title, optional subtitle, body 62ch, drop cap, footnotes as marginalia (desktop) / inline-expand (mobile), prev/next footer.
- `/archive` — same ledger grouped by year.
- `/about` — one paragraph + email. No photo. No social.

Plus `/rss.xml` — feed file, no nav link.

## Mode toggle

Hairline button top-right of header. Mono label switches: `Night` while in Cell, `Cell` while in Night. No icons. Persists in `localStorage` key `wmp-mode`. First visit respects `prefers-color-scheme`.

## Accessibility

WCAG AA contrast in both modes (verified: Cell ink 13.3:1, Night ink 11.1:1 against bg). Landmark elements. Keyboard navigable. Focus rings on every interactive element.

## Content collection

`src/content/posts/*.md`, Zod-validated. Schema in `src/content.config.ts`. File ID = URL slug.

## Things that look missing and are missing on purpose

- A homepage hero. There is no hero. The wordmark is the hero.
- Author bio / photo. The text is the author.
- Tags / categories. Each essay is a unit. Browsing is chronological only.
- A subscribe form. The reader is alone with the text.
- Open Graph images. Not now. If added later, single hairline rectangle with the title in display serif on bone. No photography.

## When adding a feature

Ask: does this soften the cage? If yes, do not add it. Ask: does this introduce a softness primitive (radius, shadow, gradient, pastel, icon)? If yes, do not add it. Ask: does the spec already say no to this? If yes, do not add it.
