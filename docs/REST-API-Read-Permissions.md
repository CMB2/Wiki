# REST API Read Permissions: Aligning with WordPress Core

CMB2 is changing how its REST API handles **read** access to **options-page**
boxes and fields, to match WordPress core conventions.

---

## For site owners (non-technical)

**What is CMB2?** A developer library many themes and plugins use to build
custom fields and settings screens. It usually arrives bundled inside something
else you installed.

**Why am I seeing this notice?** Only when *all* of these are true:

- You're logged into the admin as an administrator — an account that can manage
  the site's settings.
- The site has at least one CMB2 settings page whose data is marked readable
  through the WordPress REST API.
- That settings page still uses the original read behavior; its developer hasn't
  switched on the new one yet.
- Nobody has dismissed the notice — dismissing hides it permanently, for every
  administrator on the site.

It also disappears on its own once a developer enables the new behavior.

**What's changing, and what should I do?** Core lets content like post fields be
read publicly but restricts **site settings** to administrators. CMB2 has allowed
anyone to read options-page values exposed to the REST API; a future release will
require the permission needed to view that settings screen. For almost all sites
nothing changes — settings screens keep working, and only direct REST API reads
are affected. If a custom front-end reads your settings, send this page to your
developer.

---

## For developers

### What's changing, precisely

CMB2's REST read callbacks have always allowed reads for any box registered with
`show_in_rest`. Going forward, boxes whose `object_types` include `options-page`
will have **reads** gated by the box's `capability` (default `manage_options`) —
matching core, where
`WP_REST_Settings_Controller::get_item_permissions_check()` requires
`manage_options` while object *meta* reads stay public. Writes and deletes are
unchanged. The change ships opt-in first, with an admin notice naming affected
registrations, then default-on. A box — or a single field on it — can override
all of it with the **`rest_read_capability`** property below.

### Why now — a bit of history

CMB2's REST support shipped in v2.2.3 (2016-10-25), six weeks *before*
WordPress 4.7 introduced the core settings endpoint and its `manage_options` read
gate. Public reads were the period-correct convention then; core later settled on
a different one for settings.

### The `rest_read_capability` property

Set it in the box registration array — no filters involved. It works on any box
with a readable `show_in_rest`, not just options-pages.

```php
$cmb = new_cmb2_box( array(
	'id'           => 'my_settings',
	'title'        => 'My Settings',
	'object_types' => array( 'options-page' ),
	'option_key'   => 'my_settings',
	'capability'   => 'manage_options',
	'show_in_rest' => WP_REST_Server::READABLE,

	'rest_read_capability' => 'box-capability', // Gate reads by this box's `capability`.
) );
```

| Value | Who may read |
| --- | --- |
| `false` | Nobody, administrators included (maps to core's `do_not_allow`). |
| `true` | Everyone, logged in or not — an alias for core's `exist`, which WordPress grants every visitor. |
| `'box-capability'` | Holders of the box's own `capability` (falling back to `manage_options`). A reserved sentinel, not a real capability — use it instead of repeating a value that can drift. |
| any other non-empty string, e.g. `'edit_posts'` | Holders of that capability. |
| *unset* (default) | CMB2's default policy — see [Which setting do I want?](#which-setting-do-i-want). |

#### Per-field declarations

The same property is also a [field parameter](/docs/Field-Parameters), taking the
same values. It cascades like `show_in_rest`: the field's value wins, then the
box's, then the default policy.

```php
$cmb->add_field( array(
	'name' => 'License Key',
	'id'   => 'license_key',
	'type' => 'text',

	// Only this field is gated; the rest of the box keeps the box's setting.
	'rest_read_capability' => 'box-capability',
) );
```

Gated fields are **omitted from the `/boxes/{id}/fields` listing**, which still
returns `200` even when the collection empties out; requesting one directly
returns `rest_forbidden`. That mirrors core, where collections omit what
you may not see and single resources deny.

### Which setting do I want?

**"Only privileged users should read this."** → `'box-capability'`, or a
capability such as `'edit_posts'`.

**"Reads should keep working publicly, permanently."** → `true`. The future
default change leaves the box alone.

**"REST reads should be off entirely."** → `false`.

**"I'll follow CMB2's default."** → leave it unset:

- **Today:** these reads are public.
- **In a future release:** options-page boxes left unset will require the box's
  capability, so any anonymous integration reading those settings **will stop
  working at that update**.
- **Non-options-page boxes** (post, user, term, comment) left unset stay public,
  with no change planned.

### Adopting the new behavior early (recommended)

Declare `rest_read_capability` per box when you own the registration. When the
boxes come from a theme or plugin you don't, flip the gate site-wide:

```php
add_filter( 'cmb2_rest_enforce_options_page_read_permissions', '__return_true' );
```

### Keeping public reads for a specific box

If a box's values are genuinely public — a headless front-end reading display
settings, say — declare it, and it holds before *and* after the default flips:

```php
'rest_read_capability' => true, // Everyone; reads stay public.
```

First check that *every* field on it is fit for anonymous reading — options pages
accumulate API keys, license keys, and email addresses. Where only some are, keep
the box public and gate the exceptions with a
[per-field declaration](#per-field-declarations).

#### If you cannot edit the box registration

The permission filters do the same job at runtime, and they run last with final
say:

```php
$keep_public = function ( $can_access, $controller ) {
	return 'your_box_id' === $controller->rest_box->cmb->cmb_id ? true : $can_access;
};

add_filter( 'cmb2_api_get_box_permissions_check', $keep_public, 10, 2 );
add_filter( 'cmb2_api_get_field_permissions_check', $keep_public, 10, 2 );
```

### Opting out of the gate wholesale (not recommended)

```php
add_filter( 'cmb2_rest_enforce_options_page_read_permissions', '__return_false' );
```

Preserves the historical behavior for every options-page box whose registration
doesn't say otherwise — **a `rest_read_capability` declaration always wins over
this filter**. A transition aid; prefer the property.
