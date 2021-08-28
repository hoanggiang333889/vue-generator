import chalk from "chalk";
import BaseGenerator from "./BaseGenerator";
export default class extends BaseGenerator {
  constructor(params) {
    super(params);
    this.registerTemplates(`vue/`, [// modules
    "store/modules/foo/index.js", "store/modules/foo/create/actions.js", "store/modules/foo/create/index.js", "store/modules/foo/create/mutation_types.js", "store/modules/foo/create/mutations.js", "store/modules/foo/delete/actions.js", "store/modules/foo/delete/index.js", "store/modules/foo/delete/mutation_types.js", "store/modules/foo/delete/mutations.js", "store/modules/foo/list/actions.js", "store/modules/foo/list/index.js", "store/modules/foo/list/mutation_types.js", "store/modules/foo/list/mutations.js", "store/modules/foo/show/actions.js", "store/modules/foo/show/index.js", "store/modules/foo/show/mutation_types.js", "store/modules/foo/show/mutations.js", "store/modules/foo/update/actions.js", "store/modules/foo/update/index.js", "store/modules/foo/update/mutation_types.js", "store/modules/foo/update/mutations.js", // components
    "components/foo/Create.vue", "components/foo/Form.vue", "components/foo/List.vue", "components/foo/Update.vue", "components/foo/Show.vue", // routes
    "router/foo.js", // error
    "error/SubmissionError.js", // utils
    "utils/fetch.js"]);
  }

  help(resource) {
    const titleLc = resource.title.toLowerCase();
    console.log('Code for the "%s" resource type has been generated!', resource.title);
    console.log("Paste the following definitions in your application configuration:");
    console.log(chalk.green(`
//import routes
import ${titleLc}Routes from './router/${titleLc}';

// Add routes to VueRouter
const router = new VueRouter({
  // ...
  routes: [
      ...${titleLc}Routes,
  ]
});

// Add the modules in the store
import ${titleLc} from './store/modules/${titleLc}/';

export const store = new Vuex.Store({
  // ...
  modules: {
    ${titleLc}
  }
});
`));
  }

  generate(api, resource, dir, serverPath, module) {
    const lc = module.toLowerCase();
    const titleUcFirst = module.charAt(0).toUpperCase() + module.slice(1);
    const context = {
      title: module,
      name: module,
      lc: lc,
      uc: module.toUpperCase(),
      fields: [{
        name: 'isbn',
        id: 'http://schema.org/isbn',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: false,
        description: 'The ISBN of the book.',
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        index: 1,
        total: 6,
        isFirst: true,
        isLast: false
      }, {
        name: 'title',
        id: 'http://schema.org/name',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: true,
        description: 'The title of the book.',
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        multiple: undefined,
        index: 2,
        total: 6,
        isFirst: false,
        isLast: false
      }, {
        name: 'description',
        id: 'http://schema.org/description',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: true,
        description: 'A description of the item.',
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        index: 3,
        total: 6,
        isFirst: false,
        isLast: false
      }, {
        name: 'author',
        id: 'http://schema.org/author',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: true,
        description: 'The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably.',
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        multiple: undefined,
        index: 4,
        total: 6,
        isFirst: false,
        isLast: false
      }, {
        name: 'publicationDate',
        id: 'http://schema.org/dateCreated',
        range: 'http://www.w3.org/2001/XMLSchema#dateTime',
        reference: null,
        embedded: null,
        required: true,
        description: 'The date on which the CreativeWork was created or the item was added to a DataFeed.',
        maxCardinality: null,
        deprecated: false,
        type: 'dateTime',
        index: 5,
        total: 6,
        isFirst: false,
        isLast: false
      }, {
        name: 'reviews',
        id: 'http://schema.org/reviews',
        range: 'http://schema.org/Review',
        reference: null,
        embedded: ['Resource'],
        required: false,
        description: "The book's reviews.",
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        index: 6,
        total: 6,
        isFirst: false,
        isLast: true
      }],
      dateTypes: ['time', 'date', 'dateTime'],
      listContainsDate: true,
      paramsHaveRefs: false,
      parameters: [{
        name: 'title',
        id: 'http://schema.org/name',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: true,
        description: 'The title of the book.',
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        multiple: undefined,
        index: 2,
        total: 6,
        isFirst: false,
        isLast: false
      }, {
        name: 'author',
        id: 'http://schema.org/author',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: true,
        description: 'The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably.',
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        multiple: undefined,
        index: 4,
        total: 6,
        isFirst: false,
        isLast: false
      }],
      formFields: [{
        name: 'isbn',
        id: 'http://schema.org/isbn',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: false,
        description: 'The ISBN of the book.',
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        index: 1,
        total: 6,
        isFirst: true,
        isLast: false
      }, {
        name: 'title',
        id: 'http://schema.org/name',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: true,
        description: 'The title of the book.',
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        index: 2,
        total: 6,
        isFirst: false,
        isLast: false
      }, {
        name: 'description',
        id: 'http://schema.org/description',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: true,
        description: 'A description of the item.',
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        index: 3,
        total: 6,
        isFirst: false,
        isLast: false
      }, {
        name: 'author',
        id: 'http://schema.org/author',
        range: 'http://www.w3.org/2001/XMLSchema#string',
        reference: null,
        embedded: null,
        required: true,
        description: 'The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably.',
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        index: 4,
        total: 6,
        isFirst: false,
        isLast: false
      }, {
        name: 'publicationDate',
        id: 'http://schema.org/dateCreated',
        range: 'http://www.w3.org/2001/XMLSchema#dateTime',
        reference: null,
        embedded: null,
        required: true,
        description: 'The date on which the CreativeWork was created or the item was added to a DataFeed.',
        maxCardinality: null,
        deprecated: false,
        type: 'dateTime',
        index: 5,
        total: 6,
        isFirst: false,
        isLast: false
      }, {
        name: 'reviews',
        id: 'http://schema.org/reviews',
        range: 'http://schema.org/Review',
        reference: null,
        embedded: ['Resource'],
        required: false,
        description: "The book's reviews.",
        maxCardinality: null,
        deprecated: false,
        type: 'text',
        index: 6,
        total: 6,
        isFirst: false,
        isLast: true
      }],
      formContainsDate: true,
      hydraPrefix: 'hydra:',
      titleUcFirst: titleUcFirst,
      labels: {
        submit: 'Submit',
        reset: 'Reset',
        delete: 'Delete',
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
    }; // Create directories
    // These directories may already exist

    for (let dir of [`${dir}/config`, `${dir}/error`, `${dir}/router`, `${dir}/utils`]) {
      this.createDir(dir, false);
    }

    for (let dir of [`${dir}/store/modules/${lc}`, `${dir}/store/modules/${lc}/create`, `${dir}/store/modules/${lc}/delete`, `${dir}/store/modules/${lc}/list`, `${dir}/store/modules/${lc}/show`, `${dir}/store/modules/${lc}/update`, `${dir}/components/${lc}`]) {
      this.createDir(dir);
    }

    for (let pattern of [// modules
    "store/modules/%s/index.js", "store/modules/%s/create/actions.js", "store/modules/%s/create/index.js", "store/modules/%s/create/mutation_types.js", "store/modules/%s/create/mutations.js", "store/modules/%s/delete/actions.js", "store/modules/%s/delete/index.js", "store/modules/%s/delete/mutation_types.js", "store/modules/%s/delete/mutations.js", "store/modules/%s/list/actions.js", "store/modules/%s/list/index.js", "store/modules/%s/list/mutation_types.js", "store/modules/%s/list/mutations.js", "store/modules/%s/show/actions.js", "store/modules/%s/show/index.js", "store/modules/%s/show/mutation_types.js", "store/modules/%s/show/mutations.js", "store/modules/%s/update/actions.js", "store/modules/%s/update/index.js", "store/modules/%s/update/mutation_types.js", "store/modules/%s/update/mutations.js", // components
    "components/%s/Create.vue", "components/%s/Form.vue", "components/%s/List.vue", "components/%s/Update.vue", "components/%s/Show.vue", // routes
    "router/%s.js"]) {
      this.createFileFromPattern(pattern, dir, lc, context);
    } // error


    this.createFile("error/SubmissionError.js", `${dir}/error/SubmissionError.js`, context, false);
    this.createEntrypoint(api.entrypoint, `${dir}/config/entrypoint.js`);
    this.createFile("utils/fetch.js", `${dir}/utils/fetch.js`, {
      hydraPrefix: this.hydraPrefix
    }, false);
  }

}