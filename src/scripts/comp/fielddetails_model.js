/* global BaseModel */

/* exported FieldDetailsModel */
const FieldDetailsModel = BaseModel.extend({
  defaults() {
    return {
      order: 1,
      type: "string",
      id: "string",
      title: "string",
      required: true,
      infohelp: "string",
      prehelptext: "string",
      posthelptext: "string",
      value: "string",
      html: "string",
      disabled: true,
      placeholder: "string",
      choices: "string",
      cols: 5,
      rows: 5,
      readonly: "true"
    };
  },

  idAttribute: 'notId'
});
