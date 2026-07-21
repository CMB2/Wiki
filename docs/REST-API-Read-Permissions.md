# REST API Read Permissions: Aligning with WordPress Core

CMB2 is updating how its REST API handles **read** access to **options-page**
boxes and fields, to align with WordPress core conventions. This page explains
what's changing, who is affected, and what (if anything) you need to do.

---

## For site owners (non-technical)

**What is CMB2?** CMB2 is a developer library used by many WordPress themes and
plugins to create custom fields and settings screens. You may have never
installed it directly — it often arrives bundled inside a theme or plugin you
use. If you're seeing an admin notice that linked you here, something on your
site uses CMB2.

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

Scope notes:

- **Only options-page boxes are affected.** Post, user, term, and comment box
  reads are unchanged and remain public when `show_in_rest` allows reads.
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

### Adopting the new behavior early (recommended)

```php
add_filter( 'cmb2_rest_enforce_options_page_read_permissions', '__return_true' );
```

This enables the options-page read gate now, ahead of the release that turns it
on by default.

### Keeping public reads for a specific box

If an options-page box's values are genuinely public (e.g. a headless front-end
reads display settings anonymously), you can keep reads open using CMB2's
existing permission filters, which have final say:

```php
add_filter( 'cmb2_api_get_box_permissions_check', function ( $can_access, $controller ) {
	if ( 'your_box_id' === $controller->rest_box->cmb->cmb_id ) {
		return true;
	}
	return $can_access;
}, 10, 2 );

add_filter( 'cmb2_api_get_field_permissions_check', function ( $can_access, $controller ) {
	if ( 'your_box_id' === $controller->rest_box->cmb->cmb_id ) {
		return true;
	}
	return $can_access;
}, 10, 2 );
```

The gate filter itself also receives the box object, so you can flip it per-box
instead:

```php
add_filter( 'cmb2_rest_enforce_options_page_read_permissions', function ( $enforce, $cmb ) {
	if ( 'your_box_id' === $cmb->cmb_id ) {
		return false; // Keep this box's reads public.
	}
	return $enforce;
}, 10, 2 );
```

Before opting a box out, consider whether every field on it is truly fit for
anonymous consumption — options pages often accumulate values (API keys,
license keys, email addresses) that were never meant to be world-readable.
Where only some fields are public, prefer moving those to their own box or
exposing them via a purpose-built endpoint.

### Opting out of the gate wholesale (not recommended)

```php
add_filter( 'cmb2_rest_enforce_options_page_read_permissions', '__return_false' );
```

This preserves the historical behavior for all options-page boxes on the site.
It exists as a transition aid; prefer the per-box filters above.
