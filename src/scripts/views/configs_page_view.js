/* global BaseView DatatableView FilteredDatatableView */

const ConfigsPageView_DatatableView = FilteredDatatableView.extend({
  datatableDefinition() {
    return {
      columns: [
        {
          className: 'excludeFromButtons',
          data: 'id',
          // orderable: false, // TODO Uncomment when fixed
          render(data, type, row) {
            return `
            <a href="#configs/${data}" class="btn btn-default btn-edit">
              Open<span class="sr-only">${row.name} Module</span>
            </a>
          `;
          },
          searchable: false,
          width: 50
        },
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'Description',
          data: 'description'
        },
        {
          title: 'Entity',
          data: 'entity'
        }
      ],
      serverSide: true,
      stateSave: true
    };
  },

  buttons: DatatableView.withButtons.buttons,
  dom: DatatableView.withButtons.dom,
  doButtonsCopy: DatatableView.withButtons.methods.doButtonsCopy,
  doButtonsCsv: DatatableView.withButtons.methods.doButtonsCsv,
  doButtonsExcel: DatatableView.withButtons.methods.doButtonsExcel,
  doButtonsPdf: DatatableView.withButtons.methods.doButtonsPdf,
  doButtonsPrint: DatatableView.withButtons.methods.doButtonsPrint
});

/* exported ConfigsPageView */
const ConfigsPageView = BaseView.extend({
  className: 'configsPageView',

  events: {
    ['click .btn-resetFilters'](event) {
      event.preventDefault();
      this.datatableView.resetFilters();
    },

    ['click .dropdown-menu-copy'](event) {
      event.preventDefault();
      this.datatableView.doButtonsCopy();
    },
    ['click .dropdown-menu-csv'](event) {
      event.preventDefault();
      this.datatableView.doButtonsCsv();
    },
    ['click .dropdown-menu-excel'](event) {
      event.preventDefault();
      this.datatableView.doButtonsExcel();
    },
    ['click .dropdown-menu-pdf'](event) {
      event.preventDefault();
      this.datatableView.doButtonsPdf();
    },
    ['click .dropdown-menu-print'](event) {
      event.preventDefault();
      this.datatableView.doButtonsPrint();
    }
  },

  render() {
    this.removeSubViews();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    this.subViews = {};

    const fragment = document.createDocumentFragment();

    const topRow = fragment.appendChild(document.createElement('div'));
    topRow.classList.add('row', 'row-buttons');
    topRow.innerHTML = `
      <div class="col-xs-6">
        <a href="#configs/new" class="btn btn-default btn-new">New Module</a>
      </div>

      <div class="col-sm-6 text-right">
        <button type="button" class="btn btn-default btn-resetFilters">Reset Filters</button>
        <div class="btn-group btn-group-action">
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Actions <span class="caret"></span>
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

    const collection = this.collection;
    this.subViews.datatableView = new ConfigsPageView_DatatableView({ collection });
    const renderPromise = this.subViews.datatableView.appendTo(fragment).render();

    const bottomRow = fragment.appendChild(document.createElement('div'));
    bottomRow.classList.add('row', 'row-buttons');
    bottomRow.innerHTML = `
      <div class="col-xs-6">
        <a href="#configs/new" class="btn btn-default btn-new">New Module</a>
      </div>

      <div class="col-sm-6 text-right">
        <button type="button" class="btn btn-default btn-resetFilters">Reset Filters</button>
        <div class="btn-group btn-group-action dropup">
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Actions <span class="caret"></span>
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

    this.el.appendChild(fragment);

    return renderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
