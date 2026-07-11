---
name: Replit setup for imported Vercel/Bun+Nitro projects
description: How to get a project imported from Vercel (Bun toolchain, Nitro/TanStack Start build) running cleanly on Replit's dev proxy.
---

When an imported project targets Vercel and uses Nitro (e.g. via TanStack Start) with a Bun toolchain:

- Switch the Nitro preset from `vercel` to `node-server` in the Vite/Nitro config — Replit isn't Vercel, and the Vercel preset won't produce a runnable dev/prod server here.
- Add `server: { host: "0.0.0.0", port: 5000, allowedHosts: true }` to `vite.config.ts` so the Replit iframe proxy (which requests from a different origin) can reach the dev server.
- If the project already ships `bun.lock`/`bunfig.toml`, install and run with Bun rather than switching to npm/pnpm — matches existing project conventions and avoids lockfile churn.

**Why:** the default imported config assumes a Vercel deploy target and localhost-only dev access; both assumptions break Replit's preview iframe and workflow-based dev server.

**How to apply:** whenever setting up a freshly imported project that has Vercel/Nitro config and no Replit workflow yet.
