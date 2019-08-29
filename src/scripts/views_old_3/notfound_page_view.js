/* global BaseView */

/* exported NotFoundPageView */
const NotFoundPageView = BaseView.extend({
  className: 'notFoundPageView',

  render() {
    this.el.innerHTML = `<p>NotFoundPageView</p>`;
    return BaseView.prototype.render.call(this);
  }
});
