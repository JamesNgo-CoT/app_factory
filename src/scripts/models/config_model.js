/* global BaseModel BaseCollection */

/* exported ConfigModel */
const ConfigModel = BaseModel.extend({
  defaults() {
    return {
      name: 'string',
      entity: 'string',
      description: 'string',

      formtitle: 'string',
      tabletitle: 'string',

      sections: [],

      rules: []
    };
  },

  urlRoot: '/* @echo C3DATA_APPS_URL */',
});

/* exported ConfigCollection */
const ConfigCollection = BaseCollection.extend({
  model: ConfigModel,
  url: '/* @echo C3DATA_APPS_URL */',
  webStorageKey: 'config'
});
