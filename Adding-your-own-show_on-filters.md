A 'show_on' filter is any arbitrary filter that limits where the metabox is shown. As described in [Display Options](https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Display-Options), there's currently two built-in. You can limit a metabox to certain page IDs, or to certain page templates.

If you'd like to create your own show_on filter, all you have to do is hook into `cmb_show_on`. If you look in init.php and search for "Show On Filters", you'll find the code that creates those two. They can serve as a guide.

The filter passes two parameters:

* $display - either true or false, default is true
* $metabox - array of metabox parameters

Make sure you check early on to see if this filter should be running (check `$meta_box['show_on']['key']` ). Since this runs on every metabox, you'll want to return `$default` instead of true so you don't override the other show_on filters. At the end, either return true to display it or false to not display it.

Have you made some useful show_on filters? List them as examples here so others can use them.

### Example: Exclude on IDs

Let's say you wanted to build a filter that allowed a metabox to show up everywhere except a specified list of page IDs. So it's basically the reverse of the Include on IDs filter. Here's what the code might look like (in your theme's functions.php file):

```php
<?php
/**
 * Exclude metabox on specific IDs
 * @author Bill Erickson
 * @link https://github.com/jaredatch/Custom-Metaboxes-and-Fields-for-WordPress/wiki/Adding-your-own-show_on-filters
 *
 * @param bool $display
 * @param array $meta_box
 * @return bool display metabox
 */
function be_metabox_exclude_for_id( $display, $meta_box ) {
	if ( 'exclude_id' !== $meta_box['show_on']['key'] )
		return $display;

	// If we're showing it based on ID, get the current ID					
	if( isset( $_GET['post'] ) ) $post_id = $_GET['post'];
	elseif( isset( $_POST['post_ID'] ) ) $post_id = $_POST['post_ID'];
	if( !isset( $post_id ) )
		return $display;

	// If current page id is in the included array, do not display the metabox
	$meta_box['show_on']['value'] = !is_array( $meta_box['show_on']['value'] ) ? array( $meta_box['show_on']['value'] ) : $meta_box['show_on']['value'];
	if ( in_array( $post_id, $meta_box['show_on']['value'] ) )
		return false;
	else
		return true;
}
add_filter( 'cmb_show_on', 'be_metabox_exclude_for_id', 10, 2 );
```

