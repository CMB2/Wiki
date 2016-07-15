To add custom metaboxes to the user profile page, you can set the `object_types` parameter to `array( 'user' )` to indicate that the metaboxes should be displayed on the user profile (rather than a specific post type) and that the meta information should be stored against user_meta, rather than post_meta.

An example metabox can be seen in [example-functions.php](https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php#L508-L576)

Note that the Metabox `description` and `name` parameters will not display. You can label your user settings section by adding a `title` field as the first field.