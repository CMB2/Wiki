Here's the built-in fields you can include in your metabox. You can also [add your own field types](https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Adding-your-own-field-types).

`text` - Standard text field (large). Example:

```php
array(
	'name' => 'Test Text',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_text',
	'type' => 'text'
),
```

`text_small` - Small text field. Example:

```php
array(
	'name' => 'Test Text Small',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_textsmall',
	'type' => 'text_small'
),
```

`text_medium` - Medium text field. Example:

```php
array(
	'name' => 'Test Text Medium',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_textmedium',
	'type' => 'text_medium'
),
```

`text_date` - Date field. Stored in m/d/Y format (ex: 09/01/2011). Example:

```php
array(
	'name' => 'Test Date Picker',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_textdate',
	'type' => 'text_date'
),
```

`text_date_timestamp` - Date field, stored as UNIX timestamp. Useful if you plan to query based on it (ex: [events listing](http://www.billerickson.net/code/event-query/) ). Example:

```php
array(
	'name' => 'Test Date Picker',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_textdate',
	'type' => 'text_date_timestamp'
),
```

`text_money` - Standard text field with dollar sign in front of it (useful to prevent users from adding a dollar sign to input). Example:

```php
array(
	'name' => 'Test Money',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_textmoney',
	'type' => 'text_money'
),
```

