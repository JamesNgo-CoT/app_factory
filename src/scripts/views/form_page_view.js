/* global BaseView */

/* exported FormPageView */
const FormPageView = BaseView.extend({
  className: 'formPageView',

  render() {
    this.el.innerHTML = `<p>FormPageView</p>`;
    return BaseView.prototype.render.call(this);
  }
});
