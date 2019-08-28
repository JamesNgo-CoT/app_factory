/* global Backbone BaseView FormView */

////////////////////////////////////////////////////////////////////////////////
// APP DETAILS FORM VIEW
////////////////////////////////////////////////////////////////////////////////

const FieldDetailsFormView = FormView.extend({
  formDefinition() {
    return {
      sections: [
        {
          title: 'Common Options',
          id: 'commonOptions',

          rows: [
            {
              fields: [
                {
                  title: 'Order',
                  bindTo: 'newOrder',
                  type: 'dropdown',
                  choices: [{ text: 'New', value: '' }],
                  preRender({ field }) {
                    /* global app */
                    const model = app.models.appDetailsModel;
                    const choices = model
                      .get('fields')
                      .map((field, index) => ({ text: `${index + 1} - ${field.type}${field.id ? ' - ' + field.id : ''}`, value: String(index + 1) }));
                    if (choices.length > 0) {
                      field.choices.push(...choices);
                    }
                  }
                  //   }
                  // ]
                },
                {
                  // fields: [
                  //   {
                  title: 'ID',
                  bindTo: 'id',
                  type: 'text',
                  validators: {
                    regexp: {
                      regexp: /^[A-Za-z]+[\w\-:.]*$/,
                      message: 'Invalid ID'
                    }
                  }
                  //   }
                  // ]
                },
                {
                  // fields: [
                  //   {
                  title: 'Type',
                  bindTo: 'type',
                  required: true,
                  type: 'dropdown',
                  choices: [{ text: 'Section' }, { text: 'Row' }, { text: 'Text' }, { text: 'Textarea' }]
                }
              ]
            }
          ]
        },
        {
          title: 'Section Type Options',
          id: 'sectionOptions',

          rows: [
            {
              fields: [
                {
                  title: 'Title',
                  bindTo: 'section_title',
                  type: 'text'
                }
              ]
            }
          ]
        },
        {
          title: 'Row Type Options',
          id: 'rowOptions',

          rows: [
            {
              fields: [
                {
                  type: 'html',
                  html: 'Row...'
                }
              ]
            }
          ]
        },
        {
          title: 'Text Type Options',
          id: 'textOptions',

          rows: [
            {
              fields: [
                {
                  title: 'Title',
                  bindTo: 'text_title',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Required',
                  bindTo: 'text_required',
                  type: 'radio',
                  choices: [{ text: 'Yes' }, { text: 'No' }]
                  //   }
                  // ]
                },
                {
                  // fields: [
                  //   {
                  title: 'Disabled',
                  bindTo: 'text_disbled',
                  type: 'radio',
                  choices: [{ text: 'Yes' }, { text: 'No' }]
                  //   }
                  // ]
                },
                {
                  // fields: [
                  //   {
                  title: 'Read Only',
                  bindTo: 'text_readonly',
                  type: 'radio',
                  choices: [{ text: 'Yes' }, { text: 'No' }]
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Info Help',
                  bindTo: 'text_infohelp',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Pre Help Text',
                  bindTo: 'text_prehelptext',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Post Help Text',
                  bindTo: 'text_posthelptext',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Placeholder',
                  bindTo: 'text_placeholder',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Value',
                  bindTo: 'text_value',
                  type: 'text'
                }
              ]
            }
          ]
        },
        {
          title: 'Textarea Type Options',
          id: 'textareaOptions',

          rows: [
            {
              fields: [
                {
                  title: 'Title',
                  bindTo: 'textarea_title',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Required',
                  bindTo: 'textarea_required',
                  type: 'radio',
                  choices: [{ text: 'Yes' }, { text: 'No' }]
                  //   }
                  // ]
                },
                {
                  // fields: [
                  //   {
                  title: 'Disabled',
                  bindTo: 'textarea_disbled',
                  type: 'radio',
                  choices: [{ text: 'Yes' }, { text: 'No' }]
                  //   }
                  // ]
                },
                {
                  // fields: [
                  //   {
                  title: 'Read Only',
                  bindTo: 'text_readonly',
                  type: 'radio',
                  choices: [{ text: 'Yes' }, { text: 'No' }]
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Info Help',
                  bindTo: 'text_infohelp',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Pre Help Text',
                  bindTo: 'textarea_prehelptext',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Post Help Text',
                  bindTo: 'textarea_posthelptext',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Placeholder',
                  bindTo: 'textarea_placeholder',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Value',
                  bindTo: 'textarea_value',
                  type: 'text'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Columns',
                  bindTo: 'textarea_cols',
                  type: 'text'
                  //   }
                  // ]
                },
                {
                  // fields: [
                  //   {
                  title: 'Rows',
                  bindTo: 'textarea_rows',
                  type: 'text'
                  //   }
                  // ]
                },
                {
                  // fields: [
                  //   {
                  type: 'html',
                  html: ''
                }
              ]
            }
          ]
        },
        {
          title: 'Datatable Options',
          id: 'datatableOptions',

          rows: [
            {
              fields: [
                {
                  title: 'Datatable Column',
                  bindTo: 'datatableColumn',
                  required: true,
                  type: 'radio',
                  choices: [{ text: 'Yes' }, { text: 'No' }]
                }
              ]
            }
          ]
        },
      ],

      postRender({ model }) {
        const sectionOptions = document.getElementById('sectionOptions');
        const rowOptions = document.getElementById('rowOptions');
        const textOptions = document.getElementById('textOptions');
        const textareaOptions = document.getElementById('textareaOptions');
        const datatableOptions = document.getElementById('datatableOptions');

        function hideAll() {
          sectionOptions.classList.add('hide');
          rowOptions.classList.add('hide');
          textOptions.classList.add('hide');
          textareaOptions.classList.add('hide');
          datatableOptions.classList.add('hide');
        }

        const handler = () => {
          hideAll();
          switch (model.get('type')) {
            case 'Section':
              sectionOptions.classList.remove('hide');
              break;
            case 'Row':
              rowOptions.classList.remove('hide');
              break;
            case 'Text':
              textOptions.classList.remove('hide');
              datatableOptions.classList.remove('hide');
              break;
            case 'Textarea':
              textareaOptions.classList.remove('hide');
              datatableOptions.classList.remove('hide');
              break;
          }
        };

        model.on('change:type', handler);
        handler();
      }
    };
  },

  success() {
    this.prepareForSubmission();

    const json = this.model.toJSON();
    const order = json['order'];
    let newOrder = json['newOrder'];

    delete json['order'];
    delete json['newOrder'];

    if (json.type !== 'Section') {
      delete json['section_title'];
    }

    if (json.type !== 'Row') {
      // Do nothing.
    }

    if (json.type !== 'Text') {
      delete json['text_title'];
      delete json['text_required'];
      delete json['text_disbled'];
      delete json['text_readonly'];
      delete json['text_infohelp'];
      delete json['text_prehelptext'];
      delete json['text_posthelptext'];
      delete json['text_placeholder'];
      delete json['text_value'];
    }

    if (json.type !== 'Textarea') {
      delete json['textarea_title'];
      delete json['textarea_required'];
      delete json['textarea_disbled'];
      delete json['textarea_readonly'];
      delete json['textarea_infohelp'];
      delete json['textarea_prehelptext'];
      delete json['textarea_posthelptext'];
      delete json['textarea_placeholder'];
      delete json['textarea_value'];
      delete json['textarea_cols'];
      delete json['textarea_rows'];
    }

    delete json['dropdown_title'];
    delete json['dropdown_required'];
    delete json['dropdown_disbled'];
    delete json['dropdown_readonly'];
    delete json['dropdown_infohelp'];
    delete json['dropdown_prehelptext'];
    delete json['dropdown_posthelptext'];
    delete json['dropdown_placeholder'];
    delete json['dropdown_value'];
    delete json['dropdown_choices'];

    delete json['radio_title'];
    delete json['radio_required'];
    delete json['radio_disbled'];
    delete json['radio_readonly'];
    delete json['radio_infohelp'];
    delete json['radio_prehelptext'];
    delete json['radio_posthelptext'];
    delete json['radio_value'];
    delete json['radio_choices'];
    delete json['radio_orientation'];

    delete json['checkbox_title'];
    delete json['checkbox_required'];
    delete json['checkbox_disbled'];
    delete json['checkbox_readonly'];
    delete json['checkbox_infohelp'];
    delete json['checkbox_prehelptext'];
    delete json['checkbox_posthelptext'];
    delete json['checkbox_value'];
    delete json['checkbox_choices'];
    delete json['checkbox_orientation'];

    delete json['html_html'];

    const model = app.models.appDetailsModel;
    const fields = model.get('fields');

    if (!newOrder) {
      fields.push(json);
      newOrder = fields.length;
    } else {
      fields.splice(newOrder - 1, 0, json);
    }

    if (order) {
      if (+order >= +newOrder) {
        fields.splice(order, 1);
      } else {
        fields.splice(order - 1, 1);
      }
    }

    this.model.set('newOrder', String(newOrder));
    this.model.set('order', String(newOrder));
    this.model.setSnapShot();

    this.restoreFromSubmission();

    this.trigger('success');
  }
});

////////////////////////////////////////////////////////////////////////////////
// APP DETAILS BUTTONS VIEW
////////////////////////////////////////////////////////////////////////////////

const FieldDetailsButtonsView = BaseView.extend({
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

/* exported FieldDetailsPageView */
const FieldDetailsPageView = BaseView.extend({
  className: 'fieldDetailsPageView',

  initialize(options) {
    options.model.set('newOrder', options.model.id);
    options.model.setSnapShot();

    this.listenTo(options.model, `change:${options.model.idAttribute}`, () => {
      this.buttonsView.render();
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

        const model = app.models.appDetailsModel;
        const id = model.isNew() ? 'new' : model.id;
        Backbone.history.navigate(`apps/${id}`, { trigger: true });
      },

      ['click .btn-delete'](event) {
        event.preventDefault();

        if (prompt('Type DELETE to delete this field') === 'DELETE') {
          const model = app.models.appDetailsModel;
          const fields = model.get('fields').slice(this.model.id, 1);
          model.set('fields', fields);

          const id = model.isNew() ? 'new' : model.id;
          Backbone.history.navigate(`apps/${id}`, { trigger: true });
        }
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

  remove() {
    this.removeFormView();
    this.removeButtonsView();
    BaseView.prototype.remove.call(this);
  },

  render() {
    this.removeFormView();
    this.removeButtonsView();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    const fragment = document.createDocumentFragment();
    let row, col;

    row = fragment.appendChild(document.createElement('div'));
    row.classList.add('row');

    col = row.appendChild(document.createElement('div'));
    col.classList.add('col-sm-9');

    this.formView = new FieldDetailsFormView({ model: this.model });
    this.formView.on('success', () => {
      this.formView.render().then(() => {
        this.buttonsView.appendTo(this.formView.form);
        this.formView.showAlert(
          '<strong>Submission successful.</strong> You have successfully submitted the form.',
          null,
          'alert-success'
        );
      });
    });

    const renderPromise = this.formView
      .appendTo(col)
      .render()
      .then(() => {
        this.buttonsView = new FieldDetailsButtonsView({ model: this.model });
        this.buttonsView.appendTo(this.formView.form);
        return this.buttonsView.render();
      });

    this.el.appendChild(fragment);

    return renderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
