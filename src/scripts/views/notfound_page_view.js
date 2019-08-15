/* global BaseView */

/* exported NotFoundPageView */
const NotFoundPageView = BaseView.extend({
  render() {
    this.el.innerHTML = `<p>Page not found.</p>`;
    return BaseView.prototype.render.call(this);
  }
});
