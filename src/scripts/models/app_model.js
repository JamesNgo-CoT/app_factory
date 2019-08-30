/* global BaseModel BaseCollection */

/* exported AppModel */
const AppModel = BaseModel.extend({
  defaults() {
    return {
      name: 'string',
      description: 'string',

      formtitle: 'string',
      tabletitle: 'string',

      sections: [],

      rules: []
    };
  },

  urlRoot: '/* @echo C3DATA_APPS_URL */',

  adjustSyncJson(json) {
    json.sections.forEach(section => {
      section.rows.forEach(row => {
        row.fields.forEach((field, index) => {
          if (!field) {
            row.fields[index] = { type: 'empty' };
          }
        });
      });
    });

    return json;
  },

  parse(response, options) {
    if (response.sections) {
      response.sections.forEach(section => {
        section.rows.forEach(row => {
          row.fields.forEach((field, index) => {
            if (field && field.type === 'empty') {
              row.fields[index] = null;
            }
          });
        });
      });
    }

    return BaseModel.prototype.parse.call(this, response, options);
  },

  toConfigs(fieldTypes, ruleTypes, ruleConditions) {
    const returnValue = {
      form: {
        datatableColumns: []
      },
      table: {
        columns: []
      }
    };

    function getClassName(cols, colspan) {
      if (cols === 1) {
        return 'col-xs-12';
      }

      if (cols === 2) {
        if (colspan === 1) {
          return 'col-sm-6';
        } else {
          return 'col-xs-12';
        }
      }

      if (cols === 3) {
        if (colspan === 1) {
          return 'col-sm-4';
        } else if (colspan === 2) {
          return 'col-sm-8';
        } else {
          return 'col-xs-12';
        }
      }

      if (cols === 4) {
        if (colspan === 1) {
          return 'col-sm-3';
        } else if (colspan === 2) {
          return 'col-sm-6';
        } else if (colspan === 3) {
          return 'col-sm-9';
        } else {
          return 'col-xs-12';
        }
      }
    }

    const json = this.toJSON();

    if (json.formtitle) {
      returnValue.form.title = json.formtitle;
    }
    if (json.tabletitle) {
      returnValue.table.title = json.tabletitle;
    }

    const fields = {};

    json.sections.forEach(section => {
      if (section.name) {
        section.id = section.name;
      }

      section.rows.forEach(row => {
        if (row.name) {
          row.id = row.name;
        }

        for (let index = 0; index < +section.cols; index++) {
          if (!row.fields[index]) {
            row.fields[index] = {
              type: 'html',
              html: '',
              className: getClassName(+section.cols, 1)
            };
          } else {
            row.fields[index].className = getClassName(+section.cols, +row.fields[index].colspan);
            const type = row.fields[index].type;
            if (fieldTypes && fieldTypes[type] && fieldTypes[type].toConfig) {
              row.fields[index] = fieldTypes[type].toConfig(row.fields[index]);
            }
            if (row.fields[index].id && row.fields[index].bindTo) {
              fields[row.fields[index].id] = row.fields[index].bindTo;
            }
          }
        }
      });
    });

    returnValue.form.sections = json.sections;

    json.postRenders = [];

    json.rules.forEach(rule => {
      if (rule.action_type && ruleTypes[rule.action_type]) {
        json.postRenders.push(ruleTypes[rule.action_type].toConfig(rule, fields, ruleConditions));
      }
    });

    returnValue.form.postRender = `function(options) {${json.postRenders.join('')}}`;

    return returnValue;
  }
});

/* exported AppCollection */
const AppCollection = BaseCollection.extend({
  model: AppModel,
  url: '/* @echo C3DATA_APPS_URL */',
  webStorageKey: 'apps'
});
