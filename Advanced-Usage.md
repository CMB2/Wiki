<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Using CMB2 to create an Admin Theme Options Page](#using-cmb2-to-create-an-admin-theme-options-page)
  - [Retrieving saved data from the options page](#retrieving-saved-data-from-the-options-page)
- [Bringing Metaboxes to the Front End](/CMB2/CMB2/wiki/Bringing-Metaboxes-to-the-Front-End)
- [Create New Posts (or Custom Post Type) Entries Using A Front End Form](http://webdevstudios.com/2015/03/30/use-cmb2-to-create-a-new-post-submission-form/)
- [JavaScript validation for CMB2 fields](/CMB2/CMB2/wiki/JavaScript-validation-for-cmb2-custom-post-type-fields)
- [JavaScript validation of "required" fields](/CMB2/CMB2/wiki/Plugin-code-to-add-JS-validation-of-%22required%22-fields)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### Using CMB2 to create an Admin Theme Options Page

This snippet has been moved to the [CMB2 Snippet Library](https://github.com/CMB2/CMB2-Snippet-Library/tree/master/options-and-settings-pages).

**Remember to replace instances of `myprefix` and `Myprefix` with something unique to your code.**

#### Retrieving saved data from the options page
Use the `myprefix_get_option` function included in the above snippets (obviously changing the prefix):

```php
$field_value = myprefix_get_option( 'field_id' );
```
