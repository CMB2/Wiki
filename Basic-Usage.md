<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Quick Start](#quick-start)
- [Getting Started](#getting-started)
- [Create a metabox](#create-a-metabox)
- [Creating the metabox using a plugin](#creating-the-metabox-using-a-plugin)
- [Display the Metadata](#display-the-metadata)
- [Adding metaboxes to user profile](#adding-metaboxes-to-user-profile)
- [Caveats for bundling and including CMB2.](#caveats-for-bundling-and-including-cmb2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

Open [example-functions.php](https://github.com/CMB2/CMB2/blob/master/example-functions.php) and copy/paste all of the code into `functions.php`. Create a new page and you should see all the example metaboxes in the page editor. Use [get_post_meta()](http://codex.wordpress.org/Function_Reference/get_post_meta) to get/use the data.

### Getting Started

First, you need to get the bootstrap and start the engine. To do so, add the following code to `functions.php`. There are some caveats to including CMB2 in your plugin or theme. [Please review them below](#caveats-for-bundling-and-including-cmb2).

_Note: If you are installing the plugin from [WordPress.org](https://wordpress.org/plugins/cmb2/), you can skip this step as it is handled by the plugin._

```php
/**
 * Get the bootstrap!
 * (Update path to use cmb2 or CMB2, depending on the name of the folder.
 * Case-sensitive is important on some systems.)
 */
require_once __DIR__ . '/cmb2/init.php';
```

**Notes:**  

* `init.php` needs to be required _outside any hook_. It needs to be loaded as early as possible.
* Do not do any kind of conditional loading, e.g. `if ( ! class_exists....`. CMB2 will handle that.

### Create a metabox

Now that you've included the CMB2 engine, you can start adding metaboxes with the following code inside `functions.php`:

```php
add_action( 'cmb2_admin_init', 'cmb2_sample_metaboxes' );
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

Note: For more metabox examples, see [example-functions.php](https://github.com/CMB2/CMB2/blob/master/example-functions.php)

Here is a cool video overview of what you will get with the `example-functions.php` file:  

[![video overview of what you will get with the `example-functions.php` file](images/example-functions-video-screenshot.png)](https://www.youtube.com/watch?v=QP3N8_q75Ik)

### Creating the metabox using a plugin

You can also create the metabox by creating a standard WordPress plugin and simply pasting the above code below the header of the plugin.

### Display the Metadata

Finally, you need to be able to extract the metadata and put it to work. In your theme or plugin file, use the [get_post_meta()](http://codex.wordpress.org/Function_Reference/get_post_meta) function to display your metadata. Remember, you *must* pass the post ID!

```php
<?php
// Grab the metadata from the database
$text = get_post_meta( get_the_ID(), '_yourprefix_text', true );

// Echo the metadata
echo esc_html( $text );
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

For more example code, see [example-functions.php](https://github.com/CMB2/CMB2/blob/master/example-functions.php)

### Adding metaboxes to user profile

To add custom metaboxes to the user profile page, you can set the `object_types` parameter to `array( 'user' )` to indicate that the metaboxes should be displayed on the user profile (rather than a specific post type) and that the meta information should be stored against user_meta, rather than post_meta.

An example metabox can be seen in [example-functions.php](https://github.com/CMB2/CMB2/blob/630d305c9f251631e92d2ec1e480bb0692daaf67/example-functions.php#L508-L576)

Note that the Metabox `description` and `name` parameters will not display. You can label your user settings section by adding a `title` field as the first field.

### Caveats for bundling and including CMB2.

This section is to hightlight some dos/don'ts for including CMB2. CMB2 has an intelligent method for loading only one version of itself and only the newest version. If you do not include it properly, it will likely result in unintended consequences. For more background info about how/why CMB2 does it this way, [read this post](https://dsgnwrks.pro/plugins-and-scripts/dont-repeat-yourself-use-wp-lib-loader-instead/).

* **Do:** Include the files directly from your theme or plugin. E.g.:
	```php
	require_once  __DIR__ . '/includes/cmb2/init.php';
	```

* **Don't:** Include the files from a hook. E.g.:
	```php
	// DON'T DO THIS
	add_action( 'init', 'wprpt_initialize_cmb_init', 10 );
	function wprpt_initialize_cmb_init() {
		require_once  __DIR__ . '/includes/cmb2/init.php';
	}
	```

* **Do:** Use case-sensitive paths to the include file. E.g.:
	```php
	require_once  __DIR__ . '/includes/CMB2/init.php';
	```  
	or  
	```php
	require_once  __DIR__ . '/includes/cmb2/init.php';
	```

	If you download CMB2 from the WordPress plugin repo, it will be a lowercase directory, `cmb2`. However, due to Github's naming conventions, if you clone this repo, or download it, or download a release on the releases page, it will be an uppercase directory, `CMB2`. Obviously, you can name the directory anything you want, when you're bundling/including it in your theme or plugin.

* **Don't:** Use a `class_exists()` check before including. (CMB2 handles that magic on it's own.)
	```php
	// DON'T DO THIS
	if ( ! class_exists( 'Some_CMB2_Class' ) ) {
		require_once  __DIR__ . '/includes/cmb2/init.php';
	}
	```
