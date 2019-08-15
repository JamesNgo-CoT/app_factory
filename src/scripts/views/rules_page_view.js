/* global BaseView */

/* exported RulesPageView */
const RulesPageView = BaseView.extend({
  render() {
    this.el.innerHTML = `<p>Rules Page View</p>`;
    return BaseView.prototype.render.call(this);
  }
});
