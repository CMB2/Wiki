# Version Loader

> **TL;DR** — You can safely bundle CMB2 inside any number of plugins and themes. No matter how many copies are present, **only the single newest version ever loads**, automatically, with no configuration. This page explains how it works and how to bundle so the mechanism can do its job.

## The problem it solves

CMB2 is frequently **bundled** (shipped as a copy) inside plugins and themes rather than installed as a standalone plugin. On a real site you might have three plugins and a theme that each include their own copy of CMB2 — at three or four *different* versions.

Without coordination, PHP loads whichever copy is `require`d first (often an old one) and the rest fatal with `Cannot redeclare class CMB2`, or the site silently runs outdated code. CMB2 avoids this entirely.

## What CMB2 does instead

CMB2 ships a tiny **self-arbitrating loader** (`init.php`). Every bundled copy announces itself, the copies effectively compare versions, and **the newest one wins** — every time. The other copies quietly stand down. The site runs the newest CMB2 available regardless of which plugin or theme shipped it, and CMB2's strong backwards-compatibility commitment means a newer version won't break code written against an older one.

## How it works

Each release of CMB2 ships an `init.php` that:

1. **Declares a version-stamped bootstrap class** — e.g. `CMB2_Bootstrap_2120` (the version is baked into the name) — guarded by `class_exists()`, so a given version's bootstrap is only ever declared once even when bundled many times.
2. **Hooks its loader onto WordPress's `init` action at a numeric priority that *decrements with every release*** (`9956`, then `9955`, …). In WordPress a **lower priority number runs earlier**, so a **newer version runs before an older one**.
3. When the first (= newest) bootstrap fires, it checks `if ( class_exists( 'CMB2' ) ) { return; }`. Nothing has loaded CMB2 yet, so **it loads it** — defining `CMB2_VERSION` and `CMB2_DIR` and kicking off the class autoloader.
4. Every older bootstrap fires *later*, sees that `CMB2` already exists, and **bails**.

Net result: among any number of bundled copies, exactly one — the newest — loads. No registry, no central config, no action required from the site owner.

There's also a `CMB2_LOADED` constant, defined as soon as the first copy is included, so a dependent plugin or theme can detect early in the request that CMB2 is present.

> **Background:** this pattern (a "WP lib loader") and the reasoning behind it are described in Justin Sternberg's post, [*Don't repeat yourself — use a WP lib loader instead*](https://dsgnwrks.pro/plugins-and-scripts/dont-repeat-yourself-use-wp-lib-loader-instead/).

## Bundle it correctly (so the loader can win)

The mechanism only works if CMB2 is included properly:

- **Require `init.php` outside of any hook**, as early as possible — e.g. near the top of your main plugin file or the theme `functions.php`:
  ```php
  require_once __DIR__ . '/cmb2/init.php';
  ```
  If you load it inside a late hook, your copy may register too late to participate in the version comparison.
- **Use the release package, not a clone.** Download the zip from the [WordPress plugin repo](https://wordpress.org/plugins/cmb2/) (or a GitHub release) so you don't ship CMB2's development-only files.
- **Never edit CMB2's core.** Editing it breaks both the version arbitration and your ability to update.

Full dos and don'ts: [Basic Usage → Caveats for bundling and including CMB2](/docs/Basic-Usage#caveats-for-bundling-and-including-cmb2).

## Verifying which version loaded

When several plugins bundle CMB2, you can confirm the expected version is the one actually running by checking `CMB2_VERSION` / `CMB2_LOADED` at runtime. See [Tips & Tricks → Adding a CMB2 debug helper](/docs/Tips-&-Tricks#adding-a-cmb2-debug-helper-to-your-plugin-theme).

## When an old bundled copy causes trouble

If some plugin or theme bundles an *ancient* CMB2 — one that, say, fatals on a newer PHP — the fix is to make a correctly-bundled newer copy available (the loader will prefer it) or ask that author to update their bundled version. See [Troubleshooting → Workarounds for PHP 7.2 errors](/docs/Troubleshooting#workarounds-for-php-7-2-errors).
