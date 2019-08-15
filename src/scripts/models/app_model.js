/* global BaseModel BaseCollection */

/* exported AppModel */
const AppModel = BaseModel.extend({
  defaults() {
    return {
      app: null,
      description: null,
      formtitle: null,
      datatabletitle: null,
      status: 'Active',
      fields: [],
      validations: [],
      rules: []
    };
  },

  urlRoot: '/* @echo C3DATA_APPS_URL */',

  toConfig() {
    const json = this.toJSON();

    const cotFormConfig = {
      title: json.formtitle,
      sections: [],
      datatableColumns: []
    };

    const datatableConfig = {
      title: json.datatabletitle,
      columns: []
    };

    let sectionIndex = -1;
    let rowIndex = -1;
    let fieldIndex = -1;

    function addSection(config) {
      cotFormConfig.sections.push(config);
      sectionIndex++;
      rowIndex = -1;
    }

    function addRow(config) {
      if (sectionIndex === -1) {
        addSection({ rows: [] });
      }

      cotFormConfig.sections[sectionIndex].rows.push(config);
      rowIndex++;
      fieldIndex = -1;
    }

    function addField(config) {
      if (rowIndex === -1) {
        addRow({ fields: [] });
      }

      cotFormConfig.sections[sectionIndex].rows[rowIndex].fields.push(config);
      fieldIndex++;
    }

    json.fields.forEach(field => {
      switch (field.type) {
        case 'Section':
          addSection({
            id: field.id || null,
            title: field.section_title || null,
            rows: []
          });
          break;

        case 'Row':
          addRow({
            id: field.id || null,
            fields: []
          });
          break;

        default:
          if ((fieldIndex + 1) % 4 === 0) {
            addRow({ fields: [] });
          }

          if (field.datatableColumn === 'Yes') {
            cotFormConfig.datatableColumns.push(field.id);
          }

          switch (field.type) {
            case 'Text':
              addField({
                id: field.id || null,
                bindTo: field.id || null,
                title: field.text_title || null,
                type: 'text',
                required: field.text_required === 'Yes',
                disabled: field.text_disbled === 'Yes',
                readOnly: field.text_readonly === 'Yes',
                infohelp: field.text_infohelp || null,
                prehelptext: field.text_prehelptext || null,
                posthelptext: field.text_posthelptext || null,
                placeholder: field.text_placeholder || null,
                value: field.text_value || null
              });

              if (field.datatableColumn === 'Yes') {
                datatableConfig.columns.push({
                  title: field.text_title || null,
                  data: field.id || null
                })
              }

              break;

            case 'Textarea':
              addField({
                id: field.id || null,
                bindTo: field.id || null,
                title: field.textarea_title || null,
                type: 'textarea',
                required: field.textarea_required === 'Yes',
                disbled: field.textarea_disbled === 'Yes',
                readonly: field.textarea_readonly === 'Yes',
                infohelp: field.textarea_infohelp || null,
                prehelptext: field.textarea_prehelptext || null,
                posthelptext: field.textarea_posthelptext || null,
                placeholder: field.textarea_placeholder || null,
                value: field.textarea_value || null,
                cols: isNaN(field.textarea_cols) ? null : +field.textarea_cols,
                rows: isNaN(field.textarea_rows) ? null : +field.textarea_rows
              });

              if (field.datatableColumn === 'Yes') {
                datatableConfig.columns.push({
                  title: field.textarea_title || null,
                  data: field.id || null
                })
              }

              break;
          }
      }
      // }
    });

    return { cotFormConfig, datatableConfig };
  }
});

/* exported AppCollection */
const AppCollection = BaseCollection.extend({
  model: AppModel,
  url: AppModel.prototype.urlRoot,
  webStorageKey: 'apps'
});
