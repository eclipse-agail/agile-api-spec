var _ = require("lodash");
var d = require("debug")("agile:gen:render:html");
var fs = require('fs');

var tpl = function(name) {
  return _.template(fs.readFileSync(__dirname + '/../../template/' + name + '.tpl.html', 'utf8'));
};

var HtmlRenderer = function(definition) {

  this.definition = definition;

  this.templates = {
    html: tpl('index'),
    menu: tpl('menu'),
    class: tpl('class'),
    method: tpl('method'),
    property: tpl('property'),
  };

  this.menu = [];
  this.html = [];

};

HtmlRenderer.prototype.renderClass = function(clazz, className) {
  d("Render class %s", className);

  var methods = _.map(clazz.methods, this.renderMethod.bind(this)).join("");
  var properties = _.map(clazz.properties, this.renderProperty.bind(this)).join("");

  return this.templates.class({
    className: className,
    methods: methods,
    properties: properties,
  });
};

HtmlRenderer.prototype.renderMethod = function(method, methodName) {

  var type = method.type;
  var typeLink = this.definition.types[method.type] || false;

  if (type === "Array") {

    if (method.fields && method.fields.__arrayType) {
      type = type + "[" + method.fields.__arrayType.type + "]";
      d(type);
    } else if (method.reference) {
      type = type + "[" + method.reference + "]";
      typeLink = method.reference;
    }
    // else
    //   type = type + "["+ property.fields +"]";
  }

  var returnType = "baz";
  var args = "foo, bar";

  return this.templates.method({
    description: method.description,
    type: type,
    typeLink: typeLink,
    access: method.access,
    example: method.example,
    name: methodName,
    returnType: returnType,
    args: args,
  });

};

HtmlRenderer.prototype.renderProperty = function(property, propertyName) {
  var type = property.type;
  var typeLink = this.definition.types[property.type] || false;

  if (type === "Array") {

    if (property.fields && property.fields.__arrayType) {
      type = type + "[" + property.fields.__arrayType.type + "]";
      d(type);
    } else if (property.reference) {
      type = type + "[" + property.reference + "]";
      typeLink = property.reference;
    }
  }

  return this.templates.property({
    description: property.description,
    type: type,
    typeLink: typeLink,
    access: property.access,
    example: property.example,
    name: propertyName
  });
};

HtmlRenderer.prototype.renderMenu = function() {

};

HtmlRenderer.prototype.render = function() {

  var me = this;

  this.menu.push({
    type: "object",
    title: "Objects",
    list: Object.keys(this.definition.classes)
  });
  this.menu.push({
    type: "types",
    title: "Types",
    list: Object.keys(this.definition.types)
  });
  this.menu.push({
    type: "groups",
    title: "Groups",
    list: Object.keys(this.definition.groups)
  });
  this.menu.push({
    type: "tags",
    title: "Tags",
    list: Object.keys(this.definition.tags)
  });

  d("Render classes");
  var classes = _.map(this.definition.classes, this.renderClass.bind(this));
  this.html.push(this.html.join());

  return this.templates.html({
    content: this.html.join(""),
    menu: this.templates.menu({
      menu: this.menu
    }),
  });

};

module.exports = function(definition) {
  return Promise.resolve((new HtmlRenderer(definition)).render());
};
