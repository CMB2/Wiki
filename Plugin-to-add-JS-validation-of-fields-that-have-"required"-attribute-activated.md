### Purpose
This plugin adds JS validation to any field that has the 'data-validation' attribute set to 'required':

		'attributes' => array(
			'data-validation' => 'required',
		),

### Functionality

When the Publish/update button is pressed, the code will look for any "required" fields that have not been filled in. If there are one or more fields, the plugin will:
* Prevent the Publish/update process
* Pop-up an alert message saying "The following fields are required and highlighted below" with a list of the fields after it
* Highlight all required field that need to be filled in






