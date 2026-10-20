<h1 align="center">Payload 4 is out!</h1>

<p align="center">
  <strong>Starting a new project? Use the <a href="https://github.com/rpuls/payload-4-boilerplate">Payload 4 template</a> instead.</strong><br>
  Same one-click Railway setup, built on Payload 4.
</p>

<p align="center">
  <a href="https://railway.com/deploy/payload-cms-4-website-beta?referralCode=-Yg50p">
    <img src="https://railway.com/button.svg" alt="Deploy the Payload 4 template on Railway" />
  </a>
</p>

> [!IMPORTANT]
> **This Payload 3 template will stop being maintained once Payload 4 matures.** It still gets updates for now, but new projects are better off starting on Payload 4, so they do not need a migration later.
>
> The [Payload 4 template](https://github.com/rpuls/payload-4-boilerplate) comes with the redesigned Payload 4 admin, a modular dashboard, MCP access for AI agents, nested categories, tags, scheduled publishing and uploads stored in a Railway Bucket.
>
> Already building on Payload 3? No rush: your project keeps working. Read the [Payload 3 to 4 migration guide](https://payloadcms.com/docs/beta/migration-guide/v4) when you are ready to move.

---

<p align="center">
  <a href="https://funkyton.com/payload-cms/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/hczpmiapo/image/upload/v1732576652/Static%20assets/Logos/payload_V3_mhv6wc.png">
      <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/hczpmiapo/image/upload/v1732576652/Static%20assets/Logos/payload_V3_mhv6wc.png">
      <img alt="Payload CMS logo" src="https://res.cloudinary.com/hczpmiapo/image/upload/v1732576652/Static%20assets/Logos/payload_V3_mhv6wc.png" width=100>
    </picture>
  </a>
  <a href="https://railway.app/template/L8TUlT?referralCode=-Yg50p">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://railway.app/brand/logo-light.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://railway.app/brand/logo-dark.svg">
      <img alt="Railway logo" src="https://railway.app/brand/logo-light.svg" width=100>
    </picture>
  </a>
</p>

<h2 align="center">
  Payload CMS V3 Website Template<br>
  <a href="https://railway.app/deploy/L8TUlT?referralCode=-Yg50p">One-click deploy on Railway!</a>
</h2>

<h1 align="center">
  Need help?<br>
  <a href="https://funkyton.com/payload-cms/">Step by step guide and instructions</a>
</h1>

<p align="center">
  A powerful, flexible, and production-ready Payload CMS V3 website builder with PostgreSQL database.
</p>

<p align="center">
  <a href="https://github.com/payloadcms/payload/blob/main/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/payload">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
</p>

## About this boilerplate

This boilerplate is a pre-configured, ready-to-deploy solution for Payload CMS as a website builder. It includes a fully-working backend, enterprise-grade admin panel, and a beautifully designed, production-ready website. This template is optimized for seamless deployment on [Railway](https://railway.app?referralCode=-Yg50p), and uses PostgreSQL for both local development and production environments.

## Version Info

- **Payload CMS**: `3.91.0` (all `@payloadcms/*` packages on the same version)
- **Next.js**: `16.4.2`
- **React**: `19.3.1`
- **Node.js**: `>=20.18.1`
- **pnpm**: `10.26.0`
- **TypeScript**: `5.9.3`
- **Playwright**: `1.64.1`
- **PostgreSQL**: 16 for local development and e2e (Docker), Railway's PostgreSQL template in production

Looking for Payload 4? See the [Payload 4 template](https://github.com/rpuls/payload-4-boilerplate).

## Preconfigured Features & Integrations

- **Authentication**: Robust user authentication system
- **Access Control**: Role-based access control for admins and users
- **Premium Content**: Gated content for authenticated users
- **Comments**: User commenting system with admin approval
- **Layout Builder**: Flexible content creation with pre-configured blocks
- **Draft Preview**: Preview unpublished content before going live
- **SEO**: Built-in SEO optimization tools
- **Redirects**: Easy management of URL redirects
- **PostgreSQL Support**: Configured for both local and production use

### Railway Setup

Use one-click deploy template:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/L8TUlT?referralCode=-Yg50p)

`pnpm start` applies committed Payload migrations before starting Next.js. This keeps both new Railway deployments and existing template installations updated without requiring a Railway setting change. Migrations intentionally do not run during `pnpm build`, because Railway private networking is unavailable during the image build.

### Local Setup

1. Get the code: (recommended) launch on Railway and eject the service to get your own repository ([watch how](https://www.youtube.com/watch?v=LJFek8JP8TE)). Alternatively, clone or fork this repo.
2. Copy `.env.example` to `.env` and fill in your own values
3. Start PostgreSQL: `docker compose up -d postgres`
4. Install dependencies: `pnpm install` or `npm install`
5. Run development mode: `pnpm dev` or `npm run dev`
or
6. Build the project: `pnpm build` or `npm run build`
7. Start the server: `pnpm start` or `npm run start`

### End-to-End Testing

The Playwright suite boots a fresh PostgreSQL container (port `54343`) in its own Docker Compose project (`payload3-e2e`), so your development database is never touched. It builds the app from scratch, creates the first admin user through the onboarding UI, seeds the demo content, submits a public comment, approves it in the admin UI, and verifies it appears on the public post page.

Before the first run, make sure Docker Desktop is running. The suite starts a fresh PostgreSQL container automatically.
For test determinism, the e2e harness uses bundled local seed images only during the test run. Normal seeding continues to use the hosted seed images.

1. Install everything required for e2e: `corepack pnpm e2e:install`
2. Run the suite headlessly: `corepack pnpm test:e2e`
3. Run the suite with a visible browser: `corepack pnpm test:e2e:headed`
4. Run the suite slowly and keep the browser open for manual review: `corepack pnpm test:e2e:manual`

What `e2e:install` does:

- Installs project dependencies
- Rebuilds native dependencies used by the app on Windows, including `sharp` and `esbuild`
- Downloads the Chromium browser used by Playwright

If you prefer `npm`, you can run:

1. `npm run e2e:install`
2. `npm run test:e2e`
3. `npm run test:e2e:headed`
4. `npm run test:e2e:manual`

`test:e2e:manual` runs the suite in headed mode with a visible slowdown between actions and pauses only at the end of the happy path. While paused, the browser stays open so you can click around and manually inspect seeded content, the admin area, and public pages. When you are done, resume or stop the Playwright session from the inspector/terminal.


### Requirements

- **Database**: PostgreSQL
- **Node.js**: 20.18.1 or newer
- **Docker**: for local PostgreSQL and the e2e suite

## Useful Resources

- **Blog post about this template**: [Read here](https://funkyton.com/payload-cms/)
- **Official Payload Documentation**: [Read here](https://payloadcms.com/docs)
- **Payload 4 version of this template**: [rpuls/payload-4-boilerplate](https://github.com/rpuls/payload-4-boilerplate)
- **Payload 3 to 4 migration guide**: [Read here](https://payloadcms.com/docs/beta/migration-guide/v4)

<p align="center">
  <a href="https://funkyton.com/">
    A template by,
    <br><br>
    <picture>
      <img alt="FUNKYTON logo" src="https://res-5.cloudinary.com/hczpmiapo/image/upload/q_auto/v1/ghost-blog-images/funkyton-logo.png" width=200>
    </picture>
  </a>
</p>
