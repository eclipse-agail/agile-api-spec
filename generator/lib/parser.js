var parser = module.exports;


var Promise = require('bluebird');
var _ = require("lodash");

var d = require("debug")("agile:gen:parser");
var dobj = require("debug")("agile:gen:parser:analyzer");

var Clazz = require("./model/Class");

var Definition = require('./model/Definition');

var types = [
  'number', 'string', 'array', 'object', 'enum'
];

parser.parse = function(doc) {

  var definition = new Definition();

  return Promise.all(Object.keys(doc))
    .each(function(key) {
      definition.add(key, doc[key]);
    })
    .then(function() {
      var json = definition.toJSON();
      console.log(require('util').inspect(
        json
      ,{ depth: null }));

      process.exit();
    })
    ;
};
