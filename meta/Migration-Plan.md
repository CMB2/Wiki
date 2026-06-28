# cmb2.io → VitePress on Cloudflare Pages

**Repo (working dir):** `/Users/JT/Sites/dsgnwrks.pro/wp-content/mu-plugins/wiki-cmb2/`
**Status:** Planning
**Owner:** JT

> The VitePress build must **ignore `meta/`** (this plan lives in `meta/Migration-Plan.md`). Add `meta`
> to VitePress `srcExclude` (and to any sidebar/glob logic).

---

## Goal

Replace the current cmb2.io stack (WordPress mu-plugin on WP Engine + client-side **Flatdoc**
rendering live-fetched markdown from the `CMB2/Wiki` repo) with a **static VitePress site hosted on
Cloudflare Pages**. This:

- Moves hosting **off WP Engine entirely** (kills the free-plan overage risk — CF Pages static
  bandwidth/requests are unmetered).
- Makes a single **review-gated repo canonical** instead of an openly-editable wiki (closes the
  "anyone injects content that renders live on cmb2.io" hole).
- Preserves all existing URLs.

## Decisions (locked)

| Decision | Choice |
|---|---|
| Host | **Cloudflare Pages** (free; unmetered static bandwidth/requests; already on CF for DNS) |
| Generator | **VitePress** |
| Canonical source | **This repo** (`wiki-cmb2`). The GitHub wiki + `CMB2/Wiki` mirror become signposts. |
| Build-time custom script | **None.** Fix files once via a throwaway migration script; sidebar hand-written or via `vitepress-sidebar`. |
| URL structure | Root = readme/index, `/changelog`, `/contributing`; wiki pages under `/docs/*`. **No `base` override.** Matches today's URLs → zero redirects. |
| Brand color | `--vp-c-brand-1: #5d67ff` (sampled from the CMB2 .org banner) |
| Gitter | **Dropped** |
| Testing | Subdomain (`beta.cmb2.io` / `*.pages.dev`) before cutover |

## Why no `build-docs.js`

The lindris `build-docs.js` exists because that site generates API docs from Scribe/YAML on every
build. cmb2.io has **static prose** — once the files are VitePress-clean, `vitepress build` needs no
help. So:

- **One-time migration script** (`scripts/migrate.js`, throwaway) transforms the 22 wiki files in
  place, then is deleted/archived. Not part of the build.
- **Sidebar:** hand-authored in `.vitepress/config.*` (~22 entries) OR `vitepress-sidebar` plugin.
- **changelog/contributing:** one-time `curl` of the markdown from `CMB2/CMB2` (fix the stale
  `WebDevStudios/CMB2` path), committed into the repo. Optional 5-line CI step to refresh on a
  schedule — not a build dependency.

---

## Current system (for reference / decommission)

Lives in the **wpengine** install at `wp-content/mu-plugins/`:

- `cmb2.io.php` — host gate: if `HTTP_HOST == cmb2.io` (or `?cmb2io=1`), load the handler.
- `cmb2.io/request-handler.php` — `CMB2_IO_Handler`:
  - Fetches file list from `api.github.com/repos/CMB2/Wiki/contents/` (cached 1 day).
  - Maps `/docs/<slug>` → `<Name>.md`; raw fetched from `raw.githubusercontent.com/CMB2/Wiki/master/`.
  - Top-level `/`, `/changelog`, `/contributing` pull from **`WebDevStudios/CMB2`** (stale org name).
- `cmb2.io/template.html` — loads Flatdoc (v0.9.0 via rawgit), GA, Gitter sidecar, GitHub buttons;
  Flatdoc fetches + renders the markdown client-side.

These get **retired** after DNS cutover.

---

## Content audit (partial — 4 of ~22 pages sampled)

Sampled `Basic-Usage`, `Field-Types` (1207 lines), `REST-API`, `Bringing-Metaboxes-to-the-Front-end`.

**Encouraging — the two VitePress build-breakers are absent:**
- `{{ }}` Vue interpolation: **0 matches.**
- Unknown code-fence languages (Shiki throws): only `php`, `js`, bare ` ``` ` — **all valid.**

**Actual cleanup punch list:**
1. **Strip doctoc TOC blocks** (`<!-- START doctoc -->` … `<!-- END doctoc -->`) and their
   `](#anchor)` links. VitePress auto-builds the outline → delete these. *(scriptable)*
2. **Relocate `images/`** — pages reference `images/screenshot_*.jpg` relatively. Pull the wiki
   repo's `images/` into VitePress `public/` (or `docs/images/`) and fix paths. *(scriptable)*
3. **Anchor links** (`](#...)`) — VitePress slugifies differently than doctoc. Regenerate from the
   outline; worst case a dead anchor, never a broken build.
4. **Raw HTML spot-check** — `<div>`/`<?php` are inside code fences (safe); loose `<br>` are void
   tags VitePress tolerates. Low risk; confirm in the visual pass.
5. **Empty page:** `Bringing-Metaboxes-to-the-Front-end.md` is 0 lines — content lost/moved.
   **Human decision needed.**

> **TODO before estimate:** run the audit grep across **all** pages, not just the 4 sampled.

**Workflow:** transform once → let `vitepress build` act as the linter (fails loudly, points at each
remaining issue) → one visual pass.

---

## Work plan

### Phase 0 — Full audit
- [ ] Run the hostile-pattern grep across all ~22 pages (`{{`, unknown fences, raw `<tags>`, wiki
      links, image refs). Lock the real difficulty estimate.
- [ ] Decide fate of the empty `Bringing-Metaboxes-to-the-Front-end` page.

### Phase 1 — Scaffold VitePress
- [ ] `npm create vitepress` in repo root (or `vitepress/` subdir). Keep `meta/` excluded.
- [ ] Source layout:
  - `index.md` ← CMB2 readme
  - `changelog.md`, `contributing.md` ← fetched from `CMB2/CMB2`
  - `docs/*.md` ← the wiki pages (→ `cmb2.io/docs/<slug>`)
  - `public/` ← images
- [ ] `.vitepress/config.*`: title, nav, sidebar, `srcExclude: ['meta/**']`, `cleanUrls: true`,
      GA4 head tag.
- [ ] `.vitepress/theme/custom.css`: `--vp-c-brand-1: #5d67ff` (+ darker hover), GitHub-stars
      component, no Gitter.

### Phase 2 — Content migration
- [ ] `scripts/migrate.js` (throwaway): strip doctoc, fix image paths, rewrite cross-page links,
      normalize anchors.
- [ ] Run it; iterate `vitepress build` until clean.
- [ ] Visual pass on every page (esp. Field-Types, tables, screenshots).

### Phase 3 — Deploy + subdomain test
- [ ] Create CF Pages project pointing at this repo; framework preset = VitePress.
- [ ] Verify on `<project>.pages.dev`.
- [ ] CNAME `beta.cmb2.io` (or `docs-next.cmb2.io`) → Pages project; QA there.

### Phase 4 — Cutover
- [ ] Point `cmb2.io` apex/`www` at the Pages project (CF DNS).
- [ ] Verify URL parity: `/`, `/changelog`, `/contributing`, `/docs/*` all resolve as before.
- [ ] **Retire the mu-plugin** in wpengine: remove `cmb2.io.php` + `cmb2.io/`, drop the cmb2.io
      domain mapping on the multisite.

### Phase 5 — Lock down old surfaces
- [ ] Repurpose/point `CMB2/Wiki` repo (now this VitePress repo is canonical).
- [ ] **Disable public editing** on the `CMB2/CMB2` **wiki tab** (Settings → restrict to collaborators)
      — that's where the open-edit risk actually lives.
- [ ] Replace old wiki page bodies with "📖 Docs have moved to https://cmb2.io/docs/…" pointers.

---

## Open questions
- Empty `Bringing-Metaboxes-to-the-Front-end` page — restore from history, or drop?
- Sidebar: hand-authored vs `vitepress-sidebar` plugin?
- changelog/contributing: one-time commit vs scheduled CI refresh?
- Subdomain name for staging: `beta.cmb2.io`? `docs-next.cmb2.io`?
