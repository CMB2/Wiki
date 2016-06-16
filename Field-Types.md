Here's the built-in fields you can include in your metabox. You can also [add your own field types](/WebDevStudios/CMB2/wiki/Adding-your-own-field-types).

Note that all the id fields should have proper prefixes. It's a good practice to create a unique prefix for your fields so you don't risk using the same id as another theme/plugin.

To see examples for how to define your prefixes, as well as examples of the field-types in use, please review the [example-functions.php](https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php) file. There is always a chance that the documentation is not 100% up-to-date, so reviewing this file is recommended.

## Types:
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
1. [`text_time`](#text_time) Time picker
1. [`select_timezone`](#select_timezone) Time zone dropdown
1. [`text_date_timestamp`](#text_date_timestamp) Date Picker (UNIX timestamp)
1. [`text_datetime_timestamp`](#text_datetime_timestamp) Text Date/Time Picker Combo (UNIX timestamp)
1. [`text_datetime_timestamp_timezone`](#text_datetime_timestamp_timezone) Text Date/Time Picker/Time zone Combo (serialized DateTime object)
1. [`hidden`](#hidden) Hidden input type
1. [`colorpicker`](#colorpicker) Color picker
1. [`radio`](#radio) *
1. [`radio_inline`](#radio_inline) *
1. [`taxonomy_radio`](#taxonomy_radio) *
1. [`taxonomy_radio_inline`](#taxonomy_radio_inline) *
1. [`select`](#select)
1. [`taxonomy_select`](#taxonomy_select) *
1. [`checkbox`](#checkbox) *
1. [`multicheck` and `multicheck_inline`](#multicheck-and-multicheck_inline)
1. [`taxonomy_multicheck`](#taxonomy_multicheck) *
1. [`taxonomy_multicheck_inline`](#taxonomy_multicheck_inline)
1. [`wysiwyg`](#wysiwyg) (TinyMCE) *
1. [`file`](#file) Image/File upload *†
1. [`file_list`](#file_list) Image/File list upload
1. [`oembed`](#oembed) Converts oembed urls (instagram, twitter, youtube, etc. [oEmbed in the Codex](https://codex.wordpress.org/Embeds))
1. [`group`](#group) Hybrid field that supports adding other fields as a repeatable group. *

#### More Info
* [Create your own field type](https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-field-types)
* [Common field parameters shared by all fields](/WebDevStudios/CMB2/wiki/Field-Parameters)

\* Not available as a repeatable field  
† Use `file_list` for repeatable  

### `title`
____
A large title (useful for breaking up sections of fields in metabox). Example:

```php
$cmb->add_field( array(
	'name' => 'Test Title',
	'desc' => 'This is a title description',
	'type' => 'title',
	'id'   => 'wiki_test_title'
) );
```
##### CSS Field Class:
`cmb-type-title`

### `text`
____
Standard text field (large). Example:

```php
$cmb->add_field( array(
	'name'    => 'Test Text',
	'desc'    => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id'      => 'wiki_test_text',
	'type'    => 'text',
) );
```

##### CSS Field Class:
`cmb-type-text`

### `text_small`
____
Small text field. Example:

```php
$cmb->add_field( array(
	'name'    => 'Test Text Small',
	'desc'    => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id'      => 'wiki_test_textsmall',
	'type'    => 'text_small'
) );
```

##### CSS Field Class:
`cmb-type-text-small`

### `text_medium`
____
Medium text field. Example:

```php
$cmb->add_field( array(
	'name'    => 'Test Text Medium',
	'desc'    => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id'      => 'wiki_test_textmedium',
	'type'    => 'text_medium'
) );
```

##### CSS Field Class:
`cmb-type-text-medium`

### `text_email`
____
Standard text field which enforces an email address. Example:

```php
$cmb->add_field( array(
	'name' => 'Test Text Email',
	'id'   => 'wiki_test_email',
	'type' => 'text_email',
) );
```

##### CSS Field Class:
`cmb-type-text-email`

### `text_url`
____
Standard text field which enforces a url. Example:

```php
$cmb->add_field( array(
	'name' => __( 'Website URL', 'cmb2' ),
	'id'   => 'wiki_test_facebookurl',
	'type' => 'text_url',
	// 'protocols' => array( 'http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet' ), // Array of allowed protocols
) );
```

##### CSS Field Class:
`cmb-type-text-url`

### `text_money`
____
Standard text field with dollar sign in front of it (useful to prevent users from adding a dollar sign to input). Example:

```php
$cmb->add_field( array(
	'name' => 'Test Money',
	'desc' => 'field description (optional)',
	'id' => 'wiki_test_textmoney',
	'type' => 'text_money',
	// 'before_field' => '£', // Replaces default '$'
) );
```

##### CSS Field Class:
`cmb-type-text-money`

### `textarea`
____
Standard textarea. Example:

```php
$cmb->add_field( array(
	'name' => 'Test Text Area',
	'desc' => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id' => 'wiki_test_textarea',
	'type' => 'textarea'
) );
```

##### CSS Field Class:
`cmb-type-textarea`

### `textarea_small`
____
Smaller textarea. Example:

```php
$cmb->add_field( array(
	'name' => 'Test Text Area Small',
	'desc' => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id' => 'wiki_test_textareasmall',
	'type' => 'textarea_small'
) );
```

##### CSS Field Class:
`cmb-type-textarea-small`

### `textarea_code`
____
Code textarea. Example:

```php
$cmb->add_field( array(
	'name' => 'Test Text Area Code',
	'desc' => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id' => 'wiki_test_textareacode',
	'type' => 'textarea_code'
) );
```

##### CSS Field Class:
`cmb-type-textarea-code`


### `text_time`
____
Time picker field. Example:

```php
$cmb->add_field( array(
	'name' => 'Test Date Picker',
	'id' => 'wiki_test_texttime',
	'type' => 'text_time'
	// 'time_format' => 'h:i:s A',
) );
```

##### CSS Field Class:
`cmb-type-text-time`

##### Custom Field Attributes:

* `time_format`, defaults to 'h:i A'. See [php.net/manual/en/function.date.php](http://php.net/manual/en/function.date.php).


### `select_timezone`
____
Timezone field. Example:

```php
$cmb->add_field( array(
	'name' => 'Time zone',
	'id'   => 'wiki_test_timezone',
	'type' => 'select_timezone',
) );
```

##### CSS Field Class:
`cmb-type-select-timezone`


### `text_date_timestamp`
____
Date field, stored as UNIX timestamp. Useful if you plan to query based on it (ex: [events listing](http://www.billerickson.net/code/event-query/) ). Example:

```php
$cmb->add_field( array(
	'name' => 'Test Date Picker (UNIX timestamp)',
	'id'   => 'wiki_test_textdate_timestamp',
	'type' => 'text_date_timestamp',
	// 'timezone_meta_key' => 'wiki_test_timezone',
	// 'date_format' => 'l jS \of F Y',
) );
```

##### CSS Field Class:
`cmb-type-text-date-timestamp`

##### Alias:
`text_date`

##### Custom Field Attributes:

* `timezone_meta_key`, Optionally make this field honor the timezone selected in the [`select_timezone`](/WebDevStudios/CMB2/wiki/Field-Types#select_timezone) field specified above.
* `date_format`, defaults to 'm/d/Y'. See [php.net/manual/en/function.date.php](http://php.net/manual/en/function.date.php).


### `text_datetime_timestamp`
____
Date and time field, stored as UNIX timestamp. Example:

```php
$cmb->add_field( array(
	'name' => 'Test Date/Time Picker Combo (UNIX timestamp)',
	'id'   => 'wiki_test_datetime_timestamp',
	'type' => 'text_datetime_timestamp',
) );
```

##### CSS Field Class:
`cmb-type-text-datetime-timestamp`

### `text_datetime_timestamp_timezone`
____
Date, time and timezone field, stored as serialized DateTime object. Example:

```php
$cmb->add_field( array(
	'name' => 'Test Date/Time Picker/Time zone Combo (serialized DateTime object)',
	'id'   => 'wiki_test_datetime_timestamp_timezone',
	'type' => 'text_datetime_timestamp_timezone',
) );
```

##### CSS Field Class:
`cmb-type-datetime-timestamp-timezone`

### `hidden`
____
Adds a `hidden` input type to the bottom of the CMB2 output. Example:

```php
$cmb->add_field( array(
	'id'   => 'wiki_test_hidden',
	'type' => 'hidden',
) );
```

##### CSS Field Class:
not applicable to this field type.

### `colorpicker`
____
A colorpicker field. Example:

```php
$cmb->add_field( array(
	'name'    => 'Test Color Picker',
	'id'      => 'wiki_test_colorpicker',
	'type'    => 'colorpicker',
	'default' => '#ffffff',
) );
```

##### CSS Field Class:
`cmb-type-colorpicker`

### `checkbox`
____
Standard checkbox. Example:

```php
$cmb->add_field( array(
	'name' => 'Test Checkbox',
	'desc' => 'field description (optional)',
	'id'   => 'wiki_test_checkbox',
	'type' => 'checkbox',
) );
```

##### CSS Field Class:
`cmb-type-checkbox`

### `multicheck` and `multicheck_inline`
____
A field with multiple checkboxes (and multiple can be selected). Example:

```php
$cmb->add_field( array(
	'name'    => 'Test Multi Checkbox',
	'desc'    => 'field description (optional)',
	'id'      => 'wiki_test_multicheckbox',
	'type'    => 'multicheck',
	'options' => array(
		'check1' => 'Check One',
		'check2' => 'Check Two',
		'check3' => 'Check Three',
	),
) );
```

##### CSS Field Class:
`cmb-type-multicheck`

##### Custom Field Attributes:

* `'select_all_button' => false`, Setting to false disables the 'Select All' button

### `radio`
____
Standard radio buttons. Example:

```php
$cmb->add_field( array(
	'name'             => 'Test Radio',
	'id'               => 'wiki_test_radio',
	'type'             => 'radio',
	'show_option_none' => true,
	'options'          => array(
		'standard' => __( 'Option One', 'cmb2' ),
		'custom'   => __( 'Option Two', 'cmb2' ),
		'none'     => __( 'Option Three', 'cmb2' ),
	),
) );
```
Set the optional paremter, `show_option_none`, to `true` to use the default text, 'None', or specify another value, i.e. 'No selection'. By default `show_option_none` is false.

##### CSS Field Class:
`cmb-type-radio`

### `radio_inline`
____
Inline radio buttons. Example:

```php
$cmb->add_field( array(
	'name'    => 'Test Radio inline',
	'id'      => 'wiki_test_radio_inline',
	'type'    => 'radio_inline',
	'options' => array(
		'standard' => __( 'Option One', 'cmb2' ),
		'custom'   => __( 'Option Two', 'cmb2' ),
		'none'     => __( 'Option Three', 'cmb2' ),
	),
) );
```

##### CSS Field Class:
`cmb-type-radio-inline`

### `select`
____
Standard select dropdown. Example:

```php
$cmb->add_field( array(
	'name'             => 'Test Select',
	'desc'             => 'Select an option',
	'id'               => 'wiki_test_select',
	'type'             => 'select',
	'show_option_none' => true,
	'default'          => 'custom',
	'options'          => array(
		'standard' => __( 'Option One', 'cmb2' ),
		'custom'   => __( 'Option Two', 'cmb2' ),
		'none'     => __( 'Option Three', 'cmb2' ),
	),
) );
```
Set the optional paremeter, `show_option_none`, to `true` to use the default text, 'None', or specify another value, i.e. 'No selection'. By default `show_option_none` is false.

##### CSS Field Class:
`cmb-type-select`

##### Optional:

* All the types that take an `'options'` parameter can be replaced with an `'options_cb'` parameter that allows you to specify a callback. This callback will receive the field object which you can use to check the object ID (`$field->object_id`). This can be handy if you need to build options based on the current post or context. The callback should return an array of options in the format displayed in these examples.

**Example:**
```php
	// in the field array..
	'options_cb' => 'show_cat_or_dog_options',
```
```php
// Callback function
function show_cat_or_dog_options( $field ) {

	if ( has_tag( 'cats', $field->object_id ) ) {
		return array(
			'tabby'   => __( 'Tabby', 'cmb2' ),
			'siamese' => __( 'Siamese', 'cmb2' ),
			'calico'  => __( 'Calico', 'cmb2' ),
		);
	} else {
		return array(
			'german-shepherd' => __( 'German Shepherd', 'cmb2' ),
			'bulldog'         => __( 'Bulldog', 'cmb2' ),
			'poodle'          => __( 'Poodle', 'cmb2' ),
		);
	}
}
```

##### Notes

If you need the label value wherever you are using the select field's value (vs just the value), you can define your options in a function, and get the label by comparing the value against the array given by the function. [Example here](http://wordpress.stackexchange.com/a/220703/45740).

### `taxonomy_radio`
____
Radio buttons pre-populated with taxonomy terms. Example:

```php
$cmb->add_field( array(
	'name'      => 'Test Taxonomy Radio',
	'desc'      => 'Description Goes Here',
	'id'        => 'wiki_test_taxonomy_radio',
	'taxonomy'  => '', // Enter Taxonomy Slug
	'type'      => 'taxonomy_radio',
	// Optional :
	'text'      => array(
		'no_terms_text' => 'Sorry, no terms could be found.' // Change default text. Default: "No terms"
	),
) );
```

##### CSS Field Class:
`cmb-type-taxonomy-radio`

### `taxonomy_radio_inline`
____
Inline radio buttons pre-populated with taxonomy terms.

##### CSS Field Class:
`cmb-type-taxonomy-radio-inline`

### `taxonomy_select`
____
A select field pre-populated with taxonomy terms. Example:

```php
$cmb->add_field( array(
	'name'     => 'Test Taxonomy Select',
	'desc'     => 'Description Goes Here',
	'id'       => 'wiki_test_taxonomy_select',
	'taxonomy' => 'category', //Enter Taxonomy Slug
	'type'     => 'taxonomy_select',
) );
```

##### CSS Field Class:
`cmb-type-taxonomy-select`

### `taxonomy_multicheck`
____
A field with checkboxes with taxonomy terms, and multiple terms can be selected

```php
$cmb->add_field( array(
	'name'      => 'Test Taxonomy Multicheck',
	'desc'      => 'Description Goes Here',
	'id'        => 'wiki_test_taxonomy_multicheck',
	'taxonomy'  => '', //Enter Taxonomy Slug
	'type'      => 'taxonomy_multicheck',
	// Optional :
	'text'      => array(
		'no_terms_text' => 'Sorry, no terms could be found.' // Change default text. Default: "No terms"
	),
) );
```

##### CSS Field Class:
`cmb-type-taxonomy-multicheck`

##### Custom Field Attributes:

* `'select_all_button' => false`, Setting to false disables the 'Select All' button

### `taxonomy_multicheck_inline`
____
Inline checkboxes with taxonomy terms.

##### CSS Field Class:
`cmb-type-taxonomy-multicheck-inline`

##### Custom Field Attributes:

* `'select_all_button' => false`, Setting to false disables the 'Select All' button

##### Notes
To retrieve the values from the taxonomy fields, use `get_the_terms`, not `get_post_meta`, etc. The taxonomy fields are not intended to provide an arbitrary list of terms to pick from, but are intended to be a replacement for the default taxonomy meta-boxes. I.e. they are meant to set the taxonomy terms on an object, and will not save as a meta value. Any other use of these types will be hacky and/or buggy. Suggest looking at building a custom field type instead - [Example](https://github.com/WebDevStudios/CMB2/wiki/Tips-&-Tricks#a-dropdown-for-taxonomy-terms-which-does-not-set-the-term-on-the-post).


### `wysiwyg`
____
A metabox with TinyMCE editor (same as WordPress' visual editor). Example:

```php
$cmb->add_field( array(
	'name'    => 'Test wysiwyg',
	'desc'    => 'field description (optional)',
	'id'      => 'wiki_test_wysiwyg',
	'type'    => 'wysiwyg',
	'options' => array(),
) );
```

##### CSS Field Class:
`cmb-type-wysiwyg`

##### Notes
Text added in a wysiwyg field will not have paragraph tags automatically added, the same is true of standard WordPress post content editing with the WYSIWYG. When outputting formatted text, wrap your get_post_meta() call with wpautop to generate the paragraph tags.

```php
<?php echo wpautop( get_post_meta( get_the_ID(), 'wiki_test_wysiwyg', true ) ); ?>
```
If you want oembed filters to apply to the wysiwyg content, add this helper function to your theme or plugin:

```php
function yourprefix_get_wysiwyg_output( $meta_key, $post_id = 0 ) {
	global $wp_embed;

	$post_id = $post_id ? $post_id : get_the_id();

	$content = get_post_meta( $post_id, $meta_key, 1 );
	$content = $wp_embed->autoembed( $content );
	$content = $wp_embed->run_shortcode( $content );
	$content = do_shortcode( $content );
	$content = wpautop( $content );

	return $content;
}

...

echo yourprefix_get_wysiwyg_output( 'wiki_test_wysiwyg', get_the_ID() );
```

The options array allows you to customize the settings of the wysiwyg. Here's an example with all the options:

```php
array(
	'name'    => 'Test wysiwyg',
	'desc'    => 'field description (optional)',
	'id'      => 'wiki_test_wysiwyg',
	'type'    => 'wysiwyg',
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

The `'id'` should not be set to 'content' as the standard editor has this id and it will result in a non working editor.

### `file`
____
A file uploader. By default it will store the file url and allow either attachments or URLs. This field type will also store the attachment ID (useful for getting different image sizes). It will store it in `$id . '_id'`, so if your field id is `_wiki_test_image` the ID is stored in `_wiki_test_image_id`. You can also limit it to only allowing attachments (can't manually type in a URL), which is also useful if you plan to use the attachment ID. The example shows its default values, with possible values commented inline. Example:

```php
$cmb->add_field( array(
	'name'    => 'Test File',
	'desc'    => 'Upload an image or enter an URL.',
	'id'      => 'wiki_test_image',
	'type'    => 'file',
	// Optional:
	'options' => array(
		'url' => false, // Hide the text input for the url
	),
	'text'    => array(
		'add_upload_file_text' => 'Add File' // Change upload button text. Default: "Add or Upload File"
	),
) );
```

##### CSS Field Class:
`cmb-type-file`

Example using the `_wiki_test_image_id` to retrieve a medium image:
```php
$image = wp_get_attachment_image( get_post_meta( get_the_ID(), 'wiki_test_image_id', 1 ), 'medium' );
```

### `file_list`
____
A file uploader that allows you to add as many files as you want. This is a repeatable field, and will store its data in an array, with the attachment ID as the array key and the attachment url as the value. Example:

```php
$cmb->add_field( array(
	'name' => 'Test File List',
	'desc' => '',
	'id'   => 'wiki_test_file_list',
	'type' => 'file_list',
	// 'preview_size' => array( 100, 100 ), // Default: array( 50, 50 )
	// Optional, override default text strings
	'text' => array(
		'add_upload_files_text' => 'Replacement', // default: "Add or Upload Files"
		'remove_image_text' => 'Replacement', // default: "Remove Image"
		'file_text' => 'Replacement', // default: "File:"
		'file_download_text' => 'Replacement', // default: "Download"
		'remove_text' => 'Replacement', // default: "Remove"
	),
) );
```

##### CSS Field Class:
`cmb-type-file-list`

##### Custom Field Attributes:

* `preview_size` Changes the size of the preview images in the field. Default: array( 50, 50 ).

##### Sample function for getting and outputting `file_list` images

```php
/**
 * Sample template tag function for outputting a cmb2 file_list
 *
 * @param  string  $file_list_meta_key The field meta key. ('wiki_test_file_list')
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
<?php cmb2_output_file_list( 'wiki_test_file_list', 'small' ); ?>
```

### `oembed`
____
Displays embedded media inline using WordPress' built-in oEmbed support. See [codex.wordpress.org/Embeds](http://codex.wordpress.org/Embeds) for more info and for a list of embed services supported. (added in 0.9.1)

```php
$cmb->add_field( array(
	'name' => 'oEmbed',
	'desc' => 'Enter a youtube, twitter, or instagram URL. Supports services listed at <a href="http://codex.wordpress.org/Embeds">http://codex.wordpress.org/Embeds</a>.',
	'id'   => 'wiki_test_embed',
	'type' => 'oembed',
) );
```

##### CSS Field Class:
`cmb-type-oembed`

##### Notes
Text added in a `oembed` field will not automatically display the embed in your theme. To generate the embed in your theme, this is a method you could use:

```php
$url = esc_url( get_post_meta( get_the_ID(), 'wiki_test_embed', 1 ) );
echo wp_oembed_get( $url );
```

### `group`
____
Hybrid field that supports adding other fields as a repeatable group. Example:

```php
$group_field_id = $cmb->add_field( array(
	'id'          => 'wiki_test_repeat_group',
	'type'        => 'group',
	'description' => __( 'Generates reusable form entries', 'cmb2' ),
	// 'repeatable'  => false, // use false if you want non-repeatable group
	'options'     => array(
		'group_title'   => __( 'Entry {#}', 'cmb2' ), // since version 1.1.4, {#} gets replaced by row number
		'add_button'    => __( 'Add Another Entry', 'cmb2' ),
		'remove_button' => __( 'Remove Entry', 'cmb2' ),
		'sortable'      => true, // beta
		// 'closed'     => true, // true to have the groups closed by default
	),
) );

// Id's for group's fields only need to be unique for the group. Prefix is not needed.
$cmb->add_group_field( $group_field_id, array(
	'name' => 'Entry Title',
	'id'   => 'title',
	'type' => 'text',
	// 'repeatable' => true, // Repeatable fields are supported w/in repeatable groups (for most types)
) );

$cmb->add_group_field( $group_field_id, array(
	'name' => 'Description',
	'description' => 'Write a short description for this entry',
	'id'   => 'description',
	'type' => 'textarea_small',
) );

$cmb->add_group_field( $group_field_id, array(
	'name' => 'Entry Image',
	'id'   => 'image',
	'type' => 'file',
) );

$cmb->add_group_field( $group_field_id, array(
	'name' => 'Image Caption',
	'id'   => 'image_caption',
	'type' => 'text',
) );
```

##### CSS Field Class:
`cmb-field-list`

All repeatable group entries will be saved as an array to that meta-key. Example usage to pull data back:

```php
$entries = get_post_meta( get_the_ID(), 'wiki_test_repeat_group', true );

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
##### Custom Field Attributes:

The `group` field type supports several a few extra parameters:

* `'before_group'`
* `'after_group'`
* `'before_group_row'`
* `'after_group_row'`

They are documented on the [Field Parameters page](/WebDevStudios/CMB2/wiki/Field-Parameters#before_group-after_group-before_group_row-after_group_row).

## Custom Field Types
You can [define your own field types](/WebDevStudios/CMB2/wiki/Adding-your-own-field-types) as well.

## Common Field Parameters
Common field parameters are now [documented on this page](/WebDevStudios/CMB2/wiki/Field-Parameters). The below anchors are in place to keep incoming links from breaking.

* <a name="param-name"></a>[`name`](/WebDevStudios/CMB2/wiki/Field-Parameters#name)
* <a name="param-desc"></a>[`desc`](/WebDevStudios/CMB2/wiki/Field-Parameters#desc)
* <a name="param-id"></a>[`id`](/WebDevStudios/CMB2/wiki/Field-Parameters#id)
* <a name="param-type"></a>[`type`](/WebDevStudios/CMB2/wiki/Field-Parameters#type)
* <a name="param-repeatable"></a>[`repeatable`](/WebDevStudios/CMB2/wiki/Field-Parameters#repeatable)
* <a name="param-default"></a>[`default`](/WebDevStudios/CMB2/wiki/Field-Parameters#default)
* <a name="param-show_names"></a>[`show_names`](/WebDevStudios/CMB2/wiki/Field-Parameters#show_names)
* <a name="options"></a>[`options`](/WebDevStudios/CMB2/wiki/Field-Parameters#options)
* <a name="before-after-callbacks"></a>[`before`, `after`, `before_row`, `after_row`, `before_field`, `after_field`](/WebDevStudios/CMB2/wiki/Field-Parameters#before-after-before_row-after_row-before_field-after_field)
* <a name="row_classes"></a>[`row_classes`](/WebDevStudios/CMB2/wiki/Field-Parameters#row_classes)
* <a name="on_front"></a>[`on_front`](/WebDevStudios/CMB2/wiki/Field-Parameters#on_front)
* <a name="attributes"></a>[`attributes`](/WebDevStudios/CMB2/wiki/Field-Parameters#attributes)
* <a name="show_on_cb"></a>[`show_on_cb`](/WebDevStudios/CMB2/wiki/Field-Parameters#show_on_cb)
* <a name="options_cb"></a>[`options_cb`](/WebDevStudios/CMB2/wiki/Field-Parameters#options_cb)
* <a name="escape_cb"></a>[`escape_cb`](/WebDevStudios/CMB2/wiki/Field-Parameters#escape_cb)
* <a name="sanitization_cb"></a>[`sanitization_cb`](/WebDevStudios/CMB2/wiki/Field-Parameters#sanitization_cb)
* <a name="render_row_cb"></a>[`render_row_cb`](/WebDevStudios/CMB2/wiki/Field-Parameters#render_row_cb)
