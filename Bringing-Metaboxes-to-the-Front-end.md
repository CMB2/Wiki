With 1.0.0, we now have the ability to display metabox forms on the front-end of our site.

```
<?php cmb_metabox_form( $meta_box, $object_id, $echo ); ?>
```

The first parameter `$meta_box`, takes a single metabox config array. For this reason, we'll give each of our metabox arrays a named key to make it easier to select for this front-end form.

Previously, we added metaboxes like:
```php
<?php 
add_filter( 'cmb_meta_boxes', 'cmb_sample_metaboxes' );
function cmb_sample_metaboxes( $meta_boxes = array() ) {

	$meta_boxes[] = array(
		'id' => 'test_metabox',
		...
	);
}
```

Instead, we'll create our metaboxes like:
```php
<?php 
add_filter( 'cmb_meta_boxes', 'cmb_sample_metaboxes' );
function cmb_sample_metaboxes( $meta_boxes = array() ) {

	$meta_boxes['test_metabox'] = array(
		'id' => 'test_metabox',
		...
	);
}
```

Now in order to get the metabox config array we need, we'll use the same method CMB uses to grab the entire metabox array:
```
<?php $meta_boxes = apply_filters( 'cmb_meta_boxes', array() ); ?>
```

Then we'll use our metabox key to select and display the right metabox wherever we want:
```php
<?php
// This is the WordPress post ID where the data should be stored/displayed.
$object_id = 2;

// $echo is true by default, so it can be omitted for brevity.
// $echo = true;

cmb_metabox_form( $meta_boxes['test_metabox'], $object_id );
?>
```

## Metabox Shortcode

Now, for real world usage, let's add this in the form of a shortcode:
```php
<?php
add_shortcode( 'cmb-form', 'cmb_do_frontend_form' );
/**
 * Shortcode to display a CMB form for a post ID.
 * @param  array  $attr Metabox config array
 * @return string       Form HTML markup
 */
function cmb_do_frontend_form( $attr = array() ) {
	// Make sure a WordPress post ID is specified
	if ( ! isset( $attr['id'] ) )
		return __( "Please add an 'id' attribute to the shortcode.", 'cmb' );

	// Default metabox id
	$metabox_id = 'test_metabox';

	// Let shortcode override metabox id
	if ( isset( $attr['metabox_id'] ) ) {
		$metabox_id = esc_attr( $attr['metabox_id'] );
	}

	// Get all metaboxes
	$meta_boxes = apply_filters( 'cmb_meta_boxes', array() );

	// If the metabox specified doesn't exist, yell about it.
	if ( ! isset( $meta_boxes[ $metabox_id ] ) )
		return __( "A metabox with the specified 'metabox_id' doesn't exist.", 'cmb' );

	// This is the WordPress post ID where the data should be stored/displayed.
	$object_id = absint( $attr['id'] );

	// Shortcodes need to return their data, not echo it.
	$echo = false;

	// Get our form
	$form = cmb_metabox_form( $meta_boxes[ $metabox_id ], $object_id, $echo );

	return $form;
}
```
Adding this shortcode to your WordPress editor would look something like this:
```
[cmb-form id=2]
```

With this shortcode, you'll be able to add any metabox to the front-end. Just specify which WordPress post ID (or user/comment ID) to be editing, and which metabox to use.