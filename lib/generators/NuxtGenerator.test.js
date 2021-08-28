"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _lib = require("@api-platform/api-doc-parser/lib");

var _fs = _interopRequireDefault(require("fs"));

var _tmp = _interopRequireDefault(require("tmp"));

var _NuxtGenerator = _interopRequireDefault(require("./NuxtGenerator"));

var generator = new _NuxtGenerator["default"]({
  hydraPrefix: "hydra:",
  templateDirectory: "".concat(__dirname, "/../../templates")
});
afterEach(function () {
  jest.resetAllMocks();
});
describe("generate", function () {
  test("Generate a Nuxt app", function () {
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
      writableFields: fields,
      getParameters: function getParameters() {
        return Promise.resolve([]);
      }
    });
    var api = new _lib.Api("http://example.com", {
      entrypoint: "http://example.com:8080",
      title: "My API",
      resources: [resource]
    });
    generator.generate(api, resource, tmpobj.name).then(function () {
      ["/components/foo/Form.vue", "/components/InputDate.vue", "/components/Loading.vue", "/components/Alert.vue", "/components/Toolbar.vue", "/config/entrypoint.js", "/error/SubmissionError.js", "/services/api.js", "/services/foo.js", "/store/foo.js", "/store/notifications.js", "/utils/dates.js", "/utils/fetch.js", "/utils/hydra.js", "/pages/foos/_id.vue", "/pages/foos/index.vue", "/pages/foos/new.vue"].forEach(function (file) {
        expect(_fs["default"].existsSync(tmpobj.name + file)).toBe(true);
      });
      tmpobj.removeCallback();
    });
  });
});