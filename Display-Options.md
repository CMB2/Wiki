Metaboxes should be context-specific, and only show up when relevant. There's two tools you can use to limit their display:

* pages - limits the post types it applies to
* show_on - can limit to specific page/post IDs, page templates, or [any other show_on filter you define](https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Adding-your-own-show_on-filters)

Both of these are used when you define your metabox.

### Limit to specific post types

For every metabox you create, you should specify the to which it applies. They'll be listed as an array. Here's an example that only applies to pages:

```php
	$meta_boxes[] = array(
	    'id' => 'test_metabox',
	    'title' => 'Test Metabox',
	    'pages' => array('page'), // post type
		'context' => 'normal',
		'priority' => 'high',
		'show_names' => true, // Show field names on the left
	    'fields' => array( ...
```

Here's an example that displays on posts and events:

```php

	$meta_boxes[] = array(
	    'id' => 'test_metabox',
	    'title' => 'Test Metabox',
	    'pages' => array('post', 'event'), // post type
		'context' => 'normal',
		'priority' => 'high',
		'show_names' => true, // Show field names on the left
	    'fields' => array(
```