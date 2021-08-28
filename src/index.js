#!/usr/bin/env node

import "isomorphic-fetch";
import program from "commander";
import { version } from "../package.json";
import generators from "./generators.js";

program
  .version(version)
  .description(
    "Generate apps built with Nuxt, Vue or Vuetify for any API documented api"
  )
  .usage("entrypoint outputDirectory")
  .option(
    "-r, --resource [resourceName]",
    "Generate CRUD for the given resource"
  )
  .option(
    "-g, --generator [generator]",
    'The generator to use, one of "nuxt", "vue", "vuetify"'
  )
  .option(
    "-t, --template-directory [templateDirectory]",
    "The templates directory base to use. Final directory will be ${templateDirectory}/${generator}",
    `${__dirname}/../templates/`
  )
  .option(
    "-s, --server-path [serverPath]",
    "Path to express server file to allow route dynamic addition (Next.js generator only)"
  )
  .parse(process.argv);

if (
  2 !== program.args.length &&
  (!process.env.API_PLATFORM_CLIENT_GENERATOR_ENTRYPOINT ||
    !process.env.API_PLATFORM_CLIENT_GENERATOR_OUTPUT)
) {
  program.help();
}

const entrypoint =
  program.args[0] || process.env.API_PLATFORM_CLIENT_GENERATOR_ENTRYPOINT;
const outputDirectory =
  program.args[1] || process.env.API_PLATFORM_CLIENT_GENERATOR_OUTPUT;

const entrypointWithSlash = entrypoint.endsWith("/")
  ? entrypoint
  : entrypoint + "/";

const generator = generators(program.generator)({
  hydraPrefix: program.hydraPrefix,
  templateDirectory: program.templateDirectory,
});
const resourceToGenerate = program.resource
  ? program.resource.toLowerCase()
  : null;
const serverPath = program.serverPath ? program.serverPath.toLowerCase() : null;

const parser = (entrypointWithSlash) => {
  const options = {};
  if (program.username && program.password) {
    const encoded = Buffer.from(
      `${program.username}:${program.password}`
    ).toString("base64");
    options.headers = new Headers();
    options.headers.set("Authorization", `Basic ${encoded}`);
  }
  if (program.bearer) {
    options.headers = new Headers();
    options.headers.set("Authorization", `Bearer ${program.bearer}`);
  }
  switch (program.format) {
    case "swagger": // deprecated
    return true;
  }
};

// check generator dependencies
generator.checkDependencies(outputDirectory, serverPath);

parser(entrypointWithSlash)
  .then((ret) => {
    ret.api.resources
      .filter(({ deprecated }) => !deprecated)
      .filter((resource) => {
        const nameLc = resource.name.toLowerCase();
        const titleLc = resource.title.toLowerCase();

        return (
          null === resourceToGenerate ||
          nameLc === resourceToGenerate ||
          titleLc === resourceToGenerate
        );
      })
      .map((resource) => {
        const filterDeprecated = (list) =>
          list.filter(({ deprecated }) => !deprecated);

        resource.fields = filterDeprecated(resource.fields);
        resource.readableFields = filterDeprecated(resource.readableFields);
        resource.writableFields = filterDeprecated(resource.writableFields);

        generator.generate(ret.api, resource, outputDirectory, serverPath);

        return resource;
      })
      // display helps after all resources have been generated to check relation dependency for example
      .forEach((resource) => generator.help(resource, outputDirectory));
  })
  .catch((e) => {
    console.log(e);
  });
