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

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### `id`
____
The id of metabox

> `'id' => 'my-metabox',`

### `title`
____
Metabox title. Title display in the admin metabox. Default is `''`.

To keep from registering an actual post-screen metabox, omit the 'title' property from the metabox registration array. (WordPress will not display metaboxes without titles anyway)

This is a good solution if you want to handle outputting your
metaboxes/fields elsewhere in the post-screen.

> `'title' => 'Title of the Metabox',`

### `object_types`
____
An array containing post type slugs, or 'user', 'term', 'comment', or 'options-page'. This property is required to have a value.
> `'object_types' => array( 'page' ),`

### `context`
____
The context within the screen where the boxes should display. Available contexts vary
from screen to screen. Post edit screen contexts include 'normal', 'side', and 'advanced'. ([More Info](https://developer.wordpress.org/reference/functions/add_meta_box/#parameters))

For placement in locations outside of a metabox (but in the post/custom-post-type screen), other options include:
'form_top', 'before_permalink', 'after_title', 'after_editor' ([More Information](https://github.com/WebDevStudios/CMB2/releases/tag/v2.2.4))
For these alternate locations, if it is preferred that the fields are output without the metabox, then omit the `'title'` property from the metabox registration array, and instead add `'remove_box_wrap' => true,`.

Comments screen contexts include 'normal' and 'side'. Default is `'normal'`.
> `'context' => 'normal',`

### `priority`
____
Priority of the metabox in its context. Default is `'high'`. ([More Info](https://developer.wordpress.org/reference/functions/add_meta_box/#parameters))
> `'priority' => 'high',`

### `show_names`
____
Whether to show labels for the fields. Default is `true`.
> `'show_names' => false, // Hide the labels`

### `classes`
____
This property allows you to optionally add classes to the CMB2 wrapper. This property can take a string, or array.
> `'classes' => 'additional-class',`
OR  
> `'classes' => array( 'additional-class', 'another-class' ),`

### `classes_cb`
____
Like the `classes` property, allows adding classes to the CMB2 wrapper, but takes a callback. That callback should return an array of classes. The callback gets passed the CMB2 `$properties` array as the first argument, and the CMB2 `$cmb` object as the second argument. Example:
> `'classes_cb' => 'yourprefix_function_to_add_classes',`

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

### `show_on_cb`
____
Callback to determine if metabox should display. The callback gets passed the CMB2 `$cmb` object. More info: [Adding your own show_on filters](https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters)
> `'show_on_cb' => 'yourprefix_only_show_for_user_1'`

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

### `show_on`
____
Post IDs or page templates to display this metabox. Overrides 'show_on_cb'. More info: [Adding your own show_on filters](https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters)
> `'show_on' => array( 'id' => 2 ), // Only show on the "about" page`

### `cmb_styles`
____
Whether to enqeue CMB2 stylesheet. Default is `true`.
> `'cmb_styles' => true,`

### `enqueue_js`
____
Whether to enqeue CMB2 Javascript files. Default is `true`.
> `'enqueue_js' => true,`

### `fields`
____
It is possible to pass an array of field arrays as a box property, but it is generally prefered to use the `$cmb->add_field( ... )` method.
> `'fields' => array( array( ... ) ),`

### `hookup`
____
Handles hooking CMB2 forms/metaboxes into the post/attachement/user screens, and handles hooking in and saving those fields. Set to `false` if you plan on handling the form/field output/saving (via something like `cmb2_metabox_form()`). Default is `true`.
> `'hookup' => true,`

### `save_fields`
____
If false, will not save during hookup (see above). Default is `true`.
> `'save_fields' => true,`

### `closed`
____
Set to `true` to default metabox being closed. Default is `false`.
> `'closed' => false,`

### `taxonomies`
____
if `object_types` is set to `'term'`, it is required to provide a the `taxonomies` property, which should be an array of Taxonomies.
> `'taxonomies'       => array( 'category', 'post_tag' ), // Tells CMB2 which taxonomies should have these fields.`

### `new_user_section`
____
if `object_types` is set to `'user'`, will determine where fields are output in the new-user screen. Options are `'add-existing-user'` and `'add-new-user'`. Default is `'add-new-user'`.
> `'new_user_section' =>  'add-existing-user',`

### `new_term_section`
____
if `object_types` is set to `'term'`, and set to `false`, will remove the fields from the new-term screen. Default is `true`.
> `'new_term_section' => false,`

### `show_in_rest`
____
Determines if/how fields/metabox are available in the REST API. Default is `false`. ([More info](https://github.com/WebDevStudios/CMB2/wiki/REST-API))
> `'show_in_rest' => WP_REST_Server::READABLE, // or WP_REST_Server::ALLMETHODS/WP_REST_Server::EDITABLE`



