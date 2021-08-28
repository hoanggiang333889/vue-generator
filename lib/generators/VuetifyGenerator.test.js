"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _apiDocParser = require("@api-platform/api-doc-parser");

var _fs = _interopRequireDefault(require("fs"));

var _tmp = _interopRequireDefault(require("tmp"));

var _VuetifyGenerator = _interopRequireDefault(require("./VuetifyGenerator"));

test("Generate a Vuetify app", function () {
  var generator = new _VuetifyGenerator["default"]({
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
    ["/components/ActionCell.vue", "/components/Breadcrumb.vue", "/components/ConfirmDelete.vue", "/components/DataFilter.vue", "/components/foo/Filter.vue", "/components/foo/Form.vue", "/components/foo/Layout.vue", "/components/InputDate.vue", "/components/Loading.vue", "/components/Snackbar.vue", "/components/Toolbar.vue", "/config/entrypoint.js", "/error/SubmissionError.js", "/locales/en.js", "/router/foo.js", "/services/api.js", "/services/foo.js", "/utils/dates.js", "/utils/fetch.js", "/utils/hydra.js", "/views/foo/Create.vue", "/views/foo/List.vue", "/views/foo/Show.vue", "/views/foo/Update.vue"].forEach(function (file) {
      expect(_fs["default"].existsSync(tmpobj.name + file)).toBe(true);
    });
    tmpobj.removeCallback();
  });
});