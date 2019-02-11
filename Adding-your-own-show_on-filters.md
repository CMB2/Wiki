<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [How does it work?](#how-does-it-work)
- [Examples](#examples)
  - [Example: Using the `'show_on_cb'` to limit the display of a metabox unless metadata exists](#example-using-the-show_on_cb-to-limit-the-display-of-a-metabox-unless-metadata-exists)
  - [Example: Exclude on IDs](#example-exclude-on-ids)
  - [Example: Exclude on New Post Screens](#example-exclude-on-new-post-screens)
  - [Example: Exclude on non top level posts](#example-exclude-on-non-top-level-posts)
  - [Example: taxonomy show_on filter](#example-taxonomy-show_on-filter)
  - [Example: Child page show_on filter](#example-child-page-show_on-filter)
  - [Example: Page Slug show_on filter](#example-page-slug-show_on-filter)
  - [Example: Front Page show_on filter](#example-front-page-show_on-filter)
  - [Example: By Capability show_on filter](#example-by-capability-show_on-filter)
  - [Example: Page Template show_on filter](#example-page-template-show_on-filter)
  - [Example: Show metabox for certain user roles](#example-show-metabox-for-certain-user-roles)
  - [Example: Show metabox by post meta](#example-show-metabox-by-post-meta)
  - [Example: Show metabox if post is root menu element](#example-show-metabox-if-post-is-root-menu-element)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How does it work?

> **Note:** When registering a metabox, you can now specify the `'show_on_cb'` param to register a "show on" callback which you can use to conditionally display your metabox (much like [the `'show_on_cb'` for individual fields](https://github.com/CMB2/CMB2/wiki/Field-Parameters#show_on_cb)). This approach is recommended over the `'show_on'` filter, because it only applies to the metabox that you have added it. This saves you from having to do the logic to rule out other metaboxes in the filter.

A 'show_on' filter is any arbitrary filter that limits where the metabox is shown. As described in [Display Options](https://github.com/CMB2/CMB2/wiki/Display-Options), there's currently two built-in. You can limit a metabox to certain page IDs, or to certain page templates.

If you'd like to create your own show_on filter, all you have to do is hook into `cmb2_show_on`.

The filter passes three parameters:

* $display - either true or false, default is true
* $metabox - array of metabox parameters
* $cmb - The CMB object for the current metabox

Make sure you check early on to see if this filter should be running (check `$meta_box['show_on']['key']` ). Since this runs on every metabox, you'll want to return `$display` (the default) instead of true so you don't override the other show_on filters. At the end, either return true to display it or false to not display it.


## Examples

_Have you made some useful `'show_on'` or `'show_on_cb'` filters? List them as examples here so others can use them._

### Example: Using the `'show_on_cb'` to limit the display of a metabox unless metadata exists

This example is [taken from an issue](https://github.com/CMB2/CMB2/issues/531). Say you have a dropdown list of statuses, internal and external, and only want your contact metabox to show if the status is set to external and where the default is internal. You can also see this code in the [CMB2 Snippet Library](https://github.com/CMB2/CMB2-Snippet-Library/blob/master/conditional-display/show-if-matching-meta-value.php) (there's a good chance it will be more up-to-date in the snippet library).

```php
add_action( 'cmb2_admin_init', 'cmb2_register_conditional_metabox' );
/**
 * Hook in and add a demo metabox. Can only happen on the 'cmb2_admin_init' or 'cmb2_init' hook.
 */
function cmb2_register_conditional_metabox() {
	/**
	 * Metabox to save the 'status' where 'Internal' is the default.
	 */
	$cmb = new_cmb2_box( array(
		'id'           => 'wiki_status_metabox',
		'title'        => 'Status Metabox',
		'object_types' => array( 'page', ), // Post type
	) );

	$cmb->add_field( array(
		'name'    => 'Status',
		'id'      => 'wiki_status',
		'type'    => 'select',
		'default' => 'internal',
		'options' => array(
			'internal' => 'Internal',
			'external' => 'External',
		),
	) );

	/**
	 * Metabox to conditionally display if the 'status' is set to 'External'.
	 */
	$cmb = new_cmb2_box( array(
		'id'           => 'wiki_conditonal_metabox',
		'title'        => 'Contact Info',
		'object_types' => array( 'page', ), // Post type
		'show_on_cb' => 'cmb_only_show_for_external', // function should return a bool value
	) );

	$cmb->add_field( array(
		'name'       => 'Email',
		'id'         => 'wiki_email',
		'type'       => 'text_email',
	) );
}

/**
 * Only display a metabox if the page's 'status' is 'external'
 * @param  object $cmb CMB2 object
 * @return bool        True/false whether to show the metabox
 */
function cmb_only_show_for_external( $cmb ) {
	$status = get_post_meta( $cmb->object_id(), 'wiki_status', 1 );

	// Only show if status is 'external'
	return 'external' === $status;
}
```

### Example: Exclude on IDs

> **Note:** As [mentioned above](https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters#how-does-it-work), the `'show_on_cb'` is the preferred method for conditionally displaying metaboxes. This example has a simpler and more concise [example in the CMB2 Snippet Library](https://github.com/CMB2/CMB2-Snippet-Library/blob/master/conditional-display/exclude-for-ids.php).

Let's say you wanted to build a filter that allowed a metabox to show up everywhere except a specified list of page IDs. So it's basically the reverse of the Include on IDs filter. Here's what the code might look like (in your theme's functions.php file):

```php
<?php
/**
 * Exclude metabox on specific IDs
 * @author Bill Erickson
 * @link https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */
function be_metabox_exclude_for_id( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['key'], $meta_box['show_on']['value'] ) ) {
		return $display;
	}

	if ( 'exclude_id' !== $meta_box['show_on']['key'] ) {
		return $display;
	}

	$post_id = 0;

	// If we're showing it based on ID, get the current ID
	if ( isset( $_GET['post'] ) ) {
		$post_id = $_GET['post'];
	} elseif ( isset( $_POST['post_ID'] ) ) {
		$post_id = $_POST['post_ID'];
	}

	if ( ! $post_id ) {
		return $display;
	}

	// If current page id is in the included array, do not display the metabox
	$ids_to_exclude = ! is_array( $meta_box['show_on']['value'] )
		? array( $meta_box['show_on']['value'] )
		: $meta_box['show_on']['value'];

	return ! in_array( $post_id, $ids_to_exclude );
}
add_filter( 'cmb2_show_on', 'be_metabox_exclude_for_id', 10, 2 );
```

### Example: Exclude on New Post Screens

> **Note:** As [mentioned above](https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters#how-does-it-work), the `'show_on_cb'` is the preferred method for conditionally displaying metaboxes. This example has a simpler and more concise [example in the CMB2 Snippet Library](https://github.com/CMB2/CMB2-Snippet-Library/blob/master/conditional-display/hide-on-new-post-page.php).

Excluding by ID works once the post type and ID has been set, but the metaboxes still display on new post type screens. This filter removes the metaboxes from the new post type screens so that they only appear on the one instance you specify in the show_on filter (like the example above):

```php
<?php
/**
 * Removes metabox from appearing on post new screens before the post
 * ID has been set.
 *
 * @author Thomas Griffin
 *
 * @param bool $display
 * @param array $meta_box The array of metabox options
 * @return bool $display True on success, false on failure
 */
function tgm_exclude_from_new( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['alt_key'], $meta_box['show_on']['alt_value'] ) ) {
		return $display;
	}

	global $pagenow;

	// Force to be an array
	$to_exclude = ! is_array( $meta_box['show_on']['alt_value'] )
		? array( $meta_box['show_on']['alt_value'] )
		: $meta_box['show_on']['alt_value'];

	$is_new_post = 'post-new.php' == $pagenow && in_array( 'post-new.php', $to_exclude );

	return ! $is_new_post;
}
add_filter( 'cmb2_show_on', 'tgm_exclude_from_new', 10, 2 );
```

Now all you need to do is specify this in the 'show_on' option, like this:

`'show_on' => array( 'key' => 'id', 'value' => '$post_ID', 'alt_key' => 'exclude_new', 'alt_value' => 'post-new.php' )`

where `$post_ID` is the ID of the post you are targeting with the metabox.


### Example: Exclude on non top level posts

> **Note:** As [mentioned above](https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters#how-does-it-work), the `'show_on_cb'` is the preferred method for conditionally displaying metaboxes. This example has a simpler and more concise [example in the CMB2 Snippet Library](https://github.com/CMB2/CMB2-Snippet-Library/blob/master/conditional-display/show-only-for-top-level-posts.php).

This will only show the metabox if the post is a top level post, by checking if get_post_ancestors() returns a value for the current post ID

```php
<?php
/**
 * Exclude metabox on non top level posts
 * @author Travis Northcutt
 * @link https://gist.github.com/gists/2039760
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */
function ba_metabox_add_for_top_level_posts_only( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['key'] ) || 'parent-id' !== $meta_box['show_on']['key'] ) {
		return $display;
	}

	$post_id = 0;

	// If we're showing it based on ID, get the current ID
	if ( isset( $_GET['post'] ) ) {
		$post_id = $_GET['post'];
	} elseif ( isset( $_POST['post_ID'] ) ) {
		$post_id = $_POST['post_ID'];
	}

	if ( ! $post_id ) {
		return $display;
	}

	// If the post doesn't have ancestors, show the box
	if ( ! get_post_ancestors( $post_id ) ) {
		return $display;
	}

	// Otherwise, it's not a top level post, so don't show it
	return false;
}
add_filter( 'cmb2_show_on', 'ba_metabox_add_for_top_level_posts_only', 10, 2 );
```

### Example: taxonomy show_on filter

> **Note:** As [mentioned above](https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters#how-does-it-work), the `'show_on_cb'` is the preferred method for conditionally displaying metaboxes. This example has a simpler and more concise [example in the CMB2 Snippet Library](https://github.com/CMB2/CMB2-Snippet-Library/blob/master/conditional-display/show-for-taxonomy-terms.php).

This allows you to specify one or more taxonomies, and for each taxonomy one or more terms. If a post is tagged one of those terms, this metabox shows up on its Edit screen. [Here's an example of it in use](https://gist.github.com/070476e584b04a20c770).

```php
<?php
/**
 * Taxonomy show_on filter
 * @author Bill Erickson
 * @link https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters
 *
 * @param bool $display
 * @param array $metabox
 * @return bool display metabox
 */
function be_taxonomy_show_on_filter( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['key'], $meta_box['show_on']['value'] ) ) {
		return $display;
	}

	if ( 'taxonomy' !== $meta_box['show_on']['key'] ) {
		return $display;
	}

	$post_id = 0;

	// If we're showing it based on ID, get the current ID
	if ( isset( $_GET['post'] ) ) {
		$post_id = $_GET['post'];
	} elseif ( isset( $_POST['post_ID'] ) ) {
		$post_id = $_POST['post_ID'];
	}

	if ( ! $post_id ) {
		return $display;
	}

	foreach( (array) $meta_box['show_on']['value'] as $taxonomy => $slugs ) {
		if ( ! is_array( $slugs ) ) {
			$slugs = array( $slugs );
		}

		$display = false;
		$terms = wp_get_object_terms( $post_id, $taxonomy );
		foreach( $terms as $term ) {
			if ( in_array( $term->slug, $slugs ) ) {
				$display = true;
				break;
			}
		}

		if ( $display ) {
			break;
		}
	}

	return $display;
}
add_filter( 'cmb2_show_on', 'be_taxonomy_show_on_filter', 10, 2 );
```

### Example: Child page show_on filter
This allows you to specify one or more parent page ids and the metabox will only appear on the children of those pages.

```php
<?php
/**
 * Metabox for Children of Parent ID
 * @author Kenneth White (GitHub: sprclldr)
 * @link https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */
function be_metabox_show_on_child_of( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['key'], $meta_box['show_on']['value'] ) ) {
		return $display;
	}

	if ( 'child_of' !== $meta_box['show_on']['key'] ) {
		return $display;
	}

	$post_id = 0;

	// If we're showing it based on ID, get the current ID
	if ( isset( $_GET['post'] ) ) {
		$post_id = $_GET['post'];
	} elseif ( isset( $_POST['post_ID'] ) ) {
		$post_id = $_POST['post_ID'];
	}

	if ( ! $post_id ) {
		return $display;
	}

	$pageids = array();
	foreach( (array) $meta_box['show_on']['value'] as $parent_id ) {
		$pages = get_pages( array(
			'child_of'    => $parent_id,
			'post_status' => 'publish,draft,pending',
		) );

		if ( $pages ) {
			foreach( $pages as $page ){
				$pageids[] = $page->ID;
			}
		}
	}
	$pageids_unique = array_unique( $pageids );

	return in_array( $post_id, $pageids_unique );
}
add_filter( 'cmb2_show_on', 'be_metabox_show_on_child_of', 10, 2 );
```

### Example: Page Slug show_on filter
This is similar to the built-in 'id' show_on filter, but it lets you specify the page slug instead.

```php
<?php

/**
 * Metabox for Page Slug
 * @author Tom Morton
 * @link https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */
function be_metabox_show_on_slug( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['key'], $meta_box['show_on']['value'] ) ) {
		return $display;
	}

	if ( 'slug' !== $meta_box['show_on']['key'] ) {
		return $display;
	}

	$post_id = 0;

	// If we're showing it based on ID, get the current ID
	if ( isset( $_GET['post'] ) ) {
		$post_id = $_GET['post'];
	} elseif ( isset( $_POST['post_ID'] ) ) {
		$post_id = $_POST['post_ID'];
	}

	if ( ! $post_id ) {
		return $display;
	}

	$slug = get_post( $post_id )->post_name;

	// See if there's a match
	return in_array( $slug, (array) $meta_box['show_on']['value']);
}
add_filter( 'cmb2_show_on', 'be_metabox_show_on_slug', 10, 2 );


```

### Example: Front Page show_on filter
This shows only if a static page is set and you're editing it.
`'show_on' => array( 'key' => 'front-page', 'value' => ''  ),`
```php
<?php

/**
 * Include metabox on front page
 * @author Ed Townend
 * @link https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */
function ed_metabox_include_front_page( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['key'] ) ) {
		return $display;
	}

	if ( 'front-page' !== $meta_box['show_on']['key'] ) {
		return $display;
	}

	$post_id = 0;

	// If we're showing it based on ID, get the current ID
	if ( isset( $_GET['post'] ) ) {
		$post_id = $_GET['post'];
	} elseif ( isset( $_POST['post_ID'] ) ) {
		$post_id = $_POST['post_ID'];
	}

	if ( ! $post_id ) {
		return false;
	}

	// Get ID of page set as front page, 0 if there isn't one
	$front_page = get_option( 'page_on_front' );

	// there is a front page set and we're on it!
	return $post_id == $front_page;
}
add_filter( 'cmb2_show_on', 'ed_metabox_include_front_page', 10, 2 );

```

### Example: By Capability show_on filter
Metaboxes show based on user capability.
`'show_on' => array( 'key' => 'user-type', 'value' => 'publish_posts' ),`
```php
<?php
/**
 * Show metaboxes to users with specified capabilities
 * @author Missy Cook
 * @link https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */

 // Don't show metaboxes to users who can't publish posts
function show_meta_to_chosen_user_types( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['key'], $meta_box['show_on']['value'] ) ) {
		return $display;
	}

	if ( 'user-type' !== $meta_box['show_on']['key'] ) {
		return $display;
	}

	// If the current user can publish posts show metaboxes(can be adjusted by capability)
	return current_user_can( $meta_box['show_on']['value'] );
}
add_filter( 'cmb2_show_on', 'show_meta_to_chosen_user_types', 10, 2 );
```

### Example: Page Template show_on filter
This has been added natively to display options. See [Limit to specific page templates in Page Options](https://github.com/CMB2/CMB2/wiki/Display-Options#limit-to-specific-page-templates).

### Example: Show metabox for certain user roles
Will display if the current logged-in user's user-role is whitelisted. Props [@Mte90].

```php
<?php
/**
 * Display metabox for only certain user roles.
 * @author @Mte90
 * @link   https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters
 *
 * @param  bool  $display  Whether metabox should be displayed or not.
 * @param  array $meta_box Metabox config array
 * @return bool            (Modified) Whether metabox should be displayed or not.
 */
function cmb_show_meta_to_chosen_roles( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['key'], $meta_box['show_on']['value'] ) ) {
		return $display;
	}

	if ( 'role' !== $meta_box['show_on']['key'] ) {
		return $display;
	}

	$user = wp_get_current_user();

	// No user found, return
	if ( empty( $user ) ) {
		return false;
	}

	$roles = (array) $meta_box['show_on']['value'];

	foreach ( $user->roles as $role ) {
		// Does user have role.. check if array
		if ( is_array( $roles ) && in_array( $role, $roles ) ) {
			return true;
		}
	}

    return false;
}
add_filter( 'cmb2_show_on', 'cmb_show_meta_to_chosen_roles', 10, 2 );
```

### Example: Show metabox by post meta
Will show the metabox if the post meta matches the provided value.
`$meta_boxes['show_on'] = array( 'meta_key' => [enter-meta-key], 'meta_value' => [enter-meta-value], );`

```php
/**
 * Show metabox if post meta equals provided value
 * @author Tanner Moushey
 * @link https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */
function cmb_show_on_meta_value( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['meta_key'] ) ) {
		return $display;
	}

	$post_id = 0;

	// If we're showing it based on ID, get the current ID
	if ( isset( $_GET['post'] ) ) {
		$post_id = $_GET['post'];
	} elseif ( isset( $_POST['post_ID'] ) ) {
		$post_id = $_POST['post_ID'];
	}

	if ( ! $post_id ) {
		return $display;
	}

	$value = get_post_meta( $post_id, $meta_box['show_on']['meta_key'], true );

	if ( empty( $meta_box['show_on']['meta_value'] ) ) {
		return (bool) $value;
	}

	return $value == $meta_box['show_on']['meta_value'];
}
add_filter( 'cmb2_show_on', 'cmb_show_on_meta_value', 10, 2 );
```

### Example: Show metabox if post is root menu element
Will show the metabox if menu item connected with that post is root menu element in any menu.

`$meta_boxes['show_on'] = array( 'key' => 'is_root_menu_page' );`

```php
/**
 * Show the metabox if menu item connected with that post is root menu element in any menu
 * @author Jan Grzegorowski
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */
function is_root_menu_page( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['key'] ) ) {
		return $display;
	}

	if ( 'is_root_menu_page' !== $meta_box['show_on']['key'] ) {
		return $display;
	}

	$post_id = 0;

	// If we're showing it based on ID, get the current ID
	if ( isset( $_GET['post'] ) ) {
		$post_id = $_GET['post'];
	} elseif ( isset( $_POST['post_ID'] ) ) {
		$post_id = $_POST['post_ID'];
	}

	if ( ! $post_id ) {
		return $display;
	}

	$root_posts = get_menus_root_pages();
	return in_array( $post_id, $root_posts, true );
}
add_filter( 'cmb2_show_on', 'is_root_menu_page', 10, 2 );

// return array of root menu items post IDs
function get_menus_root_pages() {
	$locations = get_nav_menu_locations(); // get available menus list 
	$data = array();
	foreach ( $locations as $menu_name => $location ) {
		$menu = wp_get_nav_menu_object( $locations[ $menu_name ] );

		$data = array_merge( $data, array_map(
			'is_root_menu_item',
			wp_get_nav_menu_items( $menu->term_id )
		) );
	}

	return $data;
}

function is_root_menu_item( $menu_item ) {
	if ( empty( $menu_item->menu_item_parent ) ) {
		return $menu_item->object_id;
	}
	return false;
}
```
