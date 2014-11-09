### CMB_META_BOX_URL Issues

If you're having issues with CMB not loading its files properly, you can modify the `CMB_META_BOX_URL` via the `cmb_meta_box_url` filter.

```php
function update_cmb_meta_box_url( $url ) {
	// modify the url here
	return $url;
}
add_filter( 'cmb_meta_box_url', 'update_cmb_meta_box_url' );
```
