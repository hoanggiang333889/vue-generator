"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _sprintfJs = require("sprintf-js");

var _prettier = _interopRequireDefault(require("prettier"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = /*#__PURE__*/function () {
  function _default(_ref) {
    var hydraPrefix = _ref.hydraPrefix,
        templateDirectory = _ref.templateDirectory;
    (0, _classCallCheck2["default"])(this, _default);
    (0, _defineProperty2["default"])(this, "templates", {});
    this.hydraPrefix = hydraPrefix;
    this.templateDirectory = templateDirectory;
    this.registerTemplates("", ["entrypoint.js"]);
  }

  (0, _createClass2["default"])(_default, [{
    key: "registerTemplates",
    value: function registerTemplates(basePath, paths) {
      var _iterator = _createForOfIteratorHelper(paths),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var path = _step.value;
          this.templates[path] = _handlebars["default"].compile(_fs["default"].readFileSync("".concat(this.templateDirectory, "/").concat(basePath).concat(path)).toString());
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "createDir",
    value: function createDir(dir) {
      var warn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!_fs["default"].existsSync(dir)) {
        _mkdirp["default"].sync(dir);

        return;
      }

      if (warn) {
        console.log(_chalk["default"].yellow("The directory \"".concat(dir, "\" already exists")));
      }
    }
  }, {
    key: "createFileFromPattern",
    value: function createFileFromPattern(pattern, dir, lc, context) {
      this.createFile((0, _sprintfJs.sprintf)(pattern, "foo"), (0, _sprintfJs.sprintf)("".concat(dir, "/").concat(pattern), lc), context);
    }
  }, {
    key: "createFile",
    value: function createFile(template, dest) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var warn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (undefined === this.templates[template]) {
        console.log("The template ".concat(template, " does not exists in the registered templates."));
        return;
      } // Format the generated code using Prettier


      var content = this.templates[template](context);

      if (template.endsWith(".js")) {
        content = _prettier["default"].format(content, {
          parser: "babel"
        });
      } else if (template.endsWith(".ts") || template.endsWith(".tsx")) {
        content = _prettier["default"].format(content, {
          parser: "babel-ts"
        });
      }

      if (!_fs["default"].existsSync(dest)) {
        _fs["default"].writeFileSync(dest, content);

        return;
      }

      if (warn) console.log("The file \"".concat(dest, "\" already exists"));
    }
  }, {
    key: "createEntrypoint",
    value: function createEntrypoint(entrypoint, dest) {
      this.createFile("entrypoint.js", dest, {
        entrypoint: entrypoint
      }, false);
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "checkDependencies",
    value: function checkDependencies(dir) {}
  }, {
    key: "getTargetDependencies",
    value: function getTargetDependencies(dir) {
      var packageFilePath = "".concat(dir, "/package.json");
      var packageFile;
      var dependencies = [];

      try {
        if (!_fs["default"].existsSync(packageFilePath)) {
          throw new Error();
        }

        packageFile = _fs["default"].readFileSync(packageFilePath);
        var configuration = JSON.parse(packageFile.toString());
        dependencies = Object.keys(_objectSpread(_objectSpread({}, configuration.dependencies), configuration.devDependencies));
      } catch (e) {
        console.log(_chalk["default"].yellow("There's no readable package file in the target directory. Generator can't check dependencies."));
      }

      return dependencies;
    }
  }, {
    key: "getHtmlInputTypeFromField",
    value: function getHtmlInputTypeFromField(field) {
      switch (field.id) {
        case "http://schema.org/email":
          return {
            type: "email"
          };

        case "http://schema.org/url":
          return {
            type: "url"
          };
      }

      switch (field.range) {
        case "http://www.w3.org/2001/XMLSchema#integer":
          return {
            type: "number",
            number: true
          };

        case "http://www.w3.org/2001/XMLSchema#decimal":
          return {
            type: "number",
            step: "0.1",
            number: true
          };

        case "http://www.w3.org/2001/XMLSchema#boolean":
          return {
            type: "checkbox"
          };

        case "http://www.w3.org/2001/XMLSchema#date":
          return {
            type: "date"
          };

        case "http://www.w3.org/2001/XMLSchema#time":
          return {
            type: "time"
          };

        case "http://www.w3.org/2001/XMLSchema#dateTime":
          return {
            type: "dateTime"
          };

        default:
          return {
            type: "text"
          };
      }
    }
  }, {
    key: "getType",
    value: function getType(field) {
      if (field.reference) {
        if (field.maxCardinality !== 1) {
          return "string[]";
        }

        return "string";
      }

      switch (field.range) {
        case "http://www.w3.org/2001/XMLSchema#integer":
        case "http://www.w3.org/2001/XMLSchema#decimal":
          return "number";

        case "http://www.w3.org/2001/XMLSchema#boolean":
          return "boolean";

        case "http://www.w3.org/2001/XMLSchema#date":
        case "http://www.w3.org/2001/XMLSchema#dateTime":
        case "http://www.w3.org/2001/XMLSchema#time":
          return "Date";

        case "http://www.w3.org/2001/XMLSchema#string":
          return "string";
      }

      return "any";
    }
  }, {
    key: "buildFields",
    value: function buildFields(fields) {
      var _this = this;

      return fields.map(function (field) {
        return _objectSpread(_objectSpread(_objectSpread({}, field), _this.getHtmlInputTypeFromField(field)), {}, {
          description: field.description.replace(/"/g, "'") // fix for Form placeholder description

        });
      });
    }
  }]);
  return _default;
}();

exports["default"] = _default;