const fieldTypes = {};

fieldTypes['Text Field'] = {
  sections() {
    return [
      {
        title: 'Text Options',

        rows: [
          {
            fields: [
              {
                className: 'col-sm-8',
                title: 'Title',
                bindTo: 'title',
                type: 'text'
              },
              {
                className: 'col-sm-4',
                title: 'Bind ID',
                bindTo: 'bind_id',
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
                bindTo: 'disabled',
                type: 'radio',
                choices: [{ text: 'Yes' }, { text: 'No' }]
              },
              {
                title: 'Read Only',
                bindTo: 'readonly',
                type: 'radio',
                choices: [{ text: 'Yes' }, { text: 'No' }]
              }
            ]
          },
          {
            fields: [
              {
                title: 'Info Help',
                bindTo: 'infohelp',
                type: 'text'
              },
              {
                title: 'Pre Help Text',
                bindTo: 'prehelptext',
                type: 'text'
              },
              {
                title: 'Post Help Text',
                bindTo: 'posthelptext',
                type: 'text'
              }
            ]
          },
          {
            fields: [
              {
                className: 'col-sm-4',
                title: 'Placeholder',
                bindTo: 'placeholder',
                type: 'text'
              },
              {
                className: 'col-sm-4',
                title: 'Value',
                bindTo: 'value',
                type: 'text'
              }
            ]
          }
        ]
      }
    ];
  },

  toConfig(json) {
    return {
      id: json.name,
      type: 'text',
      title: json.title,
      className: json.className,
      bindTo: json.bind_id || json.name,
      disbled: json.disbled === 'Yes',
      required: json.required === 'Yes',
      readOnly: json.readonly === 'Yes',
      infohelp: json.infohelp,
      prehelptext: json.prehelptext,
      posthelptext: json.posthelptext,
      placeholder: json.placeholder,
      value: json.value,
      validators: {}
    };
  }
};

fieldTypes['Textarea Field'] = {
  sections() {
    return [
      {
        title: 'Textarea Options',

        rows: [
          {
            fields: [
              {
                className: 'col-sm-8',
                title: 'Title',
                bindTo: 'title',
                type: 'text'
              },
              {
                className: 'col-sm-4',
                title: 'Bind ID',
                bindTo: 'bind_id',
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
                bindTo: 'disabled',
                type: 'radio',
                choices: [{ text: 'Yes' }, { text: 'No' }]
              },
              {
                title: 'Read Only',
                bindTo: 'readonly',
                type: 'radio',
                choices: [{ text: 'Yes' }, { text: 'No' }]
              }
            ]
          },
          {
            fields: [
              {
                title: 'Info Help',
                bindTo: 'infohelp',
                type: 'text'
              },
              {
                title: 'Pre Help Text',
                bindTo: 'prehelptext',
                type: 'text'
              },
              {
                title: 'Post Help Text',
                bindTo: 'posthelptext',
                type: 'text'
              }
            ]
          },
          {
            fields: [
              {
                className: 'col-sm-4',
                title: 'Placeholder',
                bindTo: 'placeholder',
                type: 'text'
              },
              {
                className: 'col-sm-4',
                title: 'Value',
                bindTo: 'value',
                type: 'text'
              }
            ]
          }
        ]
      }
    ];
  },

  toConfig(json) {
    return {
      id: json.name,
      type: 'text',
      title: json.title,
      className: json.className,
      bindTo: json.bind_id || json.name,
      disbled: json.disbled === 'Yes',
      required: json.required === 'Yes',
      readOnly: json.readonly === 'Yes',
      infohelp: json.infohelp,
      prehelptext: json.prehelptext,
      posthelptext: json.posthelptext,
      placeholder: json.placeholder,
      value: json.value,
      validators: {}
    };
  }
};
