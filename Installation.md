<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [If installing the plugin from wordpress.org:](#if-installing-the-plugin-from-wordpressorg)
- [If including the library in your plugin or theme:](#if-including-the-library-in-your-plugin-or-theme)
- [If including the library via composer in PSR-4 format (Example Antonella Framework)](#if-including-the-library-via-composer-in-psr-4-format-example-antonella-framework)
- [If including the library via composer (not PSR-4 format)](#if-including-the-library-via-composer-not-psr-4-format)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## If installing the plugin from wordpress.org:

1. Upload the entire `/CMB2` directory to the `/wp-content/plugins/` directory.
2. Activate CMB2 through the 'Plugins' menu in WordPress.
3. Copy (and rename if desired) `example-functions.php` into to your theme or plugin's directory and `require_once` from your theme or plugin's main file.
4. Edit to only include the fields you need and rename the functions.
5. Profit.

## If including the library in your plugin or theme:

1. Place the CMB2 directory inside of your theme or plugin.
2. Copy (and rename if desired) `example-functions.php` into a folder above the CMB2 directory OR copy the entirety of its contents to your theme's `functions.php` file.
4. Edit to only include the fields you need and rename the functions (CMB2 directory should be left unedited in order to easily update the library).
6. Profit.

**Important Notes**

- Please review the [caveats for bundling and including CMB2
](https://github.com/CMB2/CMB2/wiki/Basic-Usage#caveats-for-bundling-and-including-cmb2).
- when bundling CMB2 with your theme or plugin, you will want to use the release package. You can download the zip file from the [WordPress plugin repo](https://wordpress.org/plugins/cmb2/), or using the download link on Github. It is recommended that you not clone CMB2 into your project. This will ensure your bundled version does not contain the development-only files/folders.

## If including the library via composer in PSR-4 format (Example Antonella Framework)

in composer.json file:

```json
"require": {
	"cmb2/cmb2": "dev-master"
},
"autoload": {
	"files": ["vendor/cmb2/cmb2/init.php"]
}
```

## If including the library via composer (not PSR-4 format)

in composer.json file:

```json
{
	"require": {
		"php": ">=5.3.0",
		"composer/installers": "v1.0.12",
		"cmb2/cmb2": "dev-master"
	},
	"autoload": {
		"files": ["vendor/cmb2/init.php"]
	},
	"extra": {
		"installer-paths": {
			"vendor/{$name}/": ["cmb2/cmb2"]
		}
	} 
}
```
