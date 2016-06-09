
var _ = require("lodash");

module.exports = function(definition) {
  return new Promise(function(resolve, reject) {
    resolve(definition.toJSON());
  });
};
