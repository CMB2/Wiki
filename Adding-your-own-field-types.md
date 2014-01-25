This library contains a couple of hooks that make it possible for you to create your own field types:

```php
cmb_render_{field-type}
cmb_validate_{field-type}
```

You can add actions and filters to these hooks (using WordPress's native add_action() function) that enable the custom field types.

## Example 1: Email field

> Update: This field is now [in CMB core](https://github.com/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/blob/master/example-functions.php#L64), so consider this tutorial as an example.

A simple example would be a `text_email` field that only allowed users to enter a valid email address.

![Screenshot](images/screenshot_text_email.jpg)

### Step 1: `cmb_render_{field-type}`  
The first step is to write the code for *rendering the field* within the WordPress administrative area:

```php
add_action( 'cmb_render_text_email', 'rrh_cmb_render_text_email', 10, 2 );
function rrh_cmb_render_text_email( $field, $meta ) {
    echo '<input type="text" name="', $field['id'], '" id="', $field['id'], '" value="', $meta ? $meta : $field['std'], '" style="width:97%" />','<p class="cmb_metabox_description">', $field['desc'], '</p>';
}
```

The `add_action` function has four parameters:

* `cmb_render_text_email` -- By adding an action to this hook, we are essentially creating the new field type. This action defines what code gets executed when you instantiate a field type called `text_email` in the library. This first parameter, the hook name, must be `cmb_render_` followed by the field type name.
* `rrh_cmb_render_text_email` -- This is the name of your custom function that gets executed when you instantiate a field type called `text_email`. It can be called whatever you want, but it must match a function you define elsewhere in your code.
* `10` -- This is the priority for this action, the order in which it is executed. (The exact number matter should not matter unless you have multiple action on this hook.)
* `2` -- This is the number of parameters your custom function will receive. You want to set this to 2 so that you can receive the field definition [`$field`] and the existing value [`$meta`].

In this example, our custom field type will display an input box, with the proper `name` attribute of `$field['id']` so that it will save to the database the way the built-in field types do. It displays the value previously specified for the field, if there is one.

### Step 2: `cmb_validate_{field-type}`
You can optionally add code that validates or modifies the entered value before it is saved. In our example, we only want to allow valid email addresses; we can remove any invalid values before they are saved to the database:

```php
add_filter( 'cmb_validate_text_email', 'rrh_cmb_validate_text_email' );
function rrh_cmb_validate_text_email( $new ) {
    if ( !is_email( $new ) ) {$new = "";}   
    return $new;
}
```

The `add_filter` function has two parameters:

* `cmb_validate_text_email` -- This filter defines what code gets executed when the user attempts to save a value in a field type called `text_email` in the library. This first parameter, the hook name, must be `cmb_validate_` followed by the field type name.
* `rrh_cmb_validate_text_email` -- This is the name of your custom function that gets executed when the user attempts to save a value in a field type called `text_email`. It can be called whatever you want, but it must match a function you define elsewhere in your code.

When the user attempts to save a value in the field, we will check if the new value is a valid email address. If not, we will remove it. We will then return the possibly-modified value back to the library to do the saving.

### Step 3: Use the field type

With the action (and optionally the filter) added, we can now use the field type in our code just like we would use the built-in field types.

```php
add_filter( 'cmb_meta_boxes', 'rrh_person_meta_boxes' );
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
function imag_render_imag_select_taxonomy( $field, $meta ) {

    wp_dropdown_categories(array(
            'show_option_none' => '&#8212; Select &#8212;',
            'hierarchical' => 1,
            'taxonomy' => $field['taxonomy'],
            'orderby' => 'name', 
            'hide_empty' => 0, 
            'name' => $field['id'],
            'selected' => $meta  

        ));
    if ( !empty( $field['desc'] ) ) echo '<p class="cmb_metabox_description">' . $field['desc'] . '</p>';

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

## Add Your Own Examples

The possibilities are endless. If you create custom field types that you think others would find useful, please share them here!

### text_number - adds a text number input

Sometimes you only want a number in your input. 

```php
// render numbers
add_action( 'cmb_render_text_number', 'sm_cmb_render_text_number', 10, 2 );

function sm_cmb_render_text_number( $field, $meta ) {
	echo '<input class="cmb_text_small" type="number" name="', $field['id'], '" id="', $field['id'], '" value="', '' !== $meta ? $meta : $field['std'], '" /><span class="cmb_metabox_description">', $field['desc'], '</span>';
}

// validate the field
add_filter( 'cmb_validate_text_number', 'sm_cmb_validate_text_number' );
function sm_cmb_validate_text_number( $new ) {
	$new = preg_replace("/[^0-9]/","",$new);

    return $new;
}
```

### post_select - adds a select dropdown with a list of posts from a post type

For the times when you need to relate one post to another, this comes in handy.

Like the terms field above, we would pass an array of posts to the `select` field type. First we'll create a function to pull back an array of post options:

```php
/**
 * Gets a number of posts and displays them as options
 * @param  array $query_args Optional. Overrides defaults.
 * @return array             An array of options that matches the CMB options array
 */
function cmb_get_post_options( $query_args ) {

	$args = wp_parse_args( $args, array(
		'post_type' => 'post',
		'numberposts' => 10,
	) );

	$posts = get_posts( $args );

	$post_options = array();
	if ( $posts ) {
		foreach ( $posts as $post ) {
			$post_options[ $post->ID ] = $post->post_title;
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
				'name'    => 'Select Posts',
				'desc'    => 'field description (optional)',
				'id'      => $prefix . 'post_multicheckbox',
				'type'    => 'multicheck',
				'options' => cmb_get_post_options( array( 'post_type' => 'your_post_type', 'numberposts' => 5 ) ),
			),
        )
...

```
**Alternatively**, you could use the `multicheck`, or `radio` field types as well.

### text_url - adds http:// to the beginning of the meta value if it is not present.


> Update: This field is now [in CMB core](https://github.com/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/blob/master/example-functions.php#L56), so consider this tutorial as an example.

This is useful if you would like to display a URL in a template by pulling it from the post meta. Using this will make sure the link works if the user doesn't put the "http://" before the domain name.

```php
add_action( 'cmb_render_text_url', 'jt_cmb_render_text_url', 10, 2 );
/**
 * Outputs the markup for the text_url field
 */
function jt_cmb_render_text_url( $field, $meta ) {
    echo '<input type="text" name="', $field['id'], '" id="', $field['id'], '" value="', $meta ? $meta : $field['std'], '" style="width:97%" />','<p class="cmb_metabox_description">', $field['desc'], '</p>';
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
    if ( '' == $new ) { return; }

    if ( !preg_match('/http:\/\//', $new) ) {
        $new = 'http://' . $new;
    }

    return $new;
}
```