"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generators;

var _NuxtGenerator = _interopRequireDefault(require("./generators/NuxtGenerator"));

var _VueGenerator = _interopRequireDefault(require("./generators/VueGenerator"));

var _VuetifyGenerator = _interopRequireDefault(require("./generators/VuetifyGenerator"));

function wrap(cl) {
  return function (_ref) {
    var hydraPrefix = _ref.hydraPrefix,
        templateDirectory = _ref.templateDirectory;
    return new cl({
      hydraPrefix: hydraPrefix,
      templateDirectory: templateDirectory
    });
  };
}

function generators() {
  var generator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "nuxt";

  switch (generator) {
    case "nuxt":
      return wrap(_NuxtGenerator["default"]);

    case "vue":
      return wrap(_VueGenerator["default"]);

    case "vuetify":
      return wrap(_VuetifyGenerator["default"]);
  }
}