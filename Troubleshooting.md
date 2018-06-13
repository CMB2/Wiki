<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [CMB2 URLs Issues](#cmb2-urls-issues)
- [Metabox not appearing in WordPress edit page](#metabox-not-appearing-in-wordpress-edit-page)
- ["Callable" Field Parameters](#callable-field-parameters)
- [CMB2 is having trouble finding the data or using the right object type](#cmb2-is-having-trouble-finding-the-data-or-using-the-right-object-type)
- [`Fatal error: Declaration of CMB2_Type_Colorpicker::render()` or similar](#fatal-error-declaration-of-cmb2_type_colorpickerrender-or-similar)
  - [Workarounds for PHP 7.2 errors](#workarounds-for-php-72-errors)

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
_Related Issues: [#432](https://github.com/CMB2/CMB2/issues/432), [#27](https://github.com/CMB2/CMB2/issues/27)_

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

These parameters accept a callable callback for convenience, but can cause debugging headaches if your parameter value happens to be callable without you knowing it. It is difficult to change at this point without breaking backwards-compatibility.

A listing of all the field parameters (besides the obvious `_cb` parameters) which accept a callable value:

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

**Update:** As of version 2.2.3, these magical non-_cb parameters being used with a callback are deprecated: `'row_classes'`, `'default'`, `'options'`. If trying to use these parameters with callbacks, notices will show when WordPress Debug is enabled.

We can't completely remove that functionality for a few releases to keep from breaking backwards-compatibility. We need to let the deprecation soak for a while, hopefully causing developers to update their code. Eventually, we will remove the broken functionally, and only the equivalent '`*_cb`' parameters will allow a callback.

An unfortunate side-effect is that you may occasionally see this deprecation notice when you are using a php callable word for the `'default'` or `'row_classes'` parameter (e.g. [#894](https://github.com/CMB2/CMB2/issues/894)). To address, use the workaround demonstrated above.

_Related Issues: [#507](https://github.com/CMB2/CMB2/issues/507), [#826](https://github.com/CMB2/CMB2/issues/826), [#894](https://github.com/CMB2/CMB2/issues/894), [#1094.](https://github.com/CMB2/CMB2/issues/1094)_

## CMB2 is having trouble finding the data or using the right object type

CMB2 does a lot of work to determine magically which object type context it should be working in. For the majority of use-cases, the correct object type context is `post` -- which means we're working with post objects (as opposed to users/terms/comments or options).

If you register a box to multiple types (say a post-type and `user`), then CMB2 looks for known admin variables to determine which part of the admin it is in. It uses this context to determine if we are in the `user` or `post` (for the post-type) object type context. 

If you happen to use that same box/fields on the front-end, then CMB2 does not have the same admin context available. If you're using one of the helper functions like `cmb2_get_metabox_form`, `cmb2_print_metabox_form`, or `cmb2_metabox_form`, you can help CMB2 to know which contexts it is operating in by passing in the proper context object type via the 3rd `$args` parameter:

```php
$form = cmb2_get_metabox_form( $atts['metabox_id'], $atts['object_id'], array( 'object_type' => 'user' ) );
```

If you do not provided this parameter, then CMB2 will guess which object type to use, which will fall back to the first object type registered.


## `Fatal error: Declaration of CMB2_Type_Colorpicker::render()` or similar

This happens for versions of CMB2 less than 2.3.0 and PHP greater than 7.2. [Version 2.3.0](https://github.com/CMB2/CMB2/releases/tag/v2.3.0) of CMB2 address this issue.

Unfortunately, many themes and plugins bundle CMB2, but do not update the bundled version, and so users are presented with a white screen/fatal error if they update their servers to > PHP 7.2.

### Workarounds for PHP 7.2 errors

The best solution is to request the theme or plugin author to update their bundled version, BUT there are 2 possible workarounds:

1. Install/activate the CMB2 plugin directly via the plugin dashboard: https://wordpress.org/plugins/cmb2/
	- As CMB2 only loads one version of itself (the most recent version), this will cause your theme/plugin to use the newest version of CMB2 instead of the bundled version (as long as the bundled version was included correctly).
1. Lower your version of PHP to less than 7.2, or request your web host to do so. This should be temporary, as I never want to recommend users user _lower_ versions of software.

For more context, feel free to read up on some of the support threads that have come through: [WordPress forums](https://wordpress.org/search/CMB2_Type_Colorpicker%3A%3Arender%28%29/?forums=1#gsc.tab=0&gsc.q=CMB2_Type_Colorpicker%3A%3Arender()&gsc.sort=)
