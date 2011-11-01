Here's the built-in fields you can include in your metabox. You can also [add your own field types](https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Adding-your-own-field-types).

* `text` - Standard text field. Example:

```php
array(
	'name' => 'Test Text',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_text',
	'type' => 'text'
),
```

* `text_small` - Small text field. Example:

```php
array(
	'name' => 'Test Text Small',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_textsmall',
	'type' => 'text_small'
),
```