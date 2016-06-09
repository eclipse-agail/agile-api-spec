
var _ = require('lodash');
var util = require('../util');

var d = require('debug')("agile:gen:Property");

var accessType = {
  r: "Read",
  w: "Write",
  s: "Subscribe"
};

var Property = function(name, obj) {

  this.name = null;
  this.data = {
    description: null,
    access: [],
    example: null,
    type: null,
    fields: {},
    reference: null,
  };

  this.initialize(name, obj);

  d("Created property [%s]", this.name);
};
require('util').inherits(Property, require("./Type"));

module.exports = Property;
module.exports.accessType = accessType;
