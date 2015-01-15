Using CMB we can create a front-end form that will allow visitors to create new posts or post-type entries. For this example, we'll create a front-end form that allows visitors to submit an obituary.
Folder structure would be like this
`
/my-theme
  /cmb2
  functions.php
  index.php
  screenshot.png
  styles.css
`

```php
<?php
/**
 * Create a front-end submission form for CMB which creates new posts/post-type entries.
 *
 * @package  Custom Metaboxes and Fields for WordPress
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/WebDevStudios/CMB2
 */

class Example_Front_End_Form {

	// Set prefix
	public $prefix = '_example_'; // Change this to your prefix


	/**
	 * Construct the class.
	 */
	public function __construct() {
		add_filter( 'cmb2_meta_boxes', array( $this, 'cmb_metaboxes' ) );
		add_shortcode( 'cmb-form', array( $this, 'do_frontend_form' ) );
		add_action( 'init', array( $this, 'initialize_cmb_meta_boxes' ), 9 );
		add_action( 'cmb2_save_post_fields', array( $this, 'save_featured_image' ), 10, 4 );
	}


	/**
	 * Define the metabox and field configurations.
	 */
	public function cmb_metaboxes( array $meta_boxes ) {

		/**
		 * Metabox for the "Memorials" front-end submission form
		 */
		$meta_boxes['memorials_metabox'] = array(
			'id'           => 'memorials',
			'title'        => __( 'Memorial Information', 'cmb' ),
			'object_types' => array( 'memorials' ), // Post type
			'context'      => 'normal',
			'priority'     => 'high',
			'show_names'   => true, // Show field names on the left
			'fields'       => array(
				array(
					'name' => __( 'First Name', 'cmb' ),
					'desc' => __( '', 'cmb' ),
					'id'   => $this->prefix . 'memorial_first_name',
					'type' => 'text_medium',
				),
				array(
					'name' => __( 'Last Name', 'cmb' ),
					'desc' => __( '', 'cmb' ),
					'id'   => $this->prefix . 'memorial_last_name',
					'type' => 'text_medium',
				),
				array(
					'name' => __( 'Date of birth', 'cmb' ),
					'desc' => __( '', 'cmb' ),
					'id'   => $this->prefix . 'memorial_date_of_birth',
					'type' => 'text_date_timestamp',
				),
				array(
					'name' => __( 'Date of death', 'cmb' ),
					'desc' => __( '', 'cmb' ),
					'id'   => $this->prefix . 'memorial_date_of_death',
					'type' => 'text_date_timestamp',
				),
				array(
					'name' => __( 'Image', 'cmb' ),
					'desc' => __( 'Upload an image or enter a URL.', 'cmb' ),
					'id'   => $this->prefix . 'memorial_image',
					'type' => 'file',
				),
				array(
					'name'    => __( 'Obituary', 'cmb' ),
					'id'      => $this->prefix . 'memorial_story',
					'type'    => 'wysiwyg',
					'options' => array(
						'media_buttons'	=> false,
						'wpautop'       => true
					)
				),
			),
		);

		return $meta_boxes;
	}


	/**
	 * Shortcode to display a CMB form for a post ID.
	 */
	public function do_frontend_form() {

		// Default metabox ID
		$metabox_id = 'memorials_metabox';

		// Get all metaboxes
		$meta_boxes = apply_filters( 'cmb2_meta_boxes', array() );

		// If the metabox specified doesn't exist, yell about it.
		if ( ! isset( $meta_boxes[ $metabox_id ] ) ) {
			return __( "A metabox with the specified 'metabox_id' doesn't exist.", 'cmb' );
		}

		// This is the WordPress post ID where the data should be stored/displayed.
		$post_id = 0;

		if ( $new_id = $this->intercept_post_id() ) {
			$post_id = $new_id;
			echo 'Thank You for your submission.';
		}

		// Shortcodes need to return their data, not echo it.
		$echo = false;

		// Get our form
		$form = cmb2_metabox_form( $meta_boxes[ $metabox_id ], $post_id, $echo );

		return $form;
	}


	/**
	 * Get data before saving to CMB.
	 */
	public function intercept_post_id() {

		// Check for $_POST data
		if ( empty( $_POST ) ) {
			return false;
		}

		// Check nonce
		if ( ! ( isset( $_POST['submit-cmb'], $_POST['wp_meta_box_nonce'] ) && wp_verify_nonce( $_POST['wp_meta_box_nonce'], CMB2::nonce() ) ) ) {
			return;
		}

		// Setup and sanitize data
		if ( isset( $_POST[ $this->prefix . 'memorial_first_name' ] ) ) {

			add_filter( 'user_has_cap', array( $this, 'grant_publish_caps' ), 0,  3);

			$this->new_submission = wp_insert_post( array(
				'post_title'            => sanitize_text_field( $_POST[ $this->prefix . 'memorial_first_name' ] . ' ' . $_POST[ $this->prefix . 'memorial_last_name' ] ),
				'post_author'           => get_current_user_id(),
				'post_status'           => 'draft', // Set to draft so we can review first
				'post_type'             => 'memorials',
				'post_content_filtered' => wp_kses( $_POST[ $this->prefix . 'memorial_story' ], '<b><strong><i><em><h1><h2><h3><h4><h5><h6><pre><code><span>' ),
			), true );

			// If no errors, save the data into a new post draft
			if ( ! is_wp_error( $this->new_submission ) ) {
				return $this->new_submission;
			}

		}

		return false;
	}

	/**
	 * Grant temporary permissions to subscribers.
	 */
	public function grant_publish_caps( $caps, $cap, $args ) {

		if ( 'edit_post'  == $args[0] ) {
			$caps[$cap[0]] = true;
		}

		return $caps;
	}

	/**
	 * Save featured image.
	 */
	public function save_featured_image( $object_id, $meta_box_id, $updated, $meta_box ) {

		if ( isset( $updated ) && in_array( '_example_memorial_image', $updated ) ) {
			set_post_thumbnail( $object_id, get_post_meta( $object_id, '_example_memorial_image_id', 1 ) );
		}

	}


	/**
	 * Initialize CMB.
	 */
	public function initialize_cmb_meta_boxes() {

		if ( ! class_exists( 'CMB2' ) ) {
			require_once 'CMB2/init.php';
		}

	}


} // end class

$Example_Front_End_Form = new Example_Front_End_Form();
```
To insert this form, place the shortcode `[cmb-form]` into a post or page.