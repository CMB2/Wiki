Here's the built-in fields you can include in your metabox. You can also [add your own field types](/WebDevStudios/CMB2/wiki/Adding-your-own-field-types).

Note that all the id's have $prefix in them. It's a good practice to create a unique prefix for your fields so you don't risk using the same id as another theme/plugin. Take a look at [example-functions.php](/WebDevStudios/CMB2/blob/master/example-functions.php) to see how you define the prefix.

Not all built-in fields have been 100% documented, so please see the example file for additional details.

#### Types:
1. [`title`](#title) An arbitrary title field *
1. [`text`](#text)
1. [`text_small`](#text_small)
1. [`text_medium`](#text_medium)
1. [`text_email`](#text_email)
1. [`text_url`](#text_url)
1. [`text_money`](#text_money)
1. [`textarea`](#textarea)
1. [`textarea_small`](#textarea_small)
1. [`textarea_code`](#textarea_code)
1. [`text_date`](#text_date) Date Picker
1. [`text_time`](#text_time) Time picker
1. [`select_timezone`](#select_timezone) Time zone dropdown
1. [`text_date_timestamp`](#text_date_timestamp) Date Picker (UNIX timestamp)
1. [`text_datetime_timestamp`](#text_datetime_timestamp) Test Date/Time Picker Combo (UNIX timestamp)
1. [`text_datetime_timestamp_timezone`](#text_datetime_timestamp_timezone) Test Date/Time Picker/Time zone Combo (serialized DateTime object)
1. [`colorpicker`](#colorpicker) Color picker
1. [`radio`](#radio) *
1. [`radio_inline`](#radio_inline) *
1. [`taxonomy_radio`](#taxonomy_radio) *
1. [`taxonomy_radio_inline`](#taxonomy_radio_inline) *
1. [`select`](#select)
1. [`taxonomy_select`](#taxonomy_select) *
1. [`checkbox`](#checkbox) *
1. [`multicheck`](#multicheck)
1. [`taxonomy_multicheck`](#taxonomy_multicheck) *
1. [`taxonomy_multicheck_inline`](#taxonomy_multicheck_inline)
1. [`wysiwyg`](#wysiwyg) (TinyMCE) *
1. [`file`](#file) Image/File upload *†
1. [`file_list`](#file_list) Image/File list upload
1. [`oembed`](#oembed) Converts oembed urls (instagram, twitter, youtube, etc. [oEmbed in the Codex](https://codex.wordpress.org/Embeds))
1. [`group`](#group) Hybrid field that supports adding other fields as a repeatable group. *

#### More Info
* [Create your own field type](https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-field-types)
* [Common field parameters shared by all fields](#common-field-parameters)

\* Not available as a repeatable field  
† Use `file_list` for repeatable  

#### `title`
A large title (useful for breaking up sections of fields in metabox). Example:

```php
array(
	'name' => 'Test Title',
	'desc' => 'This is a title description',
	'type' => 'title',
	'id'   => $prefix . 'test_title'
),
```

#### `text`
Standard text field (large). Example:

```php
array(
	'name'    => 'Test Text',
	'desc'    => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id'      => $prefix . 'test_text',
	'type'    => 'text'
),
```

#### `text_small`
Small text field. Example:

```php
array(
	'name'    => 'Test Text Small',
	'desc'    => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id'      => $prefix . 'test_textsmall',
	'type'    => 'text_small'
),
```

#### `text_medium`
Medium text field. Example:

```php
array(
	'name'    => 'Test Text Medium',
	'desc'    => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id'      => $prefix . 'test_textmedium',
	'type'    => 'text_medium'
),
```

#### `text_email`
Standard text field which enforces an email address. Example:

```php
array(
	'name' => 'Test Text Email',
	'id'   => $prefix . 'email',
	'type' => 'text_email',
),
```

#### `text_url`
Standard text field which enforces a url. Example:

```php
array(
	'name' => __( 'Website URL', 'cmb' ),
	'id'   => $prefix . 'facebookurl',
	'type' => 'text_url',
	// 'protocols' => array( 'http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet' ), // Array of allowed protocols
),
```

#### `text_money`
Standard text field with dollar sign in front of it (useful to prevent users from adding a dollar sign to input). Example:

```php
array(
	'name' => 'Test Money',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_textmoney',
	'type' => 'text_money',
	// 'before_field' => '£', // Replaces default '$'
),
```

#### `textarea`
Standard textarea. Example:

```php
array(
	'name' => 'Test Text Area',
	'desc' => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id' => $prefix . 'test_textarea',
	'type' => 'textarea'
),
```

#### `textarea_small`
Smaller textarea. Example:

```php
array(
	'name' => 'Test Text Area Small',
	'desc' => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id' => $prefix . 'test_textareasmall',
	'type' => 'textarea_small'
),
```

#### `textarea_code`
Code textarea. Example:

```php
array(
	'name' => 'Test Text Area Code',
	'desc' => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id' => $prefix . 'test_textareacode',
	'type' => 'textarea_code'
),
```

#### `text_date`
Date field. Stored in m/d/Y format (ex: 09/01/2011). Example:

```php
array(
	'name' => 'Test Date Picker',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_textdate',
	'type' => 'text_date'
	// 'date_format' => __( 'd-m-Y', 'cmb2' ), // use European date format
),
```
##### Extra Parameters:

* `date_format `, defaults to 'm/d/Y'. See [php.net/manual/en/function.date.php](http://php.net/manual/en/function.date.php).


#### `text_time`
Time picker field. Example:

```php
array(
	'name' => 'Test Date Picker',
	'id' => $prefix . 'test_texttime',
	'type' => 'text_time'
	// 'time_format' => 'h:i:s A',
),
```
##### Extra Parameters:

* `time_format`, defaults to 'h:i A'. See [php.net/manual/en/function.date.php](http://php.net/manual/en/function.date.php).


#### `select_timezone`
Timezone field. Example:

```php
array(
	'name' => 'Time zone',
	'id'   => $prefix . 'timezone',
	'type' => 'select_timezone',
),
```


#### `text_date_timestamp`
Date field, stored as UNIX timestamp. Useful if you plan to query based on it (ex: [events listing](http://www.billerickson.net/code/event-query/) ). Example:

```php
array(
	'name' => 'Test Date Picker (UNIX timestamp)',
	'id'   => $prefix . 'test_textdate_timestamp',
	'type' => 'text_date_timestamp',
	// 'timezone_meta_key' => $prefix . 'timezone',
	// 'date_format' => 'l jS \of F Y',
),
```
##### Extra Parameters:

* `timezone_meta_key`, Optionally make this field honor the timezone selected in the [`select_timezone`](/WebDevStudios/CMB2/wiki/Field-Types#select_timezone) field specified above.
* `date_format`, defaults to 'm/d/Y'. See [php.net/manual/en/function.date.php](http://php.net/manual/en/function.date.php).


#### `text_datetime_timestamp`
Date and time field, stored as UNIX timestamp. Example:

```php
array(
	'name' => 'Test Date/Time Picker Combo (UNIX timestamp)',
	'id'   => $prefix . 'test_datetime_timestamp',
	'type' => 'text_datetime_timestamp',
),
```

#### `text_datetime_timestamp_timezone`
Date, time and timezone field, stored as UNIX timestamp. Example:

```php
array(
	'name' => 'Test Date/Time Picker/Time zone Combo (serialized DateTime object)',
	'id'   => $prefix . 'test_datetime_timestamp_timezone',
	'type' => 'text_datetime_timestamp_timezone',
),
```

#### `colorpicker`
A colorpicker field. Example:

```php
array(
	'name' => 'Test Color Picker',
	'id'   => $prefix . 'test_colorpicker',
	'type' => 'colorpicker',
	'default'  => '#ffffff',
),
```

#### `checkbox`
Standard checkbox. Example:

```php
array(
	'name' => 'Test Checkbox',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_checkbox',
	'type' => 'checkbox'
),
```

#### `multicheck`
A field with multiple checkboxes (and multiple can be selected). Example:

```php

array(
	'name' => 'Test Multi Checkbox',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_multicheckbox',
	'type' => 'multicheck',
	'options' => array(
		'check1' => 'Check One',
		'check2' => 'Check Two',
		'check3' => 'Check Three',
	)
),
```

#### `radio`
Standard radio buttons. Example:

```php
array(
	'name'    => 'Test Radio',
	'id'      => $prefix . 'test_radio',
	'type'    => 'radio',
	'options' => array(
		'standard' => __( 'Option One', 'cmb' ),
		'custom'   => __( 'Option Two', 'cmb' ),
		'none'     => __( 'Option Three', 'cmb' ),
	),
),
```

#### `radio_inline`
Inline radio buttons. Example:

```php
array(
	'name'    => 'Test Radio inline',
	'id'      => $prefix . 'test_radio_inline',
	'type'    => 'radio_inline',
	'options' => array(
		'standard' => __( 'Option One', 'cmb' ),
		'custom'   => __( 'Option Two', 'cmb' ),
		'none'     => __( 'Option Three', 'cmb' ),
	),
),
```

#### `select`
Standard select dropdown. Example:

```php
array(
	'name'    => 'Test Select',
	'desc'    => 'Select an option',
	'id'      => $prefix . 'test_select',
	'type'    => 'select',
	'options' => array(
		'standard' => __( 'Option One', 'cmb' ),
		'custom'   => __( 'Option Two', 'cmb' ),
		'none'     => __( 'Option Three', 'cmb' ),
	),
	'default' => 'custom',
),
```
##### Optional:

* All the types that take an `options` parameter can accept a callback. This callback will recieive the field object which you can use to check the object ID (`$field->object_id`). This can be handy if you need to build options based on the current post or context. The callback should return an array of options in the format displayed in these examples.
**Example**
```php
// in the field array..
	...
	'options' => 'show_cat_or_dog_options',
	...

// Callback function
function show_cat_or_dog_options( $field ) {

	if ( has_tag( 'cats', $field->object_id ) ) {
		return array(
			'tabby'   => __( 'Tabby', 'cmb' ),
			'siamese' => __( 'Siamese', 'cmb' ),
			'calico'  => __( 'Calico', 'cmb' ),
		);
	} else {
		return array(
			'german-shepherd' => __( 'German Shepherd', 'cmb' ),
			'bulldog'         => __( 'Bulldog', 'cmb' ),
			'poodle'          => __( 'Poodle', 'cmb' ),
		);
	}
}
```


#### `taxonomy_radio`
Radio buttons pre-populated with taxonomy terms. Example:

```php
array(
	'name' => 'Test Taxonomy Radio',
	'desc' => 'Description Goes Here',
	'id' => $prefix . 'text_taxonomy_radio',
	'taxonomy' => '', //Enter Taxonomy Slug
	'type' => 'taxonomy_radio',
),
```

#### `taxonomy_radio_inline`
Inline radio buttons pre-populated with taxonomy terms.

#### `taxonomy_select`
A select field pre-populated with taxonomy terms. Example:

```php
array(
	'name' => 'Test Taxonomy Select',
	'desc' => 'Description Goes Here',
	'id' => $prefix . 'text_taxonomy_select',
	'taxonomy' => 'category', //Enter Taxonomy Slug
	'type' => 'taxonomy_select',
),
```

#### `taxonomy_multicheck`
A field with checkboxes with taxonomy terms, and multiple terms can be selected

```php
array(
	'name' => 'Test Taxonomy Multicheck',
	'desc' => 'Description Goes Here',
	'id' => $prefix . 'text_taxonomy_multicheck',
	'taxonomy' => '', //Enter Taxonomy Slug
	'type' => 'taxonomy_multicheck',
),
```
#### `taxonomy_multicheck_inline`
Inline checkboxes with taxonomy terms.

**Note:** To retrieve the values from the taxonomy fields, use `get_the_terms`, not `get_post_meta`, etc.


#### `wysiwyg`
A metabox with TinyMCE editor (same as WordPress' visual editor). Example:

```php
array(
	'name' => 'Test wysiwyg',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_wysiwyg',
	'type' => 'wysiwyg',
	'options' => array(),
),
```
**Note:** Text added in a wysiwyg field will not have paragraph tags automatically added, the same is true of standard WordPress post content editing with the WYSIWYG. When outputting formatted text, wrap your get_post_meta() call with wpautop to generate the paragraph tags.

```php
<?php echo wpautop( get_post_meta( get_the_ID(), $prefix . 'test_wysiwyg', true ) ); ?>
```
If you want oembed filters to apply to the wysiwyg content, add this helper function to your theme or plugin:

```php
function yourprefix_get_wysiwyg_output( $meta_key, $post_id = 0 ) {
	global $wp_embed;

	$post_id = $post_id ? $post_id : get_the_id();

	$content = get_post_meta( 2, $meta_key, 1 );
	$content = $wp_embed->autoembed( $content );
	$content = $wp_embed->run_shortcode( $content );
	$content = do_shortcode( $content );
	$content = wpautop( $content );

	return $content;
}

...

echo yourprefix_get_wysiwyg_output( get_post_meta( get_the_ID(), $prefix . 'test_wysiwyg', true ) );
```

The options array allows you to customize the settings of the wysiwyg. Here's an example with all the options:
```php

array(
	'name' => 'Test wysiwyg',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_wysiwyg',
	'type' => 'wysiwyg',
	'options' => array(
	    'wpautop' => true, // use wpautop?
	    'media_buttons' => true, // show insert/upload button(s)
	    'textarea_name' => $editor_id, // set the textarea name to something different, square brackets [] can be used here
	    'textarea_rows' => get_option('default_post_edit_rows', 10), // rows="..."
	    'tabindex' => '',
	    'editor_css' => '', // intended for extra styles for both visual and HTML editors buttons, needs to include the `<style>` tags, can use "scoped".
	    'editor_class' => '', // add extra class(es) to the editor textarea
	    'teeny' => false, // output the minimal editor config used in Press This
	    'dfw' => false, // replace the default fullscreen with DFW (needs specific css)
	    'tinymce' => true, // load TinyMCE, can be used to pass settings directly to TinyMCE using an array()
	    'quicktags' => true // load Quicktags, can be used to pass settings directly to Quicktags using an array()
	),
),

```

#### `file`
A file uploader. By default it will store the file url and allow either attachments or URLs. This field type will also store the attachment ID (useful for getting different image sizes). It will store it in `$id . '_id'`, so if your field id is `test_image` the ID is stored in `test_image_id`. You can also limit it to only allowing attachments (can't manually type in a URL), which is also useful if you plan to use the attachment ID. The example shows its default values, with possible values commented inline. Example:

```php
array(
	'name' => 'Test File',
	'desc' => 'Upload an image or enter an URL.',
	'id' => $prefix . 'test_image',
	'type' => 'file',
	// 'allow' => array( 'url', 'attachment' ) // limit to just attachments with array( 'attachment' )
),
```
Example using the `test_image_id` to retrieve a medium image:
```php
$image = wp_get_attachment_image( get_post_meta( get_the_ID(), 'test_image_id', 1 ), 'medium' );
```

#### `file_list`
A file uploader that allows you to add as many files as you want. This is a repeatable field, and will store its data in an array, with the attachment ID as the array key and the attachment url as the value. Example:

```php
array(
	'name' => 'Test File List',
	'desc' => '',
	'id' => $prefix . 'file_list',
	'type' => 'file_list',
	// 'preview_size' => array( 100, 100 ), // Default: array( 50, 50 )
),
```
##### Extra Parameters:

* `preview_size` Changes the size of the preview images in the field. Default: array( 50, 50 ).

##### Sample function for getting and outputting `file_list` images

```php
/**
 * Sample template tag function for outputting a cmb2 file_list
 *
 * @param  string  $file_list_meta_key The field meta key. ($prefix . 'file_list')
 * @param  string  $img_size           Size of image to show
 */
function cmb2_output_file_list( $file_list_meta_key, $img_size = 'medium' ) {

	// Get the list of files
	$files = get_post_meta( get_the_ID(), $file_list_meta_key, 1 );

	echo '<div class="file-list-wrap">';
	// Loop through them and output an image
	foreach ( (array) $files as $attachment_id => $attachment_url ) {
		echo '<div class="file-list-image">';
		echo wp_get_attachment_image( $attachment_id, $img_size );
		echo '</div>';
	}
	echo '</div>';
}
```
##### To use in your template (in the loop):
```php
<?php cmb2_output_file_list( 'myprefix_file_list', 'small' ); ?>
```

#### `oembed`
Displays embedded media inline using WordPress' built-in oEmbed support. See [codex.wordpress.org/Embeds](http://codex.wordpress.org/Embeds) for more info and for a list of embed services supported. (added in 0.9.1)

```php
array(
	'name' => 'oEmbed',
	'desc' => 'Enter a youtube, twitter, or instagram URL. Supports services listed at <a href="http://codex.wordpress.org/Embeds">http://codex.wordpress.org/Embeds</a>.',
	'id' => $prefix . 'test_embed',
	'type' => 'oembed',
),
```
**Note:** Text added in a `oembed` field will not automatically display the embed in your theme. To generate the embed in your theme, this is a method you could use:

```php
$url = esc_html( cmb_get_option( 'cmb_options', 'video_url_option_id' ) );
echo wp_oembed_get( $url );
```

#### `group`
Hybrid field that supports adding other fields as a repeatable group. Example:

```php
array(
	'id'          => $prefix . 'repeat_group',
	'type'        => 'group',
	'description' => __( 'Generates reusable form entries', 'cmb' ),
	'options'     => array(
		'group_title'   => __( 'Entry {#}', 'cmb' ), // since version 1.1.4, {#} gets replaced by row number
		'add_button'    => __( 'Add Another Entry', 'cmb' ),
		'remove_button' => __( 'Remove Entry', 'cmb' ),
		'sortable'      => true, // beta
	),
	// Fields array works the same, except id's only need to be unique for this group. Prefix is not needed.
	'fields'      => array(
		array(
			'name' => 'Entry Title',
			'id'   => 'title',
			'type' => 'text',
			// 'repeatable' => true, // Repeatable fields are supported w/in repeatable groups (for most types)
		),
		array(
			'name' => 'Description',
			'description' => 'Write a short description for this entry',
			'id'   => 'description',
			'type' => 'textarea_small',
		),
		array(
			'name' => 'Entry Image',
			'id'   => 'image',
			'type' => 'file',
		),
		array(
			'name' => 'Image Caption',
			'id'   => 'image_caption',
			'type' => 'text',
		),
	),
),
```
All repeatable group entries will be saved as an array to that meta-key. Example usage to pull data back:

```php
$entries = get_post_meta( get_the_ID(), $prefix . 'repeat_group', true );

foreach ( (array) $entries as $key => $entry ) {

	$img = $title = $desc = $caption = '';

	if ( isset( $entry['title'] ) )
		$title = esc_html( $entry['title'] );

	if ( isset( $entry['description'] ) )
		$desc = wpautop( $entry['description'] );

	if ( isset( $entry['image_id'] ) ) {
		$img = wp_get_attachment_image( $entry['image_id'], 'share-pick', null, array(
			'class' => 'thumb',
		) );
	}
	$caption = isset( $entry['image_caption'] ) ? wpautop( $entry['image_caption'] ) : '';

	// Do something with the data
}
```

#### Custom Field Types

You can [define your own field types](/WebDevStudios/CMB2/wiki/Adding-your-own-field-types) as well.

#### Common Field Parameters

Most (if not all) fields support these parameters:

* `name`: The field label
* `desc`: Field description. Usually under or adjacent to the field input.
* `id`: The data key. If using for posts, will be the post-meta key. If using for an options page, will be the array key.
* `type`: What makes the whole thing work.
* `repeatable`: [Supported by most](https://github.com/WebDevStudios/CMB2#field-types), and will make the individual field a repeatable one.
* `default`: Specify a default value for the field.
* `show_names`: Hide label for the field.
* `options`: For fields that take an options array. These include: `select`, `radio`, `multicheck`, `wysiwyg` and `group`. Can also accept a callback.
* `before`, `after`, `before_row`, `after_row`, `before_field`, `after_field`: These allow you to add arbitrary text/markup at different points in the field markup. These also accept a callback.
* `on_front`: If you're planning on using your metabox fields on the front-end as well (user-facing), then you can specify that certain fields do not get displayed there by setting this parameter to `false`.
* <a name="attributes"></a>`attributes`: Will modify default attributes (class, input type, rows, etc), or add your own (placeholder, data attributes). Example:

	```php
	array(
		'name'        => 'Extra Small Textarea',
		'id'          => $prefix .'xtra_small_textarea',
		'type'        => 'textarea_small',
		'attributes'  => array(
			'placeholder' => 'A small amount of text',
			'rows'        => 3,
			'required'    => 'required',
		),
	),
	```
* `show_on_cb`: A callback to conditionally display a field. Callback funciton should return a boolean (true/false) value. Function passes in the current field object. Example:

	```php
	array(
		'name'       => __( 'Test Text', 'cmb' ),
		'id'         => $prefix . 'test_text',
		'type'       => 'text',
		'show_on_cb' => 'cmb_only_show_for_user_1', // function should return a bool value
	),

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
* `escape_cb`: Bypass the CMB escaping (escapes before display) methods with your own callback. Set to `false` if you do not want any escaping (not recommended).
* `sanitization_cb`: Bypass the CMB sanitization (sanitizes before saving) methods with your own callback. Set to `false` if you do not want any sanitization (not recommended).
