A 'show_on' filter is any arbitrary filter that limits where the metabox is shown. As described in [Display Options](https://github.com/WebDevStudios/CMB2/wiki/Display-Options), there's currently two built-in. You can limit a metabox to certain page IDs, or to certain page templates.

If you'd like to create your own show_on filter, all you have to do is hook into `cmb2_show_on`.

The filter passes three parameters:

* $display - either true or false, default is true
* $metabox - array of metabox parameters
* $cmb - The CMB object for the current metabox

Make sure you check early on to see if this filter should be running (check `$meta_box['show_on']['key']` ). Since this runs on every metabox, you'll want to return `$display` (the default) instead of true so you don't override the other show_on filters. At the end, either return true to display it or false to not display it.

#### Examples:
1. [Exclude on IDs](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-exclude-on-ids)
1. [Exclude on New Post Screens](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-exclude-on-new-post-screens)
1. [Exclude on non top level posts](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-exclude-on-non-top-level-posts)
1. [taxonomy show_on filter](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-taxonomy-show_on-filter)
1. [Child page show_on filter](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-child-page-show_on-filter)
1. [Page Slug show_on filter](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-page-slug-show_on-filter)
1. [Front Page show_on filter](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-front-page-show_on-filter)
1. [By Capability show_on filter](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-by-capability-show_on-filter)
1. [Page Template show_on filter](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-page-template-show_on-filter)
1. [Show metabox for certain user-roles](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-show-metabox-for-certain-user-roles)
1. [Show metabox by post_meta](/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters#wiki-example-show-metabox-by-post-meta)

_Have you made some useful show_on filters? List them as examples here so others can use them._

### Example: Exclude on IDs

Let's say you wanted to build a filter that allowed a metabox to show up everywhere except a specified list of page IDs. So it's basically the reverse of the Include on IDs filter. Here's what the code might look like (in your theme's functions.php file):

```php
<?php
/**
 * Exclude metabox on specific IDs
 * @author Bill Erickson
 * @link https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters
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

This allows you to specify one or more taxonomies, and for each taxonomy one or more terms. If a post is tagged one of those terms, this metabox shows up on its Edit screen. [Here's an example of it in use](https://gist.github.com/070476e584b04a20c770).

```php
<?php
/**
 * Taxonomy show_on filter
 * @author Bill Erickson
 * @link https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters
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
 * @link https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters
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
 * @link https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters
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
 * @link https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters
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
		return $display;
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
 * @link https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters
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
Shows up on a page using a specific template. Use the template's slug. (e.g. template-name.php would be 'template-name'). Pass empty string `''` to target only default page template.
```php
<?php
/**
 * Metabox for Page Template
 * @author Kenneth White
 * @link https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */
function be_metabox_show_on_template( $display, $meta_box ) {
	if ( ! isset( $meta_box['show_on']['key'], $meta_box['show_on']['value'] ) ) {
		return $display;
	}

	if ( 'template' !== $meta_box['show_on']['key'] ) {
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

	$template_name = get_page_template_slug( $post_id );
	$template_name = ! empty( $template_name ) ? substr( $template_name, 0, -4 ) : '';

	// See if there's a match
	return in_array( $template_name, (array) $meta_box['show_on']['value'] );
}
add_filter( 'cmb2_show_on', 'be_metabox_show_on_template', 10, 2 );
```

### Example: Show metabox for certain user roles
Will display if the current logged-in user's user-role is whitelisted. Props [@Mte90].

```php
<?php
/**
 * Display metabox for only certain user roles.
 * @author @Mte90
 * @link   https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters
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
`$meta_boxes['show_on'] = array( 'meta' => [enter-meta-key], 'meta_value' => [enter-meta-value], );`

```php
/**
 * Show metabox if post meta equals provided value
 * @author Tanner Moushey
 * @link https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters
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
