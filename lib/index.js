#!/usr/bin/env node
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("isomorphic-fetch");

var _commander = _interopRequireDefault(require("commander"));

var _package = require("../package.json");

var _generators = _interopRequireDefault(require("./generators"));

_commander["default"].version(_package.version).description("Generate apps built with Next, Nuxt, Quasar, React, React Native, Vue or Vuetify for any API documented using Hydra or OpenAPI").usage("entrypoint outputDirectory").option("-r, --resource [resourceName]", "Generate CRUD for the given resource").option("-p, --hydra-prefix [hydraPrefix]", "The hydra prefix used by the API", "hydra:").option("--username [username]", "Username for basic auth (Hydra only)").option("--password [password]", "Password for basic auth (Hydra only)").option("--bearer [bearer]", "Token for bearer auth (Hydra only)").option("-g, --generator [generator]", 'The generator to use, one of "next", "nuxt", "quasar", "react", "react-native", "typescript", "vue", "vuetify"', "next").option("-t, --template-directory [templateDirectory]", "The templates directory base to use. Final directory will be ${templateDirectory}/${generator}", "".concat(__dirname, "/../templates/")).option("-f, --format [hydra|openapi3|openapi2]", '"hydra", "openapi3" or "openapi2"', "hydra").option("-s, --server-path [serverPath]", "Path to express server file to allow route dynamic addition (Next.js generator only)").option("-m, --module [module]", "module").parse(process.argv);

console.log(_commander["default"].args[1]);
var outputDirectory = '.';
var generator = (0, _generators["default"])(_commander["default"].generator)({
  hydraPrefix: _commander["default"].hydraPrefix,
  templateDirectory: _commander["default"].templateDirectory
});
var resourceToGenerate = _commander["default"].resource ? _commander["default"].resource.toLowerCase() : null;
var serverPath = _commander["default"].serverPath ? _commander["default"].serverPath.toLowerCase() : null; // check generator dependencies

generator.checkDependencies(_commander["default"].resourceName, serverPath);
generator.generate('', [], outputDirectory, serverPath, _commander["default"].module);