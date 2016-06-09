var _ = require('lodash');
var util = require('../util');

var d = require('debug')("agile:gen:Type");

var Type = function (name, obj) {

  this.name = null;

  this.data = {
    description: null,
    extends: null,
    example: null,
    type: null,
    fields: {},
    reference: null
  };

  this.initialize(name, obj);
};

Type.prototype.initialize = function(name, obj) {

  var me = this;
  this.parent = null;

  util.exportProperties(this);

  if(name) this.name = name;
  if(obj) this.load(obj);

  d("Added type %s", this.name || "");
};

Type.prototype.getParent = function() {
  return this.parent;
};

Type.prototype.setParent = function(p) {
  this.parent = p;
};

Type.prototype.load = function(obj) {

  var me = this;

  _.each(this.data, function (val, key) {
    if(key === 'fields' && obj[key]) {

      // normalize type shortcut eg: `fields: String`
      if(typeof obj[key] === 'string') {

        if(obj.type && obj.type.toLowerCase() === 'array') {
          var _type = obj[key];
          obj[key] = {};
          obj[key].__arrayType = {
            type: _type
          };
        }
      }

      _.each(obj[key], function (field, fieldName) {
        me.addField(fieldName, field);
      });

      return;
    }

    if(obj[key] !== undefined) {
      me.data[key] = obj[key];
    }

  });
};

Type.prototype.addField = function(name, field) {
  if(typeof field === "string") {
    field = {
      type: field
    };
  }
  var type = new Type(name, field);
  type.setParent(this);
  this.data.fields[name] = type;
};

Type.prototype.toJSON = function() {
  return util.toJSON(this.data);
};

module.exports = Type;
