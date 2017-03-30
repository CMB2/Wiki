
- [`id`](#id)
- [`title`](#title)
- [`object_types`](#object_types)
- [`context`](#context)
- [`priority`](#priority)
- [`show_names`](#show_names)
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


### `id`
____
The id of metabox

> `'id' => 'my-metabox',`

### `title`
____
Metabox title. Title display in the admin metabox.
> `'title' => 'Title of the Metabox',`

### `object_types`
____
Post Type array slug. You could using 'posts', 'pages' or other custom post type slug.
> `'object_types' => array('post'),`

### `context`
____
Option of metabox, see https://developer.wordpress.org/reference/functions/add_meta_box/#parameters
> `'context' => 'normal',`

### `priority`
____
Option of metabox, see https://developer.wordpress.org/reference/functions/add_meta_box/#parameters
> `'priority' => 'high',`

### `show_names`
____
Whether to show the label for the field. Default is `true`.
> `'show_names' => false,`

<!-- This parameter should be in the class options...
### `classes`
____
This parameter allows you to add additional classes to the cmb-row wrap. This parameter can take a string, or array, or can take a callback that returns a string or array. Like above, the callback will receive `$field_args` as the first argument, and the CMB2_Field `$field` object as the second argument.
> `'classes' => 'additional-class',`

### `classes_cb`
____
Like the `classes` parameter, allows adding classes to the row wrap, but takes a callback. That callback should return an array of classes. The callback function gets passed the `$field` object. Example:
> `'classes_cb' => 'yourprefix_function_to_add_classes',`

```php
/**
 * Add classes to the row.
 * @param  object $field_args Current field args
 * @param  object $field      Current field object
 */
function yourprefix_function_to_add_classes( $field_args, $field ) {
	$classes = array(
		'class1',
		'class2',
		// etc...
	);

	return $classes;
}
```
-->

### `show_on_cb`
____
Callback to determine if metabox should display.
> `'show_on_cb'` => null

### `show_on`
____
Post IDs or page templates to display this metabox. overrides 'show_on_cb'
> `'show_on'` => array(),

### `cmb_styles`
____
Include CMB2 stylesheet
> `'cmb_styles' => true,

### `enqueue_js`
____
Include CMB2 JS
> `'enqueue_js'` => true,


### `fields`
____
????
> `'fields'` => array(),

### `hookup`
____
????
> `'hookup'` => true,

### `save_fields`
____
Will not save during hookup if false
> `'save_fields'` => true,

### `closed`
____
Default to metabox being closed?
> `'closed'` => false,

### `taxonomies`
____

> `'taxonomies'` => array(),

### `new_user_section`
____
Or 'add-existing-user'
> `'new_user_section'` =>  'add-new-user',

### `new_term_section`
____

> `'new_term_section'` =>  true,

### `show_in_rest`
____

> `'show_in_rest'` =>  false,



