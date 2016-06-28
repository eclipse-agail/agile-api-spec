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
  var endpoints = classes.filter(function (clazz) {
      return clazz.http;
    })
    .map(function (clazz) {
      return clazz.http;
    })
    .forEach(function (http) {
      _.forEach(http, function (v, k) {
        api[k] = v;
      });
    });

  return api;
};
RamlRenderer.prototype.render = function () {

  var outputs = [];

  var ramlApi = {
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
  };

  outputs.push(ramlApi);

  return new Promise(function (resolve, reject) {
    var raml2html = require('raml2html');
    var configWithDefaultTemplates = raml2html.getDefaultConfig();
    // var configWithCustomTemplates = raml2html.getDefaultConfig('my-custom-template.nunjucks', __dirname);

    var f = '/tmp/api.raml';
    require('fs').writeFileSync(f, ramlApi.content);

    // source can either be a filename, url, file contents (string) or parsed RAML object
    raml2html.render(f, configWithDefaultTemplates).then(function (result) {

      var ramlHtml = {
        filename: "rest-api.html",
        content: result
      };

      outputs.push(ramlHtml);

      resolve(outputs);
    }, function (error) {
      reject(error);
    });

  });
};

module.exports = function (definition) {
  return Promise.resolve((new RamlRenderer(definition)).render());
};
