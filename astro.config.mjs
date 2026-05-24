import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

// In some sandboxed environments Astro 5's dev server (a) cannot serve files
// from `public/` (bare Vite serves them fine) and (b) fails to provide the
// content-layer virtual modules, 500-ing any page that reads a collection.
// The production build is unaffected. This dev-only plugin self-heals both:
// it prepends a `public/` static handler ahead of Astro's 404, and writes the
// missing content-module stubs Astro expects. No-op in build.
const MIME = {
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.txt': 'text/plain', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json',
};

function devSandboxFixes() {
  return {
    name: 'dev-sandbox-fixes',
    apply: 'serve',
    configureServer(server) {
      // (b) Ensure the content-layer virtual-module stubs exist where Astro's
      // dev server resolves them. Harmless if Astro already provides them.
      try {
        const stubDir = path.resolve('./node_modules/astro/dist/content/.astro');
        fs.mkdirSync(stubDir, { recursive: true });
        for (const f of ['content-assets.mjs', 'content-modules.mjs']) {
          const p = path.join(stubDir, f);
          if (!fs.existsSync(p)) fs.writeFileSync(p, 'export default new Map();\n');
        }
      } catch { /* ignore */ }

      // (a) Serve `public/` ourselves, ahead of Astro's catch-all 404.
      const publicDir = path.resolve('./public');
      const handler = (req, res, next) => {
        try {
          const url = decodeURIComponent((req.url || '').split('?')[0]);
          if (!url || url === '/') return next();
          const filePath = path.join(publicDir, url);
          if (!filePath.startsWith(publicDir + path.sep)) return next();
          if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next();
          const type = MIME[path.extname(filePath).toLowerCase()];
          if (type) res.setHeader('Content-Type', type);
          res.setHeader('Cache-Control', 'no-cache');
          fs.createReadStream(filePath).pipe(res);
        } catch {
          next();
        }
      };
      // Prepend so it runs before Astro's middleware stack.
      server.middlewares.stack.unshift({ route: '', handle: handler });
    },
  };
}

export default defineConfig({
  site: 'https://whatsmyproblem.blog',
  output: 'static',
  vite: {
    plugins: [tailwindcss(), devSandboxFixes()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
