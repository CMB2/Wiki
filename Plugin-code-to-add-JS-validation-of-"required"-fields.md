<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Description](#description)
- [Functionality](#functionality)
- [Credit](#credit)
- [Plugin code](#plugin-code)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Description
[This sample plugin code](https://github.com/WebDevStudios/CMB2-Snippet-Library/blob/master/javascript/cmb2-js-validation-required.php) adds JS validation to any field that has the 'data-validation' attribute set to 'required':

		'attributes' => array(
			'data-validation' => 'required',
		),

### Functionality

When the Publish/update button is pressed, the code will look for any "required" fields that have not been filled in. If there is one or more such fields, the code will:
* Cancel the Publish/update process
* Pop-up an alert message saying "The following fields are required and highlighted below" with a list of the fields after it
* Highlight all required fields that need to be filled in
* Center the first required field in the center of the browser so that the user sees it and can fill the field in

This sample code has not been tested with all field types available in CMB2.

Field types known to work with the code so far are:

* text
* file
* file_list

Note that the code will enable JS validation on all metaboxes on your site. It is not possible with this code to select particular metaboxes or fields for validation.

### Credit
Code provided by Justin Sternberg

### Plugin code

Plugin code can be found [in the CMB2 Snippet Library](https://github.com/WebDevStudios/CMB2-Snippet-Library/blob/master/javascript/cmb2-js-validation-required.php).
