## Override text strings in field

Several of the CMB2 field types have text strings in them, and CMB2 provides a way to override each of them.
The `file` field type has a button with the text, "Add or Upload File." Here is how you would override that text during your field configuration:

```php
array(
	'name'    => 'PDF',
	'id'      => $prefix . 'pdf',
	'type'    => 'file',
	'options' => array(
		'add_upload_file_text' => 'Upload PDF',
	),
),
```

To find a particular string, search for it in the [`CMB2_Types` class](https://github.com/WebDevStudios/CMB2/blob/master/includes/CMB2_Types.php), or search for `'$this->_text('`. The first parameter passed to the `CMB2_Types::_text()` method is the key you will use in the field options parameter array.

## Inject static content in a field

There are several field properties you can use to inject text or content in your fields. These parameters are:

* before_field
* before_row
* before
* after
* after_row
* after_field

To use them in your field, it would look something like this:

```php
array(
	'name'         => 'Testing Field Parameters',
	'id'           => $prefix . 'test_parameters',
	'type'         => 'text',
	'before_row'   => '<p>Testing <b>"before_row"</b> parameter</p>',
	'before'       => '<p>Testing <b>"before"</b> parameter</p>',
	'before_field' => '<p>Testing <b>"before_field"</b> parameter</p>',
	'after_field'  => '<p>Testing <b>"after_field"</b> parameter</p>',
	'after'        => '<p>Testing <b>"after"</b> parameter</p>',
	'after_row'    => '<p>Testing <b>"after_row"</b> parameter</p>',
),
```
And that field would look like:  
![Screenshot](images/testing-parameters.png)

## Inject static content in a field via a callback

Those same parameters can accept a callback to be called at runtime, and get passed two parameters, `$field_args` and `$field`. The `$field` object will have some handy parameters to help us add some conditional logic to our callbacks.

Let's say, for example, that you only want to show text in front of your field if the `$post_id` is 2. First you will need to create your callback function:

```php
/**
 * Conditionally displays a message if the $post_id is 2
 *
 * @param  array             $field_args Array of field parameters
 * @param  CMB2_Field object $field      Field object
 */
function cmb2_before_row_if_2( $field_args, $field ) {
	if ( 2 == $field->object_id ) {
		echo '<p>Testing <b>"before_row"</b> parameter (on $post_id 2)</p>';
	} else {
		echo '<p>Testing <b>"before_row"</b> parameter (<b>NOT</b> on $post_id 2)</p>';
	}
}

```

Then you can specifiy that callback in your field parameter:

```php
array(
	'name'       => 'Testing Field Parameters',
	'id'         => $prefix . 'test_parameters',
	'type'       => 'text',
	'before_row' => 'cmb2_before_row_if_2', // callback
),
```
