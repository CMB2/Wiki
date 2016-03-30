With CMB2, we have a few helper functions that allow us to display metabox forms on the front-end of our site (or anywhere, really).

```php
<?php cmb2_metabox_form( $meta_box, $object_id, $args ); ?>
```
OR to return the form for use in your code:
```php
<?php $form = cmb2_get_metabox_form( $meta_box, $object_id, $args ); ?>
```


The first parameter `$meta_box`, can take a single metabox config array or metabox id. In our case, we'll use our metabox id to select and display the right metabox wherever we want:
```php
<?php
// This is the WordPress post ID where the data should be stored/displayed.
$object_id = 2;
$metabox_id = 'test_metabox';

cmb2_metabox_form( $metabox_id, $object_id );
?>
```

Note: If you use `cmb2_admin_init`, like in the example_functions.php file, to register your metaboxes, they will not be available on the front end. Use `cmb2_init` instead.

## Metabox Shortcode

Now, for real world usage, let's add this in the form of a shortcode:
```php
<?php
add_shortcode( 'cmb-form', 'cmb2_do_frontend_form_shortcode' );
/**
 * Shortcode to display a CMB2 form for a post ID.
 * @param  array  $atts Shortcode attributes
 * @return string       Form HTML markup
 */
function cmb2_do_frontend_form_shortcode( $atts = array() ) {
	global $post;

	/**
	 * Depending on your setup, check if the user has permissions to edit_posts
	 */
	if ( ! current_user_can( 'edit_posts' ) ) {
		return __( 'You do not have permissions to edit this post.', 'lang_domain' );
	}

	/**
	 * Make sure a WordPress post ID is set.
	 * We'll default to the current post/page
	 */
	if ( ! isset( $atts['post_id'] ) ) {
		$atts['post_id'] = $post->ID;
	}

	// If no metabox id is set, yell about it
	if ( empty( $atts['id'] ) ) {
		return __( "Please add an 'id' attribute to specify the CMB2 form to display.", 'lang-domain' );
	}

	$metabox_id = esc_attr( $atts['id'] );
	$object_id = absint( $atts['post_id'] );
	// Get our form
	$form = cmb2_get_metabox_form( $metabox_id, $object_id );

	return $form;
}
```
Adding this shortcode to your WordPress editor would look something like this:
```
[cmb-form id="test_metabox"]
```
Or to specify a specific post ID for saving and retrieving the values from, att a post_id parameter to the shortcode:
```
[cmb-form id="test_metabox" post_id=2]
```

With this shortcode, you'll be able to add any metabox to the front-end. Just specify which metabox to use, and (optionally) which WordPress post ID (or user/comment ID) to be editing.
