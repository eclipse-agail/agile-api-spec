var util = module.exports;

var _ = require('lodash');

util.exportProperties = function (me) {
  _.each(me.data, function (val, key) {
    Object.defineProperty(me, key, {
      enumerable: true,
      get: function () {
        return me.data[key];
      },
      set: function (v) {
        me.data[key] = v;
      }
    });
  });
};

var toJSON = function(obj) {
  var json = {};
  _.each(obj, function(val, key) {

    json[key] = val;

    if(val === null || val === undefined) {
      delete json[key];
      return;
    }

    if(val.toJSON) {
      json[key] = val.toJSON();
      return;
    }

    if(typeof val === 'object') {

      var size = _.size(val);
      if(size === 0) {
        delete json[key];
        return;
      }

      // handle case [type: Array, fields: String]
      if(
        obj.type && obj.type.toLowerCase() === 'array' &&
        key === 'fields' && val.__arrayType
      ) {
        json[key] = val.__arrayType.type;
        return;
      }

      // type shortcut [ running: Boolean ]
      if(size === 1 && val.type) {
        json[key] = val.type;
        return;
      }

      json[key] = toJSON(val);
      return;
    }

  });
  return json;
};

util.toJSON = toJSON;
