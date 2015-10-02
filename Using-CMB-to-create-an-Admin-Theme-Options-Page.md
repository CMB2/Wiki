This snippet has been moved to the [CMB2 Snippet Library](https://github.com/WebDevStudios/CMB2-Snippet-Library/tree/master/options-and-settings-pages).

Main box reqires `show_on` param to properly save submitted form data (at least in my case).
Example:
```
$cmb = new_cmb2_box( array(
  'id' => $this->plugin_slug . '_options',
  'show_on' => array( 'key' => 'options-page', 'value' => array( $this->plugin_slug ), ),
  'show_names' => true, // Show field names on the left
) );
```