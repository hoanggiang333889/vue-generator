import BaseGenerator from "./BaseGenerator";
import handlebars from "handlebars";
import hbh_comparison from "handlebars-helpers/lib/comparison";
import hbh_array from "handlebars-helpers/lib/array";
import hbh_string from "handlebars-helpers/lib/string";
import { sprintf } from "sprintf-js";
export default class extends BaseGenerator {
  constructor(params) {
    super(params);
    this.registerTemplates("vue-common/", [// error
    "error/SubmissionError.js", // mixins
    "mixins/CreateMixin.js", "mixins/ListMixin.js", "mixins/NotificationMixin.js", "mixins/ShowMixin.js", "mixins/UpdateMixin.js", // services
    "services/api.js", "services/foo.js", // modules
    "store/modules/crud.js", "store/modules/notifications.js", // utils
    "utils/dates.js", "utils/fetch.js", "utils/hydra.js", // validators
    "validators/date.js"]);
    handlebars.registerHelper("compare", hbh_comparison.compare);
    handlebars.registerHelper("ifEven", hbh_comparison.ifEven);
    handlebars.registerHelper("ifOdd", hbh_comparison.ifOdd);
    handlebars.registerHelper("isArray", hbh_array.isArray);
    handlebars.registerHelper("inArray", hbh_array.inArray);
    handlebars.registerHelper("forEach", hbh_array.forEach);
    handlebars.registerHelper("downcase", hbh_string.downcase);
    this.registerSwitchHelper();
  }

  registerSwitchHelper() {
    /*
      https://github.com/wycats/handlebars.js/issues/927#issuecomment-318640459
       {{#switch state}}
        {{#case "page1" "page2"}}page 1 or 2{{/case}}
        {{#case "page3"}}page3{{/case}}
        {{#case "page4"}}page4{{/case}}
        {{#case "page5"}}
          {{#switch s}}
            {{#case "3"}}s = 3{{/case}}
            {{#case "2"}}s = 2{{/case}}
            {{#case "1"}}s = 1{{/case}}
            {{#default}}unknown{{/default}}
          {{/switch}}
        {{/case}}
        {{#default}}page0{{/default}}
      {{/switch}}
    */
    handlebars.__switch_stack__ = [];
    handlebars.registerHelper("switch", function (value, options) {
      handlebars.__switch_stack__.push({
        switch_match: false,
        switch_value: value
      });

      let html = options.fn(this);

      handlebars.__switch_stack__.pop();

      return html;
    });
    handlebars.registerHelper("case", function (value, options) {
      let args = Array.from(arguments);
      options = args.pop();
      let caseValues = args;
      let stack = handlebars.__switch_stack__[handlebars.__switch_stack__.length - 1];

      if (stack.switch_match || caseValues.indexOf(stack.switch_value) === -1) {
        return "";
      } else {
        stack.switch_match = true;
        return options.fn(this);
      }
    });
    handlebars.registerHelper("default", function (options) {
      let stack = handlebars.__switch_stack__[handlebars.__switch_stack__.length - 1];

      if (!stack.switch_match) {
        return options.fn(this);
      }
    });
  }

  getContextForResource(resource, params, module) {
    const lc = module.toLowerCase();
    const titleUcFirst = module.charAt(0).toUpperCase() + module.slice(1); // const formFields = this.buildFields(resource.writableFields);
    // const dateTypes = ["time", "date", "dateTime"];
    // const formContainsDate = formFields.some((e) => dateTypes.includes(e.type));
    // const fields = this.buildFields(resource.readableFields);
    // const listContainsDate = fields.some((e) => dateTypes.includes(e.type));
    // const parameters = [];
    // params.forEach((p) => {
    //   const param = fields.find((field) => field.name === p.variable);
    //   if (!param) {
    //     p.name = p.variable;
    //     parameters.push(p);
    //   } else {
    //     param.multiple = p.multiple;
    //     parameters.push(param);
    //   }
    // });
    // const paramsHaveRefs = parameters.some(
    //   (e) => e.type === "text" && e.reference
    // );
    // const labels = this.commonLabelTexts();
    // return {
    //   title: resource.title,
    //   name: resource.name,
    //   lc,
    //   uc: resource.title.toUpperCase(),
    //   fields,
    //   dateTypes,
    //   listContainsDate,
    //   paramsHaveRefs,
    //   parameters,
    //   formFields,
    //   formContainsDate,
    //   hydraPrefix: this.hydraPrefix,
    //   titleUcFirst,
    //   labels,
    // };

    return {
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
    };
  }

  generate(api, resource, dir, serverPath, module) {
    this.generateFiles(api, resource, dir, null, module); // return resource.getParameters().then((params) => {
    //   params = params.map((param) => ({
    //     ...param,
    //     ...this.getHtmlInputTypeFromField(param),
    //   }));
    //   params = this.cleanupParams(params);
    //   this.generateFiles(api, resource, dir, params);
    // });
  } // eslint-disable-next-line no-unused-vars


  generateFiles(api, resource, dir, params) {
    // Create directories
    // These directories may already exist
    [`${dir}/config`, `${dir}/error`, `${dir}/mixins`, `${dir}/router`, `${dir}/services`, `${dir}/store/modules`, `${dir}/utils`, `${dir}/validators`].forEach(dir => this.createDir(dir, false)); // error

    this.createFile("error/SubmissionError.js", `${dir}/error/SubmissionError.js`, {}, false); // mixins

    ["mixins/Create%s.js", "mixins/List%s.js", "mixins/Notification%s.js", "mixins/Show%s.js", "mixins/Update%s.js"].forEach(pattern => this.createFile(sprintf(`${pattern}`, "Mixin"), sprintf(`${dir}/${pattern}`, "Mixin"), {}, false)); // stores

    ["crud.js", "notifications.js"].forEach(file => this.createFile(`store/modules/${file}`, `${dir}/store/modules/${file}`, {
      hydraPrefix: this.hydraPrefix
    }, false)); // services

    this.createFile("services/api.js", `${dir}/services/api.js`, {}, false);
    this.createFileFromPattern("services/%s.js", dir, resource.title.toLowerCase(), {
      name: resource.name
    }); // validators

    this.createFile("validators/date.js", `${dir}/validators/date.js`, {
      hydraPrefix: this.hydraPrefix
    }, false); // utils

    ["dates.js", "fetch.js", "hydra.js"].forEach(file => this.createFile(`utils/${file}`, `${dir}/utils/${file}`, {}, false));
    this.createEntrypoint(api.entrypoint, `${dir}/config/entrypoint.js`);
  }

  cleanupParams(params) {
    const stats = {};
    const result = [];
    params.forEach(p => {
      let key = p.variable.endsWith("[]") ? p.variable.slice(0, -2) : p.variable;

      if (!stats[key]) {
        stats[key] = 0;
      }

      stats[key] += 1;
    });
    params.forEach(p => {
      if (p.variable.endsWith("[exists]")) {
        return; // removed for the moment, it can help to add null option to select
      }

      if (p.variable.startsWith("order[")) {
        return; // removed for the moment, it can help to sorting data
      }

      if (!stats[p.variable] && p.variable.endsWith("[]")) {
        if (stats[p.variable.slice(0, -2)] === 1) {
          result.push(p);
        }
      } else {
        if (stats[p.variable] === 2) {
          p.multiple = true;
        }

        result.push(p);
      }
    });
    return result;
  }

  contextLabelTexts(formFields, fields) {
    let texts = [];
    formFields.forEach(x => texts.push(x.name)); // forms

    fields.forEach(x => texts.push(x.name)); // for show, too

    return [...new Set(texts)];
  }

  commonLabelTexts() {
    return {
      submit: "Submit",
      reset: "Reset",
      delete: "Delete",
      edit: "Edit",
      confirmDelete: "Are you sure you want to delete this item?",
      noresults: "No results",
      close: "Close",
      cancel: "Cancel",
      updated: "Updated",
      field: "Field",
      value: "Value",
      filters: "Filters",
      filter: "Filter",
      unavail: "Data unavailable",
      loading: "Loading...",
      deleted: "Deleted",
      numValidation: "Please, insert a value bigger than zero!",
      stringValidation: "Please type something",
      required: "Field is required",
      recPerPage: "Records per page:"
    };
  }

}