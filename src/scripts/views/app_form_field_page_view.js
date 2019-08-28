/* global BaseModel BaseView FormView */

const AppFieldFormView = FormView.extend({
  formDefinition() {
    const fieldTypes = this.model.get('fieldTypes');

    const typeChoices = Object.keys(fieldTypes).map(fieldType => ({
      text: fieldTypes[fieldType].title || fieldType,
      value: fieldType
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
                title: 'ID',
                type: 'text',
                required: false,
                bindTo: 'name'
              },
              {
                title: 'Column Span',
                type: 'dropdown',
                required: true,
                bindTo: 'colspan',
                choices: colspanChoices
              }
            ]
          }
        ]
      }
    ];

    Object.keys(fieldTypes).forEach(fieldType => {
      fieldTypes[fieldType].sections.forEach(section => {
        section.className = `panel panel-default panel-options ${fieldType}Options`;
      });

      sections.push(...fieldTypes[fieldType].sections);
    });

    sections.push({
      title: 'Table Options',
      className: 'panel panel-default panel-options table-options',

      rows: [
        {
          fields: [
            {
              title: 'Table Column',
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
            const show = view.el.querySelectorAll(`.${type}Options`);
            for (let index = 0, length = show.length; index < length; index++) {
              show[index].classList.remove('hide');
            }
            view.el.querySelector('.table-options').classList.remove('hide');
          }
        };

        handler();

        view.listenTo(model, `change:type`, handler);
      }
    };
  },

  success() {
    this.trigger('success');
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
      if (prompt('Type "REMOVE" to remove this field') === 'REMOVE') {
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

    const modelOptions = Object.assign({}, sections[this.sectionIndex].rows[this.rowIndex].fields[this.fieldIndex]);
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

      let originalColSpan = 1;
      if (sections[this.sectionIndex].rows[this.rowIndex].fields[this.fieldIndex]) {
        originalColSpan = +(sections[this.sectionIndex].rows[this.rowIndex].fields[this.fieldIndex].colspan || 1);
      }

      sections[this.sectionIndex].rows[this.rowIndex].fields[this.fieldIndex] = json;

      const newColspan = +sections[this.sectionIndex].rows[this.rowIndex].fields[this.fieldIndex].colspan
      if (originalColSpan < newColspan) {
        let numberOfFieldsToRemove = newColspan - originalColSpan;
        for (let index = 0; index < numberOfFieldsToRemove; index++) {
          sections[this.sectionIndex].rows[this.rowIndex].fields.splice(this.fieldIndex + 1, 1);
        }
      } else if (originalColSpan > newColspan) {
        let numberOfFieldsToAdd =  originalColSpan - newColspan;
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
          <button type="button" class="btn btn-default btn-lg btn-save">Save</button>
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
