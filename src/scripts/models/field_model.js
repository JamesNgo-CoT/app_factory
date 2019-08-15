/* global BaseModel BaseCollection */

/* exported FieldModel */
const FieldModel = BaseModel.extend({
  defaults() {
    return {
      order: null,

      type: null,
      id: null,

      datatableColumn: null,

      section_title: null,

      text_title: null,
      text_required: null,
      text_disbled: null,
      text_readonly: null,
      text_infohelp: null,
      text_prehelptext: null,
      text_posthelptext: null,
      text_placeholder: null,
      text_value: null,

      textarea_title: null,
      textarea_required: null,
      textarea_disbled: null,
      textarea_readonly: null,
      textarea_infohelp: null,
      textarea_prehelptext: null,
      textarea_posthelptext: null,
      textarea_placeholder: null,
      textarea_value: null,
      textarea_cols: null,
      textarea_rows: null,

      radio_title: null,
      radio_required: null,
      radio_disbled: null,
      radio_readonly: null,
      radio_infohelp: null,
      radio_prehelptext: null,
      radio_posthelptext: null,
      radio_value: null,
      radio_choices: null,
      radio_orientation: null,

      checkbox_title: null,
      checkbox_required: null,
      checkbox_disbled: null,
      checkbox_readonly: null,
      checkbox_infohelp: null,
      checkbox_prehelptext: null,
      checkbox_posthelptext: null,
      checkbox_value: null,
      checkbox_choices: null,
      checkbox_orientation: null
    };
  },

  idAttribute: 'order'
});


/* exported FieldCollection */
const FieldCollection = BaseCollection.extend({
  model: FieldModel
});
