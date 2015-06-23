This code is designed to be run inside themes and plugins. Proper structure would look like:

```
/my-theme
  /cmb2
  functions.php
  index.php
  screenshot.png
  styles.css
```

### Quick Start

Open [example-functions.php](https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php) and copy/paste all of the code into `functions.php`. You should see all the example metaboxes in the post editor. Use [get_post_meta()](http://codex.wordpress.org/Function_Reference/get_post_meta) to get/use the data.

### Getting Started

First, you need to get the bootstrap and start the engine. To do so, add the following code to `functions.php`. If you are installing the plugin from [WordPress.org](https://wordpress.org/plugins/cmb2/), you can skip this step as it is handled by the plugin.

```php
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

Now that you've included the CMB2 engine, you can start adding metaboxes with the following code inside `functions.php`:

```php
add_action( 'cmb2_init', 'cmb2_sample_metaboxes' );
/**
 * Define the metabox and field configurations.
 */
function cmb2_sample_metaboxes() {

	// Start with an underscore to hide fields from custom fields list
	$prefix = '_yourprefix_';

	/**
	 * Initiate the metabox
	 */
	$cmb = new_cmb2_box( array(
		'id'            => 'test_metabox',
		'title'         => __( 'Test Metabox', 'cmb2' ),
		'object_types'  => array( 'page', ), // Post type
		'context'       => 'normal',
		'priority'      => 'high',
		'show_names'    => true, // Show field names on the left
		// 'cmb_styles' => false, // false to disable the CMB stylesheet
		// 'closed'     => true, // Keep the metabox closed by default
	) );

	// Regular text field
	$cmb->add_field( array(
		'name'       => __( 'Test Text', 'cmb2' ),
		'desc'       => __( 'field description (optional)', 'cmb2' ),
		'id'         => $prefix . 'text',
		'type'       => 'text',
		'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
		// 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
		// 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
		// 'on_front'        => false, // Optionally designate a field to wp-admin only
		// 'repeatable'      => true,
	) );

	// URL text field
	$cmb->add_field( array(
		'name' => __( 'Website URL', 'cmb2' ),
		'desc' => __( 'field description (optional)', 'cmb2' ),
		'id'   => $prefix . 'url',
		'type' => 'text_url',
		// 'protocols' => array('http', 'https', 'ftp', 'ftps', 'mailto', 'news', 'irc', 'gopher', 'nntp', 'feed', 'telnet'), // Array of allowed protocols
		// 'repeatable' => true,
	) );

	// Email text field
	$cmb->add_field( array(
		'name' => __( 'Test Text Email', 'cmb2' ),
		'desc' => __( 'field description (optional)', 'cmb2' ),
		'id'   => $prefix . 'email',
		'type' => 'text_email',
		// 'repeatable' => true,
	) );

	// Add other metaboxes as needed

}
```

Note: For more metabox examples, see [example-functions.php](https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php)

### Display the Metadata

Finally, you need to be able to extract the metadata and put it to work. In your theme or plugin file, use the [get_post_meta()](http://codex.wordpress.org/Function_Reference/get_post_meta) function to display your metadata. Remember, you *must* pass the post ID!

```php
<?php
// Grab the metadata from the database
$text = get_post_meta( get_the_ID(), '_yourprefix_text', true );

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
					$text  = get_post_meta( get_the_ID(), '_yourprefix_text', true );
					$email = get_post_meta( get_the_ID(), '_yourprefix_email', true );
					$url   = get_post_meta( get_the_ID(), '_yourprefix_url', true );
					echo esc_html( $text );
					echo is_email( $email );
					echo esc_url( $url );
					?>

					<?php comments_template( '', true ); ?>

				<?php endwhile; // end of the loop. ?>

			</div><!-- #content -->
		</div><!-- #primary -->

<?php get_footer(); ?>
```

For more information on working with post meta, see the Codex page for [get_post_meta()](http://codex.wordpress.org/Function_Reference/get_post_meta), or check out the [Post Meta Bootcamp](http://dsgnwrks.pro/how-to/post-meta-bootcamp/). Remember, to *escape any and all data*! Using proper [data validation](http://codex.wordpress.org/Data_Validation) when working with post meta is the right thing to do. Trust no one! 

For more example code, see [example-functions.php](https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php)