var _ = require("lodash");
var d = require("debug")("agile:gen:render:raml");
var fs = require('fs');

var Type = require("../model/Type");
var yamljs = require("yamljs");

var tpl = function (name) {
  return _.template(fs.readFileSync(__dirname + '/../../template/raml/' + name + '.tpl.yml', 'utf8'));
};

var getTemplates = function () {
  return {
    root: tpl('root'),
  };
};

var RamlRenderer = function (definition) {

  this.definition = definition;
  this.templates = getTemplates();

};

RamlRenderer.prototype.renderTypes = function (defTypes) {

  var me = this;

  defTypes = defTypes || this.definition.types;

  var types = {};
  var mapping = {};
  _.forEach(defTypes, function (type, typeName) {

    var ramlType = {};

    var objtype = type.type.replace('*', '').toLowerCase();

    ramlType.displayName = typeName;
    ramlType.description = type.description;
    ramlType.required = type.required;

    if(type.isArray()) {
      ramlType.type = type.getArrayType() + "[]";
    } else if(type.isEnum()) {
      ramlType.enum = type.getEnumValues();
    } else {
      var objprops = me.renderTypes(type.fields);
      if(_.size(objprops)) {
        ramlType.properties = objprops;
      }
    }
    types[typeName] = ramlType;
  });

  return types;
};

RamlRenderer.prototype.renderApi = function () {

  var classes = _.values(this.definition.classes);

  var api = {};
  var endpoints = classes.filter(function(clazz) {
    return clazz.http;
  })
  .map(function(clazz) {
    return clazz.http;
  })
  .forEach(function(http) {
    _.forEach(http, function(v, k) {
      api[k] = v;
    });
  });

  return api;
};
RamlRenderer.prototype.render = function () {

  var outputs = [];

  outputs.push({
    filename: "api.raml",
    content: this.templates.root({
      title: "AGILE HTTP API",
      baseUri: "https://gw.agile.local/api",
      version: require('../../package.json').version,
      api: yamljs.stringify(this.renderApi(), 999, 2),
      types: yamljs.stringify(this.renderTypes(), 999, 2).split("\n").map(function (line) {
        return "  " + line;
      }).join("\n")
    })
  });

  return Promise.resolve(outputs);
};

module.exports = function (definition) {
  return Promise.resolve((new RamlRenderer(definition)).render());
};
