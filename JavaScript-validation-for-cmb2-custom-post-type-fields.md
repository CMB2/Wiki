# Add the validation script and your custom script
	/** 
	 * Snippet Name: Add form validation script to custom post types
	 * script download URL : http://www.javascript-coder.com/files/form-validation/javascript_form.zip
	 * replace 'custom post type name' with your post type name
	 */  

	//function to add validation scripts to post type page

	function cmb2_validation_script_post_type( $pagearg) {  
		global $post;  
		//check if we are on custom post edit or add new page
		if ( $pagearg == 'post-new.php' || $pagearg == 'post.php') {  
			if ( 'custom post type name' === $post->post_type ) {       
				wp_enqueue_script(  'gen_validatorv4-js', plugin_dir_url( __FILE__ ) .'js/gen_validatorv4.js' ); 
				wp_enqueue_script(  'custom-js', plugin_dir_url( __FILE__ ) .'js/custom.js' ); 
			}  
		}  
	}  
	add_action( 'admin_enqueue_scripts', 'cmb2_validation_script_post_type', 10, 1 ); 

## Typical validation using gen_validatorv4.js
