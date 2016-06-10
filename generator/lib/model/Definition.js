
var d = require('debug')("agile:gen:class");
var _ = require('lodash');
var Promise = require('bluebird');

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
    var clazz = new Clazz(key, obj);
    clazz.setParent(this);
    this.classes[key] = clazz;
  }
};

Definition.prototype.addTag = function(tag) {
  if(tag instanceof Array)
    return _.each(tag, this.addTag.bind(this));
  if(this.tags.indexOf(tag.toLowerCase()) === -1) {
    this.tags.push(tag);
  }
};

Definition.prototype.addGroup = function(group, ref) {
  this.group[group] = this.group[group] || [];
  if(this.group[group].indexOf(ref.toLowerCase()) === -1) {
    this.group[group].push(ref);
  }
};

Definition.prototype.toJSON = function() {
  return util.toJSON(this.data);
};

Definition.prototype.render = function(format) {
  var renderer;

  try {
    renderer = require("../renderer/" + format);
  }
  catch(e) {
    return Promise.reject(new Error("Cannot load render format: " + e.message));
  }

  return renderer(this);
};

module.exports = Definition;
