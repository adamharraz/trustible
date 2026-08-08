# Cloudflare Pages Deployment

Use Cloudflare Pages for this MVP because the app is exported as static files.

Recommended settings:

- Framework preset: Next.js or None
- Build command: `npm run build`
- Build output directory: `out`
- Deploy command: `npx wrangler pages deploy out --project-name trustible`
- Node.js version: 22 or 24

Do not use `npx wrangler deploy` for this static MVP. That command makes Cloudflare treat the project as a Worker/OpenNext deployment, which can create service-binding errors that are unnecessary for this prototype.

If Cloudflare accepts a blank deploy command, prefer the normal Pages flow with only the build command and output directory. If the UI requires a deploy command, use the Pages command above.

If deployment fails with `Authentication error [code: 10000]`, update the `CLOUDFLARE_API_TOKEN` environment variable. Create or edit an API token named `trustible build token`; it must belong to the same Cloudflare account and include Cloudflare Pages write/edit access for the `trustible` Pages project.
