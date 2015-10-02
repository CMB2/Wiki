This snippet has been moved to the [CMB2 Snippet Library](https://github.com/WebDevStudios/CMB2-Snippet-Library/tree/master/options-and-settings-pages).


### Saving data
After setting CMB2 form use:
```
cmb2_metabox_form( 'box_id', 'options_set_name' );
```

Note that main box reqires `show_on` param to properly save submitted form data (it is essential to make it work).
Example:
```
$cmb = new_cmb2_box( array(
  'id'         => $this->metabox_id,
  'hookup'     => false,
  'cmb_styles' => false,
  'show_on'    => array(
  // These are important, don't remove
  'key'   => 'options-page',
  'value' => array( $this->key, )
  ),
) );
```

### Retrieving saved data
Use `cmb2_get_option` function:
```
cmb2_get_option('options_set_name', 'field_id');
```
