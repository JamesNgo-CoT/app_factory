/* global Backbone BaseView FormView */

const SectionsView = BaseView.extend({
  events: {
    ['click .btn-add-section'](event) {
      event.preventDefault();

      const sections = this.model.get('sections');
      sections.push({ cols: 4, rows: [] });

      this.render();
    },

    ['click .btn-add-row'](event) {
      event.preventDefault();

      const sectionIndex = +event.currentTarget.getAttribute('data-section-index');

      const sections = this.model.get('sections');
      sections[sectionIndex].rows.push({ fields: [] });

      this.render();
    },

    ['click .btn-remove-row'](event) {
      event.preventDefault();

      const sectionIndex = +event.currentTarget.getAttribute('data-section-index');
      const rowIndex = +event.currentTarget.getAttribute('data-row-index');

      const sections = this.model.get('sections');

      sections[sectionIndex].rows.splice(rowIndex, 1);

      this.render();
    },

    ['click .btn-open-section'](event) {
      event.preventDefault();

      const sectionIndex = +event.currentTarget.getAttribute('data-section-index');

      this.trigger('openSection', sectionIndex);
    },

    ['click .btn-open-field'](event) {
      event.preventDefault();

      const sectionIndex = +event.currentTarget.getAttribute('data-section-index');
      const rowIndex = +event.currentTarget.getAttribute('data-row-index');
      const fieldIndex = +event.currentTarget.getAttribute('data-field-index');

      this.trigger('openField', sectionIndex, rowIndex, fieldIndex);
    },

    ['dragstart [draggable=true]'](event) {
      this.dragData = {};

      const sectionIndex = event.currentTarget.getAttribute('data-section-index');
      if (sectionIndex != null) {
        this.dragData.sectionIndex = +sectionIndex;
      }

      const rowIndex = event.currentTarget.getAttribute('data-row-index');
      if (rowIndex != null) {
        this.dragData.rowIndex = +rowIndex;
      }

      const fieldIndex = event.currentTarget.getAttribute('data-field-index');
      if (fieldIndex != null) {
        this.dragData.fieldIndex = +fieldIndex;
      }
    },

    ['dragover .drag-target'](event) {
      const sectionIndex = event.currentTarget.getAttribute('data-section-index');
      const rowIndex = event.currentTarget.getAttribute('data-row-index');
      const fieldIndex = event.currentTarget.getAttribute('data-field-index');

      if (this.dragData.sectionIndex != null) {
        if (this.dragData.rowIndex != null) {
          if (this.dragData.fieldIndex != null) {
            // From Field
            if (sectionIndex != null && rowIndex != null && fieldIndex != null) {
              // To Field
              event.preventDefault();
            }
          } else {
            // From Row
            if (
              sectionIndex != null &&
              rowIndex != null &&
              fieldIndex == null &&
              ((+sectionIndex === this.dragData.sectionIndex && +rowIndex !== this.dragData.rowIndex) ||
                +sectionIndex !== this.dragData.sectionIndex)
            ) {
              // To Row
              event.preventDefault();
            }
          }
        } else {
          // From Section
          if (
            sectionIndex != null &&
            rowIndex == null &&
            fieldIndex == null &&
            +sectionIndex !== this.dragData.sectionIndex
          ) {
            // To Table
            event.preventDefault();
          }
        }
      }
    },

    ['drop .drag-target'](event) {
      event.preventDefault();

      const sectionIndex = event.currentTarget.getAttribute('data-section-index');
      const rowIndex = event.currentTarget.getAttribute('data-row-index');
      const fieldIndex = event.currentTarget.getAttribute('data-field-index');

      if (this.dragData.sectionIndex != null) {
        if (this.dragData.rowIndex != null) {
          if (this.dragData.fieldIndex != null) {
            // From Field
            if (sectionIndex != null && rowIndex != null && fieldIndex != null) {
              // To Field
              const sections = this.model.get('sections');
              sections[this.dragData.sectionIndex].rows[this.dragData.rowIndex].fields[
                this.dragData.fieldIndex
              ].colspan = 1;
              sections[+sectionIndex].rows[+rowIndex].fields[+fieldIndex] =
                sections[this.dragData.sectionIndex].rows[this.dragData.rowIndex].fields[this.dragData.fieldIndex];
              sections[this.dragData.sectionIndex].rows[this.dragData.rowIndex].fields[this.dragData.fieldIndex] = null;
              this.render();
            }
          } else {
            // From Row
            if (
              sectionIndex != null &&
              rowIndex != null &&
              fieldIndex == null &&
              ((+sectionIndex === this.dragData.sectionIndex && +rowIndex !== this.dragData.rowIndex) ||
                +sectionIndex !== this.dragData.sectionIndex)
            ) {
              // To Row
              const finalIndex =
                +sectionIndex === this.dragData.sectionIndex && +rowIndex < this.dragData.rowIndex
                  ? this.dragData.rowIndex + 1
                  : this.dragData.rowIndex;

              const sections = this.model.get('sections');
              sections[sectionIndex].rows.splice(
                rowIndex,
                0,
                sections[this.dragData.sectionIndex].rows[this.dragData.rowIndex]
              );
              sections[this.dragData.sectionIndex].rows.splice(finalIndex, 1);

              this.render();
              // } else if (
              //   sectionIndex != null &&
              //   rowIndex == null &&
              //   fieldIndex == null &&
              //   sectionIndex !== this.dragData.sectionIndex
              // ) {
              //   // To TABLE
              //   alert('DROP TO TABLE');
            }
          }
        } else {
          // From Section
          if (
            sectionIndex != null &&
            rowIndex == null &&
            fieldIndex == null &&
            +sectionIndex !== this.dragData.sectionIndex
          ) {
            // To Table
            const finalIndex =
              +sectionIndex < this.dragData.sectionIndex ? this.dragData.sectionIndex + 1 : this.dragData.sectionIndex;

            const sections = this.model.get('sections');
            sections.splice(sectionIndex, 0, sections[this.dragData.sectionIndex]);
            sections.splice(finalIndex, 1);

            this.render();
          }
        }
      }
    }
  },

  render() {
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    const fragment = document.createDocumentFragment();

    const sections = this.model.get('sections');
    sections.forEach((section, sectionIndex) => {
      const table = fragment.appendChild(document.createElement('table'));
      table.classList.add('table', 'table-bordered', 'drag-target');
      table.setAttribute('width', '100%');
      table.setAttribute('data-section-index', sectionIndex);

      const colgroup = table.appendChild(document.createElement('colgroup'));
      colgroup.innerHTML = `<col width="75"><col span="${section.cols}"><col width="75">`;

      const thead = table.appendChild(document.createElement('thead'));
      thead.innerHTML = `
        <tr>
          <th colspan="${section.cols + 2}">
            <button type="button" class="btn btn-default btn-block btn-open-section btn-details" data-section-index="${sectionIndex}" draggable="true">${
        section.title ? '<strong>' + section.title + '</strong>' : 'Untitled'
      }${section.name ? ' (' + section.name + ')' : ''}<br>section</button>
          </th>
        </tr>
      `;

      const tfoot = table.appendChild(document.createElement('tfoot'));
      tfoot.innerHTML = `
        <tr>
          <th colspan="${section.cols + 2}">
            <button type="button" class="btn btn-default btn-add-row" data-section-index="${sectionIndex}">Add Row</a>
          </th>
        </tr>
      `;

      if (section.rows.length > 0) {
        const tbody = table.appendChild(document.createElement('tbody'));
        section.rows.forEach((row, rowIndex) => {
          const rowTr = tbody.appendChild(document.createElement('tr'));
          rowTr.setAttribute('data-section-index', sectionIndex);
          rowTr.setAttribute('data-row-index', rowIndex);

          const rowNumberTd = rowTr.appendChild(document.createElement('td'));
          rowNumberTd.classList.add('drag-target');
          rowNumberTd.setAttribute('data-section-index', sectionIndex);
          rowNumberTd.setAttribute('data-row-index', rowIndex);
          rowNumberTd.setAttribute('draggable', 'true');
          rowNumberTd.innerHTML = rowIndex + 1;

          for (let fieldIndex = 0; fieldIndex < section.cols; fieldIndex++) {
            const fieldTd = rowTr.appendChild(document.createElement('td'));
            if (row.fields[fieldIndex]) {
              const field = row.fields[fieldIndex];
              fieldTd.innerHTML = `<button type="button" class="btn btn-default btn-block btn-open-field btn-details" data-section-index="${sectionIndex}" data-row-index="${rowIndex}" data-field-index="${fieldIndex}" draggable="true">${
                field.title ? '<strong>' + field.title + '</strong>' : 'Untitled'
              }${field.name ? ' (' + field.name + ')' : ''}${field.required ? ' - required' : ''}<br>${
                field.type
              }</button>`;
            } else {
              fieldTd.innerHTML = `<button type="button" class="btn btn-default btn-block btn-open-field drag-target" data-section-index="${sectionIndex}" data-row-index="${rowIndex}" data-field-index="${fieldIndex}"><span class="glyphicon glyphicon-plus-sign" aria-label="Add Field"></span></button>`;
            }
          }

          const rowRemoveTd = rowTr.appendChild(document.createElement('td'));
          rowRemoveTd.innerHTML = `<button type="button" class="btn btn-danger btn-block btn-remove-row" data-section-index="${sectionIndex}" data-row-index="${rowIndex}">Remove</button>`;
        });
      }
    });

    const addSectionButton = fragment.appendChild(document.createElement('button'));
    addSectionButton.classList.add('btn', 'btn-default', 'btn-add-section');
    addSectionButton.innerHTML = 'Add Section';

    this.el.appendChild(fragment);

    const dragItems = document.querySelectorAll('[draggable=true]');
    for (var index = 0; index < dragItems.length; index++) {
      dragItems[index].addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('data', 'data');
      });
    }

    return BaseView.prototype.render.call(this);
  }
});

const AppFormView = FormView.extend({
  formDefinition() {
    return {
      sections: [
        {
          title: 'Details',

          rows: [
            {
              fields: [
                {
                  title: 'Name',
                  type: 'text',
                  required: true,
                  bindTo: 'name'
                },
                {
                  title: 'Entity',
                  type: 'text',
                  required: true,
                  bindTo: 'entity',

                  validators: {
                    regexp: {
                      regexp: /^[a-zA-Z0-9]*$/g,
                      message: 'Must only contain alphabet or numbers'
                    }
                  }
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Description',
                  type: 'textarea',
                  required: false,
                  bindTo: 'description'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Form Title',
                  type: 'text',
                  required: false,
                  bindTo: 'formtitle'
                },
                {
                  title: 'Table Title',
                  type: 'text',
                  required: false,
                  bindTo: 'tabletitle'
                }
              ]
            }
          ]
        },
        {
          title: 'Sections',
          id: 'sections',

          rows: [
            {
              fields: [
                {
                  type: 'html',
                  html: '',

                  postRender({ model, view, field }) {
                    view.subViews.sectionsView = new SectionsView({ model });

                    view.subViews.sectionsView.on('openSection', sectionIndex => {
                      view.trigger('openSection', sectionIndex);
                    });
                    view.subViews.sectionsView.on('openField', (sectionIndex, rowIndex, fieldIndex) => {
                      view.trigger('openField', sectionIndex, rowIndex, fieldIndex);
                    });

                    const el = document.getElementById(`${field.id}Element`);
                    return view.subViews.sectionsView.appendTo(el).render();
                  }
                }
              ]
            }
          ]
        },
        {
          title: 'Validations',

          rows: [
            {
              fields: [
                {
                  type: 'html',
                  html: ''

                  // postRender({ model, view, field }) {
                  //   view.removeRuleDatatableView();
                  //   const el = document.getElementById(`${field.id}Element`);
                  //   while (el.firstChild) {
                  //     el.removeChild(el.firstChild);
                  //   }

                  //   const collection = new RuleCollection(model.get('rules'));
                  //   collection.each((model, index) => {
                  //     model.set('order', index + 1);
                  //   });

                  //   view.fieldDatatableView = new RulesDatatableView({ collection });
                  //   const renderPromise = view.fieldDatatableView
                  //     .appendTo(el)
                  //     .render()
                  //     .then(() => {
                  //       let button = view.fieldDatatableView.el.querySelector('th button:not([type="button"])');
                  //       while (button) {
                  //         button.setAttribute('type', 'button');
                  //         button = view.fieldDatatableView.el.querySelector('th button:not([type="button"])');
                  //       }
                  //     });

                  //   const buttonRow = el.appendChild(document.createElement('div'));
                  //   buttonRow.innerHTML = `<button type="button" class="btn btn-default btn-add-rule">Add Rule</button>`;

                  //   return renderPromise;
                  // }
                }
              ]
            }
          ]
        },
        {
          title: 'Rules',

          rows: [
            {
              fields: [
                {
                  type: 'html',
                  html: ''

                  // postRender({ model, view, field }) {
                  //   view.removeRuleDatatableView();
                  //   const el = document.getElementById(`${field.id}Element`);
                  //   while (el.firstChild) {
                  //     el.removeChild(el.firstChild);
                  //   }

                  //   const collection = new RuleCollection(model.get('rules'));
                  //   collection.each((model, index) => {
                  //     model.set('order', index + 1);
                  //   });

                  //   view.fieldDatatableView = new RulesDatatableView({ collection });
                  //   const renderPromise = view.fieldDatatableView
                  //     .appendTo(el)
                  //     .render()
                  //     .then(() => {
                  //       let button = view.fieldDatatableView.el.querySelector('th button:not([type="button"])');
                  //       while (button) {
                  //         button.setAttribute('type', 'button');
                  //         button = view.fieldDatatableView.el.querySelector('th button:not([type="button"])');
                  //       }
                  //     });

                  //   const buttonRow = el.appendChild(document.createElement('div'));
                  //   buttonRow.innerHTML = `<button type="button" class="btn btn-default btn-add-rule">Add Rule</button>`;

                  //   return renderPromise;
                  // }
                }
              ]
            }
          ]
        }
      ]
    };
  },

  render() {
    this.removeSubViews();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    this.subViews = {};

    return FormView.prototype.render.call(this);
  }
});

const AppFormPageButtonsView = BaseView.extend({
  render() {
    if (this.model.isNew()) {
      this.el.innerHTML = `
        <div class="row">
          <div class="col-sm-12">
            <button type="button" class="btn btn-primary btn-lg btn-save">Create</button>
            <button type="button" class="btn btn-primary btn-lg btn-cancel">Cancel</button>
          </div>
        </div>
      `;
    } else {
      this.el.innerHTML = `
        <div class="row">
          <div class="col-sm-6">
            <button type="button" class="btn btn-primary btn-lg btn-save">Save</button>
            <button type="button" class="btn btn-primary btn-lg btn-cancel">Close</button>
          </div>

          <div class="col-sm-6 text-right">
            <button type="button" class="btn btn-danger btn-lg btn-delete">Delete</button>
          </div>
        </div>
      `;
    }

    return BaseView.prototype.render.call(this);
  }
});

/* exported AppFormPageView */
const AppFormPageView = BaseView.extend({
  className: 'appFormPageView',

  events: {
    ['click .btn-save'](event) {
      event.preventDefault();
      this.subViews.formView.form.querySelector('.fv-hidden-submit').click();
    },

    ['click .btn-cancel'](event) {
      event.preventDefault();
      Backbone.history.navigate('apps', { trigger: true });
    },

    ['click .btn-delete'](event) {
      event.preventDefault();

      if (prompt('Type "DELETE" to delete this app') === 'DELETE') {
        this.model.destroy().then(() => {
          Backbone.history.navigate('apps', { trigger: true });
        });
      }
    }
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

    this.subViews.formView = new AppFormView({ model: this.model });

    this.subViews.formView.on('openSection', sectionIndex => {
      this.trigger('openSection', sectionIndex);
    });
    this.subViews.formView.on('openField', (sectionIndex, rowIndex, fieldIndex) => {
      this.trigger('openField', sectionIndex, rowIndex, fieldIndex);
    });

    const renderPromises = this.subViews.formView
      .appendTo(formCol)
      .render()
      .then(() => {
        this.subViews.buttonsView = new AppFormPageButtonsView({ model: this.model });
        this.subViews.buttonsView.listenTo(this.model, `change:${this.model.idAttribute}`, () => {
          this.subViews.buttonsView.render();
        });
        return this.subViews.buttonsView.appendTo(this.subViews.formView.form).render();
      });

    this.el.appendChild(fragment);

    return renderPromises.then(() => BaseView.prototype.render.call(this));
  }
});
