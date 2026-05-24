# SPEC — What's My Problem?

Discipline document. Future edits stay inside these lines.
Design system: **The Underground Dialectic** (Stitch project "Notes from the Subsurface").

## Core tension

"Knowing the cage but still being trapped in it." Existential Brutalism — a collision of 19th-century academic rigor and modern psychological fragmentation. The reader sits boxed inside the structure and cannot leave. No softness. No marketing.

## Forbidden

Rounded corners. Drop shadows. Pastels. Hero photographs of people. UI component libraries (shadcn / Radix / Headless UI). CMS. Database. JS frameworks beyond Astro islands. **Any CDN at runtime** (fonts, Tailwind, scripts — self-host everything). Tags. Categories beyond the fixed nav. Search. Comments. Newsletter signups. Share buttons. Related-post widgets. Analytics. Cookie banners. RSS UI surface (the feed file is fine).

Permitted (departures from the earlier ascetic spec): Material Symbols icons (self-hosted). A subtle SVG texture / tonal panel in the hero. The dual-perspective device. A left sidebar as primary nav.

## Tokens

Dark is the default ("Night"). Light ("Cell") is an inversion via `:root[data-mode="cell"]`.

```
Night (default)
  --color-background          #131313   underground charcoal
  --color-surface-container-low  #1b1c1c
  --color-surface-container      #1f2020
  --color-surface-container-high #2a2a2a
  --color-on-surface          #e4e2e1   parchment ink
  --color-on-surface-variant  #c4c7c7
  --color-outline             #8e9192
  --color-cage                #2a2a2a   1px cage lines
  --color-error               #ffb4ab   accent text (anguish)
  --color-error-container     #93000a   oxidized crimson
  --color-parchment           #f2efe9

Cell (inversion)
  background/surface          #f2efe9
  on-surface                  #1a1613
  cage                        #c2bbab
  error / error-container     #6b1a1a
```

Defined in `@theme` in `global.css`; overridden under `:root[data-mode="cell"]`. Tailwind v4 utilities reference the vars, so the mode toggle flips everything. Do not change the palette "to look better."

## Typography

- Headlines / labels: **Space Grotesk** (variable, self-hosted). Geometric, set tight — the cold machinery of logic. `headline-xl` 64px, `headline-lg` 40px, `label-md` 14px uppercase tracked.
- Body: **EB Garamond** (variable, self-hosted). The weight of confession. `body-md` 18px / 1.6, `body-lg` 22px.
- Icons: **Material Symbols Outlined** (self-hosted woff2). No emoji.
- Drop cap: first paragraph of every post, display weight Space Grotesk, `var(--color-error)`.

## Structure rules

- All borders 1px solid `var(--color-cage)`. The "heavy" accent box is 1px `var(--color-error-container)` (the Stitch 2px crimson is rejected — keep 1px).
- `border-radius: 0` everywhere. `box-shadow: none` everywhere. Enforced globally. Tonal boxing, never shadows.
- Two 1px full-height viewport hairlines (cage bars) at left/right edges, always visible.
- Claustrophobia vs. solitude: tight internal padding inside cage boxes, generous margins between them.
- Focus rings: 1px solid `var(--color-error-container)`. No glow.

## Motion

- Hover: color shift to `var(--color-error)`, border to crimson; ~200–300ms.
- Page transitions: Astro `<ClientRouter />`.
- No scroll-triggered animation. No parallax. `prefers-reduced-motion` disables transitions.

## Information architecture

Three pages + feed. Primary nav is the desktop left sidebar ("The Anonymous Self"); a top bar replaces it on mobile.

- `/` — **The Threshold**: fragmented type hero, Current Confession (latest post), ledger of previous errors.
- `/posts/[slug]` — **The Confession**: 8/12 article column + 4/12 side rail (dual perspectives + "No Exit" panel), metadata strip, drop cap, footnotes (inline-expand), prev/next.
- `/archive` — **The Underground**: ledger grouped by year.
- `/about` — **The Mirror**: one bordered paragraph + email.

Plus `/rss.xml` — feed file, no nav link.

## Dual perspectives

Optional per-post `perspectives[]` ({ voice, claim, body }). Opposing internal voices (e.g. The Critic / The Defense) rendered as cage boxes in the post side rail. Voice in Space Grotesk uppercase `var(--color-error)`; claim in Space Grotesk; body in `var(--color-on-surface-variant)`. The unit argues with itself; it does not link out.

## Mode toggle

Hairline button in the sidebar (and mobile bar). Material `contrast` icon + label that switches `Cell` ↔ `Night`. Persists in `localStorage` key `wmp-mode`. Default Night.

## Accessibility

WCAG AA contrast both modes. Landmark elements. Keyboard navigable. Focus rings on every interactive element. Icons are decorative; never the sole label.

## Content collection

`src/content/posts/*.md`, Zod-validated. Schema in `src/content.config.ts`. File ID = URL slug. Fields: number, title, subtitle?, date, reading_time, pull_quote, perspectives?, draft?.

## Things that are missing on purpose

- Author bio / photo. The text is the author.
- Free-form tags. Browsing is the latest essay + chronological ledger.
- A subscribe form. The reader is alone with the text.

## When adding a feature

Ask: does this soften the cage (radius, shadow, pastel, friendly roundness)? If yes, do not add it. Ask: does it add a runtime CDN dependency? If yes, self-host instead. Ask: does the spec already say no? If yes, do not add it.
