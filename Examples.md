If you didn't know, the [example-functions.php](https://github.com/CMB2/CMB2/blob/master/example-functions.php) contains examples for how to use CMB2 in many different contexts, including registering fields for many different object types:

- [Non-post post-types](https://github.com/CMB2/CMB2/blob/b1a7e8fb9f0634337b390a098f0a1f70f0f64085/example-functions.php#L436-L465). in this case, the "Page" post-type, limited to the page with the id of `2`.
- [User profile pages](https://github.com/CMB2/CMB2/blob/b1a7e8fb9f0634337b390a098f0a1f70f0f64085/example-functions.php#L531-L599)
- [Taxonomy terms](https://github.com/CMB2/CMB2/blob/b1a7e8fb9f0634337b390a098f0a1f70f0f64085/example-functions.php#L601-L641)
- [Options Page](https://github.com/CMB2/CMB2/blob/b1a7e8fb9f0634337b390a098f0a1f70f0f64085/example-functions.php#L643-L688)
- [Comment-edit page](#comment-edit-page)


## Comment-edit page

Add fields to the comment-edit page:

```php
add_action( 'cmb2_admin_init', 'yourprefix_register_comment_metabox' );
/**
 * Hook in and register a metabox for the admin comment edit page.
 */
function yourprefix_register_comment_metabox() {

	$prefix = 'yourprefix_comment_';

	/**
	 * Sample metabox to demonstrate each field type included
	 */
	$cmb = new_cmb2_box( array(
		'id'           => $prefix . 'metabox',
		'title'        => 'Test Metabox',
		'object_types' => array( 'comment' ),
	) );

	$cmb->add_field( array(
		'name' => 'Test Text Small',
		'desc' => 'field description (optional)',
		'id'   => $prefix . 'textsmall',
		'type' => 'text_small',
		'column' => array(
			'position' => 2,
			'name' => 'CMB2 Custom Column',
		),
	) );

	$cmb->add_field( array(
		'name'    => 'Test Color Picker',
		'desc'    => 'field description (optional)',
		'id'      => $prefix . 'colorpicker',
		'type'    => 'colorpicker',
		'default' => '#ffffff',
		'column' => array(
			'position' => 2,
		),

	) );
}

```
