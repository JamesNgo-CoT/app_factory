/* global BaseView FormView Backbone */

const FormPageView_FormView_ButtonsView = BaseView.extend({
  // initialize(options) {
  //   this.listenTo(options.model, `change:${options.model.idAttribute}`, () => {
  //     this.render();
  //   });
  //   BaseView.prototype.initialize.call(this, options);
  // },

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
            <button type="button" class="btn btn-primary btn-lg btn-save">Save</button>
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

const FormPageView_FormView = FormView.extend({
  events: {
    ['click .btn-save'](event) {
      event.preventDefault();
      this.form.querySelector('.fv-hidden-submit').click();
    }
  },

  render() {
    this.removeSubViews();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    this.subViews = {};

    return FormView.prototype.render.call(this).then(() => {
      this.subViews.buttonsView = new FormPageView_FormView_ButtonsView({ model: this.model });
      return this.subViews.buttonsView.appendTo(this.form).render();
    });
  }
});

/* exported FormPageView */
const FormPageView = BaseView.extend({
  className: 'formPageView',

  formView: FormPageView_FormView,

  entityset: null,

  events: {
    ['click .btn-delete'](event) {
      event.preventDefault();

      if (prompt('Type "DELETE" to delete this app') === 'DELETE') {
        this.model.destroy().then(() => {
          Backbone.history.navigate(`form/${this.entityset}/new`, { trigger: true });
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

    // this.el.innerHTML = `<p>FormPageView</p>`;
    const formRow = fragment.appendChild(document.createElement('div'));
    formRow.classList.add('row');

    const formCol = formRow.appendChild(document.createElement('div'));
    formCol.classList.add('col-xs-12');

    const NewFormView = this.formView;
    this.subViews.formView = new NewFormView({ model: this.model });
    const renderPromise = this.subViews.formView.appendTo(formCol).render();
    this.subViews.formView.on('success', () => {
      if (this.model.isNew()) {
        this.model.clear();
        this.subViews.formView.form.reset();
      }
    });

    this.el.appendChild(fragment);

    return renderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
