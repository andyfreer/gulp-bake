# gulp-baker

Bake assets to an output file using token replacement in Gulp

## Why Baker?

Based on gulp-file-insert but works directly on the file buffers without converting up to strings, to ensure inserted content is identical to the content read from disk.

This avoids conversion/encoding/RegEx issues where file content can break gulp-file-insert (e.g. large complex scripts) and works on any asset type without worrying about the file content.

The Baker API is backwards compatible to gulp-file-insert with the only change being that duplicate tokens are ignored (files are only baked once).

Additional API options can be added to handle different asset types in future, e.g. baking images as base64 in an html file.

## Usage

First, install `gulp-baker` as a development dependency:

```shell
npm install --save-dev gulp-baker
```


```javascript
var baker = require("gulp-baker");

gulp.src('./sample.js')
  .pipe(baker({
    "/* file 1 */": "tmp/file1",
    "/* file 2 */": "tmp/file2",
    version: "tmp/version_number"
  }))
  .pipe(gulp.dest('./dist/'));
```
This will replace into sample.js the tag "/\* file 1 \*/" by the content of the file "tmp/file1", "/\* file 2 \*/" by the content of "tmp/file2" and "version" by the content of "tmp/version_number" each time they appear.

## LICENSE

(MIT License)

Copyright (c) 2014 Jean-Baptiste DEMONTE <jbdemonte@gmail.com>

Copyright (c) 2016 Andy Freer <andy@dash.org>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[npm-url]: https://npmjs.org/package/gulp-baker
[npm-image]: https://badge.fury.io/js/gulp-file-insert.png

[travis-url]: http://travis-ci.org/jbdemonte/gulp-file-insert
[travis-image]: https://secure.travis-ci.org/jbdemonte/gulp-file-insert.png?branch=master

[depstat-url]: https://david-dm.org/jbdemonte/gulp-file-insert
[depstat-image]: https://david-dm.org/jbdemonte/gulp-file-insert.png