import { config as baseConfig } from '../wdio.conf.js';

export const config = Object.assign(baseConfig, {
  environment: 'ServiceNow',
  serviceNowBaseURL: 'https://dev204202.service-now.com',
  specs: ['../test/features/ServiceNow/*.feature'],
  cucumberOpts: {
    // <string[]> (file/dir) require files before executing features
    require: [
      `${process.cwd()}/test/features/step-definitions/ServiceNow/*.js`,
    ],
    // <boolean> show full backtrace for errors
    backtrace: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: [],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: false,
    // <string[]> Only execute the scenarios with name matching the expression (repeatable).
    name: [],
    // <boolean> hide step definition snippets for pending steps
    snippets: true,
    // <boolean> hide source uris
    source: true,
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: '',
    // <number> timeout for step definitions
    timeout: 60000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
  },
});
