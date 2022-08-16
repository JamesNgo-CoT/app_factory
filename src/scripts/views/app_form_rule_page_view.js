/* global BaseModel BaseView FormView */

const AppFormRulePageView_FormView_ButtonsView = BaseView.extend({
  render() {
    if (this.model.isNew()) {
      this.el.innerHTML = `
        <div class="row">
          <div class="col-sm-12">
            <button type="button" class="btn btn-primary btn-lg btn-save">Update</button>
            <button type="button" class="btn btn-primary btn-lg btn-cancel">Cancel</button>
          </div>
        </div>
      `;
    } else {
      this.el.innerHTML = `
        <div class="row">
          <div class="col-sm-6">
            <button type="button" class="btn btn-primary btn-lg btn-save">Update</button>
            <button type="button" class="btn btn-primary btn-lg btn-cancel">Cancel</button>
          </div>

          <div class="col-sm-6 text-right">
            <button type="button" class="btn btn-danger btn-lg btn-remove">Remove</button>
          </div>
        </div>
      `;
    }

    return BaseView.prototype.render.call(this);
  }
});

const AppFormRulePageView_FormView = FormView.extend({
  formDefinition() {
    const ruleConditions = this.model.get('ruleConditions');
    const conditionChoices = Object.keys(ruleConditions).map(condition => ({ text: condition }));

    const ruleTypes = this.model.get('ruleTypes');
    const ruleTypesChoices = Object.keys(ruleTypes).map(ruleType => ({ text: ruleType }));

    return {
      sections: [
        {
          title: 'Condition',

          rows: [
            {
              fields: [
                {
                  title: 'Field',
                  type: 'dropdown',
                  required: true,
                  bindTo: 'condition_field',
                  choices: this.model.get('fieldChoices')
                },
                {
                  title: 'Condition',
                  type: 'dropdown',
                  required: true,
                  bindTo: 'condition_type',
                  choices: conditionChoices
                },
                {
                  id: 'condition_value_1',
                  title: 'Value 1',
                  type: 'text',
                  required: true,
                  bindTo: 'condition_value_1'
                },
                {
                  id: 'condition_value_2',
                  title: 'Value 2',
                  type: 'text',
                  required: true,
                  bindTo: 'condition_value_2'
                }
              ]
            }
          ],

          postRender({ model, view }) {
            const conditionHandler = (unset = true) => {
              if (unset) {
                document.getElementById('condition_value_1').value = '';
                model.unset('condition_value_1');
              }
              document.getElementById('condition_value_1Element').classList.add('hide');
              if (unset) {
                document.getElementById('condition_value_2').value = '';
                model.unset('condition_value_2');
              }
              document.getElementById('condition_value_2Element').classList.add('hide');

              const condition_type = model.get('condition_type');
              if (condition_type && ruleConditions[condition_type] && ruleConditions[condition_type].inputs) {
                const inputs = ruleConditions[condition_type].inputs;
                if (inputs.condition_value_1) {
                  view.el.querySelector(`label[for="condition_value_1"] span`).innerHTML = inputs.condition_value_1;
                  document.getElementById('condition_value_1Element').classList.remove('hide');
                }
                if (inputs.condition_value_2) {
                  view.el.querySelector(`label[for="condition_value_2"] span`).innerHTML = inputs.condition_value_2;
                  document.getElementById('condition_value_2Element').classList.remove('hide');
                }
              }
            };
            model.on('change:condition_type', conditionHandler);
            conditionHandler(false);
          }
        },
        {
          title: 'Action ',

          rows: [
            {
              fields: [
                {
                  id: 'action_target',
                  title: 'Target',
                  type: 'checkbox',
                  required: true,
                  bindTo: 'action_target',
                  choices: this.model.get('targetChoices')
                }
              ]
            },
            {
              fields: [
                {
                  id: 'action_type',
                  title: 'Type',
                  type: 'dropdown',
                  required: true,
                  bindTo: 'action_type',
                  choices: ruleTypesChoices
                },
                {
                  id: 'action_value',
                  title: 'Value',
                  type: 'text',
                  required: true,
                  bindTo: 'action_value'
                }
              ]
            }
          ],

          postRender({ model, view }) {
            const actionHandler = (unset = true) => {
              if (unset) {
                document.getElementById('action_value').value = '';
                model.unset('action_value');
              }
              document.getElementById('action_valueElement').classList.add('hide');

              const action_type = model.get('action_type');
              if (action_type && ruleTypes[action_type] && ruleTypes[action_type].inputs) {
                const inputs = ruleTypes[action_type].inputs;
                if (inputs.action_value) {
                  view.el.querySelector(`label[for="action_value"] span`).innerHTML = inputs.action_value;
                  document.getElementById('action_valueElement').classList.remove('hide');
                }
              }
            };
            model.on('change:action_type', actionHandler);
            actionHandler(false);
          }
        }
      ]
    };
  },

  success() {
    this.trigger('success');
  },

  render() {
    this.removeSubViews();
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    this.subViews = {};

    return FormView.prototype.render.call(this).then(() => {
      const model = this.model;
      this.subViews.buttonsView = new AppFormRulePageView_FormView_ButtonsView({ model });
      return this.subViews.buttonsView.appendTo(this.form).render();
    });
  }
});

/* exported AppFormRulePageView */
const AppFormRulePageView = BaseView.extend({
  className: 'appFormFieldPageView',

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
      // if (confirm('Type "REMOVE" to remove this rule')) {
      if (confirm('This action will remove this rule. Would you like to proceed?')) {
        const rules = this.model.get('rules');
        rules.splice(this.rule, 1);
        this.trigger('navigateBack');
      }
    }
  },

  initialize(options) {
    this.ruleIndex = options.ruleIndex;
    this.ruleConditions = options.ruleConditions;
    this.ruleTypes = options.ruleTypes;

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

    const fieldChoices = [];
    const targetChoices = [];

    const sections = this.model.get('sections');
    sections.forEach(section => {
      if (section.name) {
        const choice = {
          text: `Section - ${section.title ? section.title : 'Untitled'} (${section.name})`,
          value: section.name
        };
        targetChoices.push(choice);
      }
      section.rows.forEach(row => {
        if (row.name) {
          const choice = { text: `Row - Untitled (${row.name})`, value: row.name };
          targetChoices.push(choice);
        }
        row.fields.forEach(field => {
          if (field && field.name) {
            const choice = {
              text: `${field.type} - ${field.title ? field.title : 'Untitled'} (${field.name})`,
              value: field.name
            };
            fieldChoices.push(choice);
            targetChoices.push(choice);
          }
        });
      });
    });

    const ruleConditions = this.ruleConditions;
    const ruleTypes = this.ruleTypes;
    const model = new BaseModel(
      Object.assign(
        { fieldChoices, targetChoices, ruleConditions, ruleTypes },
        this.ruleIndex === -1 ? {} : this.model.get('rules')[this.ruleIndex]
      )
    );

    if (this.ruleIndex > -1) {
      model.set('id', this.ruleIndex);
    }

    this.subViews.formView = new AppFormRulePageView_FormView({ model });
    this.subViews.formView.on('success', () => {
      const model = this.subViews.formView.model;

      const json = model.toJSON();

      delete json.fieldChoices;
      delete json.ruleConditions;
      delete json.ruleTypes;
      delete json.targetChoices;

      const rules = this.model.get('rules');

      if (this.ruleIndex === -1) {
        rules.push(json);
      } else {
        rules[this.ruleIndex] = json;
      }

      this.trigger('navigateBack');
    });

    const renderPromise = this.subViews.formView.appendTo(formCol).render();

    this.el.appendChild(fragment);

    return renderPromise.then(() => BaseView.prototype.render.call(this));
  }
});
