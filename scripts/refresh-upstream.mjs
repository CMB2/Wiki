#!/usr/bin/env node
/**
 * Refresh changelog.md + contributing.md from CMB2/CMB2@develop.
 *
 * Run manually (locally `node scripts/refresh-upstream.mjs`, or via the
 * "Refresh upstream docs" GitHub Action) as part of the CMB2 release process —
 * these files are otherwise static snapshots and drift as CMB2 ships releases.
 *
 * Re-applies the transforms the migration used so the fetched Markdown builds
 * cleanly under VitePress:
 *   - escape bare prose tags (`<a>`, `<button>`) Vue would treat as unclosed
 *   - rewrite CMB2/CMB2 wiki cross-links to on-site /docs/<slug> paths
 * Idempotent. Exits non-zero if a fetch fails (so CI doesn't commit garbage).
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = join(ROOT, 'docs')
const BRANCH = 'develop'
const SOURCES = [
  { url: `https://raw.githubusercontent.com/CMB2/CMB2/${BRANCH}/README.md`, out: 'index.md' },
  { url: `https://raw.githubusercontent.com/CMB2/CMB2/${BRANCH}/CHANGELOG.md`, out: 'changelog.md' },
  { url: `https://raw.githubusercontent.com/CMB2/CMB2/${BRANCH}/CONTRIBUTING.md`, out: 'contributing.md' },
]

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
])

function slugify(str) {
  return str
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

const DOC_SLUGS = Object.fromEntries(
  readdirSync(DOCS)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .map((s) => [s.toLowerCase(), s])
)

function fixCrossPageLinks(src) {
  return src.replace(
    /\]\((?:https:\/\/github\.com\/CMB2\/CMB2\/wiki|\/CMB2\/CMB2\/wiki)\/([^)#\s]+)(#[^)\s]+)?\)/g,
    (m, page, hash) => {
      const actual = DOC_SLUGS[decodeURIComponent(page).toLowerCase()]
      if (!actual) return m
      return `](/docs/${actual}${hash ? `#${slugify(hash.slice(1))}` : ''})`
    }
  )
}

function escapeStrayTags(src) {
  const re = /<([a-zA-Z][a-zA-Z0-9]*)\s*>/g
  let inFence = false
  return src
    .split('\n')
    .map((line) => {
      const t = line.trimStart()
      if (t.startsWith('```') || t.startsWith('~~~')) {
        inFence = !inFence
        return line
      }
      if (inFence) return line
      return line.replace(re, (m, name, offset, full) => {
        if (VOID_TAGS.has(name.toLowerCase())) return m
        if ((full.slice(0, offset).match(/`/g) || []).length % 2 === 1) return m
        return '`' + m + '`'
      })
    })
    .join('\n')
}

let changed = 0
for (const { url, out } of SOURCES) {
  const res = await fetch(url)
  if (!res.ok) {
    console.error(`FAIL ${url}: ${res.status}`)
    process.exit(1)
  }
  const transformed = fixCrossPageLinks(escapeStrayTags(await res.text()))
  const path = join(ROOT, out)
  let before = ''
  try { before = readFileSync(path, 'utf8') } catch {}
  if (transformed !== before) {
    writeFileSync(path, transformed)
    console.log(`updated   ${out}`)
    changed++
  } else {
    console.log(`unchanged ${out}`)
  }
}
console.log(`\nDone. ${changed} file(s) changed.`)
