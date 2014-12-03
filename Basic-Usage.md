This code is designed to be run inside themes and plugins. I typically put it inside `[theme or plugin]/lib/metabox`, but you can put it wherever you like. For this example it will be in child-theme/lib/metabox.You can then use it within your theme or plugin. For this example, my customizations are going in `child-theme/functions.php`.

### Create Metaboxes

First you add a filter to `cmb_meta_boxes` that adds your metabox to the $meta_boxes array. It is also a good idea to define a `$prefix` variable.

```php
<?php
function be_sample_metaboxes( $meta_boxes ) {
	$prefix = '_cmb_'; // Prefix for all fields
	$meta_boxes['test_metabox'] = array(
		'id'         => 'test_metabox',
		'title'      => 'Test Metabox',
		'pages'      => array('page'), // post type
		'context'    => 'normal',
		'priority'   => 'high',
		'show_names' => true, // Show field names on the left
		'fields' => array(
			array(
				'name' => 'Test Text',
				'desc' => 'field description (optional)',
				'id'   => $prefix . 'test_text',
				'type' => 'text'
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'cmb_meta_boxes', 'be_sample_metaboxes' );
```

This creates a metabox titled "Text Metabox" that shows up on all pages and contains a single text field. The important things to note are that you're adding to the existing $meta_boxes array ( `$meta_boxes[] = ... ` ) and at the end you're returning the whole array. 

### Initialize Metaboxes

Once you've set up your metaboxes, you'll need to add the initialization function:

```php
<?php
// Initialize the metabox class
add_action( 'init', 'be_initialize_cmb_meta_boxes', 9999 );
function be_initialize_cmb_meta_boxes() {
	if ( !class_exists( 'cmb_Meta_Box' ) ) {
		require_once( 'lib/metabox/init.php' );
	}
}
```

The important things to note here are that you're first checking to see if the `cmb_Meta_Box` class exists, and if it doesn't you're calling the init.php file. Make sure you're linking to the file correctly. I typically use a theme or plugin constant (not shown in above code). Simply putting the require_once() function call inside your functions.php file will not work, so make sure that you attach it via the shown add_action().

### Display the Metadata

In your theme file, you'll need to use the get_post_meta() function to display your metadata within the loop. Let's assume you created a metabox with the field outlined above, and want to display this on the single page template (page.php). Your template might look like this before you start (from TwentyEleven):

```php
<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */

get_header(); ?>

		<div id="primary">
			<div id="content" role="main">

				<?php while ( have_posts() ) : the_post(); ?>

					<?php get_template_part( 'content', 'page' ); ?>

					<?php comments_template( '', true ); ?>

				<?php endwhile; // end of the loop. ?>

			</div><!-- #content -->
		</div><!-- #primary -->

<?php get_footer(); ?>
```

After loading the page content with get_template_part( 'content', 'page' ), we'll add our code for the metabox:

```php
<?php
global $post;
$text = get_post_meta( $post->ID, '_cmb_test_text', true );
echo $text;
?>
```

So the final template will look like this:

```php
<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */

get_header(); ?>

		<div id="primary">
			<div id="content" role="main">

				<?php while ( have_posts() ) : the_post(); ?>

					<?php get_template_part( 'content', 'page' ); ?>

					<?php
					global $post;
					$text = get_post_meta( $post->ID, '_cmb_test_text', true );
					echo $text;
					?>

					<?php comments_template( '', true ); ?>

				<?php endwhile; // end of the loop. ?>

			</div><!-- #content -->
		</div><!-- #primary -->

<?php get_footer(); ?>
```

For more information, see the Codex page for [`get_post_meta()`](http://codex.wordpress.org/Function_Reference/get_post_meta).