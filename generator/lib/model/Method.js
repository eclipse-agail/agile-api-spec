var _ = require("lodash");

var util = require("../util");
var Type = require("./Type");

var d = require("debug")("agile:gen:Method");

var ArgType = function(name, obj) {

  this.name = null;
  this.data = {
    description: null,
    example: null,
    type: null,
    fields: {},
    reference: null
  };

  this.initialize(name, obj);
};

require('util').inherits(ArgType, Type);

var ReturnType = function(obj) {

  this.name = null;
  this.data = {
    description: null,
    example: null,
    type: null,
    fields: {},
    reference: null
  };

  this.initialize(null, obj);
};
require('util').inherits(ReturnType, Type);


var Method = function (name, obj) {

  this.name = null;
  this.data = {
    description: null,
    example: null,
    args: {},
    return: null,
  };

  util.exportProperties(this);

  if(obj) this.load(obj);
  if(name) this.name = name;

  d("Created method %s", this.name);
};

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

        if(typeof obj[key] === 'string') {
          obj[key] = {
            type: obj[key]
          };
        }

        me.addArg(argName, arg);
      });

      return;
    }

    if(key === 'return' && obj[key]) {
      if(typeof obj[key] === 'string') {
        obj[key] = {
          type: obj[key]
        };
      }

      me.addReturn(obj[key]);

      return;
    }

    me.data[key] = (obj[key] === undefined) ? me.data[key] : obj[key];
  });
};

Method.prototype.addArg = function (name, arg) {
  d("Add methd arg %s", name);
  var type = new ArgType(name, arg);
  this.data.args[name] = type;
};

Method.prototype.addReturn = function (returnType) {
  // d("Add return type %j", returnType);
  var type = new ReturnType(returnType);
  this.data.return = type;
};

module.exports = Method;
