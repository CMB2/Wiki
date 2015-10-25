When changing site URL (e.g. from dev to production) make sure that all letter counters gets updated. In other case you will lose your CMB2 data.

CMB2 stores data inside `wp_options` table as JSON strings. Each CMB2 string starts with letter `s` followed by a colon `:` and number of letters in that string. Here is the example:
```
s:53:"http://abc.wp.dev/app/uploads/2015/10/some-name-2.jpg"
```
Let say we updated URL and current base URL is `http://abc.wp.production.com`. Now we need to make sure that every string counter gets updated according to the new URL length. In our example it should be:
```
s:64:"http://abc.wp.production.com/app/uploads/2015/10/some-name-2.jpg"
```

The easiest way to ensure "easy" URL changes (e.g. between dev and production) is to provide dev URL of the same length as production one.