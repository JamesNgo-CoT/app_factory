/* global BaseModel BaseCollection */

/* exported AppModel */
const AppModel = BaseModel.extend({
  defaults() {
    return {
      name: 'string',
      entity: 'string',
      description: 'string',

      formtitle: 'string',
      tabletitle: 'string',

      sections: [
        {
          name: 'string',
          title: 'string',
          cols: 4,

          rows: [
            {
              name: 'string',

              fields: [
                {
                  name: 'string',
                  type: 'string',
                  colspan: '1',

                  validations: [
                    {
                      type: 'string'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],

      rules: [
        {
          type: 'string'
        }
      ]
    };
  },

  urlRoot: '/* @echo C3DATA_APPS_URL */'
});

/* exported AppCollection */
const AppCollection = BaseCollection.extend({
  model: AppModel,
  url: '/* @echo C3DATA_APPS_URL */',
  webStorageKey: 'apps'
});
