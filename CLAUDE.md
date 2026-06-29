# Project Instructions for AI Agents

This file provides instructions and context for AI coding agents working on this project.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:6cd5cc61 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Agent Context Profiles

The managed Beads block is task-tracking guidance, not permission to override repository, user, or orchestrator instructions.

- **Conservative (default)**: Use `bd` for task tracking. Do not run git commits, git pushes, or Dolt remote sync unless explicitly asked. At handoff, report changed files, validation, and suggested next commands.
- **Minimal**: Keep tool instruction files as pointers to `bd prime`; use the same conservative git policy unless active instructions say otherwise.
- **Team-maintainer**: Only when the repository explicitly opts in, agents may close beads, run quality gates, commit, and push as part of session close. A current "do not commit" or "do not push" instruction still wins.

## Session Completion

This protocol applies when ending a Beads implementation workflow. It is subordinate to explicit user, repository, and orchestrator instructions.

1. **File issues for remaining work** - Create beads for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **Handle git/sync by active profile**:
   ```bash
   # Conservative/minimal/default: report status and proposed commands; wait for approval.
   git status

   # Team-maintainer opt-in only, unless current instructions forbid it:
   git pull --rebase
   git push
   git status
   ```
5. **Hand off** - Summarize changes, validation, issue status, and any blocked sync/commit/push step

**Critical rules:**
- Explicit user or orchestrator instructions override this Beads block.
- Do not commit or push without clear authority from the active profile or the current user request.
- If a required sync or push is blocked, stop and report the exact command and error.
<!-- END BEADS INTEGRATION -->


## Architecture Overview

This repo (`CMB2/Wiki`) is the **canonical source for https://cmb2.io** — a static
[VitePress](https://vitepress.dev/) site deployed on **Cloudflare Workers (static assets)**.
It replaced the old WP Engine mu-plugin + client-side Flatdoc setup.

- Content: `index.md` (CMB2 readme), `changelog.md`, `contributing.md`, and `docs/*.md` (one
  file per wiki page → `/docs/<Filename>`). Images in `public/`. URLs are extension-less
  (`cleanUrls`), no `base` override — paths match the historical site.
- Deploy: Cloudflare Worker `cmb2-io`, Git-connected to this repo, **production branch `master`**.
  Push to `master` → auto-build (`npm run build`) and deploy. Apex `cmb2.io` is a Worker Custom
  Domain; `www` 301-redirects to apex. CF account: `Me@jtsternberg.com` (personal, not work).
- **Full maintainer guide + conventions + gotchas: [`meta/README.md`](meta/README.md).** Read it
  before non-trivial changes.

## Build & Test

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build to .vitepress/dist (this is also the "linter")
```

There is no test suite; a clean `npm run build` + a visual pass is the QA loop.

## Conventions & Patterns

- **Never let internal files render.** `meta/`, `CLAUDE.md`, `AGENTS.md`, `README.md`,
  `.beads/`, `.agents/` are in `srcExclude` (`.vitepress/config.mts`). Any new tooling/agent
  Markdown at the repo root must be added there, or it becomes a public page. Keep `.DS_Store`
  out of `public/`.
- **In-page anchors must match VitePress slugs** (lowercase; spaces *and* underscores → hyphens,
  e.g. `#text-email`). Slugify hand-written `[jump](#anchor)` targets the same way.
- **Nav/sidebar are hand-authored** in `.vitepress/config.mts` — add new pages there too.
- **Every `docs/` page needs an `# H1`** (controls title + heading). Keep headings short so the
  "On this page" outline doesn't truncate ambiguously; if you rename a heading, add a hidden
  `<a name="<old-slug>"></a>` above it to preserve old deep-links.
- **Don't touch DNS MX/email records** if working on the Cloudflare side.
- `scripts/migrate.js` is a one-time, throwaway transformer — **not** part of the build.
- The editable GitHub wiki (`CMB2/CMB2.wiki.git`) is a separate, deprecated surface — distinct
  from this repo. See `meta/README.md`.
