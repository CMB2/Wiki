**Change 1:** The same hooks and filters you're used to will be there, though you'll be required to use the `cmb2_` prefix instead of the original `cmb_`, and the order and type of parameters passed to those actions have likely changed.

**Change 2:** The main filter for adding metaboxes, `'cmb2_meta_boxes'`, is still there, but it is recommended that you instead use the registration functions available and use the `'cmb_init'` action hook. You can see them demonstrated in [example-functions.php](https://github.com/CMB2/CMB2/blob/master/example-functions.php).

**Change 3:** The [old method for including the CMB core files](https://github.com/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/blob/master/example-functions.php#L406-L415) is no longer applicable and you're simply required to [include it directly](https://github.com/CMB2/CMB2/blob/master/example-functions.php#L14). This is not applicable if installing as a standard WordPress plugin.

**Change 4:** The `'pages'` metabox parameter has been changed to `'object_types'` to more accurately reflect its purpose, since it will accept post_types as well as other object types like `'user'`, `'comment'`, or `'options-page'`.

**Change 5:** The `'options'` field parameter for radio and select fields is now created with an id => label key value pairing. i.e.
```php
$cmb->add_field( array(
	'name'    => __( 'Test Select', 'cmb2' ),
	'id'      => $prefix . 'test_select',
	'type'    => 'select',
	'options' => array(
		'standard' => __( 'Option One', 'cmb2' ),
		'custom'   => __( 'Option Two', 'cmb2' ),
		'none'     => __( 'Option Three', 'cmb2' ),
	),
) ),
```
