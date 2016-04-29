<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [`name`](#name)
- [`desc`](#desc)
- [`id`](#id)
- [`type`](#type)
- [`repeatable`](#repeatable)
- [`default`](#default)
- [`show_names`](#show_names)
- [`options`](#options)
- [`before`, `after`, `before_row`, `after_row`, `before_field`, `after_field`](#before-after-before_row-after_row-before_field-after_field)
- [`row_classes`](#row_classes)
- [`on_front`](#on_front)
- [`attributes`](#attributes)
- [`show_on_cb`](#show_on_cb)
- [`options_cb`](#options_cb)
- [`escape_cb`](#escape_cb)
- [`sanitization_cb`](#sanitization_cb)
- [`render_row_cb`](#render_row_cb)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Most (if not all) fields support the parameters on this page. When a field type supports extra parameters, those parameters are [documented with the given field type](/WebDevStudios/CMB2/wiki/Field-Types).

### `name`
____
The field label

### `desc`
____
Field description. Usually under or adjacent to the field input.

### `id`
____
The data key. If using for posts, will be the post-meta key. If using for an options page, will be the array key.

### `type`
____
What makes the whole thing work.

### `repeatable`
____
[Supported by most field types](https://github.com/WebDevStudios/CMB2/wiki/Field-Types#types), and will make the individual field a repeatable one.

### `default`
____
Specify a default value for the field.

### `show_names`
____
Hide label for the field.

### `options`
____
For fields that take an options array. These include
`select`, `radio`, `multicheck`, `wysiwyg` and `group`. Can also accept a callback. The callback will receive the CMB2_Field `$field` object as an argument.

### `before`, `after`, `before_row`, `after_row`, `before_field`, `after_field`
____
These allow you to add arbitrary text/markup at different points in the field markup. These also accept a callback. The callback will receive `$field_args` as the first argument, and the CMB2_Field `$field` object as the second argument. Example:

```php
$cmb->add_field( array(
	'name'      => __( 'Test After Row Callback', 'cmb2' ),
	'id'        => 'wiki_test_text',
	'type'      => 'text',
	'after_row' => 'cmb_after_row_cb',
) );

...

/**
 * Output a message if the current page has the id of "2" (the about page)
 * @param  object $field_args Current field args
 * @param  object $field      Current field object
 */
function cmb_after_row_cb( $field_args, $field ) {
	if ( 2 === $field->object_id ) {
		echo 'This is the "About" page!';
	}
}
```

### `row_classes`
____
This parameter allows you to add additional classes to the cmb-row wrap. This parameter can take a string, or array, or can take a callback that returns a string or array. Like above, the callback will receive `$field_args` as the first argument, and the CMB2_Field `$field` object as the second argument.

### `on_front`
____
If you're planning on using your metabox fields on the front-end as well (user-facing), then you can specify that certain fields do not get displayed there by setting this parameter to `false`.

### `attributes`
____
Will modify default attributes (class, input type, rows, etc), or add your own (placeholder, data attributes). Example:

```php
$cmb->add_field( array(
	'name'        => 'Extra Small Textarea',
	'id'          => 'wiki_test_xtra_small_textarea',
	'type'        => 'textarea_small',
	'attributes'  => array(
		'placeholder' => 'A small amount of text',
		'rows'        => 3,
		'required'    => 'required',
	),
) );
```

### `show_on_cb`
____
A callback to conditionally display a field. Callback function should return a boolean (true/false) value. Function passes in the current field object. Example:

```php
$cmb->add_field( array(
	'name'       => __( 'Test Text', 'cmb2' ),
	'id'         => 'wiki_test_text',
	'type'       => 'text',
	'show_on_cb' => 'cmb_only_show_for_user_1', // function should return a bool value
) );

...

/**
 * Only display a field if the current user is 1
 * @param  object $field Current field object
 * @return bool          True if current user's ID is 1
 */
function cmb_only_show_for_user_1( $field ) {
	// Returns true if current user's ID is 1, else false
	return 1 === get_current_user_id();
}
```

### `options_cb`
____
A callback to load field options. Callback function should return an options array. The callback function gets passed the `$field` object. Example:

```php
$cmb->add_field( array(
	'name'       => __( 'Select Color', 'cmb2' ),
	'id'         => 'wiki_test_color',
	'type'       => 'multicheck',
	'options_cb' => 'cmb_color_options',
) );

...

/**
 * Display different options depending on post category
 * @param  object $field      Current field object
 * @return array              Array of field options
 */
function cmb_color_options( $field ) {
	$options = array(
		'sapphire' => 'Sapphire Blue',
		'sky'      => 'Sky Blue',
		'navy'     => 'Navy Blue',
		'ruby'     => 'Ruby Red',
		'purple'   => 'Amethyst Purple',
	);

	// If in the 'blue' category, only show blue options.
	if ( has_category( 'blue', $field->object_id ) ) {
		$options = array(
			'sapphire' => 'Sapphire Blue',
			'sky'      => 'Sky Blue',
			'navy'     => 'Navy Blue',
		);
	}

	return $options;
}
```

### `escape_cb`
____
Bypass the CMB escaping (escapes before display) methods with your own callback. Set to `false` if you do not want any escaping (not recommended).

### `sanitization_cb`
____
Bypass the CMB sanitization (sanitizes before saving) methods with your own callback. Set to `false` if you do not want any sanitization (not recommended).

### `render_row_cb`
____
Bypass the CMB row rendering. You will completely responsible for outputting that row's html. The callback function gets passed the field `$args` array, and the `$field` object. [More info](https://github.com/WebDevStudios/CMB2/issues/596#issuecomment-187941343).
