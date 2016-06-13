
var _ = require("lodash");

module.exports = function(definition) {
  return new Promise(function(resolve, reject) {
    resolve(JSON.stringify(definition.toJSON(), null, 2));
  });
};
