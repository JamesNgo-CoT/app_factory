/* global _ toQueryString BaseView DatatableView FilteredDatatableView */

/* exported TableDatatableView */
const TableDatatableView = FilteredDatatableView.extend({
  buttons: DatatableView.withButtons.buttons,
  dom: DatatableView.withButtons.dom,
  doButtonsCopy: DatatableView.withButtons.methods.doButtonsCopy,
  doButtonsCsv: DatatableView.withButtons.methods.doButtonsCsv,
  doButtonsExcel: DatatableView.withButtons.methods.doButtonsExcel,
  doButtonsPdf: DatatableView.withButtons.methods.doButtonsPdf,
  doButtonsPrint: DatatableView.withButtons.methods.doButtonsPrint,
  serverSide: true,
  stateSave: true
});

/* exported TablePageView */
const TablePageView = BaseView.extend({
  className: 'tablePageView',

  events: () => ({
    // ['click .btn-new'](event) {
    //   event.preventDefault();
    //   this.trigger('clickNew');
    // },

    ['click .btn-edit'](event) {
      event.preventDefault();
      const id = event.target.getAttribute('data-id');
      this.trigger('clickEdit', id);
      // Backbone.history.navigate(`apps/${id}?${toQueryString({ reset: true })}`, { trigger: true });
    },

    // ['dblclick tbody tr'](event) {
    //   event.currentTarget.querySelector('.btn-edit').click();
    // },

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
  }),

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

    const fragment = document.createDocumentFragment();
    let row;

    row = fragment.appendChild(document.createElement('div'));
    row.classList.add('row', 'row-buttons');
    row.innerHTML = `
      <div class="col-xs-6">
        <a href="#form/${this.entityset}/new" class="btn btn-default btn-new">New Entry</a>
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

    this.datatableView = new this.TableDatatableView({ collection: this.collection });
    // this.datatableView = new TableDatatableView({ collection: this.collection });
    const renderPromise = this.datatableView.appendTo(fragment).render();

    row = fragment.appendChild(document.createElement('div'));
    row.classList.add('row', 'row-buttons');
    row.innerHTML = `
      <div class="col-xs-6">
        <a href="#form/${this.entityset}/new" class="btn btn-default btn-new">New Entry</a>
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
