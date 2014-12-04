This code is designed to be run inside themes and plugins. Proper structure would look like:

```
/my-plugin
  /cmb2
  cmb-init.php
```

### Quick Start

Open [example-functions.php](https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php) and copy/paste all of the code into `cmb-init.php` (be sure to require the `cmb-init.php` file in your theme or plugin!) You should see all the example metaboxes in the post editor. Use [get_post_meta()](http://codex.wordpress.org/Function_Reference/get_post_meta) to get/use the data.

### Getting Started

First, you need to get the bootstrap and start the engine. To do so, create a file named `cmb-init.php` and place the following into it:

```php
<?php
/**
 * Get the bootstrap!
 */
if ( file_exists(  __DIR__ . '/cmb2/init.php' ) ) {
  require_once  __DIR__ . '/cmb2/init.php';
} elseif ( file_exists(  __DIR__ . '/CMB2/init.php' ) ) {
  require_once  __DIR__ . '/CMB2/init.php';
}
```

### Create a metabox

Now that you've included the CMB2 engine, you can create metaboxes using the following function:

```php
<?php
add_filter( 'cmb2_meta_boxes', 'cmb2_sample_metaboxes' );
/**
 * Define the metabox and field configurations.
 *
 * @param  array $meta_boxes
 * @return array
 */
function cmb2_sample_metaboxes( array $meta_boxes ) {

	// Start with an underscore to hide fields from custom fields list
	$prefix = '_cmb2_';

	/**
	 * Sample metabox to demonstrate each field type included
	 */
	$meta_boxes['test_metabox'] = array(
		'id'            => 'test_metabox',
		'title'         => __( 'Test Metabox', 'cmb2' ),
		'object_types'  => array( 'page', ), // Post type
		'context'       => 'normal',
		'priority'      => 'high',
		'show_names'    => true, // Show field names on the left
		// 'cmb_styles' => false, // false to disable the CMB stylesheet
		'fields'        => array(
			array(
				'name'       => __( 'Test Text', 'cmb2' ),
				'desc'       => __( 'field description (optional)', 'cmb2' ),
				'id'         => $prefix . 'text',
				'type'       => 'text',
				'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
				// 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
				// 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
				// 'on_front'        => false, // Optionally designate a field to wp-admin only
				// 'repeatable'      => true,
			),
			array(
				'name' => __( 'Website URL', 'cmb2' ),
				'desc' => __( 'field description (optional)', 'cmb2' ),
				'id'   => $prefix . 'url',
				'type' => 'text_url',
				// 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
				// 'repeatable' => true,
			),
			array(
				'name' => __( 'Test Text Email', 'cmb2' ),
				'desc' => __( 'field description (optional)', 'cmb2' ),
				'id'   => $prefix . 'email',
				'type' => 'text_email',
				// 'repeatable' => true,
			),
		),
	)

	// Add other metaboxes as needed

	return $meta_boxes;
}
```

### Display the Metadata

In your theme file use the [get_post_meta()](http://codex.wordpress.org/Function_Reference/get_post_meta) function to display your metadata within the loop:

```php
<?php
// Grab the metadata from the database
$text = get_post_meta( get_the_ID(), '_cmb2_text', true );

// Echo the metadata
echo $text;
?>
```
Let's assume you created a metabox with the field outlined above, and want to display this on the single page template:

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
					$text  = get_post_meta( get_the_ID(), '_cmb2_text', true );
					$email = get_post_meta( get_the_ID(), '_cmb2_email', true );
					$url   = get_post_meta( get_the_ID(), '_cmb2_url', true );
					echo $text;
					echo $email;
					echo $url;
					?>

					<?php comments_template( '', true ); ?>

				<?php endwhile; // end of the loop. ?>

			</div><!-- #content -->
		</div><!-- #primary -->

<?php get_footer(); ?>
```

For more information, see the Codex page for [get_post_meta()](http://codex.wordpress.org/Function_Reference/get_post_meta)