# cmb2.io — how this site works

**cmb2.io** is the documentation site for [CMB2](https://github.com/CMB2/CMB2). As of June 2026 it is a **static [VitePress](https://vitepress.dev/) site deployed on Cloudflare Workers (static assets)**. This README is for humans and agents maintaining it.

> This README is the repo's GitHub landing page and is excluded from the VitePress build (`srcExclude`) — it documents the repo, not a site page. Migration history is in the git log.

---

## TL;DR for editing content

1. Edit (or add) a Markdown file under `docs/` (or `index.md` / `changelog.md` / `contributing.md`).
2. Commit and **push to `master`**.
3. Cloudflare Workers Builds rebuilds and deploys automatically (~1–2 min). That's it.

Local preview: `npm install` then `npm run dev` (→ http://localhost:5173). Build like CI does: `npm run build` (output in `.vitepress/dist/`).

---

## Where everything is

| Path | What | URL |
|---|---|---|
| `index.md` | CMB2 README (fetched from `CMB2/CMB2`) | `/` |
| `changelog.md` | from `CMB2/CMB2@develop` `CHANGELOG.md` | `/changelog` |
| `contributing.md` | from `CMB2/CMB2@develop` `CONTRIBUTING.md` | `/contributing` |
| `docs/*.md` | the wiki pages (one file per page) | `/docs/<Filename>` |
| `public/images/*` | screenshots/images, served from site root | `/images/...` |
| `.vitepress/config.mts` | site config: nav, sidebar, srcExclude, GA, SEO | — |
| `.vitepress/theme/` | brand color (`#5d67ff`) + GitHub-star button | — |
| `wrangler.jsonc` | Cloudflare Worker config (assets dir, html handling) | — |
| `scripts/migrate.js` | **one-time, throwaway** content transformer (not built) | — |
| `README.md` | this maintainer guide / repo GitHub landing page (**excluded from build**) | — |

URLs are extension-less (`cleanUrls: true`) and there is **no `base` override**, so paths match the old site exactly — `/docs/Basic-Usage`, etc. Filenames are the slugs, so renaming a file changes its URL.

## Hosting / deploy

- **Cloudflare account:** `Me@jtsternberg.com` (JT's personal account, id `09f936e9…`) — *not* the awesomemotive/Lindris work account.
- **Worker:** `cmb2-io` (Workers **Static Assets** — no server code, just serves `.vitepress/dist`).
- **Git integration:** connected to the **`CMB2/Wiki`** repo, **production branch `master`**. Build command `npm run build`, output dir `.vitepress/dist`, Node pinned via `.node-version` (20). Pushes to `master` auto-deploy.
- **DNS (in the same CF account):** apex `cmb2.io` is a **Worker Custom Domain** → `cmb2-io`. `www.cmb2.io` → **301 redirect** to the apex (a Single Redirect rule). **MX / email records are untouched** — don't disturb them.
- The legacy WP Engine mu-plugin + Flatdoc handler that used to serve cmb2.io are retired.

## This repo vs. the GitHub wiki (don't confuse them)

- **`CMB2/Wiki`** (`git@github.com:CMB2/Wiki.git`) — *this* repo. The **canonical** source for cmb2.io. A normal repo, not a wiki.
- **`CMB2/CMB2.wiki.git`** — the actual GitHub **wiki** (the `/wiki` tab). Being deprecated; pages there should point to `https://cmb2.io/docs/<slug>`. Public editing of it is the historical "anyone can inject content" risk the migration closed.

## Conventions & gotchas (read before editing)

- **Files that must NOT render** are in `srcExclude` (`config.mts`): `CLAUDE.md`, `AGENTS.md`, `README.md`, `.beads/`, `.agents/`. If you add an internal/tooling Markdown file at the repo root, add it to `srcExclude` or it becomes a public page. Also keep `.DS_Store` out of `public/`.
- **Page titles:** GitHub-wiki pages had no `# H1` (the page name was the title). Every `docs/` page now starts with an `# H1` so the browser title and on-page heading are correct. New pages should include an `# H1`.
- **In-page anchors must match VitePress slugs.** VitePress lowercases headings and turns spaces **and underscores** into hyphens (`### \`text_email\`` → `#text-email`). Old `#text_email`-style links were rewritten. If you hand-write a `[jump](#anchor)`, slugify the target the same way.
- **Sidebar / nav** are hand-authored in `config.mts` (a flat array → shows on every page). Adding a page? Add a `{ text, link }` entry there too.
- **Right-rail "On this page" depth:** controlled by `outline`. `docs/Field-Types.md` sets `outline: [2, 3]` in frontmatter so its h3 field-type sections appear. Use that pattern per-page when you want deeper outlines.
- **Heading length:** very long headings truncate (ambiguously) in the outline. Keep them short; if you must shorten an existing heading, add a hidden `<a name="<old-slug>"></a>` above it so old/external deep-links still resolve.
- **One page has literal quotes in its filename** (`Plugin-code-to-add-JS-validation-of-"required"-fields.md`). It works (served as `%22`), but it's a sharp edge — prefer not to replicate.
- **`changelog`/`contributing`** are one-time copies from `CMB2/CMB2@develop`. To refresh, re-fetch those files (and re-escape any stray prose `<tag>` like `<button>`/`<a>` that Vue would treat as unclosed elements — what `migrate.js` did).

## The migration script (`scripts/migrate.js`)

A **throwaway** tool run once during the migration — **not part of the build**. It stripped doctoc TOC blocks, rewrote `images/…` → `/images/…`, rewrote old wiki cross-page links to `/docs/…`, slugified anchors, derived `# H1` titles, and escaped stray prose tags. Kept in the repo as a record / for re-running against freshly imported wiki content. Idempotent.

## Build = the linter

There's intentionally **no custom build script**. After editing, run `npm run build`; it fails loudly on the things that matter (unclosed tags Vue can't parse, etc.). A clean build + a visual pass is the QA loop. `ignoreDeadLinks` is on, so dead *anchors* don't fail the build — check those manually if it matters.

## Issue tracking

Work is tracked in **beads** (`bd`), prefix `wiki-cmb2` (see `.beads/`). The migration epic is `wiki-cmb2-2ek`.
