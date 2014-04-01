Here's the built-in fields you can include in your metabox. You can also [add your own field types](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Adding-your-own-field-types).

Note that all the id's have $prefix in them. It's a good practice to create a unique prefix for your fields so you don't risk using the same id as another theme/plugin. Take a look at [example-functions.php](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/blob/master/example-functions.php) to see how you define the prefix. 

Not all built-in fields have been documented, so please see the example file for more types.

#### Types:
1. [`title`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#title)
1. [`text`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text)
1. [`text_small`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text_small)
1. [`text_medium`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text_medium)
1. [`text_email`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text_email)
1. [`text_url`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text_url)
1. [`text_money`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text_money)
1. [`textarea`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#textarea)
1. [`textarea_small`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#textarea_small)
1. [`textarea_code`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#textarea_code)
1. [`text_date`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text_date)
1. [`text_time`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text_time)
1. [`select_timezone`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#select_timezone)
1. [`text_date_timestamp`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text_date_timestamp)
1. [`text_datetime_timestamp`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text_datetime_timestamp)
1. [`text_datetime_timestamp_timezone`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#text_datetime_timestamp_timezone)
1. [`colorpicker`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#colorpicker)
1. [`radio`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#radio)
1. [`radio_inline`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#radio_inline)
1. [`taxonomy_radio`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#taxonomy_radio)
1. [`taxonomy_radio_inline`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#taxonomy_radio_inline)
1. [`select`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#select)
1. [`taxonomy_select`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#taxonomy_select)
1. [`checkbox`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#checkbox)
1. [`multicheck`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#multicheck)
1. [`taxonomy_multicheck`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#taxonomy_multicheck)
1. [`taxonomy_multicheck_inline`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#taxonomy_multicheck_inline)
1. [`wysiwyg`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#wysiwyg)
1. [`file`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#file)
1. [`file_list`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#file_list)
1. [`oembed`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#oembed)
1. [`group`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#group)
1. [Custom Field Types](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#Custom)

#### `title`
A large title (useful for breaking up sections of fields in metabox). Example:

```php
array(
	'name' => 'Test Title',
	'desc' => 'This is a title description',
	'type' => 'title',
	'id' => $prefix . 'test_title'
),
```

#### `text`
Standard text field (large). Example:

```php
array(
	'name' => 'Test Text',
	'desc' => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id' => $prefix . 'test_text',
	'type' => 'text'
),
```

#### `text_small`
Small text field. Example:

```php
array(
	'name' => 'Test Text Small',
	'desc' => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id' => $prefix . 'test_textsmall',
	'type' => 'text_small'
),
```

#### `text_medium`
Medium text field. Example:

```php
array(
	'name' => 'Test Text Medium',
	'desc' => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id' => $prefix . 'test_textmedium',
	'type' => 'text_medium'
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
	'name' => __( 'Facebook URL', 'cmb' ),
	'id'   => $prefix . 'facebookurl',
	'type' => 'text_url',
),
```

#### `text_money`
Standard text field with dollar sign in front of it (useful to prevent users from adding a dollar sign to input). Example:

```php
array(
	'name' => 'Test Money',
	'desc' => 'field description (optional)',
	'default' => 'standard value (optional)',
	'id' => $prefix . 'test_textmoney',
	'type' => 'text_money',
	// 'before' => '£', // Replaces default '$'
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
),
```

#### `text_time`
Time picker field. Example:

```php
array(
	'name' => 'Test Date Picker',
	'id' => $prefix . 'test_texttime',
	'type' => 'text_time'
),
```

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
	// 'timezone_meta_key' => $prefix . 'timezone', // Optionally make this field honor the timezone selected in the [`select_timezone`](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Field-Types#select_timezone) field specified above
	'repeatable' => true,
),
```

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
	'repeatable' => true,
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
**Note:** Text added in a wysiwyg field will not have paragraph tags automatically added, the same is true of  standard WordPress post content editing with the WYSIWYG. When outputting formatted text, wrap your get_post_meta() call with wpautop to generate the paragraph tags.

```
echo wpautop( get_post_meta( get_the_ID(), $prefix . 'test_wysiwyg', true ) );
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
	'allow' => array( 'url', 'attachment' ) // limit to just attachments with array( 'attachment' )
),
```
Example using the `test_image_id` to retrieve a medium image:
```php
$image = wp_get_attachment_image( get_post_meta( get_the_ID(), 'test_image_id', 'medium' );
```

#### `file_list`
A file uploader that allows you to add as many files as you want. This is a repeatable field, and will store its data in an array. Example:

```php
array(
	'name' => 'Test File List',
	'desc' => '',
	'id' => $prefix . 'file_list',
	'type' => 'file_list',
),
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

```
echo apply_filters( 'the_content', get_post_meta( get_the_ID(), $prefix . 'test_embed', true ) );
```

#### `group`
Hybrid field that supports adding other fields as a repeatable group. Example:

```php
array(
	'id'          => $prefix . 'repeat_group',
	'type'        => 'group',
	'description' => __( 'Generates reusable form entries', 'cmb' ),
	'options'     => array(
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

#### Custom Field Types

You can [define your own field types](/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Adding-your-own-field-types) as well.
