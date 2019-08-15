/* global BaseModel BaseCollection BaseView DatatableView FilteredDatatableView */

/* exported DefinitionsDatatableModel */
const DefinitionsDatatableModel = BaseModel.extend({
  defaults() {
    return {
      app: null,
      description: null,
      formTitle: null,
      datatableTitle: null,
      status: 'Active',
      fields: []
    };
  },

  urlRoot: '/* @echo C3DATA_DEFINITIONS_URL */'
});

/* exported DefinitionsDatatableCollection */
const DefinitionsDatatableCollection = BaseCollection.extend({
  model: DefinitionsDatatableModel,
  url: '/* @echo C3DATA_DEFINITIONS_URL */'
});

const DefinitionsDatatableView = FilteredDatatableView.extend({
  className: 'definitionsDatatableView',

  buttons: DatatableView.withButtons.buttons,

  datatableDefinition: {
    columns: [
      {
        title: 'App',
        data: 'app'
      },
      {
        title: 'Description',
        data: 'description'
      },
      {
        title: 'Status',
        data: 'status',
        choices: [{ text: 'Active' }, { text: 'Inactive' }],
        width: 100
      },
      {
        className: 'buttonsCol excludeFromButtons',
        data: 'id',
        // orderable: false,
        render(data) {
          return `
            <a href="#def/${data}?reset=true" class="btn btn-default">Edit</a>
          `;
        },
        searchable: false,
        width: 50
      }
    ],
    serverSide: true,
    stateSave: true
  },

  dom: DatatableView.withButtons.dom
});

/* exported DefinitionsPageView */
const DefinitionsPageView = BaseView.extend({
  className: 'definitionsPageView',

  events: {
    ['click .btn-resetFilters'](event) {
      event.preventDefault();
      this.datatableView.resetFilters();
    },

    // ['dblclick tbody tr'](event) {
    //   event.currentTarget.querySelector('a.btn[href]').click();
    // },

    ['click .dropdown-menu-copy'](event) {
      event.preventDefault();
      this.el.querySelector('.buttons-copy').click();
    },
    ['click .dropdown-menu-csv'](event) {
      event.preventDefault();
      this.el.querySelector('.buttons-csv').click();
    },
    ['click .dropdown-menu-excel'](event) {
      event.preventDefault();
      this.el.querySelector('.buttons-excel').click();
    },
    ['click .dropdown-menu-pdf'](event) {
      event.preventDefault();
      this.el.querySelector('.buttons-pdf').click();
    },
    ['click .dropdown-menu-print'](event) {
      event.preventDefault();
      this.el.querySelector('.buttons-print').click();
    }
  },

  removeDatatableView() {
    if (this.datatableView) {
      this.datatableView.remove();
      this.datatableView = null;
    }
  },

  remove() {
    this.removeDatatableView();
    BaseView.prototype.remove.call(this);
  },

  render() {
    this.removeDatatableView();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    const infoRow = this.el.appendChild(document.createElement('div'));
    infoRow.classList.add('row');
    infoRow.innerHTML = `
      <div class="col-xs-10">
        <p>Proin condimentum efficitur tristique. Integer quis interdum orci, vel eleifend felis. Nullam non leo in quam
        pellentesque tincidunt sit amet sed est. Suspendisse laoreet non augue eget malesuada. Sed ut finibus eros.
        Curabitur a ante eu erat sodales feugiat. In tristique dolor non mattis ullamcorper. Quisque vestibulum turpis
        non volutpat aliquam. Nullam in metus commodo, sagittis erat eu, scelerisque mauris. Nullam sollicitudin aliquam
        ante. In a diam sem. Quisque laoreet neque purus, in convallis velit blandit eu.</p>
      </div>
    `;

    const topRow = this.el.appendChild(document.createElement('div'));
    topRow.classList.add('row');
    topRow.innerHTML = `
      <div class="col-xs-6">
        <a href="#def/new?reset=true" class="btn btn-default">New Definition</a>
      </div>

      <div class="col-sm-6 text-right">
        <button type="button" class="btn btn-default btn-resetFilters">Reset Filters</button>

        <!-- Single button -->
        <div class="btn-group btn-group-action">
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Action <span class="caret"></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-right">
            <li><a href="#" class="dropdown-menu-copy">Copy</a></li>
            <li><a href="#" class="dropdown-menu-csv">CSV</a></li>
            <li><a href="#" class="dropdown-menu-excel">Excel</a></li>
            <li><a href="#" class="dropdown-menu-pdf">PDF</a></li>
            <li><a href="#" class="dropdown-menu-print">Print</a></li>
          </ul>
        </div>
      </div>
    `;

    this.datatableView = new DefinitionsDatatableView({ collection: this.collection });
    const datatableViewRenderPromise = this.datatableView.appendTo(this.el).render();

    const bottomRow = this.el.appendChild(document.createElement('div'));
    bottomRow.classList.add('row');
    bottomRow.innerHTML = topRow.innerHTML;

    return datatableViewRenderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
