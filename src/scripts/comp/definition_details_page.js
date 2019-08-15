/* global BaseModel BaseCollection BaseView FormView DatatableView */

const DefinitionDetailsDatatableModel = BaseModel.extend({
  idAttribute: 'notId'
})

const DefinitionDetailsDatatableCollection = BaseCollection.extend({
  model: DefinitionDetailsDatatableModel
});

const DefinitionDetailsDatatableView = DatatableView.extend({
  className: 'definitionsDatatableView',

  datatableDefinition: {
    createdRow: function (row, data, index) {
    },
    columns: [
      {
        title: '#',
        data: 'order'
      },
      {
        title: 'ID',
        data: 'id'
      },
      {
        title: 'Title',
        data: 'title'
      },
      {
        title: 'Type',
        data: 'type'
      },
      {
        className: 'buttonsCol excludeFromButtons',
        data: 'id',
        // orderable: false,
        render() {
          return `
            <a href="#" class="btn btn-default">Edit</a>
          `;
        },
        searchable: false,
        width: 50
      }
    ]
  }
});

const DefinitionDetailsFormView = FormView.extend({
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
                  required: true,
                  type: 'textarea',
                  bindTo: 'description'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Form Title',
                  bindTo: 'formTitle'
                // }
              // ]
            },
            {
              // fields: [
                // {
                  title: 'Datatable Title',
                  bindTo: 'datatableTitle'
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

                    const collection = new DefinitionDetailsDatatableCollection(model.get('fields'));
                    collection.each((model, index) => { model.set('order', index + 1); });

                    this.datatableView = new DefinitionDetailsDatatableView({ collection });
                    const renderPromise = this.datatableView.appendTo(el).render().then(() => {
                      let button = this.datatableView.el.querySelector('th button:not([type="button"])');
                      while (button) {
                        button.setAttribute('type', 'button');
                        button = this.datatableView.el.querySelector('th button:not([type="button"])');
                      }
                    });

                    const buttonRow = el.appendChild(document.createElement('div'));
                    buttonRow.innerHTML = `
                      <a href="#def/${
                        model.isNew() ? 'new' : model.get('id')
                      }/new" class="btn btn-default">Add Field</button>
                    `;

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

  remove() {
    this.removeFieldDatatableView();
    FormView.prototype.remove.call(this);
  }
});

/* exported DefinitionDetailsPageView */
const DefinitionDetailsPageView = BaseView.extend({
  className: 'definitionDetailsPageView',

  removeFormView() {
    if (this.formView) {
      this.formView.remove();
      this.formView = null;
    }
  },

  remove() {
    this.removeFormView();
    BaseView.prototype.remove.call(this);
  },

  render() {
    this.removeFormView();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    const wrapperRow = this.el.appendChild(document.createElement('div'));
    wrapperRow.classList.add('row');

    const wrapperCol = wrapperRow.appendChild(document.createElement('div'));
    wrapperCol.classList.add('col-sm-9');

    this.formView = new DefinitionDetailsFormView({ model: this.model });
    const formViewRenderPromise = this.formView.appendTo(wrapperCol).render();

    const buttonRow = wrapperRow.appendChild(document.createElement('div'));
    buttonRow.classList.add('row');
    buttonRow.innerHTML = `
      <div class="col-sm-6">
        <button type="button" class="btn btn-primary btn-lg">Save Definition Details</button>
        <button type="button" class="btn btn-default btn-lg">Cancel</button>
      </div>

      <div class="col-sm-6 text-right">
        <button type="button" class="btn btn-danger btn-lg">Delete</button>
      </div>
    `;

    formViewRenderPromise.then(() => {
      this.formView.form.appendChild(buttonRow);
    });

    const infoCol = wrapperRow.appendChild(document.createElement('div'));
    infoCol.classList.add('col-sm-3');
    infoCol.innerHTML = `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel consequat justo. Sed condimentum ipsum mi,
      nec auctor velit maximus non. Donec laoreet leo quis lacus accumsan ullamcorper. Phasellus at metus sed massa
      egestas finibus vitae vel ligula. Aliquam accumsan feugiat neque, quis blandit purus. In non tempus est. Etiam
      placerat consequat commodo. Etiam ac purus sit amet justo dignissim tristique non vel quam. Aliquam et mauris
      magna. Etiam dapibus lectus vitae risus scelerisque malesuada. Nunc ut justo venenatis augue ullamcorper laoreet
      non eget purus. Pellentesque turpis enim, scelerisque vitae tellus eget, elementum tristique nibh. Vestibulum
      rhoncus quam dui, nec mattis tellus placerat id.</p>

      <p>In euismod ultrices tincidunt. Vivamus aliquam fermentum dapibus. Morbi non massa quam. Proin ultrices iaculis
      commodo. Vivamus rutrum urna ante, a facilisis arcu accumsan in. Mauris placerat mi sapien, sit amet porttitor
      enim pellentesque vel. In at rhoncus ante. Nulla facilisi. Nam at elit et libero dictum rutrum. Ut bibendum,
      sapien eu venenatis imperdiet, ante dui accumsan nisl, vel consequat elit purus et sapien. Fusce condimentum
      tristique urna, vel aliquam orci dictum quis. Sed eget leo dolor.</p>
    `;

    return formViewRenderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
