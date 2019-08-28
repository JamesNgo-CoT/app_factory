/* global BaseModel BaseCollection */

/* exported ValidationModel */
const ValidationModel = BaseModel.extend({
  defaults() {
    return {};
  },

  idAttribute: 'order'
});

/* exported ValidationCollection */
const ValidationCollection = BaseCollection.extend({
  model: ValidationModel
});
