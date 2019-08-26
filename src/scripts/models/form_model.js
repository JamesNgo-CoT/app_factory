/* global _ BaseModel BaseCollection */

/* exported FormModel */
const FormModel = BaseModel.extend({
  parse(response, options) {
    const id = response[this.idAttribute];
    response = JSON.parse(response.payload);
    response[this.idAttribute] = id;
    return BaseModel.prototype.parse.call(this, response, options);
  },

  adjustSyncJson(json) {
    delete json[this.idAttribute];

    const newJson = {
      payload: JSON.stringify(json)
    };

    if (!this.isNew()) {
      newJson[this.idAttribute] = this.id
    }

    const datatableColumns = _.result(this, 'datatableColumns') || [];
    datatableColumns.forEach(column => {
      newJson[column] = json[column];
    });

    return newJson;
  }
});

/* exported FormCollection */
const FormCollection = BaseCollection.extend({
  // model: FormModel
});
