/* global BaseView */

/* exported LoadingPageView */
const LoadingPageView = BaseView.extend({
  className: 'loadingPageView',

  render() {
    this.el.innerHTML = `<p>Loading&hellip;</p>`;
    return BaseView.prototype.render.call(this);
  }
});
