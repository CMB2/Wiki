<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Enabling the REST API for a CMB2 box](#enabling-the-rest-api-for-a-cmb2-box)
- [Overriding the box's `'show_in_rest'` property from a field](#overriding-the-boxs-show_in_rest-property-from-a-field)
- [Routes](#routes)
  - [Route parameters](#route-parameters)
- [Permissions](#permissions)
  - [Permissions callback demo for a box](#permissions-callback-demo-for-a-box)
  - [Permissions callback demo for a field](#permissions-callback-demo-for-a-field)
- [Registered REST fields](#registered-rest-fields)
- [Requirements](#requirements)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Enabling the REST API for a CMB2 box

To enable the REST API for a specific CMB2 box, you will use the `'show_in_rest'` box property, and you will need to use the `cmb2_init` hook (vs the `cmb2_admin_init` hook).


```php
/**
 * Hook in and add an info metabox. Use the 'cmb2_init' hook to allow REST API registration.
 */
function yourprefix_register_demo_metabox() {

	$cmb = new_cmb2_box( array(
		'id'           => 'cmb2_info_metabox',
		'title'        => 'Information',
		'object_types' => array( 'post' ),
		// Enables CMB2 REST API for this box, and determines which http methods the box is visible in.
		'show_in_rest' => WP_REST_Server::READABLE, // or WP_REST_Server::ALLMETHODS/WP_REST_Server::EDITABLE,
	) );

	... 

}
add_action( 'cmb2_init', 'yourprefix_register_demo_metabox' );
```

The `'show_in_rest'` property accepts 1 of several values. The values are the same as those you would use to register your own REST routes, and you can read the [`WP_REST_Server` doc blocks](https://github.com/WordPress/WordPress/blob/master/wp-includes/rest-api/class-wp-rest-server.php#L15-L55) for an explanation on what they stand for.

The default for `'show_in_rest'` is `false`, meaning your boxes will NOT show in the REST API by default. You must opt-in. You can do that by setting the `'show_in_rest'` property to something other than `false`.

To make your box and box's fields visible/readable, you need to set this value to one of the following values:

* `WP_REST_Server::ALLMETHODS`
* `WP_REST_Server::READABLE`
* `true`

Keep in mind, there will be no authentication to _view_ the box/fields (though you can use a filter or box/field parameter to set an authentication callback, described below).

To make your box's fields (or individual field) values editable, you need set this value to one of the following values:

* `WP_REST_Server::ALLMETHODS`
* `WP_REST_Server::EDITABLE`

Keep in mind, you will be required to be authenticated in order to edit field values. Check out the [docs for the WP REST API authentication options](http://v2.wp-api.org/guide/authentication/).


## Overriding the box's `'show_in_rest'` property from a field

CMB2 allows you to specify the visibility of the individual fields. By default, they will have the same visibiliy as is set by the box's `'show_in_rest'` property. **Of note:** If the box's `'show_in_rest'` property is set to `false` or not set at all, the indivdual fields' `'show_in_rest'` properties will have no effect, and they will not be shown in the API.

If you have set your box's `'show_in_rest'` property as the example above (to `WP_REST_Server::READABLE`), this means that all the associated fields are by default 'readable', and can not be written to. If you wanted to enable a single field to be able to be written to from the API as well, you could set the field's `'show_in_rest'` override parameter to `WP_REST_Server::ALLMETHODS`:

```php
$cmb->add_field( array(
	'name'         => 'API Field',
	'desc'         => 'field description (optional)',
	'id'           => 'wiki_rest_text',
	'type'         => 'text',
	'show_in_rest' => WP_REST_Server::ALLMETHODS, // Allow field to be both read and written to via REST API.
) );
```

If you wanted to set a certain field to only be able to be written to from the API, you would set the field's `'show_in_rest'` override parameter to `WP_REST_Server::EDITABLE`. Conversely, if your CMB2 box's `'show_in_rest'` property is set to `WP_REST_Server::ALLMETHODS`, and you want to individually override that for a specific field (make it readable only), you would set the field's `'show_in_rest'` override parameter to `WP_REST_Server::READABLE`.


## Routes

CMB2 registers its own wp-api namespace, `cmb2/v1`. You can see the list of routes available by visiting that namespaced endpoint. This will likely be `<SITE_URL>/wp-json/cmb2/v1`.

* To access the listing of all CMB2 boxes which have the `'show_in_rest'` value set, GET request to: `<SITE_URL>/wp-json/cmb2/v1/boxes`.
* To access a given CMB2 boxes, GET request to: `<SITE_URL>/wp-json/cmb2/v1/boxes/<BOX_ID>`.
* To access the listing of all the readable fields for a given box, GET request to: `<SITE_URL>/wp-json/cmb2/v1/boxes/<BOX_ID>/fields`.
* To access a given field registered to a given box, GET request to: `<SITE_URL>/wp-json/cmb2/v1/boxes/<BOX_ID>/fields/<FIELD_ID>`.
	* In order to include the field value in the response, the `'object_type'` and `'object_id'` query parameters are required: `<SITE_URL>/wp-json/cmb2/v1/boxes/<BOX_ID>/fields/<FIELD_ID>/?object_type=<OBJECT_TYPE>&object_id=<OBJECT_ID>`.
* To update field value, POST request to: `<SITE_URL>/wp-json/cmb2/v1/boxes/<BOX_ID>/fields/<FIELD_ID>?object_type=<OBJECT_TYPE>&object_id=<OBJECT_ID>&value=<NEW_VALUE>`.
* To delete field value, DELETE request to: `<SITE_URL>/wp-json/cmb2/v1/boxes/<BOX_ID>/fields/<FIELD_ID>?object_type=<OBJECT_TYPE>&object_id=<OBJECT_ID>`.

### Route parameters

There are several arguments which may modify the return value from these routes:

* `'_embed'` - If boxes/box endpoint, includes the registered fields for the box in the response. If field/fields enpoint, includes the box object which the fields are registered to in the response.
* `'_rendered'` - When the `'_rendered'` argument is passed, the renderable field attributes will be returned fully rendered. By default, the names of the callback handers for the renderable attributes will be returned.
* `'object_id'` and `'object_type'` - To view or modify fields' values, the `'object_id'` and `'object_type'` arguments are required.

_Note: The WordPress REST API base endpoint will be `wp-json` unless pretty permalinks are not enabled, or it has been changed with the `'rest_url_prefix'` filter._

## Permissions

CMB2 handles the permissions for these boxes/fields routes with filters. They are as follows:

* `'cmb2_api_get_boxes_permissions_check'` - For API `GET` list boxes view requests. Default is `true`, anyone can view.
* `'cmb2_api_get_box_permissions_check'` - For API `GET` single box view requests. Default is `true`, anyone can view.
* `'cmb2_api_get_fields_permissions_check'` - For API `GET` list fields view requests. Default is `true`, anyone can view.
* `'cmb2_api_get_field_permissions_check'` - For API `GET` single field view requests. Default is `true`, anyone can view.
* `'cmb2_api_update_field_value_permissions_check'` - For API `POST` single field edit requests. Default is `current_user_can( 'edit_others_posts' )`.
* `'cmb2_api_delete_field_value_permissions_check'` - For API `DELETE` single field delete requests. Default is `current_user_can( 'delete_others_posts' )`.

Please keep in mind, if you modify these filters, you will change the permissions for ALL CMB2 boxes/fields, not just yours. Just like any powerful filter in WordPress, you will need to take care that you are only modifying the return value of these filters for your specific scenario and context. 

Each route's permissions to access can be modified, either through these filters, or through a box or field parameter. All but the first filter (`'cmb2_api_get_boxes_permissions_check'`) can be registered as callback params in your box or field registration, and this is the recommended way to manage this, as these callbacks will only affect the box or field which they are registered to.

The registered handlers will have a parameter name which matches the filter, except:
- The `'cmb2_api_'` prefix will be removed
- A `'_cb'` suffix will be added (to stay inline with other '*_cb' parameters).

So the `'cmb2_api_get_box_permissions_check'` would be registered as a callback like: `'get_box_permissions_check_cb' => 'your_callback_function_name'`.

### Permissions callback demo for a box

To demonstrate, let's update our box registration from above and ensure that a user must be logged in before they can see our box/fields in the API:

```php
$cmb = new_cmb2_box( array(
	'id'                              => 'cmb2_info_metabox',
	'title'                           => 'Information',
	'object_types'                    => array( 'post' ),
	'show_in_rest'                    => WP_REST_Server::READABLE,
	'get_box_permissions_check_cb'    => 'your_prefix_only_show_for_logged_in_users',
	'get_fields_permissions_check_cb' => 'your_prefix_only_show_for_logged_in_users',
	'get_field_permissions_check_cb'  => 'your_prefix_only_show_for_logged_in_users',
) );

...

function your_prefix_only_show_for_logged_in_users( $is_allowed, $cmb_controller ) {
	if ( ! is_user_logged_in() ) {
		$is_allowed = false;
	}

	return $is_allowed;
}
```

I've registered the same callback (checking if user is logged in) to 3 the different routes public (by default) routes. So now when a user tries to fetch the single box view or a single field view for that box, they will receive a 'rest_forbidden' message. Also, this box will not be returned in the list of boxes.

### Permissions callback demo for a field

Maybe you want to keep the defaults as-is, and only want to modify the permissions for a single field. The code is exactly the same for your field registration:

```php
$cmb->add_field( array(
	'name' => 'API Field',
	'desc' => 'field description (optional)',
	'id'   => 'wiki_rest_text',
	'type' => 'text',
	'get_field_permissions_check_cb' => 'your_prefix_only_show_for_logged_in_users',
) );
```

## Registered REST fields

The endpoints are just one way to modify view/modify the CMB2 field values. CMB2 will also register these fields to display in the content endpionts (like viewing a post, `<SITE_URL>/wp-json/wp/v2/<POST_TYPE>/<POST_ID>`). The fields will be listed under the attribute name, `'cmb2'`, and will be an array of arrays, where each array is an array of values for each box registered to that content type.

This will work for any post type route, as well as terms, users, and comments.

## Overriding a returned value for a individual field

Optionally setting the [rest_value_cb](https://github.com/CMB2/CMB2/wiki/Field-Parameters#rest_value_cb) field parameter will dictate how the `value` will be returned for that field.

## Requirements

To use the CMB2 REST API, you will be required to use either the [WordPress REST API plugin](https://wordpress.org/plugins/rest-api/), or a current version of WordPress (4.7+).
