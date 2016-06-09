
var parser = require("./lib/parser");

var config = require('./config.json');

var _ = require("lodash");
var d = require("debug")("agile:gen");

parser.run()
  .then(function(definition) {
    d("Loaded %s classes", _.size(definition.classes));
    return definition.render("html");
  })
  .then(function(html) {
    require('fs').writeFileSync(config.outputFile, html);
  })
  .catch(function(e) {
    console.error(e);
  })
  ;
