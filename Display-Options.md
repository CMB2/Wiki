Metaboxes should be context-specific, and only show up when relevant. There's two tools you can use to limit their display:

* pages - limits the post types it applies to
* show_on - can limit to specific page/post IDs, page templates, or [any other show_on filter you define](https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters)

Both of these are used when you define your metabox.

### Limit to specific post types

For every metabox you create, you should specify the post types to which it applies. They'll be listed as an array. Here's an example that only applies to pages:

```php
	$meta_boxes[] = array(
		'id' => 'test_metabox',
		'title' => 'Test Metabox',
		'pages' => array('page'), // post type
		'context' => 'normal', //  'normal', 'advanced', or 'side'
		'priority' => 'high',  //  'high', 'core', 'default' or 'low'
		'show_names' => true, // Show field names on the left
		'fields' => array( ...
```

Here's an example that displays on posts and events:

```php

	$meta_boxes[] = array(
		'id' => 'test_metabox',
		'title' => 'Test Metabox',
		'pages' => array('post', 'event'), // post type
		'context' => 'normal', //  'normal', 'advanced', or 'side'
		'priority' => 'high',  //  'high', 'core', 'default' or 'low'
		'show_names' => true, // Show field names on the left
		'fields' => array(
```

### Limit to specific IDs

Let's say you have two pages, About Us (page ID - 50) and Contact Us (page ID - 24). You created a Contact Information metabox that you want only displaying on these two pages. Here's what the beginning of your metabox might look like.

```php

	$meta_boxes[] = array(
		'id' => 'contact-information',
		'title' => 'Contact Information',
		'pages' => array('page'), // post type
		'show_on' => array( 'key' => 'id', 'value' => array( 50, 24 ) ),
		'context' => 'normal', //  'normal', 'advanced', or 'side'
		'priority' => 'high',  //  'high', 'core', 'default' or 'low'
		'show_names' => true, // Show field names on the left
		'fields' => array(
```

The type of show_on filter (key) is "id" and the value for that filter is an array of your IDs. If you only wanted it on the About page you could use 'value' => 50 instead of putting it in an array.

### Limit to specific page templates

This will limit it to the page template with the file name `template-contact.php`. If you want to include it on multiple page templates, put them all in an array like in the above example.

```php

	$meta_boxes[] = array(
		'id' => 'contact-information',
		'title' => 'Contact Information',
		'pages' => array('page'), // post type
		'show_on' => array( 'key' => 'page-template', 'value' => 'template-contact.php' ),
		'context' => 'normal', //  'normal', 'advanced', or 'side'
		'priority' => 'high',  //  'high', 'core', 'default' or 'low'
		'show_names' => true, // Show field names on the left
		'fields' => array(
```

### More Show On Filters

You can also [Add your own show_on filters](https://github.com/WebDevStudios/CMB2/wiki/Adding-your-own-show_on-filters), and that page lists some examples.
