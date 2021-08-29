"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _chalk = _interopRequireDefault(require("chalk"));

var _BaseGenerator2 = _interopRequireDefault(require("./BaseGenerator"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _default = /*#__PURE__*/function (_BaseGenerator) {
  (0, _inherits2["default"])(_default, _BaseGenerator);

  var _super = _createSuper(_default);

  function _default(params) {
    var _this;

    (0, _classCallCheck2["default"])(this, _default);
    _this = _super.call(this, params);

    _this.registerTemplates("vue/", [// modules
    "store/modules/foo/index.js", "store/modules/foo/create/actions.js", "store/modules/foo/create/index.js", "store/modules/foo/create/mutation_types.js", "store/modules/foo/create/mutations.js", "store/modules/foo/delete/actions.js", "store/modules/foo/delete/index.js", "store/modules/foo/delete/mutation_types.js", "store/modules/foo/delete/mutations.js", "store/modules/foo/list/actions.js", "store/modules/foo/list/index.js", "store/modules/foo/list/mutation_types.js", "store/modules/foo/list/mutations.js", "store/modules/foo/show/actions.js", "store/modules/foo/show/index.js", "store/modules/foo/show/mutation_types.js", "store/modules/foo/show/mutations.js", "store/modules/foo/update/actions.js", "store/modules/foo/update/index.js", "store/modules/foo/update/mutation_types.js", "store/modules/foo/update/mutations.js", // components
    "components/foo/Create.vue", "components/foo/Form.vue", "components/foo/List.vue", "components/foo/Update.vue", "components/foo/Show.vue", // routes
    "router/foo.js", // error
    "error/SubmissionError.js", // utils
    "utils/fetch.js"]);

    return _this;
  }

  (0, _createClass2["default"])(_default, [{
    key: "help",
    value: function help(resource) {
      var titleLc = resource.title.toLowerCase();
      console.log('Code for the "%s" resource type has been generated!', resource.title);
      console.log("Paste the following definitions in your application configuration:");
      console.log(_chalk["default"].green("\n//import routes\nimport ".concat(titleLc, "Routes from './router/").concat(titleLc, "';\n\n// Add routes to VueRouter\nconst router = new VueRouter({\n  // ...\n  routes: [\n      ...").concat(titleLc, "Routes,\n  ]\n});\n\n// Add the modules in the store\nimport ").concat(titleLc, " from './store/modules/").concat(titleLc, "/';\n\nexport const store = new Vuex.Store({\n  // ...\n  modules: {\n    ").concat(titleLc, "\n  }\n});\n")));
    }
  }, {
    key: "generate",
    value: function generate(api, resource, dir, serverPath, module) {
      var lc = module.toLowerCase();
      var titleUcFirst = module.charAt(0).toUpperCase() + module.slice(1);
      var context = {
        title: module,
        name: module,
        lc: lc,
        uc: module.toUpperCase(),
        fields: resource,
        dateTypes: ['time', 'date', 'dateTime'],
        listContainsDate: true,
        paramsHaveRefs: false,
        parameters: resource,
        formFields: resource,
        formContainsDate: true,
        hydraPrefix: 'hydra:',
        titleUcFirst: titleUcFirst,
        labels: {
          submit: 'Submit',
          reset: 'Reset',
          "delete": 'Delete',
          edit: 'Edit',
          confirmDelete: 'Are you sure you want to delete this item?',
          noresults: 'No results',
          close: 'Close',
          cancel: 'Cancel',
          updated: 'Updated',
          field: 'Field',
          value: 'Value',
          filters: 'Filters',
          filter: 'Filter',
          unavail: 'Data unavailable',
          loading: 'Loading...',
          deleted: 'Deleted',
          numValidation: 'Please, insert a value bigger than zero!',
          stringValidation: 'Please type something',
          required: 'Field is required',
          recPerPage: 'Records per page:'
        }
      }; // Create directories
      // These directories may already exist

      for (var _i = 0, _arr = ["".concat(dir, "/config"), "".concat(dir, "/error"), "".concat(dir, "/router"), "".concat(dir, "/utils")]; _i < _arr.length; _i++) {
        var _dir = _arr[_i];
        this.createDir(_dir, false);
      }

      for (var _i2 = 0, _arr2 = ["".concat(dir, "/store/modules/").concat(lc), "".concat(dir, "/store/modules/").concat(lc, "/create"), "".concat(dir, "/store/modules/").concat(lc, "/delete"), "".concat(dir, "/store/modules/").concat(lc, "/list"), "".concat(dir, "/store/modules/").concat(lc, "/show"), "".concat(dir, "/store/modules/").concat(lc, "/update"), "".concat(dir, "/components/").concat(lc)]; _i2 < _arr2.length; _i2++) {
        var _dir2 = _arr2[_i2];
        this.createDir(_dir2);
      }

      for (var _i3 = 0, _arr3 = [// modules
      "store/modules/%s/index.js", "store/modules/%s/create/actions.js", "store/modules/%s/create/index.js", "store/modules/%s/create/mutation_types.js", "store/modules/%s/create/mutations.js", "store/modules/%s/delete/actions.js", "store/modules/%s/delete/index.js", "store/modules/%s/delete/mutation_types.js", "store/modules/%s/delete/mutations.js", "store/modules/%s/list/actions.js", "store/modules/%s/list/index.js", "store/modules/%s/list/mutation_types.js", "store/modules/%s/list/mutations.js", "store/modules/%s/show/actions.js", "store/modules/%s/show/index.js", "store/modules/%s/show/mutation_types.js", "store/modules/%s/show/mutations.js", "store/modules/%s/update/actions.js", "store/modules/%s/update/index.js", "store/modules/%s/update/mutation_types.js", "store/modules/%s/update/mutations.js", // components
      "components/%s/Create.vue", "components/%s/Form.vue", "components/%s/List.vue", "components/%s/Update.vue", "components/%s/Show.vue", // routes
      "router/%s.js"]; _i3 < _arr3.length; _i3++) {
        var pattern = _arr3[_i3];
        this.createFileFromPattern(pattern, dir, lc, context);
      } // error


      this.createFile("error/SubmissionError.js", "".concat(dir, "/error/SubmissionError.js"), context, false);
      this.createEntrypoint(api.entrypoint, "".concat(dir, "/config/entrypoint.js"));
      this.createFile("utils/fetch.js", "".concat(dir, "/utils/fetch.js"), {
        hydraPrefix: this.hydraPrefix
      }, false);
    }
  }]);
  return _default;
}(_BaseGenerator2["default"]);

exports["default"] = _default;