var parser = module.exports;


var Promise = require('bluebird');
var _ = require("lodash");

var d = require("debug")("agile:gen:parser");

var types = [
  'number', 'string', 'array', 'object', 'enum'
];

var definitions = {
  groups: [],
  tags: [],
  classes: {},
  types: {}
};

parser.parse = function(doc) {
  return Promise.all(Object.keys(doc)).each(function(key) {

    var obj = doc[key];

    // is a custom type
    if(obj.type) {
      d("Found Type %s", key);
      definitions.types[key] = obj;
    }
    else {
      d("Found Class %s", key);
      definitions.classes[key] = obj;
    }

    // console.log(require('util').inspect(obj, { depth: null }));

  });
};
