
var d = require('debug')("agile:gen:model:BaseObject");

var BaseObject = function () {
  this.parent = null;
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

module.exports = BaseObject;
