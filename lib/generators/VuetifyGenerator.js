"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _chalk = _interopRequireDefault(require("chalk"));

var _VueBaseGenerator = _interopRequireDefault(require("./VueBaseGenerator"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _default = /*#__PURE__*/function (_BaseVueGenerator) {
  (0, _inherits2["default"])(_default, _BaseVueGenerator);

  var _super = _createSuper(_default);

  function _default(params) {
    var _this;

    (0, _classCallCheck2["default"])(this, _default);
    _this = _super.call(this, params);

    _this.registerTemplates("vuetify/", [// components
    "components/ActionCell.vue", "components/Breadcrumb.vue", "components/ConfirmDelete.vue", "components/DataFilter.vue", "components/InputDate.vue", "components/Loading.vue", "components/Snackbar.vue", "components/Toolbar.vue", "components/foo/Filter.vue", "components/foo/Form.vue", "components/foo/Layout.vue", // locales
    "locales/en.js", // routes
    "router/foo.js", // views
    "views/foo/Create.vue", "views/foo/List.vue", "views/foo/Show.vue", "views/foo/Update.vue"]);

    return _this;
  }

  (0, _createClass2["default"])(_default, [{
    key: "help",
    value: function help(resource) {
      var titleLc = resource.title.toLowerCase();
      console.log('Code for the "%s" resource type has been generated!', resource.title);
      console.log("Paste the following definitions in your application configuration:");
      console.log(_chalk["default"].green("\n// Register the routes in you router\n// src/router/index.js\nimport ".concat(titleLc, "Routes from './").concat(titleLc, "';\n\n// Add routes to VueRouter\nexport default new VueRouter({\n  // ...\n  routes: [\n      ").concat(titleLc, "Routes,\n  ]\n});\n\n// Register the modules in the store\n// src/store/index.js\nimport ").concat(titleLc, "Service from '../services/").concat(titleLc, "';\nimport makeCrudModule from './modules/crud';\n\nexport const store = new Vuex.Store({\n  // ...\n  modules: {\n    // other modules\n    ").concat(titleLc, ": makeCrudModule({\n      service: ").concat(titleLc, "Service\n    })\n  }\n});\n")));
    }
  }, {
    key: "generateFiles",
    value: function generateFiles(api, resource, dir, params) {
      var _this2 = this;

      (0, _get2["default"])((0, _getPrototypeOf2["default"])(_default.prototype), "generateFiles", this).call(this, api, resource, dir, params);
      var context = (0, _get2["default"])((0, _getPrototypeOf2["default"])(_default.prototype), "getContextForResource", this).call(this, resource, params);
      var lc = context.lc; // Create directories
      // These directories may already exist

      this.createDir("".concat(dir, "/router"), false);
      this.createDir("".concat(dir, "/locales"), false);

      for (var _i = 0, _arr = ["".concat(dir, "/components/").concat(lc), "".concat(dir, "/views/").concat(lc)]; _i < _arr.length; _i++) {
        var _dir = _arr[_i];
        this.createDir(_dir);
      }

      this.createFile("locales/en.js", "".concat(dir, "/locales/en.js"), context, false);
      [// components
      "components/%s/Filter.vue", "components/%s/Form.vue", "components/%s/Layout.vue", // routes
      "router/%s.js", // views
      "views/%s/Create.vue", "views/%s/List.vue", "views/%s/Show.vue", "views/%s/Update.vue"].forEach(function (pattern) {
        return _this2.createFileFromPattern(pattern, dir, lc, context);
      }); // components

      ["ActionCell.vue", "Breadcrumb.vue", "ConfirmDelete.vue", "DataFilter.vue", "InputDate.vue", "Loading.vue", "Snackbar.vue", "Toolbar.vue"].forEach(function (file) {
        return _this2.createFile("components/".concat(file), "".concat(dir, "/components/").concat(file), context, false);
      });
    }
  }]);
  return _default;
}(_VueBaseGenerator["default"]);

exports["default"] = _default;