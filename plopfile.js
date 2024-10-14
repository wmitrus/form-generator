/* eslint @typescript-eslint/no-require-imports: "off" */
const fs = require('fs');
const path = require('path');

const helpers = require('handlebars-helpers')();

function registerHandleBarHelpers(plop) {
  for (const prop in helpers) {
    // if it is not an already included "case" helper, than add the helper to plop
    if (!prop.toLowerCase().includes('case')) {
      plop.setHelper(prop, helpers[prop]);
    }
  }

  // overwrite "raw" helper afterwards, because it's not able to
  // avoid escaping of {{{{raw}}}} block content otherwise
  plop.setHelper('raw', (options) => {
    return options.fn(undefined);
  });
}

function isUsingTypeScript() {
  return fs.existsSync(path.join(process.cwd(), 'tsconfig.json'));
}

module.exports = function (plop) {
  const isTS = isUsingTypeScript();

  registerHandleBarHelpers(plop);
  // plop.setHelper('eq', function)

  // New API route generator
  plop.setGenerator('Api', {
    description: 'Generate a Next.js API route',
    prompts: async function (inquirer) {
      let dynamicRoutes = [];
      const prompts = [
        {
          type: 'input',
          name: 'name',
          message: 'API route name?',
        },
      ];

      if (!isTS) {
        prompts.push({
          type: 'confirm',
          name: 'isTypeScript',
          message: 'Use TypeScript?',
          default: false,
        });
      }

      const basicAnswers = await inquirer.prompt(prompts);

      const methods = await inquirer.prompt([
        {
          type: 'checkbox',
          message: 'Select the methods you want to use (spacebar to select)',
          name: 'methods',
          choices: ['GET', 'POST', 'PUT', 'DELETE'],

          validate(answer) {
            if (answer.length === 0) {
              return 'You must choose at least one method.';
            }

            return true;
          },
        },
      ]);

      const { addDynamicRoutes } = await inquirer.prompt({
        type: 'confirm',
        name: 'addDynamicRoutes',
        message: 'Would you like to add dynamic routes?',
        default: false,
      });

      if (addDynamicRoutes) {
        let addMore = true;
        while (addMore) {
          const dynamicRouteAnswer = await inquirer.prompt({
            type: 'input',
            name: 'routeName',
            message: 'Enter a dynamic route slug:',
          });
          dynamicRoutes.push(dynamicRouteAnswer.routeName);

          // Ask if the user wants to add another dynamic route
          const addMoreAnswer = await inquirer.prompt({
            type: 'confirm',
            name: 'addMore',
            message: 'Would you like to add another dynamic route?',
            default: false,
          });
          addMore = addMoreAnswer.addMore;
        }
      }

      return {
        isTypeScript: isTS || basicAnswers.isTypeScript,
        name: basicAnswers.name,
        dynamicRoutes,
        hasDinamycRoutes: Boolean(dynamicRoutes.length),
        methods: methods.methods.map((method) => {
          return { type: method, dynamicRoutes };
        }),
      };
    },

    actions: function (data) {
      let path = `src/app/api/${data.name}`;
      // Append dynamic routes to the path
      if (data.dynamicRoutes && data.dynamicRoutes.length > 0) {
        path += '/' + data.dynamicRoutes.map((route) => `[${route}]`).join('/');
      }
      const extension = data.isTypeScript ? 'ts' : 'js';

      // Add the file name to the path
      path += `/route.${extension}`;
      const actions = [
        {
          type: 'add',
          path: path,
          templateFile: 'plop-templates/api/api-route.hbs', // Adjust this path as needed
        },
      ];
      return actions;
    },
  });

  // New component generator
  plop.setGenerator('Component', {
    description: 'Generate a React component',
    prompts: async function (inquirer) {
      const prompts = [
        {
          type: 'input',
          name: 'componentName',
          message: 'Component name?',
        },
        {
          type: 'input',
          name: 'type',
          message: 'Enter a component folder:',
        },
        {
          type: 'list',
          name: 'componentType',
          message: 'Select a component type',
          choices: ['basic', 'polymorphic'],
        },
        {
          type: 'confirm',
          name: 'withChildren',
          message: 'With children?',
          default: true,
        },
      ];

      if (!isTS) {
        prompts.push({
          type: 'confirm',
          name: 'isTypeScript',
          message: 'Use TypeScript?',
          default: false,
        });
      }

      const answers = await inquirer.prompt(prompts);

      const componentType = answers.componentType;
      const htmlElementAnswer =
        componentType === 'polymorphic' &&
        (await inquirer.prompt({
          type: 'input',
          name: 'htmlElement',
          message: 'Enter an html element to adapt:',
        }));

      return {
        isTypeScript: isTS || answers.isTypeScript,
        name: answers.componentName,
        type: answers.type === 'none' ? null : answers.type,
        componentType: answers.componentType,
        htmlElement: htmlElementAnswer.htmlElement,
        withChildren: answers.withChildren,
      };
    },

    actions: function (data) {
      const extension = data.isTypeScript ? 'tsx' : 'jsx';
      const path = data.type
        ? `src/components/{{dashCase type}}/{{dashCase name}}/{{pascalCase name}}.${extension}`
        : `src/components/{{dashCase name}}/{{pascalCase name}}.${extension}`;

      const actions = [
        {
          type: 'add',
          path: path,
          templateFile: 'plop-templates/components/component.hbs', // Adjust this path as needed
        },
      ];
      return actions;
    },
  });

  // New Page generator
  plop.setGenerator('Page', {
    description: 'Generate a Next.js Page route',
    prompts: async function (inquirer) {
      let dynamicRoutes = [];
      const prompts = [
        {
          type: 'input',
          name: 'name',
          message: 'Page route name?',
        },
      ];

      if (!isTS) {
        prompts.push({
          type: 'confirm',
          name: 'isTypeScript',
          message: 'Use TypeScript?',
          default: false,
        });
      }

      const basicAnswers = await inquirer.prompt(prompts);

      const { addDynamicRoutes } = await inquirer.prompt({
        type: 'confirm',
        name: 'addDynamicRoutes',
        message: 'Would you like to add dynamic routes?',
        default: false,
      });

      if (addDynamicRoutes) {
        let addMore = true;
        while (addMore) {
          const dynamicRouteAnswer = await inquirer.prompt({
            type: 'input',
            name: 'routeName',
            message: 'Enter a dynamic route slug:',
          });
          dynamicRoutes.push(dynamicRouteAnswer.routeName);

          // Ask if the user wants to add another dynamic route
          const addMoreAnswer = await inquirer.prompt({
            type: 'confirm',
            name: 'addMore',
            message: 'Would you like to add another dynamic route?',
            default: false,
          });
          addMore = addMoreAnswer.addMore;
        }
      }

      return {
        isTypeScript: isTS || basicAnswers.isTypeScript,
        name: basicAnswers.name,
        dynamicRoutes,
        hasDinamycRoutes: Boolean(dynamicRoutes.length),
      };
    },

    actions: function (data) {
      let path = `src/app/${data.name}`;
      // Append dynamic routes to the path
      if (data.dynamicRoutes && data.dynamicRoutes.length > 0) {
        path += '/' + data.dynamicRoutes.map((route) => `[${route}]`).join('/');
      }
      const extension = data.isTypeScript ? 'tsx' : 'jsx';

      // Add the file name to the path
      path += `/page.${extension}`;
      const actions = [
        {
          type: 'add',
          path: path,
          templateFile: 'plop-templates/page/page-route.hbs', // Adjust this path as needed
        },
      ];
      return actions;
    },
  });
};
