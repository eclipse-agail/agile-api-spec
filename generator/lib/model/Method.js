var _ = require("lodash");

var util = require("../util");
var Type = require("./Type");

var d = require("debug")("agile:gen:model:Method");

var ArgType = function(name, obj, parent) {

  this.name = null;
  this.data = {
    description: null,
    example: null,
    type: null,
    fields: {},
    reference: null
  };

  Type.prototype.initialize.apply(this, arguments);
  // console.warn("arg %s %j", this.name, obj);
};
require('util').inherits(ArgType, Type);

var ReturnType = function(obj, parent) {

  this.name = null;
  this.data = {
    description: null,
    example: null,
    type: null,
    fields: {},
    reference: null
  };

  Type.prototype.initialize.call(this, null, obj, parent);
};
require('util').inherits(ReturnType, Type);

var Method = function (name, obj, parent) {

  this.name = null;
  this.data = {
    description: null,
    example: null,
    args: {},
    return: null,
  };


  if(parent) this.setParent(parent);
  if(obj) this.load(obj);
  if(name) this.name = name;

  util.exportProperties(this);

  d("Created method %s", this.name);
};
require('util').inherits(Method, require('./BaseObject'));

Method.prototype.toJSON = function () {
  return util.toJSON(this.data);
};

Method.prototype.load = function (obj) {

  var me = this;

  _.each(this.data, function (val, key) {

    if(key === 'args' && obj[key]) {

      if(obj[key] === 'void') {
        me.data.args = [];
        return;
      }

      _.each(obj[key], function (arg, argName) {

        if(typeof arg === 'string') {
          arg = {
            type: arg
          };
        }

        me.addArg(argName, arg);
      });

      return;
    }

    if(key === 'return' && obj[key]) {
      var returnType = obj[key];
      if(typeof returnType === 'string') {
        returnType = {
          type: returnType
        };
      }
      me.addReturn(returnType);
      return;
    }

    me.data[key] = (obj[key] === undefined) ? me.data[key] : obj[key];
  });
};

Method.prototype.addArg = function (name, arg) {
  d("Add method argument %s", name);
  var type = new ArgType(name, arg, this);
  this.data.args[name] = type;
};

Method.prototype.addReturn = function (returnType) {
  d("Add return type");
  var type = new ReturnType(returnType, this);
  // console.warn("returnType: %j %j", returnType, type);
  this.data.return = type;
};

module.exports = Method;
