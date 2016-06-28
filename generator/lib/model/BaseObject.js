
var d = require('debug')("agile:gen:model:BaseObject");

var BaseObject = function () {
  this.parent = null;
  this.data = {};
};

BaseObject.prototype.addGroup = function (obj) {
  obj = obj || this;
  if(this.getParent()) this.getParent().addGroup(obj);
};

BaseObject.prototype.addTags = function (obj) {
  obj = obj || this;
  if(this.getParent()) this.getParent().addTags(obj);
};

BaseObject.prototype.getParent = function () {
  return this.parent;
};

BaseObject.prototype.setParent = function (p) {
  this.parent = p;
};

BaseObject.prototype.isEnum = function() {
  return this.data.type &&
    this.data.type.toLowerCase() === 'enum';
};

BaseObject.prototype.isArray = function() {
  return this.data.type &&
    this.type.toLowerCase() === 'array';
};

BaseObject.prototype.isClass = function() {
  return this.data.methods || this.data.properties;
};

BaseObject.prototype.isMethod = function() {
  return this.data.args || this.data.return;
};

BaseObject.prototype.getType = function() {
  return this.data.type;
};

BaseObject.prototype.getArrayType = function() {
  if(!this.isArray()) throw new Error(this.name + ".getArrayType(): not an Array");

  if(this.data.reference)
    return this.data.reference;

  return this.data.fields.__arrayType &&
    this.data.fields.__arrayType.type;
};

BaseObject.prototype.getName = function() {
  return this.name;
};

BaseObject.prototype.getEnumValues = function() {
  var f = this.fields;
  return Object.keys(f).map(function(i) {
    return f[i].type;
  });
};

module.exports = BaseObject;
