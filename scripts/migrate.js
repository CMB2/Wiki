#!/usr/bin/env node
/**
 * One-time content migration for the cmb2.io VitePress port. THROWAWAY.
 *
 * Not part of the build. Run once (`npm run migrate`), eyeball the diff,
 * commit, then this file can be deleted. Every transform is idempotent so it
 * is safe to re-run while iterating `vitepress build` as the linter.
 *
 * Transforms:
 *   1. Strip doctoc-generated TOC blocks (VitePress builds its own outline).
 *   2. Rewrite relative `images/…` refs to root-absolute `/images/…`
 *      (images now live in public/images/ and are served from the site root).
 *   3. Escape stray prose HTML-element tags that Vue would try to parse
 *      (e.g. the lone `<button>` in the fetched CHANGELOG).
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = join(ROOT, 'docs')

// Void elements never need a closing tag, so a bare one won't break the Vue
// compiler — leave those (and anything with attributes) alone.
const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
])

function stripDoctoc(src) {
  // Remove everything between the doctoc start/end markers, inclusive.
  return src.replace(
    /<!-- START doctoc[\s\S]*?<!-- END doctoc[^>]*-->\n?/g,
    ''
  )
}

function fixImagePaths(src) {
  // Markdown image/link refs and raw <img> attrs. Idempotent: only matches a
  // bare `images/` segment, never an already-absolute `/images/`.
  return src
    .replace(/\]\(images\//g, '](/images/')
    .replace(/(<img[^>]*\ssrc=["'])images\//g, '$1/images/')
}

function escapeStrayTags(src) {
  // Wrap bare, attribute-less, non-void OPENING tags in backticks so Vue
  // treats them as prose (e.g. "<a> buttons", "<button> elements"). We only
  // touch opening tags with no attributes: real HTML keeps its attributes
  // (<a href=…>) or comes as a balanced pair (<a name=…></a>), and void tags
  // (<br>) never trip "missing end tag". This avoids orphaning a legit </a>.
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
        // Don't double-wrap if already inside an inline-code span.
        const before = full.slice(0, offset)
        if ((before.match(/`/g) || []).length % 2 === 1) return m
        return '`' + m + '`'
      })
    })
    .join('\n')
}

function transform(src) {
  return escapeStrayTags(fixImagePaths(stripDoctoc(src)))
}

function processFile(path, label) {
  const before = readFileSync(path, 'utf8')
  const after = transform(before)
  if (after !== before) {
    writeFileSync(path, after)
    console.log(`  fixed  ${label}`)
    return 1
  }
  console.log(`  clean  ${label}`)
  return 0
}

let changed = 0
console.log('docs/:')
for (const f of readdirSync(DOCS).filter((f) => f.endsWith('.md')).sort()) {
  changed += processFile(join(DOCS, f), `docs/${f}`)
}
console.log('root:')
changed += processFile(join(ROOT, 'changelog.md'), 'changelog.md')

console.log(`\nDone. ${changed} file(s) changed.`)
