**Change 1:** Hooks/filters work nearly the same (if not the same), but you'll be required to use the `cmb2_` instead of the original `cmb_`. This includes the main filter for adding metaboxes, `'cmb2_meta_boxes'`. The `cmb2_render{$custom_field_type}` action no longer passes the unescaped value as the first parameter.

**Change 2:** The [old method for including the CMB core files](https://github.com/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/blob/master/example-functions.php#L406-L415) is no longer applicable and you're simply required to [include it directly](https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php#L14). This is not applicable if installing as a standard WordPress plugin.

**Change 3:** The `'pages'` metabox parameter has been changed to `'object_types'` to more accurately reflect its purpose.

**Change 4:** The `'options'` field parameter for radio and select fields is now created with a id => label key value pairing. i.e.
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
