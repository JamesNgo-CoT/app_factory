/* global _ BaseModel BaseView FormView ace */

// const AppFieldFormView_ValidatorsView = BaseView.extend({
//   render() {
//     while (this.el.firstChild) {
//       this.el.removeChild(this.el.firstChild);
//     }

//     const fragment = document.createDocumentFragment();

//     const validators = this.model.get('validators');
//     if (validators.length > 0) {
//       // TODO
//       const table = fragment.appendChild(document.createElement('table'));
//       table.classList.add('table', 'table-bordered');
//       table.setAttribute('width', '100%');

//       const thead = table.appendChild(document.createElement('thead'));
//       thead.innerHTML = `
//         <tr>
//           <th>Field</th>
//           <th>Condition</th>
//           <th>Action</th>
//           <th>Targets</th>
//           <th>&nbsp;</th>
//         </tr>
//       `;

//       const tbody = table.appendChild(document.createElement('tbody'));

//       validators.forEach((rule, index) => {
//         const tr = tbody.appendChild(document.createElement('tr'));
//         tr.innerHTML = `
//           <td>${rule.condition_field}</td>
//           <td>${rule.condition_type}</td>
//           <td>${rule.action_type}</td>
//           <td>${rule.action_target.join(', ')}</td>
//           <td><button type="button" class="btn btn-default btn-configure-rule" data-rule-index="${index}">Configure</button></td>
//         `;
//       });
//     }

//     const addRuleButton = fragment.appendChild(document.createElement('button'));
//     addRuleButton.setAttribute('type', 'button');
//     addRuleButton.classList.add('btn', 'btn-default', 'btn-add-rule');
//     addRuleButton.innerHTML = 'Add Rule';

//     this.el.appendChild(fragment);

//     return BaseView.prototype.render.call(this);
//   }
// });

const AppFieldFormView = FormView.extend({
  formDefinition() {
    const fieldTypes = this.model.get('fieldTypes');

    const typeChoices = Object.keys(fieldTypes).map(fieldType => ({
      text: fieldType
    }));

    const colspanChoices = this.model.get('colspanChoices');

    const sections = [
      {
        title: 'Details',

        rows: [
          {
            fields: [
              {
                title: 'Type',
                type: 'dropdown',
                required: true,
                bindTo: 'type',
                choices: typeChoices
              },
              {
                title: 'Column Span',
                type: 'dropdown',
                required: true,
                bindTo: 'colspan',
                choices: colspanChoices
              },
              {
                title: 'ID',
                type: 'text',
                required: false,
                bindTo: 'name'
              }
            ]
          }
        ]
      }
    ];

    Object.keys(fieldTypes).forEach(fieldType => {
      const fieldTypeSections = _.result(fieldTypes[fieldType], 'sections');

      fieldTypeSections.forEach(section => {
        section.className = `panel panel-default panel-options ${fieldType.replace(/[^a-zA-Z0-9_]/g, '_')}_Options`;
      });

      sections.push(...fieldTypeSections);
    });

    sections.push({
      title: 'Validators',
      className: 'panel panel-default panel-options validations-options',

      rows: [
        {
          fields: [
            {
              type: 'html',
              html: '',

              postRender({ model, view, field }) {
                const el = document.getElementById(`${field.id}Element`);
                el.setAttribute('style', 'height: 200px; margin-bottom: 0;');
                el.innerHTML = model.get('validators');
                var editor = ace.edit(el);
                editor.setTheme('ace/theme/monokai');
                editor.session.setMode('ace/mode/json');
                editor.on('change', () => {
                  model.set('validators', editor.getSession().getValue());
                });
              }
            }
          ]
        }
      ]
    });

    sections.push({
      title: 'Table Options',
      className: 'panel panel-default panel-options table-options',

      rows: [
        {
          fields: [
            {
              className: 'col-sm-4',
              title: 'Display as Table Column',
              bindTo: 'tableColumn',
              required: true,
              type: 'radio',
              choices: [{ text: 'Yes' }, { text: 'No' }]
            }
          ]
        }
      ]
    });

    return {
      sections,

      postRender({ model, view }) {
        const handler = () => {
          const hidden = view.el.querySelectorAll('.panel-options');
          for (let index = 0, length = hidden.length; index < length; index++) {
            hidden[index].classList.add('hide');
          }

          const type = model.get('type');
          if (type) {
            const show = view.el.querySelectorAll(`.${type.replace(/[^a-zA-Z0-9_]/g, '_')}_Options`);
            for (let index = 0, length = show.length; index < length; index++) {
              show[index].classList.remove('hide');
            }
            view.el.querySelector('.table-options').classList.remove('hide');
            view.el.querySelector('.validations-options').classList.remove('hide');
          }
        };

        handler();

        view.listenTo(model, `change:type`, handler);
      }
    };
  },

  success() {
    this.trigger('success');
  },

  render() {
    this.removeSubViews();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    this.subViews = {};

    return FormView.prototype.render.call(this);
    // .then(() => {
    //   const model = this.model;
    //   this.subViews.buttonsView = new AppFormPageView_FormView_ButtonsView({ model });
    //   return this.subViews.buttonsView.appendTo(this.form).render();
    // });
  }
});

/* exported AppFormFieldPageView */
const AppFormFieldPageView = BaseView.extend({
  className: 'appFormFieldPageView',

  events: {
    ['click .btn-save'](event) {
      event.preventDefault();

      this.subViews.formView.form.querySelector('.fv-hidden-submit').click();
    },

    ['click .btn-cancel'](event) {
      event.preventDefault();
      this.trigger('navigateBack');
    },

    ['click .btn-remove'](event) {
      event.preventDefault();
      // if (prompt('Type "REMOVE" to remove this field') === 'REMOVE') {
      if (confirm('This action will remove this field. Would you like to proceed?')) {
        const sections = this.model.get('sections');
        sections[this.sectionIndex].rows[this.rowIndex].fields.splice(this.fieldIndex, 1, null);
        this.trigger('navigateBack');
      }
    }
  },

  initialize(options) {
    this.sectionIndex = options.sectionIndex;
    this.rowIndex = options.rowIndex;
    this.fieldIndex = options.fieldIndex;
    this.fieldTypes = options.fieldTypes;

    BaseView.prototype.initialize.call(this, options);
  },

  render() {
    this.removeSubViews();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    this.subViews = {};

    const fragment = document.createDocumentFragment();

    const formRow = fragment.appendChild(document.createElement('div'));
    formRow.classList.add('row');
    const formCol = formRow.appendChild(document.createElement('div'));
    formCol.classList.add('col-xs-12');

    const sections = this.model.get('sections');

    const modelOptions = Object.assign(
      { colspan: '1', required: 'No', disabled: 'No', readonly: 'No', tableColumn: 'No', validators: "{}" },
      sections[this.sectionIndex].rows[this.rowIndex].fields[this.fieldIndex]
    );

    modelOptions.fieldTypes = this.fieldTypes;

    const colspanChoices = [];
    let colspanCounter = 1;
    const cols = +sections[this.sectionIndex].cols;
    for (let index = this.fieldIndex; index < cols; index++) {
      if (index !== this.fieldIndex && sections[this.sectionIndex].rows[this.rowIndex].fields[index]) {
        break;
      }
      colspanChoices.push({ text: String(colspanCounter++) });
    }
    modelOptions.colspanChoices = colspanChoices;

    this.subViews.formView = new AppFieldFormView({
      model: new BaseModel(modelOptions)
    });

    this.subViews.formView.on('success', () => {
      const model = this.subViews.formView.model;

      const sections = this.model.get('sections');

      const json = model.toJSON();

      delete json.colspanChoices;
      delete json.fieldTypes;

      let originalColSpan = 1;
      if (sections[this.sectionIndex].rows[this.rowIndex].fields[this.fieldIndex]) {
        originalColSpan = +(sections[this.sectionIndex].rows[this.rowIndex].fields[this.fieldIndex].colspan || 1);
      }

      sections[this.sectionIndex].rows[this.rowIndex].fields[this.fieldIndex] = json;

      const newColspan = +sections[this.sectionIndex].rows[this.rowIndex].fields[this.fieldIndex].colspan;
      if (originalColSpan < newColspan) {
        let numberOfFieldsToRemove = newColspan - originalColSpan;
        for (let index = 0; index < numberOfFieldsToRemove; index++) {
          sections[this.sectionIndex].rows[this.rowIndex].fields.splice(this.fieldIndex + 1, 1);
        }
      } else if (originalColSpan > newColspan) {
        let numberOfFieldsToAdd = originalColSpan - newColspan;
        for (let index = 0; index < numberOfFieldsToAdd; index++) {
          sections[this.sectionIndex].rows[this.rowIndex].fields.splice(this.fieldIndex + 1, 0, null);
        }
      }

      this.trigger('navigateBack');
    });

    const renderPromise = this.subViews.formView
      .appendTo(formCol)
      .render()
      .then(() => {
        const buttonsRow = this.subViews.formView.form.appendChild(document.createElement('div'));
        buttonsRow.classList.add('row');

        const leftCol = buttonsRow.appendChild(document.createElement('div'));
        leftCol.classList.add('col-sm-6');
        leftCol.innerHTML = `
          <button type="button" class="btn btn-primary btn-lg btn-save">Update</button>
          <button type="button" class="btn btn-default btn-lg btn-cancel">Cancel</button>
        `;

        const rightCol = buttonsRow.appendChild(document.createElement('div'));
        rightCol.classList.add('col-sm-6', 'text-right');
        rightCol.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-remove">Remove</button>';
      });
    this.el.appendChild(fragment);

    return renderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
