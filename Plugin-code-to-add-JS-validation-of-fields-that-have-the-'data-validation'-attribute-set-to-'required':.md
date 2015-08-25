### Description
This plugin code adds JS validation to any field that has the 'data-validation' attribute set to 'required':

		'attributes' => array(
			'data-validation' => 'required',
		),

### Functionality

When the Publish/update button is pressed, the code will look for any "required" fields that have not been filled in. If there is one or more such fields, the code will:
* Cancel the Publish/update process
* Pop-up an alert message saying "The following fields are required and highlighted below" with a list of the fields after it
* Highlight all required fields that need to be filled in
* Center the first required field in the center of the browser so that the user sees it and can fill the field in

The code has not been tested with all field types available in CMB2.

Field types known to work with the plugin so far are:

* text
* file
* file_list

The plugin may or may not work with other field types. Please let the OP know which other field types you use it with and the results. 

Note that the code will enable JS validation on all metaboxes on your site.

### Credit
Code provided by Justin Sternberg


### Plugin code

```
<?php

/*
 * Plugin Name: CMB2 js validation for "required" fields
 * Description: Uses js to validate CMB2 fields that have the 'data-validation' attribute set to 'required'
 * Version: 0.1.0
 */


function cmb2_after_form_do_js_validation( $post_id, $cmb ) {
	static $added = false;
	// Only add this to the page once (not for every metabox)
	if ( $added ) {
		return;
	}
	$added = true;
	?>
	<script type="text/javascript">
	jQuery(document).ready(function($) {
		$form = $( document.getElementById( 'post' ) );
		$htmlbody = $( 'html, body' );
		function checkValidation( evt ) {
			var labels = [];
			var $first_error_row = null;
			var $row = null;
			function add_required( $row ) {
				$row.css({ 'background-color': 'rgb(255, 170, 170)' });
				$first_error_row = $first_error_row ? $first_error_row : $row;
				labels.push( $row.find( '.cmb-th label' ).text() );
			}
			function remove_required( $row ) {
				$row.css({ background: '' });
			}
			$( '[data-validation]' ).each( function() {
				var $this = $(this);
				var val = $this.val();
				$row = $this.parents( '.cmb-row' );
				if ( $this.is( '[type="button"]' ) || $this.is( '.cmb2-upload-file-id' ) ) {
					return true;
				}
				if ( 'required' === $this.data( 'validation' ) ) {
					if ( $row.is( '.cmb-type-file-list' ) ) {
						var has_LIs = $row.find( 'ul.cmb-attach-list li' ).length > 0;
						if ( ! has_LIs ) {
							add_required( $row );
						} else {
							remove_required( $row );
						}
					} else {
						if ( ! val ) {
							add_required( $row );
						} else {
							remove_required( $row );
						}
					}
				}
			});
			if ( $first_error_row ) {
				evt.preventDefault();
				alert( '<?php _e( 'The following fields are required and highlighted below:', 'cmb2' ); ?> ' + labels.join( ', ' ) );
				$htmlbody.animate({
					scrollTop: ( $first_error_row.offset().top - 200 )
				}, 1000);
			} else {
				// Feel free to comment this out or remove
				alert( 'submission is good!' );
			}
		}
		$form.on( 'submit', checkValidation );
	});
	</script>
	<?php
}
add_action( 'cmb2_after_form', 'cmb2_after_form_do_js_validation', 10, 2 );
```

















