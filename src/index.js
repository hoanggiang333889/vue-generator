#!/usr/bin/env node

import "isomorphic-fetch";
import program from "commander";
import { version } from "../package.json";
import generators from "./generators";
import OpenAPIClientAxios from 'openapi-client-axios';
import chalk from "chalk";

program
  .version(version)
  .description(
    "Generate apps built with, Nuxt, Vue or Vuetify for any API documented"
  )
  .usage("entrypoint outputDirectory")
  .option(
    "-r, --resource [resourceName]",
    "Generate CRUD for the given resource"
  )
  .option(
    "-p, --hydra-prefix [hydraPrefix]",
    "The hydra prefix used by the API",
    "hydra:"
  )
  .option("--username [username]", "Username for basic auth (Hydra only)")
  .option("--password [password]", "Password for basic auth (Hydra only)")
  .option("--bearer [bearer]", "Token for bearer auth (Hydra only)")
  .option(
    "-g, --generator [generator]",
    'The generator to use, one of "next", "nuxt", "quasar", "react", "react-native", "typescript", "vue", "vuetify"',
    "next"
  )
  .option(
    "-t, --template-directory [templateDirectory]",
    "The templates directory base to use. Final directory will be ${templateDirectory}/${generator}",
    `${__dirname}/../templates/`
  )
  .option(
    "-f, --format [hydra|openapi3|openapi2]",
    '"hydra", "openapi3" or "openapi2"',
    "hydra"
  )
  .option(
    "-s, --server-path [serverPath]",
    "Path to express server file to allow route dynamic addition (Next.js generator only)"
  )
  .option(
    "-m, --module [module]",
    "module"
  )
  .parse(process.argv);

const outputDirectory = '.'

const generator = generators(program.generator)({
  hydraPrefix: program.hydraPrefix,
  templateDirectory: program.templateDirectory,
});
const resourceToGenerate = program.resource
  ? program.resource.toLowerCase()
  : null;
const serverPath = program.serverPath ? program.serverPath.toLowerCase() : null;

const module = program.module ? program.module : null;

// check generator dependencies
generator.checkDependencies(program.resourceName, serverPath);

if(module) {
  const api = new OpenAPIClientAxios({ definition: 'http://localhost:8000/docs/api-docs.json' });
  api.init().then((res) => {
    let data = res.api.document.components.schemas;
    for(var key in data) {
      if(key == module) {
        generator.generate('', converProperties(data[key].properties), outputDirectory, serverPath, key);
        console.log(chalk.green(`New ${key} added successfully.`));
      }
    }
  });
}

function converProperties(properties) {
  var data = [];
  for(var key in properties) {
    data.push({
        name: key,
        id: 'http://schema.org/isbn',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: false,
        description: null,
        maxCardinality: null,
        deprecated: false,
        type: properties[key].type,
        index: 1,
        total: 1,
        isFirst: true,
        isLast: false
    })
  }
  return data;
}


