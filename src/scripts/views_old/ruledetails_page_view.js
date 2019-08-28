/* global BaseView */

/* exported RuleDetailsPageView */
const RuleDetailsPageView = BaseView.extend({
  render() {
    this.el.innerHTML = `<p>Rule Page View</p>`;
    return BaseView.prototype.render.call(this);
  }
});
