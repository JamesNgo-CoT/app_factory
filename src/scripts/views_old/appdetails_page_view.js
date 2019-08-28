/* global doAjax toQueryString Backbone BaseView FormView DatatableView  AppModel FieldCollection ValidationCollection RuleCollection  */

////////////////////////////////////////////////////////////////////////////////
// RULES DATATABLE VIEW
////////////////////////////////////////////////////////////////////////////////



const RulesDatatableView = DatatableView.extend({
  datatableDefinition() {
    return {
      columns: [
        {
          title: 'Order',
          data: 'order',
          width: 50
        },
        {
          title: 'Spacer',
          render() {
            return '';
          }
        },
        {
          className: 'buttonsCol excludeFromButtons',
          data: 'order',
          // orderable: false,
          render(data) {
            return `<button type="button" data-index="${data}" class="btn btn-default btn-edit-rule">Edit</button>`;
          },
          searchable: false,
          width: 50
        }
      ],
      dom: `<'row'<'col-sm-12'<'table-responsive'tr>>>`,
      pageLength: -1
      // stateSave: true
    };
  }
});

////////////////////////////////////////////////////////////////////////////////
// VALIDATIONS DATATABLE VIEW
////////////////////////////////////////////////////////////////////////////////

const ValidationsDatatableView = DatatableView.extend({
  datatableDefinition() {
    return {
      columns: [
        {
          title: 'Order',
          data: 'order',
          width: 50
        },
        {
          title: 'Spacer',
          render() {
            return '';
          }
        },
        {
          className: 'buttonsCol excludeFromButtons',
          data: 'order',
          // orderable: false,
          render(data) {
            return `<button type="button" data-index="${data}" class="btn btn-default btn-edit-validation">Edit</button>`;
          },
          searchable: false,
          width: 50
        }
      ],
      dom: `<'row'<'col-sm-12'<'table-responsive'tr>>>`,
      pageLength: -1
      // stateSave: true
    };
  }
});

////////////////////////////////////////////////////////////////////////////////
// FIELDS DATATABLE VIEW
////////////////////////////////////////////////////////////////////////////////

const FieldsDatatableView = DatatableView.extend({
  datatableDefinition() {
    return {
      createdRow: function(row, data) {
        row.classList.add(`type-${data.type}`);
      },
      columns: [
        {
          title: 'Order',
          data: 'order',
          width: 50
        },
        {
          title: 'Type',
          data: 'type',
          choices: [{ text: 'Section' }, { text: 'Row' }, { text: 'Text' }, { text: 'Textarea' }]
        },
        {
          title: 'ID',
          data: 'id'
        },
        {
          className: 'buttonsCol excludeFromButtons',
          data: 'order',
          // orderable: false,
          render(data) {
            return `<button type="button" data-order="${data}" class="btn btn-default btn-edit-field">Edit</button>`;
          },
          searchable: false,
          width: 50
        }
      ],
      dom: `<'row'<'col-sm-12'<'table-responsive'tr>>>`,
      pageLength: -1
      // stateSave: true
    };
  }
});

////////////////////////////////////////////////////////////////////////////////
// APP DETAILS FORM VIEW
////////////////////////////////////////////////////////////////////////////////

const AppDetailsFormView = FormView.extend({
  formDefinition() {
    return {
      sections: [
        {
          title: 'App',

          rows: [
            {
              fields: [
                {
                  title: 'Name',
                  required: true,
                  bindTo: 'app'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Description',
                  type: 'textarea',
                  bindTo: 'description'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Form Title',
                  bindTo: 'formtitle'
                },
                {
                  title: 'Datatable Title',
                  bindTo: 'datatabletitle'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Status',
                  required: true,
                  type: 'radio',
                  orientation: 'horizontal',
                  choices: [{ text: 'Active' }, { text: 'Inactive' }],
                  bindTo: 'status'
                }
              ]
            }
          ]
        },
        {
          title: 'Fields',

          rows: [
            {
              fields: [
                {
                  type: 'html',
                  html: '',

                  postRender({ model, view, field }) {
                    view.removeFieldDatatableView();
                    const el = document.getElementById(`${field.id}Element`);
                    while (el.firstChild) {
                      el.removeChild(el.firstChild);
                    }

                    const collection = new FieldCollection(model.get('fields'));
                    collection.each((model, index) => {
                      model.set('order', index + 1);
                    });

                    view.fieldDatatableView = new FieldsDatatableView({ collection });
                    const renderPromise = view.fieldDatatableView
                      .appendTo(el)
                      .render()
                      .then(() => {
                        let button = view.fieldDatatableView.el.querySelector('th button:not([type="button"])');
                        while (button) {
                          button.setAttribute('type', 'button');
                          button = view.fieldDatatableView.el.querySelector('th button:not([type="button"])');
                        }
                      });

                    const buttonRow = el.appendChild(document.createElement('div'));
                    buttonRow.innerHTML = `<button type="button" class="btn btn-default btn-add-field">Add Field</button>`;

                    return renderPromise;
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
                  html: '',

                  postRender({ model, view, field }) {
                    view.removeValidationDatatableView();
                    const el = document.getElementById(`${field.id}Element`);
                    while (el.firstChild) {
                      el.removeChild(el.firstChild);
                    }

                    const collection = new ValidationCollection(model.get('validations  '));
                    collection.each((model, index) => {
                      model.set('order', index + 1);
                    });

                    view.fieldDatatableView = new ValidationsDatatableView({ collection });
                    const renderPromise = view.fieldDatatableView
                      .appendTo(el)
                      .render()
                      .then(() => {
                        let button = view.fieldDatatableView.el.querySelector('th button:not([type="button"])');
                        while (button) {
                          button.setAttribute('type', 'button');
                          button = view.fieldDatatableView.el.querySelector('th button:not([type="button"])');
                        }
                      });

                    const buttonRow = el.appendChild(document.createElement('div'));
                    buttonRow.innerHTML = `<button type="button" class="btn btn-default btn-add-validation">Add Validation</button>`;

                    return renderPromise;
                  }
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
                  html: '',

                  postRender({ model, view, field }) {
                    view.removeRuleDatatableView();
                    const el = document.getElementById(`${field.id}Element`);
                    while (el.firstChild) {
                      el.removeChild(el.firstChild);
                    }

                    const collection = new RuleCollection(model.get('rules'));
                    collection.each((model, index) => {
                      model.set('order', index + 1);
                    });

                    view.fieldDatatableView = new RulesDatatableView({ collection });
                    const renderPromise = view.fieldDatatableView
                      .appendTo(el)
                      .render()
                      .then(() => {
                        let button = view.fieldDatatableView.el.querySelector('th button:not([type="button"])');
                        while (button) {
                          button.setAttribute('type', 'button');
                          button = view.fieldDatatableView.el.querySelector('th button:not([type="button"])');
                        }
                      });

                    const buttonRow = el.appendChild(document.createElement('div'));
                    buttonRow.innerHTML = `<button type="button" class="btn btn-default btn-add-rule">Add Rule</button>`;

                    return renderPromise;
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  },

  removeFieldDatatableView() {
    if (this.fieldDatatableView) {
      this.fieldDatatableView.remove();
      this.fieldDatatableView = null;
    }
  },

  removeValidationDatatableView() {
    if (this.validationDatatableView) {
      this.validationDatatableView.remove();
      this.validationDatatableView = null;
    }
  },

  removeRuleDatatableView() {
    if (this.ruleDatatableView) {
      this.ruleDatatableView.remove();
      this.ruleDatatableView = null;
    }
  },

  remove() {
    this.removeFieldDatatableView();
    this.removeValidationDatatableView();
    this.removeRuleDatatableView();
    FormView.prototype.remove.call(this);
  }
});

////////////////////////////////////////////////////////////////////////////////
// APP DETAILS PUBLISHING VIEW
////////////////////////////////////////////////////////////////////////////////

const AppDetailsPublishingView = BaseView.extend({
  render() {
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    if (!this.model.isNew()) {
      this.el.innerHTML = `
        <h2>Draft</h2>

        <div class="row">
          <div class="col-sm-6">
            <p><button type="button" class="btn btn-default btn-block btn-draft-publish">Publish</button></p>
          </div>
          <div class="col-sm-6">
            <p><button type="button" class="btn btn-default btn-block btn-draft-unpublish">UnPublish</button></p>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-6">
            <p><button type="button" class="btn btn-default btn-block btn-draft-view-form">View Form</button></p>
          </div>
          <div class="col-sm-6">
            <p><button type="button" class="btn btn-default btn-block btn-draft-view-table">View Table</button></p>
          </div>
        </div>

        <h2>Final</h2>

        <div class="row">
          <div class="col-sm-6">
            <p><button type="button" class="btn btn-default btn-block btn-final-publish">Publish</button></p>
          </div>
          <div class="col-sm-6">
            <p><button type="button" class="btn btn-default btn-block btn-final-unpublish">UnPublish</button></p>
          </div>
        </div>

        <div class="row">
        <div class="col-sm-6">
            <p><button type="button" class="btn btn-default btn-block btn-final-view-form">View Form</button></p>
          </div>
          <div class="col-sm-6">
            <p><button type="button" class="btn btn-default btn-block btn-final-view-table">View Table</button></p>
          </div>
        </div>
      `;
    }

    return BaseView.prototype.render.call(this);
  }
});

////////////////////////////////////////////////////////////////////////////////
// APP DETAILS BUTTONS VIEW
////////////////////////////////////////////////////////////////////////////////

const AppDetailsButtonsView = BaseView.extend({
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

////////////////////////////////////////////////////////////////////////////////
// APP DETAILS PAGE VIEW
////////////////////////////////////////////////////////////////////////////////

/* exported AppDetailsPageView */
const AppDetailsPageView = BaseView.extend({
  className: 'appDetailsPageView',

  initialize(options = {}) {
    this.listenTo(options.model, `change:${options.model.idAttribute}`, () => {
      this.buttonsView.render();
      this.publishingView.render();
    });

    BaseView.prototype.initialize.call(this, options);
  },

  events() {
    return {
      ['click .btn-save'](event) {
        event.preventDefault();
        this.formView.form.querySelector('.fv-hidden-submit').click();
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
      },

      ['click .btn-add-field'](event) {
        event.preventDefault();
        const id = this.model.isNew() ? 'new' : this.model.id;
        Backbone.history.navigate(`apps/${id}/fields/new?${toQueryString({ reset: true })}`, { trigger: true });
      },

      ['click .btn-edit-field'](event) {
        event.preventDefault();
        const id = this.model.isNew() ? 'new' : this.model.id;
        const order = event.target.getAttribute('data-order');
        Backbone.history.navigate(`apps/${id}/fields/${order}?${toQueryString({ reset: true })}`, { trigger: true });
      },

      ['click .btn-add-validation'](event) {
        event.preventDefault();
        const id = this.model.isNew() ? 'new' : this.model.id;
        Backbone.history.navigate(`apps/${id}/fields/new?${toQueryString({ reset: true })}`, { trigger: true });
      },

      ['click .btn-add-rule'](event) {
        event.preventDefault();
        const id = this.model.isNew() ? 'new' : this.model.id;
        Backbone.history.navigate(`apps/${id}/fields/new?${toQueryString({ reset: true })}`, { trigger: true });
      },

      ['click .btn-draft-publish'](event) {
        event.preventDefault();
        event.target.setAttribute('disabled', '');
        if (prompt('Type "PUBLISH" to publish this app') === 'PUBLISH') {
          if (
            !this.model.hasChanged() ||
            confirm('Unsaved changes, would you like to proceed. By procceding, unsaved changes will not be published.')
          ) {
            const model = new AppModel({ id: this.model.id });
            model.fetch().then(() => {
              const configs = model.toConfig();
              return Promise.resolve()
                .then(() => {
                  return doAjax({
                    url: `/* @echo C3DATA_MEDIA_URL */('${model.get('app')}.cotform.preview.json')`,
                    method: 'GET'
                  });
                })
                .then(
                  () => {
                    return doAjax({
                      url: `/* @echo C3DATA_MEDIA_URL */('${model.get('app')}.cotform.preview.json')/$value`,
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-DA-MEDIA-ENTITYID': `${model.get('app')}.cotform.preview.json`, // TODO NEED TO TRACK ID
                        'X-DA-MEDIA-ENTITYSET': true
                      },
                      data: JSON.stringify(configs.cotFormConfig)
                    });
                  },
                  () => {
                    doAjax({
                      url: '/* @echo C3DATA_MEDIA_URL */',
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-DA-MEDIA-ENTITYID': `${model.get('app')}.cotform.preview.json`, // TODO NEED TO TRACK ID
                        'X-DA-MEDIA-ENTITYSET': true
                      },
                      data: JSON.stringify(configs.cotFormConfig)
                    });
                  }
                )

                .then(() => {
                  return doAjax({
                    url: `/* @echo C3DATA_MEDIA_URL */('${model.get('app')}.datatable.preview.json')`,
                    method: 'GET'
                  });
                })
                .then(
                  () => {
                    return doAjax({
                      url: `/* @echo C3DATA_MEDIA_URL */('${model.get('app')}.datatable.preview.json')/$value`,
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-DA-MEDIA-ENTITYID': `${model.get('app')}.datatable.preview.json`, // TODO NEED TO TRACK ID
                        'X-DA-MEDIA-ENTITYSET': true
                      },
                      data: JSON.stringify(configs.datatableConfig)
                    });
                  },
                  () => {
                    doAjax({
                      url: '/* @echo C3DATA_MEDIA_URL */',
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-DA-MEDIA-ENTITYID': `${model.get('app')}.datatable.preview.json`, // TODO NEED TO TRACK ID
                        'X-DA-MEDIA-ENTITYSET': true
                      },
                      data: JSON.stringify(configs.datatableConfig)
                    });
                  }
                )

                .then(() => {
                  event.target.removeAttribute('disabled');
                  alert('Publish completed');
                });
            });
          } else {
            event.target.removeAttribute('disabled');
          }
        } else {
          event.target.removeAttribute('disabled');
        }
      },

      ['click .btn-draft-unpublish'](event) {
        event.preventDefault();
        event.target.setAttribute('disabled', '');
        if (prompt('Type "UNPUBLISH" to unpublish this app') === 'UNPUBLISH') {
          return Promise.resolve()
            .then(() => {
              return doAjax({
                url: `/* @echo C3DATA_MEDIA_URL */('${this.model.get('app')}.cotform.preview.json')`, // TODO NEED TO TRACK ID
                method: 'DELETE'
              });
            })
            .then(() => {
              return doAjax({
                url: `/* @echo C3DATA_MEDIA_URL */('${this.model.get('app')}.datatable.preview.json')`, // TODO NEED TO TRACK ID
                method: 'DELETE'
              });
            })
            .then(() => {
              event.target.removeAttribute('disabled');
              alert('Unpublish completed');
            });
        } else {
          event.target.removeAttribute('disabled');
        }
      },

      ['click .btn-draft-view-form'](event) {
        event.preventDefault();
        Backbone.history.navigate(
          `app/${this.model.get('app')}/new?${toQueryString({ config: `${this.model.get('app')}.preview.json` })}`,
          { trigger: true }
        );
      },

      ['click .btn-draft-view-table'](event) {
        event.preventDefault();
        Backbone.history.navigate(
          `app/${this.model.get('app')}?${toQueryString({ config: `${this.model.get('app')}.preview.json` })}`,
          {
            trigger: true
          }
        );
      },

      ['click .btn-final-publish'](event) {
        event.preventDefault();
        event.target.setAttribute('disabled', '');
        if (prompt('Type "PUBLISH" to publish this app') === 'PUBLISH') {
          if (
            !this.model.hasChanged() ||
            confirm('Unsaved changes, would you like to proceed. By procceding, unsaved changes will not be published.')
          ) {
            const model = new AppModel({ id: this.model.id });
            model.fetch().then(() => {
              const configs = model.toConfig();
              return Promise.resolve()
                .then(() => {
                  return doAjax({
                    url: `/* @echo C3DATA_MEDIA_URL */('${model.get('app')}.cotform.json')`,
                    method: 'GET'
                  });
                })
                .then(
                  () => {
                    return doAjax({
                      url: `/* @echo C3DATA_MEDIA_URL */('${model.get('app')}.cotform.json')/$value`,
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-DA-MEDIA-ENTITYID': `${model.get('app')}.cotform.json`, // TODO NEED TO TRACK ID
                        'X-DA-MEDIA-ENTITYSET': true
                      },
                      data: JSON.stringify(configs.cotFormConfig)
                    });
                  },
                  () => {
                    doAjax({
                      url: '/* @echo C3DATA_MEDIA_URL */',
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-DA-MEDIA-ENTITYID': `${model.get('app')}.cotform.json`, // TODO NEED TO TRACK ID
                        'X-DA-MEDIA-ENTITYSET': true
                      },
                      data: JSON.stringify(configs.cotFormConfig)
                    });
                  }
                )

                .then(() => {
                  return doAjax({
                    url: `/* @echo C3DATA_MEDIA_URL */('${model.get('app')}.datatable.json')`,
                    method: 'GET'
                  });
                })
                .then(
                  () => {
                    return doAjax({
                      url: `/* @echo C3DATA_MEDIA_URL */('${model.get('app')}.datatable.json')/$value`,
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-DA-MEDIA-ENTITYID': `${model.get('app')}.datatable.json`, // TODO NEED TO TRACK ID
                        'X-DA-MEDIA-ENTITYSET': true
                      },
                      data: JSON.stringify(configs.datatableConfig)
                    });
                  },
                  () => {
                    doAjax({
                      url: '/* @echo C3DATA_MEDIA_URL */',
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-DA-MEDIA-ENTITYID': `${model.get('app')}.datatable.json`, // TODO NEED TO TRACK ID
                        'X-DA-MEDIA-ENTITYSET': true
                      },
                      data: JSON.stringify(configs.datatableConfig)
                    });
                  }
                )

                .then(() => {
                  event.target.removeAttribute('disabled');
                  alert('Publish completed');
                });
            });
          } else {
            event.target.removeAttribute('disabled');
          }
        } else {
          event.target.removeAttribute('disabled');
        }
      },

      ['click .btn-final-unpublish'](event) {
        event.preventDefault();
        event.target.setAttribute('disabled', '');
        if (prompt('Type "UNPUBLISH" to unpublish this app') === 'UNPUBLISH') {
          return Promise.resolve()
            .then(() => {
              return doAjax({
                url: `/* @echo C3DATA_MEDIA_URL */('${this.model.get('app')}.cotform.json')`, // TODO NEED TO TRACK ID
                method: 'DELETE'
              });
            })
            .then(() => {
              return doAjax({
                url: `/* @echo C3DATA_MEDIA_URL */('${this.model.get('app')}.datatable.json')`, // TODO NEED TO TRACK ID
                method: 'DELETE'
              });
            })
            .then(() => {
              event.target.removeAttribute('disabled');
              alert('Unpublish completed');
            });
        } else {
          event.target.removeAttribute('disabled');
        }
      },

      ['click .btn-final-view-form'](event) {
        event.preventDefault();
        Backbone.history.navigate(`app/${this.model.get('app')}/new`, { trigger: true });
      },

      ['click .btn-final-view-table'](event) {
        event.preventDefault();
        Backbone.history.navigate(`app/${this.model.get('app')}`, { trigger: true });
      }
    };
  },

  removeFormView() {
    if (this.formView) {
      this.formView.remove();
      this.formView = null;
    }
  },

  removeButtonsView() {
    if (this.buttonsView) {
      this.buttonsView.remove();
      this.buttonsView = null;
    }
  },

  removePublishingView() {
    if (this.publishingView) {
      this.publishingView.remove();
      this.publishingView = null;
    }
  },

  remove() {
    this.removeFormView();
    this.removeButtonsView();
    this.removePublishingView();
    BaseView.prototype.remove.call(this);
  },

  render() {
    this.removeFormView();
    this.removeButtonsView();
    this.removePublishingView();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    const fragment = document.createDocumentFragment();
    const renderPromises = [];
    let row, col1, col2;

    row = fragment.appendChild(document.createElement('div'));
    row.classList.add('row');

    col1 = row.appendChild(document.createElement('div'));
    col1.classList.add('col-sm-9');

    this.formView = new AppDetailsFormView({ model: this.model });
    renderPromises.push(
      this.formView
        .appendTo(col1)
        .render()
        .then(() => {
          this.buttonsView = new AppDetailsButtonsView({ model: this.model });
          this.buttonsView.appendTo(this.formView.form);
          return this.buttonsView.render();
        })
    );

    col2 = row.appendChild(document.createElement('div'));
    col2.classList.add('col-sm-3', 'sideBar');

    this.publishingView = new AppDetailsPublishingView({ model: this.model });
    renderPromises.push(this.publishingView.appendTo(col2).render());

    this.el.appendChild(fragment);

    return Promise.all(renderPromises).then(() => BaseView.prototype.render.call(this));
  }
});
