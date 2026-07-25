# REST API Read Permissions: Aligning with WordPress Core

CMB2 is updating how its REST API handles **read** access to **options-page**
boxes and fields, to align with WordPress core conventions. This page explains
what's changing, who is affected, and what (if anything) you need to do.

---

## For site owners (non-technical)

**What is CMB2?** CMB2 is a developer library used by many WordPress themes and
plugins to create custom fields and settings screens. You may have never
installed it directly — it often arrives bundled inside a theme or plugin you
use.

**Why am I seeing this notice?** The notice that linked you here only appears
when *all* of the following are true:

- You're logged into the WordPress admin with an administrator-level account —
  one that can manage the site's settings.
- Your site has at least one settings page built with CMB2 whose data is marked
  as readable through the WordPress REST API.
- That settings page still uses the original read behavior — the developer who
  set it up hasn't switched on the new alignment with WordPress core conventions
  yet.
- Nobody has dismissed the notice yet. Dismissing it hides it permanently, for
  every administrator on the site.

If even one of those isn't true, the notice won't show up. It also goes away on
its own once a developer enables the new behavior — you don't have to dismiss
it.

**What's changing?** WordPress core follows a simple convention: content data
(like post fields) can be readable through the REST API, but **site settings**
are only readable by administrators. Historically, CMB2 allowed settings
(options-page) values that developers marked as "available in the REST API" to
be read by anyone. An upcoming CMB2 release aligns with core: reading
options-page values through the REST API will require the same permission a
user needs to view that settings screen in the admin (typically administrator).

**What do I need to do?** For almost all sites: nothing. Settings screens will
keep working exactly as before; only direct REST API reads of options-page data
are affected. If your site has a custom front-end that reads settings through
the REST API, share this page with your developer — the section below shows how
to keep that working.

**When?** The current CMB2 release only shows a notice; a future release makes
the new behavior the default. Updating CMB2 (or the theme/plugin bundling it)
keeps you current.

---

## For developers

### What's changing, precisely

CMB2's REST read permission callbacks have historically defaulted to allowing
reads for any box registered with `show_in_rest`, for every object type. Going
forward, boxes whose `object_types` include `options-page` will have REST
**reads** gated by the box's configured `capability` (defaulting to
`manage_options`) — matching WordPress core, where
`WP_REST_Settings_Controller::get_item_permissions_check()` requires
`manage_options` while object *meta* reads remain public
(`WP_REST_Meta_Fields::get_value()` performs no capability check).

Alongside the staged default change, boxes can now declare their own read
requirement with the **`rest_read_capability`** registration property. That
property is the primary per-box interface — it takes precedence over the staged
default, and it's the recommended way to state intent (see
[below](#the-rest-read-capability-box-property)).

Scope notes:

- **Only options-page boxes are affected by the default change.** Post, user,
  term, and comment box reads are unchanged and remain public when
  `show_in_rest` allows reads. `rest_read_capability` works on any box with a
  readable `show_in_rest`, so you can opt those in deliberately.
- **Writes and deletes are unchanged** — they were already permission-gated.
- The change ships in two stages: first as opt-in (default off, with an admin
  notice identifying affected registrations), then default-on in a subsequent
  release.

### Why now — a bit of history

CMB2's REST API support shipped in v2.2.3 on **2016-10-25** — about six weeks
*before* WordPress 4.7 (2016-12-06) introduced the core settings REST endpoint
and its `manage_options` read gate. At the time CMB2's endpoints were designed,
public reads were the period-correct convention for REST-exposed data. Core
subsequently established a different convention for settings specifically, and
this change brings CMB2 in line with it.

### The `rest_read_capability` box property

Set `rest_read_capability` in the box registration array to declare, per box,
what reading its REST data requires. No filters involved:

```php
$cmb = new_cmb2_box( array(
	'id'           => 'my_settings',
	'title'        => 'My Settings',
	'object_types' => array( 'options-page' ),
	'option_key'   => 'my_settings',
	'capability'   => 'manage_options',
	'show_in_rest' => WP_REST_Server::READABLE,

	'rest_read_capability' => true, // Gate reads by this box's `capability`.
) );
```

Accepted values:

| Value | Effect |
| --- | --- |
| *unset* (default) | Historical behavior today. Options-page reads become capability-gated when the default flips in a future release. |
| `false` | Reads stay public, explicitly — and this declaration **survives** the future default change, so the box is never re-gated. |
| `true` | Gate reads by the box's own `capability` property (defaults to `manage_options`), starting immediately. |
| a capability string, e.g. `'edit_posts'` | Gate reads by that capability, starting immediately. |

Two things worth knowing:

- It applies to **any** box with a readable `show_in_rest`, not just
  options-pages — post, user, term, and comment boxes can be gated this way too.
- The `cmb2_api_get_box_permissions_check` and
  `cmb2_api_get_field_permissions_check` filters still run last and have final
  say, so a runtime filter can override whatever a registration declares.

### Adopting the new behavior early (recommended)

**Per box** — declare it on the registration. This is the better choice whenever
you own the registration code:

```php
// In the box registration array — either of:
'rest_read_capability' => true,             // Gate by the box's own `capability`.
'rest_read_capability' => 'manage_options', // Or name the capability outright.
```

**Site-wide** — flip the gate for every options-page box at once:

```php
add_filter( 'cmb2_rest_enforce_options_page_read_permissions', '__return_true' );
```

Either enables the options-page read gate now, ahead of the release that turns
it on by default. Reach for the site-wide filter when the boxes are registered
somewhere you don't control (a theme or plugin), where editing the registration
array isn't an option.

### Keeping public reads for a specific box

If a box's values are genuinely public (e.g. a headless front-end reads display
settings anonymously), say so on the registration — one line, and it holds
before *and* after the default flips:

```php
$cmb = new_cmb2_box( array(
	'id'           => 'public_display_settings',
	'title'        => 'Display Settings',
	'object_types' => array( 'options-page' ),
	'option_key'   => 'public_display_settings',
	'show_in_rest' => WP_REST_Server::READABLE,

	'rest_read_capability' => false, // Reads stay public.
) );
```

Before opting a box out, consider whether every field on it is truly fit for
anonymous consumption — options pages often accumulate values (API keys,
license keys, email addresses) that were never meant to be world-readable.
Where only some fields are public, prefer moving those to their own box or
exposing them via a purpose-built endpoint.

#### If you cannot edit the box registration

For boxes registered by a theme or plugin you don't control, the permission
filters do the same job at runtime, and they have final say:

```php
$keep_public = function ( $can_access, $controller ) {
	return 'your_box_id' === $controller->rest_box->cmb->cmb_id ? true : $can_access;
};

add_filter( 'cmb2_api_get_box_permissions_check', $keep_public, 10, 2 );
add_filter( 'cmb2_api_get_field_permissions_check', $keep_public, 10, 2 );
```

The site-wide gate filter also receives the box object, so you can exempt a
single options-page box there instead:

```php
add_filter( 'cmb2_rest_enforce_options_page_read_permissions', function ( $enforce, $cmb ) {
	return 'your_box_id' === $cmb->cmb_id ? false : $enforce;
}, 10, 2 );
```

### Opting out of the gate wholesale (not recommended)

```php
add_filter( 'cmb2_rest_enforce_options_page_read_permissions', '__return_false' );
```

This preserves the historical behavior for every options-page box on the site
whose registration doesn't say otherwise — **a per-box `rest_read_capability`
declaration always wins over this filter**, so a box registered with
`'rest_read_capability' => true` stays gated regardless. It exists as a
transition aid; prefer declaring `rest_read_capability` per box.
