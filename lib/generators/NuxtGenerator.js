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

var NuxtGenerator = /*#__PURE__*/function (_BaseVueGenerator) {
  (0, _inherits2["default"])(NuxtGenerator, _BaseVueGenerator);

  var _super = _createSuper(NuxtGenerator);

  function NuxtGenerator(params) {
    var _this;

    (0, _classCallCheck2["default"])(this, NuxtGenerator);
    _this = _super.call(this, params);

    _this.registerTemplates("nuxt/", [// components
    "components/ActionCell.vue", "components/Alert.vue", "components/ConfirmDelete.vue", "components/DataFilter.vue", "components/InputDate.vue", "components/Loading.vue", "components/Toolbar.vue", "components/foo/Filter.vue", "components/foo/Form.vue", "components/auth/login/Form.vue", // mixins
    "mixins/create.js", "mixins/list.js", "mixins/notification.js", "mixins/show.js", "mixins/update.js", // pages
    "pages/foos/new.vue", "pages/foos/index.vue", "pages/foos/_id.vue", "pages/auths/login/login.vue", // store
    "store/crud.js", "store/notifications.js", "store/foo.js", "store/login.js"]);

    return _this;
  }

  (0, _createClass2["default"])(NuxtGenerator, [{
    key: "help",
    value: function help(resource) {
      console.log(_chalk["default"].green('Code for the "%s" resource type has been generated!'), resource.title);
    }
  }, {
    key: "generateFiles",
    value: function generateFiles(api, resource, dir, params, module) {
      var _this2 = this;

      var context = (0, _get2["default"])((0, _getPrototypeOf2["default"])(NuxtGenerator.prototype), "getContextForResource", this).call(this, resource, params, module);
      var lc = context.lc;
      ["".concat(dir, "/config"), "".concat(dir, "/error"), "".concat(dir, "/mixins"), "".concat(dir, "/services"), "".concat(dir, "/store"), "".concat(dir, "/utils"), "".concat(dir, "/validators")].forEach(function (dir) {
        return _this2.createDir(dir, false);
      }); // error

      this.createFile("error/SubmissionError.js", "".concat(dir, "/error/SubmissionError.js"), {}, false); // mixins

      ["mixins/create.js", "mixins/list.js", "mixins/notification.js", "mixins/show.js", "mixins/update.js"].forEach(function (file) {
        return _this2.createFile(file, "".concat(dir, "/").concat(file), context, false);
      }); // stores

      this.createFile("store/modules/notifications.js", "".concat(dir, "/store/notifications.js"), {
        hydraPrefix: this.hydraPrefix
      }, false);
      this.createFile("store/crud.js", "".concat(dir, "/store/crud.js"), {
        hydraPrefix: this.hydraPrefix
      }, false); // validators

      this.createFile("validators/date.js", "".concat(dir, "/validators/date.js"), {
        hydraPrefix: this.hydraPrefix
      }, false); // utils

      ["dates.js", "fetch.js", "hydra.js"].forEach(function (file) {
        return _this2.createFile("utils/".concat(file), "".concat(dir, "/utils/").concat(file), {}, false);
      });
      this.createEntrypoint(api.entrypoint, "".concat(dir, "/config/entrypoint.js"));

      for (var _i = 0, _arr = ["".concat(dir, "/components/").concat(lc), "".concat(dir, "/pages/").concat(lc, "s")]; _i < _arr.length; _i++) {
        var _dir = _arr[_i];
        this.createDir(_dir);
      }

      this.createFile("services/api.js", "".concat(dir, "/services/api.js"), {}, false);
      [// components
      "components/%s/Filter.vue", "components/%s/Form.vue", // pages
      "pages/%ss/new.vue", "pages/%ss/index.vue", "pages/%ss/_id.vue", // service
      "services/%s.js", // store
      "store/%s.js"].forEach(function (pattern) {
        return _this2.createFileFromPattern(pattern, dir, lc, context);
      }); // components

      ["ActionCell.vue", "Alert.vue", "ConfirmDelete.vue", "DataFilter.vue", "InputDate.vue", "Loading.vue", "Toolbar.vue"].forEach(function (file) {
        return _this2.createFile("components/".concat(file), "".concat(dir, "/components/").concat(file), context, false);
      }); // login

      this.createDir('components/auth/login');
      this.createDir('pages/auths/login');
      this.createFile("components/auth/login/Form.vue", "".concat(dir, "/components/auth/login/Form.vue"), context, false);
      this.createFile("pages/auths/login/login.vue", "".concat(dir, "/pages/auths/login/login.vue"), context, false);
      this.createFile("services/login.js", "".concat(dir, "/services/login.js"), context, false);
      this.createFile("store/login.js", "".concat(dir, "/store/login.js"), context, false);
    }
  }]);
  return NuxtGenerator;
}(_VueBaseGenerator["default"]);

exports["default"] = NuxtGenerator;