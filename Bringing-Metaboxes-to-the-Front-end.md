With 1.0.0, we now have the ability to display metabox forms on the front-end of our site.

```
<?php cmb_metabox_form( $meta_box, $object_id, $echo ); ?>
```

The first parameter `$meta_box`, takes a single metabox config array. For this reason, we'll give each of our metabox arrays a named key to make it easier to select for this front-end form.

Previously, we added metaboxes like:
```php
$meta_boxes[] = array(
	'id' => 'test_metabox',
	...
);
```

Instead, we'll create our metaboxes like:
```php
$meta_boxes['test_metabox'] = array(
	'id' => 'test_metabox',
	...
);
```

