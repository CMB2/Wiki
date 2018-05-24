## If installing the plugin from wordpress.org:

1. Upload the entire `/CMB2` directory to the `/wp-content/plugins/` directory.
2. Activate CMB2 through the 'Plugins' menu in WordPress.
3. Copy (and rename if desired) `example-functions.php` into to your theme or plugin's directory.
4. Edit to only include the fields you need and rename the functions.
5. Profit.

## If including the library in your plugin or theme:

1. Place the CMB2 directory inside of your theme or plugin.
2. Copy (and rename if desired) example-functions.php into a folder above the CMB2 directory OR copy the entirety of its 3. contents to your theme's functions.php file.
4. Edit to only include the fields you need and rename the functions (CMB2 directory should be left unedited in order to 5. easily update the library).
6. Profit.

## If including the library on composer in PSR-4 format (Example Antonella Framework)

in composer.json file:

```json
"require": {
        "webdevstudios/cmb2": "dev-master",
        "composer/installers": "v1.0.12"
    },
 "extra": {
        "installer-paths": {
            "vendor/{$name}/": ["webdevstudios/cmb2"]
      }
    }
```

## If including the library on composer  in not PSR-4 format

in composer.json file:

```json
{
 "require": {
    "php": ">=5.3.0",
    "composer/installers": "v1.0.12",
    "webdevstudios/cmb2": "dev-master",
  },
  "autoload": {
    "files": ["vendor/cmb2/init.php"]
  },
  "extra": {
    "installer-paths": {
      "vendor/{$name}/": ["webdevstudios/cmb2"]
    }
  } 
}
```
