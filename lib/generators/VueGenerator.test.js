"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _lib = require("@api-platform/api-doc-parser/lib");

var _fs = _interopRequireDefault(require("fs"));

var _tmp = _interopRequireDefault(require("tmp"));

var _VueGenerator = _interopRequireDefault(require("./VueGenerator"));

test("Generate a Vue app", function () {
  var generator = new _VueGenerator["default"]({
    hydraPrefix: "hydra:",
    templateDirectory: "".concat(__dirname, "/../../templates")
  });

  var tmpobj = _tmp["default"].dirSync({
    unsafeCleanup: true
  });

  var fields = [new _lib.Field("bar", {
    id: "http://schema.org/url",
    range: "http://www.w3.org/2001/XMLSchema#string",
    reference: null,
    required: true,
    description: "An URL"
  })];
  var resource = new _lib.Resource("abc", "http://example.com/foos", {
    id: "foo",
    title: "Foo",
    readableFields: fields,
    writableFields: fields
  });
  var api = new _lib.Api("http://example.com", {
    entrypoint: "http://example.com:8080",
    title: "My API",
    resources: [resource]
  });
  generator.generate(api, resource, tmpobj.name);
  expect(_fs["default"].existsSync(tmpobj.name + "/components/foo/Create.vue")).toBe(true);
  expect(_fs["default"].existsSync(tmpobj.name + "/components/foo/Form.vue")).toBe(true);
  expect(_fs["default"].existsSync(tmpobj.name + "/components/foo/List.vue")).toBe(true);
  expect(_fs["default"].existsSync(tmpobj.name + "/components/foo/Show.vue")).toBe(true);
  expect(_fs["default"].existsSync(tmpobj.name + "/components/foo/Update.vue")).toBe(true);
  expect(_fs["default"].existsSync(tmpobj.name + "/config/entrypoint.js")).toBe(true);
  expect(_fs["default"].existsSync(tmpobj.name + "/error/SubmissionError.js")).toBe(true);
  expect(_fs["default"].existsSync(tmpobj.name + "/router/foo.js")).toBe(true);
  expect(_fs["default"].existsSync(tmpobj.name + "/store/modules/foo/index.js")).toBe(true);
  ["create", "delete", "list", "show", "update"].forEach(function (action) {
    expect(_fs["default"].existsSync("".concat(tmpobj.name, "/store/modules/foo/").concat(action, "/actions.js"))).toBe(true);
    expect(_fs["default"].existsSync("".concat(tmpobj.name, "/store/modules/foo/").concat(action, "/index.js"))).toBe(true);
    expect(_fs["default"].existsSync("".concat(tmpobj.name, "/store/modules/foo/").concat(action, "/mutation_types.js"))).toBe(true);
    expect(_fs["default"].existsSync("".concat(tmpobj.name, "/store/modules/foo/").concat(action, "/mutations.js"))).toBe(true);
  });
  expect(_fs["default"].existsSync(tmpobj.name + "/utils/fetch.js")).toBe(true);
  tmpobj.removeCallback();
});