**INFO MAY BE INACCURATE FOR CMB2**

This library contains a couple of hooks that make it possible for you to create your own field types:

```php
cmb2_render_{field-type}
cmb2_validate_{field-type}
```

You can add actions and filters to these hooks (using WordPress's native add_action() function) that enable the custom field types.

## Example 1: Email field

> **Update: This field is now [in CMB core](https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php#L72), so consider this tutorial as an example.**

A simple example would be a `text_email` field that only allowed users to enter a valid email address.

![Screenshot](images/screenshot_text_email.jpg)

### Step 1: `cmb2_render_{field-type}`
The first step is to write the code for *rendering the field* within the WordPress administrative area:

```php
add_action( 'cmb2_render_text_email', 'rrh_cmb_render_text_email', 10, 5 );
function rrh_cmb_render_text_email( $field_object, $escaped_value, $object_id, $object_type, $field_type_object ) {
	echo $field_type_object->input( array( 'type' => 'email' ) );
}
```

This snippet has a few things going on:

* `cmb2_render_text_email` -- By adding an action to this hook, we are essentially creating the new field type. This action defines what code gets executed when you instantiate a field type called `text_email` in the library. This first parameter, the hook name, must be `cmb2_render_` followed by the field type name.
* `rrh_cmb_render_text_email` -- This is the name of your custom function that gets executed when you instantiate a field type called `text_email`. It can be called whatever you want, but it must match a function you define elsewhere in your code.
* `10` -- This is the priority for this action, the order in which it is executed. (The exact number matter should not matter unless you have multiple action on this hook.)
* `5` -- This is the number of parameters your custom function will receive. This hook can accept up to 5 parameters:
	* `$field_object`: `CMB2_Field` object.
	* `$escaped_value`: The value of this field passed through the escaping filter. It defaults to `sanitize_text_field`. If you need the unescaped value, you can access it via `$field_type_object->value()`.
	* `$object_id`: The id of the object you are working with. Most commonly, the post id.
	* `$object_type`: The type of object you are working with. Most commonly, `post` (this applies to all post-types), but could also be `comment`, `user` or `options-page`.
	* `$field_type_object`: This is an instance of the `cmb_Meta_Box_types` object and gives you access to all of the methods that CMB uses to build its field types.

	We've set this to 5 so that we  can access the `$field_type_object` object. This allows us to use CMB's built in input method.

In this example, our custom field type will display an input box, with the proper `name` attribute of `$field['id']` so that it will save to the database the way the built-in field types do. It displays the value previously specified for the field, if there is one. The only difference we've specified from the built in text input is that the input should have a type of `email`, which is a new type attribute introduced with html5.

### Step 2: `cmb2_validate_{field-type}`
You can optionally add code that validates or modifies the entered value before it is saved. In our example, we only want to allow valid email addresses; we can remove any invalid values before they are saved to the database.
**Note:** in most modern browsers, the field will not be allowed to submit if using the `email` attribute and the value is not an email, but we're including the validation filter as a fallback for older browsers.

```php
add_filter( 'cmb2_validate_text_email', 'rrh_cmb_validate_text_email' );
function rrh_cmb_validate_text_email( $override_value, $value ) {
	// not an email?
	if ( ! is_email( $value ) ) {
		// Empty the value
		$value = '';
	}
	return $value;
}
```

What's going on:

* `cmb2_validate_text_email` -- This filter defines what code gets executed when the user attempts to save a value in a field type called `text_email` in the library. This first parameter, the hook name, must be `cmb2_validate_` followed by the field type name.
* `rrh_cmb_validate_text_email` -- This is the name of your custom function that gets executed when the user attempts to save a value in a field type called `text_email`. It can be called whatever you want, but it must match a function you define elsewhere in your code.

The `cmb2_validate_{field-type}` hook can accept up to 5 parameters:
* `$override_value`: Sanitization/Validation override value to return. It is passed in as `null`, and is what we will modify to short-circuit CMB's saving mechanism.
* `$value`: The value being passed
* `$object_id`: The id of the object you are working with. Most commonly, the post id.
* `$field_object`: `CMB2_Field` object.
* `$sanitizer`: This is an instance of the `cmb_Meta_Box_Sanitize` object and gives you access to all of the methods that CMB uses to sanitize its field values.


When the user attempts to save a value in the field, we will check if the new value is a valid email address. If not, we will remove it. We will then return the possibly-modified value back to the library to do the saving.

### Step 3: Use the field type

With the action (and optionally the filter) added, we can now use the field type in our code just like we would use the built-in field types.

```php
add_filter( 'cmb2_meta_boxes', 'rrh_person_meta_boxes' );
function rrh_person_meta_boxes( $meta_boxes ) {
	$meta_boxes[] = array(
		'id' => 'rrh_person_metabox',
		'title' => 'Person Information',
		'pages' => array('rrh_person'),
		'context' => 'normal',
		'priority' => 'high',
		'show_names' => true, // Show field names on the left
		'fields' => array(
			array(
				'name' => 'Email',
				'id' => 'rrh_person_email',
				'type' => 'text_email',
				'desc' => 'Invalid email addresses will be wiped out.'
			)
		)
	);
	return $meta_boxes;
}
```

![Screenshot](images/screenshot_text_email.jpg)

## Example 2: Taxonomy Dropdown, store term_id

This creates a dropdown box containing a list of all the terms within a specific taxonomy. It also demonstrates how your custom field types can also have their own custom attributes that you define.

This code makes the field type available to the library:

```php
add_filter( 'cmb_render_imag_select_taxonomy', 'imag_render_imag_select_taxonomy', 10, 2 );
function imag_render_imag_select_taxonomy( $field_args, $value ) {

	wp_dropdown_categories( array(
		'show_option_none' => '&#8212; Select &#8212;',
		'hierarchical'     => 1,
		'taxonomy'         => $field_args['taxonomy'],
		'orderby'          => 'name',
		'hide_empty'       => 0,
		'name'             => $field_args['id'],
		'selected'         => $value
	) );

	if ( ! empty( $field_args['desc'] ) ) {
		echo '<p class="cmb_metabox_description">' . $field_args['desc'] . '</p>';
	}

}
```

This code instantiates the field type within your meta box:

```php
...
        'fields' => array(
            array(
                'name' => 'Featured Theme',
                'desc' => 'Select the featured theme',
                'id' => 'featured_theme',
                'type' => 'imag_select_taxonomy',
                'taxonomy' => 'imag_theme',
            ),
        )
...
```

![Screenshot](images/screenshot_image_theme.jpg)

***

**Alternatively**, you could produce the same results by passing an array of terms to the `select` field type. First we'll create a function to pull back an array of term options:

```php
/**
 * Gets a number of terms and displays them as options
 * @param  string       $taxonomy Taxonomy terms to retrieve. Default is category.
 * @param  string|array $args     Optional. Change the defaults retrieving terms.
 * @return array                  An array of options that matches the CMB options array
 */
function cmb_get_term_options( $taxonomy = 'category', $args = array() ) {

	$args['taxonomy'] = $taxonomy;
	// $defaults = array( 'taxonomy' => 'category' );
	$args = wp_parse_args( $args, array( 'taxonomy' => 'category' ) );

	$taxonomy = $args['taxonomy'];

	$terms = (array) get_terms( $taxonomy, $args );

	// Initate an empty array
	$term_options = array();
	if ( ! empty( $terms ) ) {
		foreach ( $terms as $term ) {
			$term_options[ $term->slug ] = $term->name;
		}
	}

	return $term_options;
}
```
Then, in our fields array, we would add the `select` type and pass the `cmb_get_term_options` function as our 'options' array.

```php
...
        'fields' => array(
            array(
                'name' => 'Featured Theme',
                'desc' => 'Select the featured theme',
                'id' => 'featured_theme',
                'type' => 'select',
                'options' => cmb_get_term_options( 'imag_theme' ),
            ),
        )
...

```

## Example 3: Posts (or other post_type) Dropdown, store post_id

For the times when you need to relate one post to another, this comes in handy.

Like the terms field above, we would pass an array of posts to the `select` field type. First we'll create a function to pull back an array of post options:

```php
/**
 * Gets a number of posts and displays them as options
 * @param  array $query_args Optional. Overrides defaults.
 * @return array             An array of options that matches the CMB options array
 */
function cmb_get_post_options( $query_args ) {

	$args = wp_parse_args( $query_args, array(
		'post_type' => 'post',
		'numberposts' => 10,
	) );

	$posts = get_posts( $args );

	$post_options = array();
	if ( $posts ) {
		foreach ( $posts as $post ) {
                   $post_options[] = array(
            	       'name' => $post->post_title,
            	       'value' => $post->ID
                   );
		}
	}

	return $post_options;
}
```
Then, in our fields array, we would add the `select` type and pass the `cmb_get_post_options` function as our 'options' array.

```php
...
        'fields' => array(
			array(
				'name'    => __( 'Select Posts', 'cmb' ),
				'desc'    => __( 'field description (optional)', 'cmb' ),
				'id'      => $prefix . 'post_multicheckbox',
				'type'    => 'multicheck',
				'options' => cmb_get_post_options( array( 'post_type' => 'your_post_type', 'numberposts' => 5 ) ),
			),
        )
...

```
**Alternatively**, you could use the `multicheck`, or `radio` field types as well.

## Example 4: Multiple Inputs, One Field. Let's Create an Address Field.

You may want to create your own field type that stores multiple inputs. Here's how you could create an address field type:

```php
add_action( 'cmb_render_address', 'cmb_render_address_field', 10, 5 );
/**
 * Render Address Field
 */
function cmb_render_address_field( $field_object, $value, $object_id, $object_type, $field_type_object ) {

	$state_list = array( 'AL'=>'Alabama','AK'=>'Alaska','AZ'=>'Arizona','AR'=>'Arkansas','CA'=>'California','CO'=>'Colorado','CT'=>'Connecticut','DE'=>'Delaware','DC'=>'District Of Columbia','FL'=>'Florida','GA'=>'Georgia','HI'=>'Hawaii','ID'=>'Idaho','IL'=>'Illinois','IN'=>'Indiana','IA'=>'Iowa','KS'=>'Kansas','KY'=>'Kentucky','LA'=>'Louisiana','ME'=>'Maine','MD'=>'Maryland','MA'=>'Massachusetts','MI'=>'Michigan','MN'=>'Minnesota','MS'=>'Mississippi','MO'=>'Missouri','MT'=>'Montana','NE'=>'Nebraska','NV'=>'Nevada','NH'=>'New Hampshire','NJ'=>'New Jersey','NM'=>'New Mexico','NY'=>'New York','NC'=>'North Carolina','ND'=>'North Dakota','OH'=>'Ohio','OK'=>'Oklahoma','OR'=>'Oregon','PA'=>'Pennsylvania','RI'=>'Rhode Island','SC'=>'South Carolina','SD'=>'South Dakota','TN'=>'Tennessee','TX'=>'Texas','UT'=>'Utah','VT'=>'Vermont','VA'=>'Virginia','WA'=>'Washington','WV'=>'West Virginia','WI'=>'Wisconsin','WY'=>'Wyoming' );

	$value = wp_parse_args( $value, array(
		'address-1' => '',
		'address-2' => '',
		'city'      => '',
		'state'     => '',
		'zip'       => '',
	) );

	$state_options = '';
	foreach ( $state_list as $abrev => $state ) {
		$state_options .= '<option value="'. $abrev .'" '. selected( $value['state'], $abrev, false ) .'>'. $state .'</option>';
	}

	?>
	<div><p><label for="<?php echo $field_type_object->_id( '_address_1' ); ?>">Address 1</label></p>
		<?php echo $field_type_object->input( array(
			'name'  => $field_type_object->_name( '[address-1]' ),
			'id'    => $field_type_object->_id( '_address_1' ),
			'value' => $value['address-1'],
			'desc'  => '',
		) ); ?>
	</div>
	<div><p><label for="<?php echo $field_type_object->_id( '_address_2' ); ?>'">Address 2</label></p>
		<?php echo $field_type_object->input( array(
			'name'  => $field_type_object->_name( '[address-2]' ),
			'id'    => $field_type_object->_id( '_address_2' ),
			'value' => $value['address-2'],
			'desc'  => '',
		) ); ?>
	</div>
	<div class="alignleft"><p><label for="<?php echo $field_type_object->_id( '_city' ); ?>'">City</label></p>
		<?php echo $field_type_object->input( array(
			'class' => 'cmb_text_small',
			'name'  => $field_type_object->_name( '[city]' ),
			'id'    => $field_type_object->_id( '_city' ),
			'value' => $value['city'],
			'desc'  => '',
		) ); ?>
	</div>
	<div class="alignleft"><p><label for="<?php echo $field_type_object->_id( '_state' ); ?>'">State</label></p>
		<?php echo $field_type_object->select( array(
			'name'    => $field_type_object->_name( '[state]' ),
			'id'      => $field_type_object->_id( '_state' ),
			'desc'    => '',
			'options' => $state_options,
		) ); ?>
	</div>
	<div class="alignleft"><p><label for="<?php echo $field_type_object->_id( '_zip' ); ?>'">Zip</label></p>
		<?php echo $field_type_object->input( array(
			'class' => 'cmb_text_small',
			'name'  => $field_type_object->_name( '[zip]' ),
			'id'    => $field_type_object->_id( '_zip' ),
			'value' => $value['zip'],
			'desc'  => '',
		) ); ?>
	</div>
	<?php
	echo $field_type_object->_desc( true );

}
```

We can then retrieve the address later in our theme or plugin like so:

```php
$post_id = get_the_ID();
$address = get_post_meta( $post_id, $prefix . 'address', 1 );

// Set default values for each address key
$address = wp_parse_args( $address, array(
	'address-1' => '',
	'address-2' => '',
	'city' => '',
	'state' => '',
	'zip' => '',
) );

?>
<p><strong>Address:</strong> <?php echo esc_html( $address['address-1'] ); ?></p>
<?php if ( $address['address-2'] ) : ?>
	<p><strong>Address 2:</strong> <?php echo esc_html( $address['address-2'] ); ?></p>
<?php endif; ?>
<p><strong>City:</strong> <?php echo esc_html( $address['city'] ); ?></p>
<p><strong>State:</strong> <?php echo esc_html( $address['state'] ); ?></p>
<p><strong>Zip:</strong> <?php echo esc_html( $address['zip'] ); ?></p>
<?php

```


## Add Your Own Examples

The possibilities are endless. If you create custom field types that you think others would find useful, please share them here!

### text_number - adds a text number input

Sometimes you only want a number in your input.

```php
// render numbers
add_action( 'cmb_render_text_number', 'sm_cmb_render_text_number', 10, 5 );
function sm_cmb_render_text_number( $field_object, $escaped_value, $object_id, $object_type, $field_type_object ) {
	echo $field_type_object->input( array( 'class' => 'cmb_text_small', 'type' => 'number' ) );
}

// validate the field
add_filter( 'cmb_validate_text_number', 'sm_cmb_validate_text_number' );
function sm_cmb_validate_text_number( $new ) {
	$new = preg_replace( "/[^0-9]/", "", $new );

	return $new;
}
```

### text_url - adds http:// to the beginning of the meta value if it is not present.


> **Update: This field is now [in CMB core](https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php#L64), so consider this tutorial as an example.**

This is useful if you would like to display a URL in a template by pulling it from the post meta. Using this will make sure the link works if the user doesn't put the "http://" before the domain name.

```php
add_action( 'cmb_render_text_url', 'jt_cmb_render_text_url', 10, 5 );
/**
 * Outputs the markup for the text_url field
 */
function jt_cmb_render_text_url( $field_object, $escaped_value, $object_id, $object_type, $field_type_object ) {
	echo $field_type_object->input( array( 'class' => 'cmb_text_small' ) );
}

add_filter( 'cmb_validate_text_url', 'jt_cmb_validate_text_url' );
/**
 * Adds the http:// to the beginning of the url if it is not present
 *
 * Use 'text_url' as the value for the type key
 *
 * @author Justin Tallant
 */
function jt_cmb_validate_text_url( $new ) {
    if ( '' == $new ) {
    	return;
    }

    if ( ! preg_match('/http:\/\//', $new) ) {
        $new = 'http://' . $new;
    }

    return $new;
}
```
