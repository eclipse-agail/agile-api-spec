var config = require("./config.json");

var Promise = require('bluebird');
var fs = require('fs');
var glob = require("glob");
var YAML = require('yamljs');
var d = require("debug")("agile:gen");

var parser = require("./lib/parser");

var parse = function() {
  return loadYaml().then(function(docs) {
    return Promise.all(docs).each(function(doc) {
      return parser.parse(doc);
    });
  });
};

var loadYaml = function() {
  return findFiles().then(function(files) {
    return Promise
      .all(files)
      .map(function(file) {
        return new Promise(function(resolve, reject) {
          try {
            d("Loading %s", file);
            var doc = YAML.load(file);
            resolve(doc);
          }
          catch(e) {
            d("Cannot load %s: ", file, e.message);
            resolve();
          }
        });
      });
  });
};

var findFiles = function() {
  return new Promise(function(resolve, reject) {
    glob(config.baseDir + "/**/*.yml", function(err, files) {
      if(err) return reject(err);
      resolve(files);
    });
  });
};

parse().then(function(def) {
  // console.log(require('util').inspect(def, { depth: null }));
});
