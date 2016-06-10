var parser = require("./lib/parser");

var config = require('./config.json');

var _ = require("lodash");
var d = require("debug")("agile:gen");

module.exports.export = function (format) {

  parser.run()
    .then(function (definition) {
      d("Loaded %s classes", _.size(definition.classes));
      return definition.render(format);
    })
    .then(function (html) {
      require('fs').writeFileSync(config.outputDir + "/" + format + "/api." + format, html);
    })
    .catch(function (e) {
      throw e;
    });

};

module.exports.exportAll = function () {
  var glob = require("glob");
  var path = require("path");
  glob("./lib/renderer/*.js", function (err, files) {
    if(err) throw err;
    files.forEach(function (file) {
      var format = path.basename(file, '.js');
      d("Render format %s", format);
      module.exports.export(format);
    });
  });
};
