<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CMB2 URLs Issues](#cmb2-urls-issues)
- [Metabox not appearing in WordPress edit page](#metabox-not-appearing-in-wordpress-edit-page)
- ["Callable" Field Parameters](#callable-field-parameters)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## CMB2 URLs Issues

If you're having issues with CMB not loading its CSS or JS files properly, you can modify the URL via the `cmb2_meta_box_url` filter.

INSTEAD of completely replacing the URL, it is best to use `str_replace` to fix the URL. This ensures you only change the url if it's broken, and ensures that if another version of CMB2 is loaded (i.e. in a 3rd part plugin), that their correct URL will load, rather than forcing yours (and possibly breaking their implementation).

```php
function update_cmb2_meta_box_url( $url ) {
	/*
	 * If you use a symlink, the css/js urls may have an odd path stuck in the middle, like:
	 * http://SITEURL/wp-content/plugins/Users/jt/Sites/CMB2/cmb2/js/cmb2.js?ver=X.X.X
	 * Or something like that.
	 * 
	 * INSTEAD of completely replacing the URL,
	 * It is best to do a str_replace. This ensures you only change the url if it's 
	 * pointing to the broken resource. This ensures that if another version of CMB2
	 * is loaded (i.e. in a 3rd part plugin), that their correct URL will load,
	 * rather than forcing yours.
	 */
	
	return str_replace( '/Users/jt/Sites/CMB2', '', $url );
}
add_filter( 'cmb2_meta_box_url', 'update_cmb2_meta_box_url' );
```
_Related Issues: [#432](https://github.com/WebDevStudios/CMB2/issues/432), [#27](https://github.com/WebDevStudios/CMB2/issues/27)_

## Metabox not appearing in WordPress edit page

Keep in mind, a 'title' parameter needs to be passed to `new_cmb2_box()` in order for WordPress to automatically hook in the CMB2 metabox via `add_meta_box()`. Double-check that you have title if you are not seeing your metabox show up in the admin.

Notes from the CMB2 source code:
> To keep from registering an actual post-screen metabox, omit the 'title' attribute from the metabox registration array.

> (WordPress will not display metaboxes without titles anyway)

> This is a good solution if you want to output your metaboxes somewhere else in the post-screen


## "Callable" Field Parameters

CMB2 supports many ["callable"](http://php.net/manual/en/function.is-callable.php) field parameters. There are several obvious ones, with the `_cb` suffix, but many of the other parameters can take a scalar value (string, integer, etc) **as well as** a callable value (callback function). This was mainly meant for convenience, but can be problematic if you want to specify a value which just so happens to also be callable. 

A simple (yet unlikely) example would be using the string 'print_r' as the value for the 'default' parameter:

```php
$cmb->add_field( array(
	'name'    => 'Test Default',
	'id'      => 'testdefault',
	'type'    => 'text_small',
	'default' => 'print_r',
) );
```

Since `print_r()` is a callable [php function](http://php.net/manual/en/function.print-r.php), the actual default value will be the return of the `print_r()` function (which in this case, will return nothing).

Another example is if you have defined a function in your theme's functions.php file, `crackers()`, and then used `'crackers'` as the value for the 'default' parameter. Again, the default would be the return of the `crackers()` function, which is almost certainly not the expectation.

These paramters accept a callable callback for conveneince, but can cause debugging headaches if your paramater value happens to be callable without you knowing it. It is difficult to change at this point without breaking backwards-compatibility.

A listing of all the field paramaters (besides the obvious `_cb` parameters) which accept a callable value:

* `'default'`
* `'options'`
* `'before_field'`
* `'after_field'`
* `'before_row'`
* `'after_row'`
* `'before'`
* `'after'`
* `'before_group'`
* `'after_group'`
* `'before_group_row'`
* `'after_group_row'`

If you absolutely need to use a value which also happens to be callable, as a workaround, you can use a callback function which simply returns the text value:

```php
function return_crackers_for_value() {
	return 'crackers';
}
```

```php
$cmb->add_field( array(
	'name'    => 'Test Default',
	'id'      => 'testdefault',
	'type'    => 'text_small',
	'default' => 'return_crackers_for_value',
) );
```

_Related Issue: [#507](https://github.com/WebDevStudios/CMB2/issues/507)_
