/* global BaseView FormView */

/* exported FormPageView */
const FormPageView = BaseView.extend({
  className: 'formPageView',

  formView: FormView,

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
    // .then(() => {
    //   this.subViews.buttonsView = new this.formView({ model: this.model });
    //   return this.subViews.buttonsView.appendTo(this.subViews.formView.form).render();
    // });
    this.el.appendChild(fragment);

    return renderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
