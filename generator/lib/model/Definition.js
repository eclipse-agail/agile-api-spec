
var d = require('debug')("agile:gen:model:Definition");
var _ = require('lodash');
var Promise = require('bluebird');

var util = require('../util');

var Type = require('./Type');
var Clazz = require('./Class');

var Definition = function() {

  var me = this;

  this.data = {
    groups: [],
    tags: {},
    classes: {},
    types: {}
  };

  util.exportProperties(this);
};

Definition.prototype.add = function(key, obj) {

  // is a custom type
  if(obj.type) {
    d("Add root type %s", key);
    var type = new Type(key, obj, this);
    this.types[key] = type;
  }
  else {
    d("Add class %s", key);
    var clazz = new Clazz(key, obj, this);
    this.classes[key] = clazz;
  }
};

Definition.prototype.addTags = function(obj) {

  if(obj.tags) {
    var tags = obj.tags;
    d("Add tags %j", tags);
    var me = this;
    _.each(tags, function(tag) {
      me.tags[tag] = this.tags[tag] || [];
      me.tags[tag].push(obj);
    });
  }
};

Definition.prototype.addGroup = function(obj) {
  if(obj.group) {
    var group = obj.group;
    d("Add group %s", group);
    this.groups[group] = this.groups[group] || [];
    this.groups[group].push(obj);
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
