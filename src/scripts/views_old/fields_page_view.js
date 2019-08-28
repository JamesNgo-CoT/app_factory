/* global BaseView */

/* exported FieldsPageView */
const FieldsPageView = BaseView.extend({
  render() {
    this.el.innerHTML = `<p>Fields Page View</p>`;
    return BaseView.prototype.render.call(this);
  }
});
