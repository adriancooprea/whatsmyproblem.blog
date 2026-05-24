# What's My Problem?

A monthly long-form notebook. One essay a month. Confessional, contradictory, self-implicating.

```
pnpm install
pnpm dev      # http://localhost:4321
pnpm build
pnpm preview
```

Before first run, drop the five font files into `public/fonts/` — see `public/fonts/README.md` for exact filenames and sources. Without them the site renders in fallback serifs and the cage motif weakens.

## Adding a new post

1. Create `src/content/posts/NNN-slug.md`. The number prefix is for your benefit; the URL slug is taken from the filename (`NNN-slug`).
2. Frontmatter schema (enforced by Zod in `src/content.config.ts`):

   ```yaml
   ---
   number: 4                 # int, monotonically increasing
   title: "…"
   subtitle: "…"             # optional
   date: 2026-06-01          # ISO date
   reading_time: 12          # minutes, int
   pull_quote: "…"           # 1–2 sentences shown on hover in the ledger
   draft: false              # optional, hides post when true
   ---
   ```

3. Write Markdown. `---` becomes a `❦` section break. Standard `[^n]` footnotes render as marginalia on desktop and inline-expandable on mobile.
4. The post appears automatically on `/`, `/archive`, RSS, and at `/posts/NNN-slug`.

## Changing the default mode

`src/layouts/Base.astro` — the inline `<script>` near the top sets the initial mode. Change the fallback from `'cell'` to `'night'` to flip the default. User choice (localStorage `wmp-mode`) and `prefers-color-scheme` still take precedence.

## Deploy

Production deploys to Vercel at **whatsmyproblem.blog**.

```bash
git remote add origin git@github.com:adriancooprea/whatsmyproblem.blog.git
git branch -M main
git push -u origin main
```

In Vercel: import the repo, framework preset **Astro**, build `pnpm build`, output `dist`. Add the domain `whatsmyproblem.blog` in Project → Domains and point DNS as Vercel instructs (apex A `76.76.21.21`, or CNAME `www` → `cname.vercel-dns.com`). No env vars needed.
