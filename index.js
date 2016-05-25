var through = require("through"),
  gutil = require("gulp-util"),
  Buffer = require("buffer").Buffer,
  PluginError = gutil.PluginError,
  fs = require("fs"),
  File = gutil.File,
  ns = "gulp-bake";

module.exports = function (options) {
  if (typeof options !== "object") {
    options = {};
  }

  var key,
    file = null,
    keys = [];

  for (key in options) {
    keys.push(key);
  }

  function write (f){
    if (!f.isNull()) {
      if (f.isStream()) {
        this.emit("error", new PluginError(ns,  "Streaming not supported"));
      } else {
        file = f;
      }
    }
  }

  function end () {
    var self = this;

    function finalize() {
      var newFile = new File({
        cwd: file.cwd,
        base: file.base,
        path: file.path,
        contents: file.contents
      });
      self.emit("data", newFile);
      self.emit("end");
    }

    function next() {
      var key = keys.shift();
      if (key) {
        // load the input-file to a buffer
        fs.readFile(options[key], function (err, data) {
          if (err) {
            self.emit('error', new gutil.PluginError(ns,  ns + " FILE NOT FOUND: [" + options[key] + "] for token [" + key + "]"));
          } else {
            // search for the start index of the token in the source-file buffer..
            var tokenStart = file.contents.indexOf(key);

            if (tokenStart < 0) {
              self.emit('error', new gutil.PluginError(ns, ns + " TOKEN NOT FOUND: [" + key + "] in file [" + options[key] + "]"));
            } else {

              // split the source-file into head and tail buffers for
              // content before and after the token
              var tailStart = tokenStart + key.length;
              var buffHead = new Buffer(tokenStart).fill(' ');
              var buffTail = new Buffer(file.contents.length - tailStart).fill('*');
              file.contents.copy(buffHead, 0, 0, tokenStart);
              file.contents.copy(buffTail, 0, tokenStart + key.length, file.contents.length);

              // rebuild the source-file buffer with the input-file buffer inserted between the head and tail
              file.contents = Buffer.concat([buffHead, data, buffTail]);
            }
          }
          next();
        });
      } else {
        finalize();
      }
    }
    next();
  }

  return through(write, end);
};
