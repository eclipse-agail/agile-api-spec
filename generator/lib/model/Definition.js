
var d = require('debug')("agile:gen:class");
var _ = require('lodash');

var util = require('../util');

var Type = require('./Type');
var Clazz = require('./Class');

var Definition = function() {

  var me = this;

  this.data = {
    groups: [],
    tags: [],
    classes: {},
    types: {}
  };

  util.exportProperties(this);

};

Definition.prototype.add = function(key, obj) {
  // is a custom type
  if(obj.type) {
    d("Add root type %s", key);
    this.types[key] = new Type(key, obj);
  }
  else {
    d("Add class %s", key);
    this.classes[key] = new Clazz(key, obj);
  }
};

Definition.prototype.toJSON = function() {
  return util.toJSON(this.data);
};

Definition.prototype.render = function(format, obj) {

  var renderer;
  try {
    renderer = require("../renderer/" + format);
  }
  catch(e) {
    throw new Error("Cannot load render format: " + e.message);
  }

};

module.exports = Definition;
