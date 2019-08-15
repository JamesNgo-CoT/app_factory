/* global BaseCollection FieldDetailsModel */

/* exported FieldsCollection */
const FieldsCollection = BaseCollection.extend({
  model: FieldDetailsModel,
  webStorageKey: 'fields'
});
