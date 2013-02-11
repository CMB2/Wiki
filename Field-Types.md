Here's the built-in fields you can include in your metabox. You can also [add your own field types](https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Adding-your-own-field-types). 

Note that all the id's have $prefix in them. It's a good practice to create a unique prefix for your fields so you don't risk using the same id as another theme/plugin. Take a look at [example-functions.php](https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress/blob/master/example-functions.php) to see how you define the prefix.

`title` - A large title (useful for breaking up sections of fields in metabox). Example:

```php
array(
	'name' => 'Test Title',
	'desc' => 'This is a title description',
	'type' => 'title',
	'id' => $prefix . 'test_title'
),
```

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

`textarea` - Standard textarea. Example:

```php
array(
	'name' => 'Test Text Area',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_textarea',
	'type' => 'textarea'
),
```

`textarea_small` - Smaller textarea. Example:

```php
array(
	'name' => 'Test Text Area Small',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_textareasmall',
	'type' => 'textarea_small'
),
```

`select` - Standard select dropdown. Example:

```php
array(
	'name' => 'Test Select',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_select',
	'type' => 'select',
	'options' => array(
		array('name' => 'Option One', 'value' => 'standard'),
		array('name' => 'Option Two', 'value' => 'custom'),
		array('name' => 'Option Three', 'value' => 'none')				
	)
),
```

`radio_inline` - Inline radio buttons. Example:

```php
array(
	'name' => 'Test Radio inline',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_radio',
	'type' => 'radio_inline',
	'options' => array(
		array('name' => 'Option One', 'value' => 'standard'),
		array('name' => 'Option Two', 'value' => 'custom'),
		array('name' => 'Option Three', 'value' => 'none')				
	)
),
```

`radio` - Standard radio buttons. Example: 

```php
array(
	'name' => 'Test Radio',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_radio',
	'type' => 'radio',
	'options' => array(
		array('name' => 'Option One', 'value' => 'standard'),
		array('name' => 'Option Two', 'value' => 'custom'),
		array('name' => 'Option Three', 'value' => 'none')				
	)
),
```

`checkbox` - Standard checkbox. Example:

```php
array(
	'name' => 'Test Checkbox',
	'desc' => 'field description (optional)',
	'id' => $prefix . 'test_checkbox',
	'type' => 'checkbox'
),
```

`multicheck` - A field with multiple checkboxes (and multiple can be selected). Example:

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

`wysiwyg` - A metabox with TinyMCE editor (same as WordPress' visual editor). Example:

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
	    'editor_css' => '', // intended for extra styles for both visual and HTML editors buttons, needs to include the <style> tags, can use "scoped".
	    'editor_class' => '', // add extra class(es) to the editor textarea
	    'teeny' => false, // output the minimal editor config used in Press This
	    'dfw' => false, // replace the default fullscreen with DFW (needs specific css)
	    'tinymce' => true, // load TinyMCE, can be used to pass settings directly to TinyMCE using an array()
	    'quicktags' => true // load Quicktags, can be used to pass settings directly to Quicktags using an array()	
	),
),

```

`taxonomy_select` - A select field pre-populated with taxonomy terms. Example:

```php
array(
	'name' => 'Test Taxonomy Select',
	'desc' => 'Description Goes Here',
	'id' => $prefix . 'text_taxonomy_select',
	'taxonomy' => 'category', //Enter Taxonomy Slug
	'type' => 'taxonomy_select',	
),
```

`taxonomy_radio` - Radio buttons pre-populated with taxonomy terms. Example:

```php
array(
	'name' => 'Test Taxonomy Radio',
	'desc' => 'Description Goes Here',
	'id' => $prefix . 'text_taxonomy_radio',
	'taxonomy' => '', //Enter Taxonomy Slug
	'type' => 'taxonomy_radio',	
),
```

`taxonomy_multicheck` - A field with checkboxes with taxonomy terms, and multiple terms can be selected

```php
array(
	'name' => 'Test Taxonomy Multicheck',
	'desc' => 'Description Goes Here',
	'id' => $prefix . 'text_taxonomy_multicheck',
	'taxonomy' => '', //Enter Taxonomy Slug
	'type' => 'taxonomy_multicheck',	
),
```

`file` - A file uploader. By default it will store the file url and allow either attachments or URLs. You can use the 'save_id' field to make it also store the attachment ID (useful for getting different image sizes). It will store it in `$id . '_id'`, so if your field id is `test_image` the ID is stored in `test_image_id`. You can also limit it to only allowing attachments (can't manually type in a URL), which is also useful if you plan to use the attachment ID. The example shows its default values, with possible values commented inline. Example:

```php
array(
	'name' => 'Test File',
	'desc' => 'Upload an image or enter an URL.',
	'id' => $prefix . 'test_image',
	'type' => 'file',
	'save_id' => false, // save ID using true
	'allow' => array( 'url', 'attachment' ) // limit to just attachments with array( 'attachment' )
),
```

`file_list` - Displays all files attached to the post and has a file uploader. Example:

```php
array(
	'name' => 'Test File List',
	'desc' => '',
	'id' => $prefix . 'file_list',
	'type' => 'file_list',
),
```

`oembed` - Displays embedded media inline using WordPress' built-in oEmbed support. See [codex.wordpress.org/Embeds](http://codex.wordpress.org/Embeds) for more info and for a list of embed services supported. (added in 0.9.1)

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

### Custom Field Types

You can [define your own field types](https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Adding-your-own-field-types) as well.