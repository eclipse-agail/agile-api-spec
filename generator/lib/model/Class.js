

var d = require('debug')("agile:gen:class");
var _ = require('lodash');

var util = require('../util');
var Property = require('./Property');
var Method = require('./Method');

var Clazz = function(name, obj) {

  var me = this;

  this.name = null;
  this.parent = null;
  this.data = {
    description: null,
    tags: [],
    group: null,
    methods: {},
    properties: {},
  };

  util.exportProperties(this);

  if(name) this.name = name;
  if(obj) this.load(obj);
};

Clazz.prototype.getParent = function () {
  return this.parent;
};

Clazz.prototype.setParent = function (p) {
  this.parent = p;
};

Clazz.prototype.load = function (obj) {

  var me = this;

  _.each(this.data, function(val, key) {
    d(key);
    me.data[key] = (obj[key] === undefined) ? me.data[key] : obj[key];
  });

  _.each(obj, function(val, key) {

    // check if it is a Property or Method (First char must be uppercase)
    if(key.substr(0,1) === key.substr(0,1).toUpperCase()) {
      // is it a Method
      if(val.args || val.return) {
        me.addMethod(key, val);
      }
      else {
        me.addProperty(key, val);
      }
    }
  });

};

Clazz.prototype.addProperty = function (name, prop) {
  d("Add property %s", name);
  this.data.properties[name] = new Property(name, prop);
};

Clazz.prototype.addMethod = function (name, method) {
  d("Add method %s", name);
  this.data.methods[name] = new Method(name, method);
};

Clazz.prototype.toJSON = function() {
  return util.toJSON(this.data);
};

module.exports = Clazz;
