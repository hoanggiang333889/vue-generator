#!/usr/bin/env node
import "isomorphic-fetch";
import program from "commander";
import parseHydraDocumentation from "@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation";
import parseSwaggerDocumentation from "@api-platform/api-doc-parser/lib/swagger/parseSwaggerDocumentation";
import parseOpenApi3Documentation from "@api-platform/api-doc-parser/lib/openapi3/parseOpenApi3Documentation";
import { version } from "../package.json";
import generators from "./generators";
program.version(version).description("Generate apps built with Next, Nuxt, Quasar, React, React Native, Vue or Vuetify for any API documented using Hydra or OpenAPI").usage("entrypoint outputDirectory").option("-r, --resource [resourceName]", "Generate CRUD for the given resource").option("-p, --hydra-prefix [hydraPrefix]", "The hydra prefix used by the API", "hydra:").option("--username [username]", "Username for basic auth (Hydra only)").option("--password [password]", "Password for basic auth (Hydra only)").option("--bearer [bearer]", "Token for bearer auth (Hydra only)").option("-g, --generator [generator]", 'The generator to use, one of "next", "nuxt", "quasar", "react", "react-native", "typescript", "vue", "vuetify"', "next").option("-t, --template-directory [templateDirectory]", "The templates directory base to use. Final directory will be ${templateDirectory}/${generator}", `${__dirname}/../templates/`).option("-f, --format [hydra|openapi3|openapi2]", '"hydra", "openapi3" or "openapi2"', "hydra").option("-s, --server-path [serverPath]", "Path to express server file to allow route dynamic addition (Next.js generator only)").option("-m, --module [module]", "module").parse(process.argv);
console.log(program.args[1]);
const outputDirectory = '.';
const generator = generators(program.generator)({
  hydraPrefix: program.hydraPrefix,
  templateDirectory: program.templateDirectory
});
const resourceToGenerate = program.resource ? program.resource.toLowerCase() : null;
const serverPath = program.serverPath ? program.serverPath.toLowerCase() : null; // check generator dependencies

generator.checkDependencies(program.resourceName, serverPath);
generator.generate('', [], outputDirectory, serverPath, program.module);