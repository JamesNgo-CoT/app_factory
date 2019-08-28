const fieldTypes = {};

fieldTypes.text = {
  title: 'Text Field',

  sections: [
    {
      title: 'Text Type Options',

      rows: [
        {
          fields: [
            {
              title: 'Title',
              bindTo: 'title',
              type: 'text'
            }
          ]
        },
        {
          fields: [
            {
              title: 'Required',
              bindTo: 'required',
              type: 'radio',
              choices: [{ text: 'Yes' }, { text: 'No' }]
            },
            {
              title: 'Disabled',
              bindTo: 'text_disbled',
              type: 'radio',
              choices: [{ text: 'Yes' }, { text: 'No' }]
            },
            {
              title: 'Read Only',
              bindTo: 'text_readonly',
              type: 'radio',
              choices: [{ text: 'Yes' }, { text: 'No' }]
            }
          ]
        },
        {
          fields: [
            {
              title: 'Info Help',
              bindTo: 'text_infohelp',
              type: 'text'
            }
          ]
        },
        {
          fields: [
            {
              title: 'Pre Help Text',
              bindTo: 'text_prehelptext',
              type: 'text'
            }
          ]
        },
        {
          fields: [
            {
              title: 'Post Help Text',
              bindTo: 'text_posthelptext',
              type: 'text'
            }
          ]
        },
        {
          fields: [
            {
              title: 'Placeholder',
              bindTo: 'text_placeholder',
              type: 'text'
            }
          ]
        },
        {
          fields: [
            {
              title: 'Value',
              bindTo: 'text_value',
              type: 'text'
            }
          ]
        }
      ]
    }
  ],

  toConfig(json) {
    return json;
  }
};

fieldTypes.textarea = {
  title: 'Text Area Field',

  sections: [
    {
      title: 'Text Area Type Options',

      rows: [
        {
          fields: [
            {
              title: 'Title',
              bindTo: 'title',
              type: 'text'
            }
          ]
        },
        {
          fields: [
            {
              title: 'Required',
              bindTo: 'text_required',
              type: 'radio',
              choices: [{ text: 'Yes' }, { text: 'No' }]
            },
            {
              title: 'Disabled',
              bindTo: 'text_disbled',
              type: 'radio',
              choices: [{ text: 'Yes' }, { text: 'No' }]
            },
            {
              title: 'Read Only',
              bindTo: 'text_readonly',
              type: 'radio',
              choices: [{ text: 'Yes' }, { text: 'No' }]
            }
          ]
        },
        {
          fields: [
            {
              title: 'Info Help',
              bindTo: 'text_infohelp',
              type: 'text'
            }
          ]
        },
        {
          fields: [
            {
              title: 'Pre Help Text',
              bindTo: 'text_prehelptext',
              type: 'text'
            }
          ]
        },
        {
          fields: [
            {
              title: 'Post Help Text',
              bindTo: 'text_posthelptext',
              type: 'text'
            }
          ]
        },
        {
          fields: [
            {
              title: 'Placeholder',
              bindTo: 'text_placeholder',
              type: 'text'
            }
          ]
        },
        {
          fields: [
            {
              title: 'Value',
              bindTo: 'text_value',
              type: 'text'
            }
          ]
        }
      ]
    }
  ]
};
