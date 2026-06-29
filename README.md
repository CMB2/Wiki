# CMB2 Documentation

This repo is the source for **[cmb2.io](https://cmb2.io)** — the official documentation for **[CMB2](https://github.com/CMB2/CMB2)**, the WordPress developer's toolkit for metaboxes, custom fields, and forms. The site is built with [VitePress](https://vitepress.dev/).

**Docs improvements are very welcome** — typo fixes, clearer wording, new examples, even whole new pages. Here's how to contribute one.

## Contribute a docs change

Every page is a Markdown file in this repo:

| File | Becomes |
|---|---|
| `docs/<Name>.md` | `https://cmb2.io/docs/<Name>` — e.g. `docs/Field-Types.md` → `/docs/Field-Types` |
| `index.md` | the home page (`/`) |
| `changelog.md` / `contributing.md` | `/changelog` / `/contributing` |

1. **Edit** the relevant file under `docs/` (or add a new one).
2. **Preview it locally:**
   ```bash
   npm install
   npm run dev      # → http://localhost:5173
   ```
3. **Make sure it builds:** `npm run build` (this doubles as the linter — it fails on anything VitePress can't parse).
4. **Open a pull request** against `master`. Once it's merged, the change deploys to cmb2.io automatically.

No local setup? You can also edit any file straight on GitHub and open a PR from there.

### A few conventions

- Start every page with a single `# H1` — it becomes the page title.
- Adding a **new** page? Also add it to the sidebar in `.vitepress/config.mts`.
- In-page jump links use VitePress slugs: lowercase, with spaces **and** underscores turned into hyphens — e.g. link to a heading `### text_email` as `[…](#text-email)`.
- Put images in `public/images/` and reference them as `/images/your-file.png`.

That covers what most contributions need.

## Notes

- This repo (`CMB2/Wiki`) is the **canonical** home for CMB2's documentation. The old GitHub wiki is deprecated and now just points here.
- **Maintainers** — deployment, DNS, Cloudflare, conventions in depth, and other operational details live in **[`meta/README.md`](meta/README.md)**.
