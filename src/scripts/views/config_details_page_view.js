/* global Backbone BaseView FormView */

/* exported ConfigDetailsPageView */
const ConfigDetailsPageView = BaseView.extend(
  {
    className: 'configDetailsPageView',

    events: {
      ['click .btn-save'](event) {
        event.preventDefault();
        this.subViews.formView.form.querySelector('.fv-hidden-submit').click();
      },

      ['click .btn-cancel'](event) {
        event.preventDefault();
        Backbone.history.navigate('configs', { trigger: true });
      },

      ['click .btn-delete'](event) {
        event.preventDefault();

        if (prompt('Type "DELETE" to delete this app') === 'DELETE') {
          this.model.destroy().then(() => {
            Backbone.history.navigate('configs', { trigger: true });
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

      const renderPromises = [];

      const fragment = document.createDocumentFragment();

      const model = this.model;

      const publishRow = fragment.appendChild(document.createElement('div'));
      publishRow.classList.add('row');
      const publishCol = publishRow.appendChild(document.createElement('div'));
      publishCol.classList.add('col-xs-12');

      this.subViews.publishView = new ConfigDetailsPageView.PublishingView({ model });
      renderPromises.push(this.subViews.publishView.appendTo(publishCol).render());

      const formRow = fragment.appendChild(document.createElement('div'));
      formRow.classList.add('row');
      const formCol = formRow.appendChild(document.createElement('div'));
      formCol.classList.add('col-xs-12');

      this.subViews.formView = new ConfigDetailsPageView.FormView({ model });
      renderPromises.push(this.subViews.formView.appendTo(formCol).render().then(() => {
        // todo
      }));

      this.el.appendChild(fragment);

      return Promise.all(renderPromises).then(() => BaseView.prototype.render.call(this));
    }
  },
  {
    // Subview: Publish View
    PublishingView: BaseView.extend({
      initialize(options) {
        this.listenTo(options.model, `change:${options.model.idAttribute}`, () => {
          this.render();
        });

        BaseView.prototype.initialize.call(this, options);
      },

      render() {
        while (this.el.firstChild) {
          this.el.removeChild(this.el.firstChild);
        }

        if (!this.model.isNew()) {
          this.el.innerHTML = `
            <p class="text-right">
              <button type="button" class="btn btn-default btn-publish">Publish</button>
              <button type="button" class="btn btn-default btn-unpublish">UnPublish</button>
              <a href="#form/${this.model.get('name')}/new" class="btn btn-default btn-open-form">Open Form</a>
              <a href="#table/${this.model.get('name')}" class="btn btn-default btn-open-table">Open Table</a>
            </p>
          `;
        }

        return BaseView.prototype.render.call(this);
      }
    }),

    // Subview: Form View
    FormView: FormView.extend({
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
                          regexp: '^[a-zA-Z0-9_]*$',
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
                      html: ''

                      // postRender({ model, view, field }) {
                      //   view.subViews.sectionsView = new SectionsView({ model });

                      //   view.subViews.sectionsView.on('openSection', sectionIndex => {
                      //     view.trigger('openSection', sectionIndex);
                      //   });
                      //   view.subViews.sectionsView.on('openField', (sectionIndex, rowIndex, fieldIndex) => {
                      //     view.trigger('openField', sectionIndex, rowIndex, fieldIndex);
                      //   });

                      //   const el = document.getElementById(`${field.id}Element`);
                      //   return view.subViews.sectionsView.appendTo(el).render();
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
    })
  }
);
