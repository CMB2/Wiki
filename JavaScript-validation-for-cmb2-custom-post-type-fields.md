# Add the validation script and your custom script
visit [JavaScript Coder](http://www.javascript-coder.com/html-form/javascript-form-validation.phtml) to see validation tutorials and details

```php
/**
 * Snippet Name: Add form validation script to custom post types
 * script download URL : http://www.javascript-coder.com/files/form-validation/javascript_form.zip
 * replace 'custom post type name' with your post type name
 */

// function to add validation scripts to post type page

function cmb2_validation_script_post_type( $pagearg ) {
	global $post;

	// check if we are on custom post edit or add new page
	if ( $pagearg == 'post-new.php' || $pagearg == 'post.php') {
		if ( 'custom post type name' === $post->post_type ) {
			wp_enqueue_script(  'gen_validatorv4-js', plugin_dir_url( __FILE__ ) .'js/gen_validatorv4.js' );
			wp_enqueue_script(  'custom-js', plugin_dir_url( __FILE__ ) .'js/custom.js' );
		}
	}
}
add_action( 'admin_enqueue_scripts', 'cmb2_validation_script_post_type', 10, 1 );
```

## Typical validation using gen_validatorv4.js

```js
jQuery(document).ready(function() {

	 // remove default html5 validation
	 var form = document.getElementById("post");
	 form.noValidate = true;

	// start form validation
	var frmvalidator  = new Validator("post");

	/* Enable error display inline you can use the 'before'=> '<div id="form-name_field-name_errorloc
	 * class="error_strings"></div><br/>' in your cmb2 metabox field creation to show error messages
	 * See http://www.javascript-coder.com/html-form/form-validation.phtml for tutorial and examples
	 */
	frmvalidator.EnableOnPageErrorDisplay();
	frmvalidator.EnableMsgsTogether();



	// typical text area field validations
	frmvalidator.addValidation("field name","req","you need to say something about yourself");
	frmvalidator.addValidation("field name","maxlen=300","you can't add any more to your about field");
	frmvalidator.addValidation("field name","minlen=20","you need to add more text to your about field");

});
```
