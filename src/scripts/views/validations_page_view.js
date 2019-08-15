/* global BaseView */

/* exported ValidationsPageView */
const ValidationsPageView = BaseView.extend({
  render() {
    this.el.innerHTML = `<p>Validations Page View</p>`;
    return BaseView.prototype.render.call(this);
  }
});
