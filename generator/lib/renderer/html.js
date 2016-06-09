var _ = require("lodash");
var d = require("debug")("agile:gen:render:html");
var fs = require('fs');

var tpl = function (name) {
  return _.template(fs.readFileSync(__dirname + '/../../template/' + name + '.tpl.html', 'utf8'));
};

module.exports = function (definition) {

  var templates = {
    html: tpl('index'),
    menu: tpl('menu'),
    class: tpl('class'),
    method: tpl('method'),
    property: tpl('property'),
  };

  var html = "";
  var menu = [];

  d("Render classes");
  _.each(definition.classes, function (clazz, className) {

    d("Class %s", className);

    var methods = "";
    _.each(clazz.methods, function (method, methodName) {

      var type = method.type;
      var typeLink = definition.types[method.type] || false;

      if(type === "Array") {

        if(method.fields && method.fields.__arrayType) {
          type = type + "[" + method.fields.__arrayType.type + "]";
          d(type);
        } else if(method.reference) {
          type = type + "[" + method.reference + "]";
          typeLink = method.reference;
        }
        // else
        //   type = type + "["+ property.fields +"]";
      }

      var returnType = "baz";
      var args = "foo, bar";

      methods += templates.method({
        description: method.description,
        type: type,
        typeLink: typeLink,
        access: method.access,
        example: method.example,
        name: methodName,
        returnType: returnType,
        args: args,
      });

    });

    var properties = "";
    _.each(clazz.properties, function (property, propertyName) {

      var type = property.type;
      var typeLink = definition.types[property.type] || false;

      if(type === "Array") {

        if(property.fields && property.fields.__arrayType) {
          type = type + "[" + property.fields.__arrayType.type + "]";
          d(type);
        } else if(property.reference) {
          type = type + "[" + property.reference + "]";
          typeLink = property.reference;
        }
        // else
        //   type = type + "["+ property.fields +"]";
      }

      properties += templates.property({
        description: property.description,
        type: type,
        typeLink: typeLink,
        access: property.access,
        example: property.example,
        name: propertyName
      });
    });

    html += templates.class({
      className: className,
        methods: methods,
        properties: properties,
    });

  });

  menu.push({
    title: "Objects",
    list: Object.keys(definition.classes)
  });

  return Promise.resolve(templates.html({
    content: html,
    menu: templates.menu({
      menu: menu
    }),
  }));

};
