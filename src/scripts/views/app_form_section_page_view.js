/* global BaseModel BaseView FormView */

const AppSectionFormView = FormView.extend({
  formDefinition() {
    const choices = [];

    for (let index = 0, length = this.model.get('length'); index < length; index++) {
      choices.push({ text: index + 1, value: index });
    }

    return {
      sections: [
        {
          title: 'Details',

          rows: [
            {
              fields: [
                {
                  title: 'Order',
                  type: 'dropdown',
                  choices,
                  required: true,
                  bindTo: 'order'
                },
                {
                  title: 'Columns',
                  type: 'dropdown',
                  required: true,
                  bindTo: 'cols',
                  choices: [
                    {
                      text: '1'
                    },
                    {
                      text: '2'
                    },
                    {
                      text: '3'
                    },
                    {
                      text: '4'
                    }
                  ]
                },
                {
                  title: 'ID',
                  type: 'text',
                  required: false,
                  bindTo: 'name'
                }
              ]
            },
            {
              fields: [
                {
                  title: 'Title',
                  type: 'text',
                  required: false,
                  bindTo: 'title'
                }
              ]
            }
          ]
        }
      ]
    };
  },

  success() {
    this.trigger('success');
  }
});

/* exported AppFormSectionPageView */
const AppFormSectionPageView = BaseView.extend({
  className: 'appFormSectionPageView',

  events: {
    ['click .btn-save'](event) {
      event.preventDefault();

      this.subViews.formView.form.querySelector('.fv-hidden-submit').click();
    },

    ['click .btn-cancel'](event) {
      event.preventDefault();
      this.trigger('navigateBack');
    },

    ['click .btn-remove'](event) {
      event.preventDefault();
      // if (prompt('Type "REMOVE" to remove this section') === 'REMOVE') {
      if (confirm('This action will remove this section. Would you like to proceed?')) {
        const sections = this.model.get('sections');
        sections.splice(this.sectionIndex, 1);
        this.trigger('navigateBack');
      }
    }
  },

  initialize(options) {
    this.sectionIndex = options.sectionIndex;
    BaseView.prototype.initialize.call(this, options);
  },

  render() {
    this.removeSubViews();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    this.subViews = {};

    const fragment = document.createDocumentFragment();

    const formRow = fragment.appendChild(document.createElement('div'));
    formRow.classList.add('row');

    const formCol = formRow.appendChild(document.createElement('div'));
    formCol.classList.add('col-xs-12');

    const sections = this.model.get('sections');

    this.subViews.formView = new AppSectionFormView({
      model: new BaseModel({
        order: this.sectionIndex,
        name: sections[this.sectionIndex].name,
        title: sections[this.sectionIndex].title,
        cols: sections[this.sectionIndex].cols,
        length: sections.length
      })
    });

    this.subViews.formView.on('success', () => {
      const model = this.subViews.formView.model;

      const sections = this.model.get('sections');

      sections[this.sectionIndex].name = model.get('name') || null;
      sections[this.sectionIndex].title = model.get('title') || null;
      sections[this.sectionIndex].cols = model.get('cols');

      const order = +model.get('order');

      // TODO - FIX
      if (order === -1) {
        sections.push(sections[this.sectionIndex]);
        sections.splice(this.sectionIndex, 1);
      } else if (order !== this.sectionIndex) {
        const finalIndex = order < this.sectionIndex ? this.sectionIndex + 1 : this.sectionIndex;
        sections.splice(order, 0, sections[this.sectionIndex]);
        sections.splice(finalIndex, 1);
      }

      this.trigger('navigateBack');
    });

    const renderPromise = this.subViews.formView
      .appendTo(formCol)
      .render()
      .then(() => {
        const buttonsRow = this.subViews.formView.form.appendChild(document.createElement('div'));
        buttonsRow.classList.add('row');

        const leftCol = buttonsRow.appendChild(document.createElement('div'));
        leftCol.classList.add('col-sm-6');
        leftCol.innerHTML = `
          <button type="button" class="btn btn-default btn-lg btn-save">Update</button>
          <button type="button" class="btn btn-default btn-lg btn-cancel">Cancel</button>
        `;

        const rightCol = buttonsRow.appendChild(document.createElement('div'));
        rightCol.classList.add('col-sm-6', 'text-right');
        rightCol.innerHTML = '<button type="button" class="btn btn-danger btn-lg btn-remove">Remove</button>';
      });
    this.el.appendChild(fragment);

    return renderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
