<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [`id`](#id)
- [`title`](#title)
- [`object_types`](#object_types)
- [`context`](#context)
- [`priority`](#priority)
- [`show_names`](#show_names)
- [`classes`](#classes)
- [`classes_cb`](#classes_cb)
- [`show_on_cb`](#show_on_cb)
- [`show_on`](#show_on)
- [`cmb_styles`](#cmb_styles)
- [`enqueue_js`](#enqueue_js)
- [`fields`](#fields)
- [`hookup`](#hookup)
- [`save_fields`](#save_fields)
- [`closed`](#closed)
- [`taxonomies`](#taxonomies)
- [`new_user_section`](#new_user_section)
- [`new_term_section`](#new_term_section)
- [`show_in_rest`](#show_in_rest)
- [`remove_box_wrap`](#remove_box_wrap)
- [`menu_title`](#menu_title)
- [`message_cb`](#message_cb)
- [`parent_slug`](#parent_slug)
- [`capability`](#capability)
- [`icon_url`](#icon_url)
- [`position`](#position)
- [`admin_menu_hook`](#admin_menu_hook)
- [`display_cb`](#display_cb)
- [`save_button`](#save_button)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

When registering a [CMB2 metabox/instance](https://github.com/CMB2/CMB2/wiki/Basic-Usage), you will pass an array of properties to the `new_cmb2_box()` function. The possible properties in that array are documented here.

### `id`
____
The id of metabox

`'id' => 'my-metabox',`
<br>
<br>
<br>

### `title`
____
Metabox title. Title display in the admin metabox. Default is `''`.

To keep from registering an actual post-screen metabox, omit the 'title' property from the metabox registration array. (WordPress will not display metaboxes without titles anyway)

This is a good solution if you want to handle outputting your
metaboxes/fields elsewhere in the post-screen.

`'title' => 'Title of the Metabox',`
<br>
<br>
<br>

### `object_types`
____
An array containing post type slugs, or 'user', 'term', 'comment', or 'options-page'. This property is required to have a value.

`'object_types' => array( 'page' ),`
<br>
<br>
<br>

### `context`
____
The context within the screen where the boxes should display. Available contexts vary
from screen to screen. Post edit screen contexts include 'normal', 'side', and 'advanced'. ([More Info](https://developer.wordpress.org/reference/functions/add_meta_box/#parameters))

For placement in locations outside of a metabox (but in the post/custom-post-type screen), other options include:
'form_top', 'before_permalink', 'after_title', 'after_editor' ([More Information](https://github.com/CMB2/CMB2/releases/tag/v2.2.4))
For these alternate locations, if it is preferred that the fields are output without the metabox, then omit the `'title'` property from the metabox registration array, and instead add `'remove_box_wrap' => true,`.

Comments screen contexts include 'normal' and 'side'. Default is `'normal'`.

`'context' => 'normal',`
<br>
<br>
<br>

### `priority`
____
Priority of the metabox in its context. Default is `'high'`. ([More Info](https://developer.wordpress.org/reference/functions/add_meta_box/#parameters))

`'priority' => 'high',`

For the user, term, and options boxes, this priority is used for the hooks used to register the metaboxes. The text version of the priority is converted to an integer. `'high'` is converted to `5` (since lower numbers indicate higher hook priorities), `'low'` is converted to `20` and all other non-numeric text strings are converted to `10`.
<br>
<br>
<br>

### `show_names`
____
Whether to show labels for the fields. Default is `true`.
`'show_names' => false, // Hide the labels`
<br>
<br>
<br>

### `classes`
____
This property allows you to optionally add classes to the CMB2 wrapper. This property can take a string, or array.

`'classes' => 'additional-class',`
OR  
`'classes' => array( 'additional-class', 'another-class' ),`
<br>
<br>
<br>

### `classes_cb`
____
Like the `classes` property, allows adding classes to the CMB2 wrapper, but takes a callback. That callback should return an array of classes. The callback gets passed the CMB2 `$properties` array as the first argument, and the CMB2 `$cmb` object as the second argument. Example:
`'classes_cb' => 'yourprefix_function_to_add_classes',`

```php
/**
 * Add classes to the CMB2 wrapper.
 * @param  object $properties The CMB2 box properties.
 * @param  object $cmb        The CMB2 instance.
 */
function yourprefix_function_to_add_classes( $properties, $cmb ) {
	$classes = array(
		'class1',
		'class2',
		// etc...
	);

	return $classes;
}
```
<br>
<br>
<br>

### `show_on_cb`
____
Callback to determine if metabox should display. The callback gets passed the CMB2 `$cmb` object. More info: [Adding your own show_on filters](https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters)

`'show_on_cb' => 'yourprefix_only_show_for_user_1'`

```php
/**
 * Only display a box if the current user is 1
 * @param  object $cmb Current box object
 * @return bool          True if current user's ID is 1
 */
function yourprefix_only_show_for_user_1( $cmb ) {
	// Returns true if current user's ID is 1, else false
	return 1 === get_current_user_id();
}
```

`'show_on_cb' => 'yourprefix_show_for_pages_without_template'`

```php
/**
 * Only display a box if on a page w/o a template assigned.
 * @param  object $cmb Current box object
 * @return bool          
 */
function yourprefix_show_for_pages_without_template( $cmb ) {
	$current_template = get_post_meta( $cmb->object_id(), '_wp_page_template', true );
	return empty( $current_template ) || 'default' === $current_template;
}
```

<br>
<br>
<br>

### `show_on`
____
Post IDs or page templates to display this metabox. Overrides 'show_on_cb'. More info: [Adding your own show_on filters](https://github.com/CMB2/CMB2/wiki/Adding-your-own-show_on-filters)

`'show_on' => array( 'id' => 2 ), // Only show on the "about" page`
<br>
<br>
<br>

### `cmb_styles`
____
Whether to enqeue CMB2 stylesheet. Default is `true`.

`'cmb_styles' => true,`
<br>
<br>
<br>

### `enqueue_js`
____
Whether to enqeue CMB2 Javascript files. Default is `true`.

`'enqueue_js' => true,`
<br>
<br>
<br>

### `fields`
____
It is possible to pass an array of field arrays as a box property, but it is generally prefered to use the `$cmb->add_field( ... )` method.

`'fields' => array( array( ... ) ),`
<br>
<br>
<br>

### `hookup`
____
Handles hooking CMB2 forms/metaboxes into the post/attachement/user screens, and handles hooking in and saving those fields. Set to `false` if you plan on handling the form/field output/saving (via something like `cmb2_metabox_form()`). Default is `true`.

`'hookup' => true,`
<br>
<br>
<br>

### `save_fields`
____
If false, will not save during hookup (see above). Default is `true`.

`'save_fields' => true,`
<br>
<br>
<br>

### `closed`
____
Set to `true` to default metabox being closed. Default is `false`.

`'closed' => false,`
<br>
<br>
<br>

### `taxonomies`
____
if `object_types` is set to `'term'`, it is required to provide a the `taxonomies` property, which should be an array of Taxonomies.

`'taxonomies' => array( 'category', 'post_tag' ), // Tells CMB2 which taxonomies should have these fields.`
<br>
<br>
<br>

### `new_user_section`
____
if `object_types` is set to `'user'`, will determine where fields are output in the new-user screen. Options are `'add-existing-user'` and `'add-new-user'`. Default is `'add-new-user'`.

`'new_user_section' =>  'add-existing-user',`
<br>
<br>
<br>

### `new_term_section`
____
if `object_types` is set to `'term'`, and set to `false`, will remove the fields from the new-term screen. Default is `true`.

`'new_term_section' => false,`
<br>
<br>
<br>

### `show_in_rest`
____
Determines if/how fields/metabox are available in the REST API. Default is `false`. ([More info](https://github.com/CMB2/CMB2/wiki/REST-API))

`'show_in_rest' => WP_REST_Server::READABLE, // or WP_REST_Server::ALLMETHODS/WP_REST_Server::EDITABLE`
<br>
<br>
<br>

### `remove_box_wrap`
____
This parameter is for post [alternate-context metaboxes](#context) only. To output the fields 'naked' (without a postbox wrapper/style):

`'remove_box_wrap' => true,`
<br>
<br>
<br>

### `menu_title`
____
This parameter is for options-page metaboxes only, and is sent along to [`add_menu_page()/add_submenu_page()`](https://developer.wordpress.org/reference/functions/add_menu_page/) to define the menu title.

`'menu_title' => 'Site Options',`
<br>
<br>
<br>

### `message_cb`
____
This parameter is for options-page metaboxes only, and allows specifying a custom callback for seting the error/success messages. An example has been added to [example-functions.php](https://github.com/CMB2/CMB2/commit/43d513c135e52c327bafa06309821c29323ae2dd#diff-378c74d0ffffc1759b8779a135476777).

`'message_cb' => 'yourprefix_options_page_message_callback',`

```php
/**
 * Callback to define the optionss-saved message.
 *
 * @param CMB2  $cmb The CMB2 object.
 * @param array $args {
 *     An array of message arguments
 *
 *     @type bool   $is_options_page Whether current page is this options page.
 *     @type bool   $should_notify   Whether options were saved and we should be notified.
 *     @type bool   $is_updated      Whether options were updated with save (or stayed the same).
 *     @type string $setting         For add_settings_error(), Slug title of the setting to which
 *                                   this error applies.
 *     @type string $code            For add_settings_error(), Slug-name to identify the error.
 *                                   Used as part of 'id' attribute in HTML output.
 *     @type string $message         For add_settings_error(), The formatted message text to display
 *                                   to the user (will be shown inside styled `<div>` and `<p>` tags).
 *                                   Will be 'Settings updated.' if $is_updated is true, else 'Nothing to update.'
 *     @type string $type            For add_settings_error(), Message type, controls HTML class.
 *                                   Accepts 'error', 'updated', '', 'notice-warning', etc.
 *                                   Will be 'updated' if $is_updated is true, else 'notice-warning'.
 * }
 */
function yourprefix_options_page_message_callback( $cmb, $args ) {
	if ( ! empty( $args['should_notify'] ) ) {

		if ( $args['is_updated'] ) {

			// Modify the updated message.
			$args['message'] = sprintf( esc_html__( '%s &mdash; Updated!', 'cmb2' ), $cmb->prop( 'title' ) );
		}

		add_settings_error( $args['setting'], $args['code'], $args['message'], $args['type'] );
	}
}
```
<br>
<br>
<br>

### `parent_slug`
____
This parameter is for options-page metaboxes only, and is sent along to [`add_submenu_page()`](https://developer.wordpress.org/reference/functions/add_submenu_page/) to define the parent-menu item slug.

`'parent_slug' => 'tools.php',`
<br>
<br>
<br>

### `capability`
____
This parameter is for options-page metaboxes only, and is sent along to [`add_menu_page()/add_submenu_page()`](https://developer.wordpress.org/reference/functions/add_menu_page/) to define the capability required to view the options page.

`'capability' => 'edit_posts',`
<br>
<br>
<br>

### `icon_url`
____
This parameter is for options-page metaboxes only, and is sent along to [`add_menu_page()`](https://developer.wordpress.org/reference/functions/add_menu_page/) to define the menu icon. Only applicable if [`parent_slug`](#parent_slug) is left empty.

`'icon_url' => 'dashicons-chart-pie',`
<br>
<br>
<br>

### `position`
____
This parameter is for options-page metaboxes only, and is sent along to [`add_menu_page()`](https://developer.wordpress.org/reference/functions/add_menu_page/) to define the menu position. Only applicable if [`parent_slug`](#parent_slug) is left empty.

`'position' => 1,`
<br>
<br>
<br>

### `admin_menu_hook`
____
This parameter is for options-page metaboxes only and defaults to `'admin_menu'`, to register your options-page at the network level:

`'admin_menu_hook' => 'network_admin_menu',`
<br>
<br>
<br>

### `display_cb`
____
This parameter is for options-page metaboxes only and allows overriding the options page form output.

`'display_cb' => 'my_callback_function_to_display_output',`
<br>
<br>
<br>

### `save_button`
____
This parameter is for options-page metaboxes only and defines the text for the options page save button. defaults to 'Save'.

`'save_button' => 'Save Settings',`
