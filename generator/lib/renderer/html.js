var _ = require("lodash");
var d = require("debug")("agile:gen:render:html");
var fs = require('fs');

var Type = require("../model/Type");

var tpl = function (name) {
  return _.template(fs.readFileSync(__dirname + '/../../template/' + name + '.tpl.html', 'utf8'));
};

var getTemplates = function () {
  return {
    html: tpl('index'),
    menu: tpl('menu'),
    class: tpl('class'),
    method: tpl('method'),
    property: tpl('property'),
    types: tpl('types'),
    type: tpl('type'),
    arg: tpl('arg'),
    return: tpl('return'),
  };
};

var baseTypes = [
  'string', 'number', 'boolean'
];

var HtmlRenderer = function (definition) {

  this.definition = definition;

  this.templates = getTemplates();

  this.menu = [];
  this.html = [];

};

HtmlRenderer.prototype.isPrimitiveType = function (type) {
  return type && baseTypes.indexOf(type.toLowerCase()) > -1;
};

HtmlRenderer.prototype.isStructuredType = function (type) {
  return !this.isPrimitiveType(type) && type.indexOf('*') === -1;
};

HtmlRenderer.prototype.getTypeLabel = function (obj) {

  var label = obj.type;


  // console.warn("%j", obj);

  if(obj.type && obj.type.toLowerCase() === "array") {
    if(obj.fields && obj.fields.__arrayType) {
      label = obj.type + "[" + obj.fields.__arrayType.type + "]";
    } else if(obj.reference) {
      label = obj.type + "[" + obj.reference + "]";
    }
  }

  return label;
};

HtmlRenderer.prototype.getTypeLink = function (obj) {

  var typeLink = this.definition.types[obj.type] || false;

  if(obj.type && obj.type.toLowerCase() === "array") {
    if(obj.reference) {
      typeLink = obj.reference;
    }
  }

  return typeLink;
};

HtmlRenderer.prototype.renderClass = function (clazz, className) {
  d("Render class %s", className);

  var methods = _.map(clazz.methods, this.renderMethod.bind(this)).join("");
  var properties = _.map(clazz.properties, this.renderProperty.bind(this)).join("");

  return this.templates.class({
    className: className,
      methods: methods,
      properties: properties,
  });
};

HtmlRenderer.prototype.renderArg = function (arg, argName) {
  var typeLink = this.getTypeLink(arg);
  return this.templates.arg({
    name: argName,
    type: arg.type,
    typeLink: typeLink,
  });
};


HtmlRenderer.prototype.renderReturnType = function (returnType) {
  return this.templates.return({
    type: returnType ? returnType.type : 'void',
    typeLink: returnType ? this.getTypeLink(returnType) : null
  });
};

HtmlRenderer.prototype.renderMethod = function (method, methodName) {

  var type = method.type;
  var typeLabel = this.getTypeLabel(method);
  var typeLink = this.getTypeLink(method);

  var returnType = this.renderReturnType(method.return);

  var args = _.map(method.args, this.renderArg.bind(this)).join('<span class="args-glue">, </span>');

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



HtmlRenderer.prototype.renderProperty = function (property, propertyName) {

  var type = property.type;
  var typeLabel = this.getTypeLabel(property);
  var typeLink = this.getTypeLink(property);
  var typeDetail = null;

  if(type === "Array") {
    if(property.reference) {
      if(this.definition.types[property.reference])
        typeDetail = this.definition.types[property.reference];
    }
  } else if(type && this.isStructuredType(type)) {
    typeDetail = this.renderType(new Type(property.fields, property.type));
  }

  return this.templates.property({
    description: property.description,
    type: typeLabel,
    typeLink: typeLink,
    access: property.access,
    example: property.example,
    name: propertyName,
    typeDef: typeDetail,
  });
};

HtmlRenderer.prototype.renderType = function (typeDef, typeDefName) {

  if(!_.size(typeDef)) {
    d("Empty type %s skipped", typeDefName);
    return;
  }

  var type = typeDef.type;
  var typeLabel = this.getTypeLabel(typeDef);
  var typeLink = this.getTypeLink(typeDef);

  var fields = "";

  if(type === "Enum") {
    fields = _.map(typeDef.fields, function (val, key) {
      return "<li>" + val.type + "</li>";
    });
    fields = "<ul>" + fields.join('') + "</ul>";
  } else if(typeDef.fields) {
    fields = _.map(typeDef.fields, this.renderType.bind(this)).join('');
  }

  return this.templates.type({
    description: typeDef.description,
    type: typeLabel,
    typeLink: typeLink,
    access: typeDef.access,
    example: typeDef.example,
    name: typeDefName,
    fields: fields
  });

};

HtmlRenderer.prototype.renderMenu = function () {
  return this.templates.menu({
    menu: this.menu
  });
};

HtmlRenderer.prototype.render = function () {

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

  if(_.size(this.definition.groups)) {
    this.menu.push({
      type: "groups",
      title: "Groups",
      list: Object.keys(this.definition.groups)
    });
  }
  if(_.size(this.definition.tags)) {
    this.menu.push({
      type: "tags",
      title: "Tags",
      list: Object.keys(this.definition.tags)
    });
  }

  d("Render classes");
  var classes = _.map(this.definition.classes, this.renderClass.bind(this));
  this.html.push(classes.join(''));

  d("Render types");
  var types = _.map(this.definition.types, this.renderType.bind(this));
  this.html.push(this.templates.types({
    types: types.join('')
  }));

  return this.templates.html({
    content: this.html.join(''),
    menu: this.renderMenu(),
  });

};

module.exports = function (definition) {
  return Promise.resolve((new HtmlRenderer(definition)).render());
};
