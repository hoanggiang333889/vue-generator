"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _BaseGenerator2 = _interopRequireDefault(require("./BaseGenerator"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _comparison = _interopRequireDefault(require("handlebars-helpers/lib/comparison"));

var _array = _interopRequireDefault(require("handlebars-helpers/lib/array"));

var _string = _interopRequireDefault(require("handlebars-helpers/lib/string"));

var _sprintfJs = require("sprintf-js");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var _default = /*#__PURE__*/function (_BaseGenerator) {
  (0, _inherits2["default"])(_default, _BaseGenerator);

  var _super = _createSuper(_default);

  function _default(params) {
    var _this;

    (0, _classCallCheck2["default"])(this, _default);
    _this = _super.call(this, params);

    _this.registerTemplates("vue-common/", [// error
    "error/SubmissionError.js", // mixins
    "mixins/CreateMixin.js", "mixins/ListMixin.js", "mixins/NotificationMixin.js", "mixins/ShowMixin.js", "mixins/UpdateMixin.js", // services
    "services/api.js", "services/login.js", "services/foo.js", // modules
    "store/modules/crud.js", "store/modules/notifications.js", // utils
    "utils/dates.js", "utils/fetch.js", "utils/hydra.js", // validators
    "validators/date.js"]);

    _handlebars["default"].registerHelper("compare", _comparison["default"].compare);

    _handlebars["default"].registerHelper("ifEven", _comparison["default"].ifEven);

    _handlebars["default"].registerHelper("ifOdd", _comparison["default"].ifOdd);

    _handlebars["default"].registerHelper("isArray", _array["default"].isArray);

    _handlebars["default"].registerHelper("inArray", _array["default"].inArray);

    _handlebars["default"].registerHelper("forEach", _array["default"].forEach);

    _handlebars["default"].registerHelper("downcase", _string["default"].downcase);

    _this.registerSwitchHelper();

    return _this;
  }

  (0, _createClass2["default"])(_default, [{
    key: "registerSwitchHelper",
    value: function registerSwitchHelper() {
      /*
        https://github.com/wycats/handlebars.js/issues/927#issuecomment-318640459
         {{#switch state}}
          {{#case "page1" "page2"}}page 1 or 2{{/case}}
          {{#case "page3"}}page3{{/case}}
          {{#case "page4"}}page4{{/case}}
          {{#case "page5"}}
            {{#switch s}}
              {{#case "3"}}s = 3{{/case}}
              {{#case "2"}}s = 2{{/case}}
              {{#case "1"}}s = 1{{/case}}
              {{#default}}unknown{{/default}}
            {{/switch}}
          {{/case}}
          {{#default}}page0{{/default}}
        {{/switch}}
      */
      _handlebars["default"].__switch_stack__ = [];

      _handlebars["default"].registerHelper("switch", function (value, options) {
        _handlebars["default"].__switch_stack__.push({
          switch_match: false,
          switch_value: value
        });

        var html = options.fn(this);

        _handlebars["default"].__switch_stack__.pop();

        return html;
      });

      _handlebars["default"].registerHelper("case", function (value, options) {
        var args = Array.from(arguments);
        options = args.pop();
        var caseValues = args;
        var stack = _handlebars["default"].__switch_stack__[_handlebars["default"].__switch_stack__.length - 1];

        if (stack.switch_match || caseValues.indexOf(stack.switch_value) === -1) {
          return "";
        } else {
          stack.switch_match = true;
          return options.fn(this);
        }
      });

      _handlebars["default"].registerHelper("default", function (options) {
        var stack = _handlebars["default"].__switch_stack__[_handlebars["default"].__switch_stack__.length - 1];

        if (!stack.switch_match) {
          return options.fn(this);
        }
      });
    }
  }, {
    key: "getContextForResource",
    value: function getContextForResource(resource, params, module) {
      var lc = module.toLowerCase();
      var titleUcFirst = module.charAt(0).toUpperCase() + module.slice(1); // const formFields = this.buildFields(resource.writableFields);
      // const dateTypes = ["time", "date", "dateTime"];
      // const formContainsDate = formFields.some((e) => dateTypes.includes(e.type));
      // const fields = this.buildFields(resource.readableFields);
      // const listContainsDate = fields.some((e) => dateTypes.includes(e.type));
      // const parameters = [];
      // params.forEach((p) => {
      //   const param = fields.find((field) => field.name === p.variable);
      //   if (!param) {
      //     p.name = p.variable;
      //     parameters.push(p);
      //   } else {
      //     param.multiple = p.multiple;
      //     parameters.push(param);
      //   }
      // });
      // const paramsHaveRefs = parameters.some(
      //   (e) => e.type === "text" && e.reference
      // );
      // const labels = this.commonLabelTexts();
      // return {
      //   title: resource.title,
      //   name: resource.name,
      //   lc,
      //   uc: resource.title.toUpperCase(),
      //   fields,
      //   dateTypes,
      //   listContainsDate,
      //   paramsHaveRefs,
      //   parameters,
      //   formFields,
      //   formContainsDate,
      //   hydraPrefix: this.hydraPrefix,
      //   titleUcFirst,
      //   labels,
      // };

      return {
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
      };
    }
  }, {
    key: "generate",
    value: function generate(api, resource, dir, serverPath, module) {
      this.generateFiles(api, resource, dir, null, module); // return resource.getParameters().then((params) => {
      //   params = params.map((param) => ({
      //     ...param,
      //     ...this.getHtmlInputTypeFromField(param),
      //   }));
      //   params = this.cleanupParams(params);
      //   this.generateFiles(api, resource, dir, params);
      // });
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "generateFiles",
    value: function generateFiles(api, resource, dir, params) {
      var _this2 = this;

      // Create directories
      // These directories may already exist
      ["".concat(dir, "/config"), "".concat(dir, "/error"), "".concat(dir, "/mixins"), "".concat(dir, "/router"), "".concat(dir, "/services"), "".concat(dir, "/store/modules"), "".concat(dir, "/utils"), "".concat(dir, "/validators")].forEach(function (dir) {
        return _this2.createDir(dir, false);
      }); // error

      this.createFile("error/SubmissionError.js", "".concat(dir, "/error/SubmissionError.js"), {}, false); // mixins

      ["mixins/Create%s.js", "mixins/List%s.js", "mixins/Notification%s.js", "mixins/Show%s.js", "mixins/Update%s.js"].forEach(function (pattern) {
        return _this2.createFile((0, _sprintfJs.sprintf)("".concat(pattern), "Mixin"), (0, _sprintfJs.sprintf)("".concat(dir, "/").concat(pattern), "Mixin"), {}, false);
      }); // stores

      ["crud.js", "notifications.js"].forEach(function (file) {
        return _this2.createFile("store/modules/".concat(file), "".concat(dir, "/store/modules/").concat(file), {
          hydraPrefix: _this2.hydraPrefix
        }, false);
      }); // services

      this.createFile("services/api.js", "".concat(dir, "/services/api.js"), {}, false);
      this.createFileFromPattern("services/%s.js", dir, resource.title.toLowerCase(), {
        name: resource.name
      }); // validators

      this.createFile("validators/date.js", "".concat(dir, "/validators/date.js"), {
        hydraPrefix: this.hydraPrefix
      }, false); // utils

      ["dates.js", "fetch.js", "hydra.js"].forEach(function (file) {
        return _this2.createFile("utils/".concat(file), "".concat(dir, "/utils/").concat(file), {}, false);
      });
      this.createEntrypoint(api.entrypoint, "".concat(dir, "/config/entrypoint.js"));
    }
  }, {
    key: "cleanupParams",
    value: function cleanupParams(params) {
      var stats = {};
      var result = [];
      params.forEach(function (p) {
        var key = p.variable.endsWith("[]") ? p.variable.slice(0, -2) : p.variable;

        if (!stats[key]) {
          stats[key] = 0;
        }

        stats[key] += 1;
      });
      params.forEach(function (p) {
        if (p.variable.endsWith("[exists]")) {
          return; // removed for the moment, it can help to add null option to select
        }

        if (p.variable.startsWith("order[")) {
          return; // removed for the moment, it can help to sorting data
        }

        if (!stats[p.variable] && p.variable.endsWith("[]")) {
          if (stats[p.variable.slice(0, -2)] === 1) {
            result.push(p);
          }
        } else {
          if (stats[p.variable] === 2) {
            p.multiple = true;
          }

          result.push(p);
        }
      });
      return result;
    }
  }, {
    key: "contextLabelTexts",
    value: function contextLabelTexts(formFields, fields) {
      var texts = [];
      formFields.forEach(function (x) {
        return texts.push(x.name);
      }); // forms

      fields.forEach(function (x) {
        return texts.push(x.name);
      }); // for show, too

      return (0, _toConsumableArray2["default"])(new Set(texts));
    }
  }, {
    key: "commonLabelTexts",
    value: function commonLabelTexts() {
      return {
        submit: "Submit",
        reset: "Reset",
        "delete": "Delete",
        edit: "Edit",
        confirmDelete: "Are you sure you want to delete this item?",
        noresults: "No results",
        close: "Close",
        cancel: "Cancel",
        updated: "Updated",
        field: "Field",
        value: "Value",
        filters: "Filters",
        filter: "Filter",
        unavail: "Data unavailable",
        loading: "Loading...",
        deleted: "Deleted",
        numValidation: "Please, insert a value bigger than zero!",
        stringValidation: "Please type something",
        required: "Field is required",
        recPerPage: "Records per page:"
      };
    }
  }]);
  return _default;
}(_BaseGenerator2["default"]);

exports["default"] = _default;