import { defineConfig } from 'vitepress'

const GA_ID = 'G-Z9Q6VV4TVC'
const DESCRIPTION =
  "CMB2 is a developer's toolkit for building metaboxes, custom fields, and forms for WordPress that will blow your mind. Easily manage meta for posts, terms, users, comments, or create custom option pages."

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'CMB2',
  description: DESCRIPTION,
  lang: 'en-US',

  // Only index/changelog/contributing + docs/* are real content. Keep
  // everything else out of the build: the maintainer guide (meta/), agent/
  // tooling docs (CLAUDE.md, AGENTS.md, README.md), and beads/agents dirs.
  // Dot-dirs are already ignored by VitePress, but list them defensively.
  srcExclude: [
    'meta/**',
    'CLAUDE.md',
    'AGENTS.md',
    'README.md',
    '.beads/**',
    '.agents/**',
    '**/node_modules/**',
  ],

  // Preserve today's extension-less URLs (/changelog, /docs/Basic-Usage, ...).
  cleanUrls: true,

  // Don't fail the build on a stale in-page anchor; flag it instead.
  ignoreDeadLinks: true,

  head: [
    // Google Analytics (GA4) — same property as the legacy Flatdoc site.
    ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${GA_ID}');`,
    ],
    // Carry over Search Console verification from the legacy template.
    ['meta', { name: 'google-site-verification', content: '0naf8_AOrYxoUsL4oA3zAUmvk0ELJmzWDUPOawtd7a0' }],
    ['meta', { property: 'og:title', content: 'CMB2' }],
    ['meta', { property: 'og:description', content: DESCRIPTION }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://cmb2.io/' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/docs/Home', activeMatch: '/docs/' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Contributing', link: '/contributing' },
    ],

    // Flat array → the sidebar shows on every page (home, changelog,
    // contributing, and all /docs/*), matching the legacy site's menu.
    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Home', link: '/docs/Home' },
          { text: 'Installation', link: '/docs/Installation' },
          { text: 'Version Loader', link: '/docs/Version-Loader' },
          { text: 'Basic Usage', link: '/docs/Basic-Usage' },
          { text: 'Advanced Usage', link: '/docs/Advanced-Usage' },
          { text: 'Field Types', link: '/docs/Field-Types' },
          { text: 'Examples', link: '/docs/Examples' },
          { text: 'Field Parameters', link: '/docs/Field-Parameters' },
          { text: 'Display Options', link: '/docs/Display-Options' },
          { text: 'Box Properties', link: '/docs/Box-Properties' },
          { text: 'Troubleshooting', link: '/docs/Troubleshooting' },
          { text: 'Notable Changes in CMB2', link: '/docs/Notable-Changes-in-CMB2' },
          { text: 'Tips & Tricks', link: '/docs/Tips-&-Tricks' },
          { text: 'REST API', link: '/docs/REST-API' },
          { text: 'Javascript API', link: '/docs/Javascript-API' },
        ],
      },
      {
        text: 'Advanced tutorials',
        items: [
          { text: 'Adding your own field types', link: '/docs/Adding-your-own-field-types' },
          { text: 'Adding your own show_on filters', link: '/docs/Adding-your-own-show_on-filters' },
          { text: 'Displaying boxes on the front-end', link: '/docs/Bringing-Metaboxes-to-the-Front-End' },
          { text: 'Admin Theme Options Page', link: '/docs/Using-CMB-to-create-an-Admin-Theme-Options-Page' },
        ],
      },
      {
        text: 'Related snippets',
        items: [
          { text: 'JS validation for custom post type fields', link: '/docs/JavaScript-validation-for-cmb2-custom-post-type-fields' },
          { text: 'Plugin code to add JS validation of required fields', link: '/docs/Plugin-code-to-add-JS-validation-of-"required"-fields' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/CMB2/CMB2' }],

    editLink: {
      pattern: 'https://github.com/CMB2/Wiki/edit/master/:path',
      text: 'Edit this page on GitHub',
    },

    search: { provider: 'local' },

    footer: {
      message: 'Documentation for the CMB2 WordPress developer toolkit.',
      copyright: 'CMB2 is released under the GPLv2+ license.',
    },
  },
})
