/* global BaseView */

const FormPageButtonsView = BaseView.extend({
  render() {
    if (this.model.isNew()) {
      this.el.innerHTML = `
        <div class="row">
          <div class="col-sm-12">
            <button type="button" class="btn btn-primary btn-lg btn-save">Submit</button>
          </div>
        </div>
      `;
    } else {
      this.el.innerHTML = `
        <div class="row">
          <div class="col-sm-6">
            <button type="button" class="btn btn-primary btn-lg btn-save">Update</button>
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

/* exported FormPageView */
const FormPageView = BaseView.extend({
  events() {
    return {
      ['click .btn-save'](event) {
        event.preventDefault();
        this.formView.form.querySelector('.fv-hidden-submit').click();
      }
    };
  },

  initialize(options) {
    this.listenTo(options.model, `change:${options.model.idAttribute}`, () => {
      this.buttonsView.render();
    });

    BaseView.prototype.initialize.call(this, options);
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

    this.formView = new this.FormView({ model: this.model });
    const renderPromise = this.formView
      .appendTo(col)
      .render()
      .then(() => {
        this.buttonsView = new FormPageButtonsView({ model: this.model });
        this.buttonsView.appendTo(this.formView.form);
        return this.buttonsView.render();
      });

    this.el.appendChild(fragment);

    return renderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
