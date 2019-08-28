/* global BaseModel BaseCollection */

/* exported AppModel */
const AppModel = BaseModel.extend({
  defaults() {
    return {
      name: 'string',
      entity: 'string',
      description: 'string',

      formtitle: 'string',
      tabletitle: 'string',

      sections: [
        {
          name: 'string',
          title: 'string',
          cols: '4',

          rows: [
            {
              name: 'string',

              fields: [
                {
                  name: 'string',
                  type: 'text',
                  colspan: '1',

                  validations: [
                    {
                      type: 'string'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],

      rules: [
        {
          type: 'string'
        }
      ]
    };
  },

  urlRoot: '/* @echo C3DATA_APPS_URL */',

  toConfigs(fieldTypes) {
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

    returnValue.form.entity = json.entity;
    returnValue.table.entity = json.entity;

    if (json.formtitle) {
      returnValue.form.title = json.formtitle;
    }
    if (json.tabletitle) {
      returnValue.table.title = json.tabletitle;
    }

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
            const type = row.fields[index].type;

            if (fieldTypes && fieldTypes[type] && fieldTypes[type].toConfig) {
              row.fields[index] = fieldTypes[type].toConfig(row.fields[index]);
            }

            if (row.fields[index].name) {
              row.id = row.name;
              row.bindTo = row.name;
            }
            row.fields[index].className = getClassName(+section.cols, +row.fields[index].colspan);
          }
        }
      });
    });
    returnValue.form.sections = json.sections;

    return returnValue;
  }
});

/* exported AppCollection */
const AppCollection = BaseCollection.extend({
  model: AppModel,
  url: '/* @echo C3DATA_APPS_URL */',
  webStorageKey: 'apps'
});
