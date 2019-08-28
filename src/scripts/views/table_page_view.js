/* global BaseView */

/* exported TablePageView */
const TablePageView = BaseView.extend({
  className: 'tablePageView',

  render() {
    this.el.innerHTML = `<p>TablePageView</p>`;
    return BaseView.prototype.render.call(this);
  }
});
