
var _ = require('lodash');
var util = require('../util');

var d = require('debug')("agile:gen:model:Property");

var Type = require("./Type");

var accessType = {
  r: "Read",
  w: "Write",
  s: "Subscribe"
};

var Property = function(name, obj, parent) {

  this.name = null;
  this.data = {
    description: null,
    access: [],
    example: null,
    type: null,
    fields: {},
    reference: null,
  };

  Type.prototype.initialize.apply(this, arguments);
  // console.warn("Property.fields %s %j", this.name, this.data.fields);

  d("Created property [%s]", this.name);
};
require('util').inherits(Property, Type);

module.exports = Property;
module.exports.accessType = accessType;
