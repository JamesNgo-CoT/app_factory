/* global BaseModel BaseCollection */

/* exported RuleModel */
const RuleModel = BaseModel.extend({
  defaults() {
    return {};
  },

  idAttribute: 'order'
});

/* exported RuleCollection */
const RuleCollection = BaseCollection.extend({
  model: RuleModel
});
