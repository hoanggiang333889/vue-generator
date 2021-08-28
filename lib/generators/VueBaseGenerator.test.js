"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _apiDocParser = require("@api-platform/api-doc-parser");

var _fs = _interopRequireDefault(require("fs"));

var _tmp = _interopRequireDefault(require("tmp"));

var _VueBaseGenerator = _interopRequireDefault(require("./VueBaseGenerator"));

test("Test VueBaseGenerator", function () {
  var generator = new _VueBaseGenerator["default"]({
    hydraPrefix: "hydra:",
    templateDirectory: "".concat(__dirname, "/../../templates")
  });

  var tmpobj = _tmp["default"].dirSync({
    unsafeCleanup: true
  });

  var fields = [new _apiDocParser.Field("bar", {
    id: "http://schema.org/url",
    range: "http://www.w3.org/2001/XMLSchema#string",
    reference: null,
    required: true,
    description: "An URL"
  })];
  var resource = new _apiDocParser.Resource("abc", "http://example.com/foos", {
    id: "foo",
    title: "Foo",
    readableFields: fields,
    writableFields: fields,
    getParameters: function getParameters() {
      return Promise.resolve([]);
    }
  });
  var api = new _apiDocParser.Api("http://example.com", {
    entrypoint: "http://example.com:8080",
    title: "My API",
    resources: [resource]
  });
  generator.generate(api, resource, tmpobj.name).then(function () {
    expect(_fs["default"].existsSync(tmpobj.name + "/mixins/CreateMixin.js")).toBe(true);
    expect(_fs["default"].existsSync(tmpobj.name + "/mixins/ListMixin.js")).toBe(true);
    expect(_fs["default"].existsSync(tmpobj.name + "/mixins/NotificationMixin.js")).toBe(true);
    expect(_fs["default"].existsSync(tmpobj.name + "/mixins/ShowMixin.js")).toBe(true);
    expect(_fs["default"].existsSync(tmpobj.name + "/mixins/UpdateMixin.js")).toBe(true);
    expect(_fs["default"].existsSync(tmpobj.name + "/error/SubmissionError.js")).toBe(true);
    expect(_fs["default"].existsSync(tmpobj.name + "/store/modules/crud.js")).toBe(true);
    expect(_fs["default"].existsSync(tmpobj.name + "/store/modules/notifications.js")).toBe(true);
    expect(_fs["default"].existsSync(tmpobj.name + "/utils/dates.js")).toBe(true);
    expect(_fs["default"].existsSync(tmpobj.name + "/utils/fetch.js")).toBe(true);
    expect(_fs["default"].existsSync(tmpobj.name + "/utils/hydra.js")).toBe(true);
    tmpobj.removeCallback();
  });
});