/* global BaseView */

/* exported ValidationDetailsPageView */
const ValidationDetailsPageView = BaseView.extend({
  render() {
    this.el.innerHTML = `<p>Validation Page View</p>`;
    return BaseView.prototype.render.call(this);
  }
});
