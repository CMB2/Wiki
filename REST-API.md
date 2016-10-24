## Enabling the REST API for a CMB2 box

To enable the REST API for a specific CMB2 box, you will use the `'show_in_rest'` box property:

```php
$cmb = new_cmb2_box( array(
	'id'           => 'cmb2_info_metabox',
	'title'        => 'Information',
	'object_types' => array( 'post' ),
	// Enables CMB2 REST API for this box, and determines which http methods the box is visible in.
	'show_in_rest' => WP_REST_Server::READABLE, // or WP_REST_Server::ALLMETHODS/WP_REST_Server::EDITABLE,
,
) );
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


## Permissions

CMB2 by default handles the permissions for these boxes/fields with filters. They are as follows:

* `'cmb2_api_get_items_permissions_check'` - For API `GET` list view requests (boxes, fields). Default is `true`, anyone can view.
* `'cmb2_api_get_item_permissions_check'` - For API `GET` single view requests (box, field). Default is `true`, anyone can view.
* `'cmb2_api_update_field_value_permissions_check'` - For API `POST` requests to single field. Default is `current_user_can( 'edit_others_posts' )`.
* `'cmb2_api_delete_field_value_permissions_check'` - For API `DELETE` requests to single field. Default is `current_user_can( 'delete_others_posts' )`.


To demonstrate, let's limit 

```php
function your_prefix_only_allow_for_admins( $can_access, $controller ) {
	$can_access = current_user_can( 'manage_options' );

	return $can_access;
}
add_filter( 'cmb2_api_get_items_permissions_check', 'your_prefix_only_allow_for_admins' );
```

The default for read-only access is `true`, so no special permissions needed, and they are viewable without being authenticated.


## Requirements

It’s required turn on the WordPress pretty permalinks in Settings > Permalinks.
















As hinted above, each route's authentication and required user level to access can be modified, either through a filter, or a box or field parameter.
