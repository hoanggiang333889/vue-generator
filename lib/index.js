#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("isomorphic-fetch");

var _commander = _interopRequireDefault(require("commander"));

var _package = require("../package.json");

var _generators = _interopRequireDefault(require("./generators"));

var _openapiClientAxios = _interopRequireDefault(require("openapi-client-axios"));

var _chalk = _interopRequireDefault(require("chalk"));

_commander["default"].version(_package.version).description("Generate apps built with, Nuxt, Vue or Vuetify for any API documented").usage("entrypoint outputDirectory").option("-r, --resource [resourceName]", "Generate CRUD for the given resource").option("-p, --hydra-prefix [hydraPrefix]", "The hydra prefix used by the API", "hydra:").option("--username [username]", "Username for basic auth (Hydra only)").option("--password [password]", "Password for basic auth (Hydra only)").option("--bearer [bearer]", "Token for bearer auth (Hydra only)").option("-g, --generator [generator]", 'The generator to use, one of "next", "nuxt", "quasar", "react", "react-native", "typescript", "vue", "vuetify"', "next").option("-t, --template-directory [templateDirectory]", "The templates directory base to use. Final directory will be ${templateDirectory}/${generator}", "".concat(__dirname, "/../templates/")).option("-f, --format [hydra|openapi3|openapi2]", '"hydra", "openapi3" or "openapi2"', "hydra").option("-s, --server-path [serverPath]", "Path to express server file to allow route dynamic addition (Next.js generator only)").option("-m, --module [module]", "module").parse(process.argv);

var outputDirectory = '.';
var generator = (0, _generators["default"])(_commander["default"].generator)({
  hydraPrefix: _commander["default"].hydraPrefix,
  templateDirectory: _commander["default"].templateDirectory
});
var resourceToGenerate = _commander["default"].resource ? _commander["default"].resource.toLowerCase() : null;
var serverPath = _commander["default"].serverPath ? _commander["default"].serverPath.toLowerCase() : null;

var _module = _commander["default"].module ? _commander["default"].module : null; // check generator dependencies


generator.checkDependencies(_commander["default"].resourceName, serverPath);

if (_module) {
  var api = new _openapiClientAxios["default"]({
    definition: 'http://localhost:8000/docs/api-docs.json'
  });
  api.init().then(function (res) {
    var data = res.api.document.components.schemas;

    for (var key in data) {
      if (key == _module) {
        generator.generate('', converProperties(data[key].properties), outputDirectory, serverPath, key);
        console.log(_chalk["default"].green("New ".concat(key, " added successfully.")));
      }
    }
  });
}

function converProperties(properties) {
  var data = [];

  for (var key in properties) {
    data.push({
      name: key,
      id: 'http://schema.org/isbn',
      range: 'http://www.w3.org/2001/XMLSchema#string',
      reference: null,
      embedded: null,
      required: true,
      description: null,
      maxCardinality: null,
      deprecated: false,
      type: properties[key].type,
      index: 1,
      total: 1,
      isFirst: true,
      isLast: false
    });
  }

  return data;
}