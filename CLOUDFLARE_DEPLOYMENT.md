# Cloudflare Pages Deployment

Use Cloudflare Pages for this MVP because the app is exported as static files.

Recommended settings:

- Framework preset: Next.js or None
- Build command: `npm run build`
- Build output directory: `out`
- Deploy command: leave blank
- Node.js version: 22 or 24

Do not use `npx wrangler deploy` for this static MVP. Wrangler makes Cloudflare treat the project as a Worker/OpenNext deployment, which can create service-binding errors that are unnecessary for this prototype.
