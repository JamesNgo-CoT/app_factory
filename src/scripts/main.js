/* global $ cot_app Backbone BaseRouter LoadingPageView */

$(function() {
  const APP_TITLE = 'Modules';

  const app = new cot_app(APP_TITLE, {
    hasContentTop: false,
    hasContentBottom: false,
    hasContentRight: false,
    hasContentLeft: false,
    searchcontext: 'INTRA'
  });

  app.setBreadcrumb([{ name: APP_TITLE }], true);
  app.render();

  // Render Loading Page View and Set Initial Main View
  let mainView = new LoadingPageView();
  mainView
    .appendTo(document.getElementById('app_factory_container'))
    .render()
    .then(() => {
      const NewRouter = BaseRouter.extend({
        defaultFragment: 'configs',

        routes: {
          'configs(/)': 'routeConfigs',
          'configs/:id(/)': 'routeConfigDetails',

          'configs/:id/sections(/)': 'routeDefault',
          'configs/:id/sections/:section_index(/)': 'routeDefault',

          'configs/:id/sections/:section_index/rows(/)': 'routeDefault',
          'configs/:id/sections/:section_index/rows/:row_index(/)': 'routeDefault',

          'configs/:id/sections/:section_index/rows/:row_index/fields(/)': 'routeDefault',
          'configs/:id/sections/:section_index/rows/:row_index/fields/:field_index(/)': 'routeDefault',

          'configs/:id/sections/:section_index/rows/:row_index/fields/:field_index/validations(/)': 'routeDefault',
          'configs/:id/sections/:section_index/rows/:row_index/fields/:field_index/validations/:validation_index(/)':
            'routeDefault',

          'configs/:id/rules(/)': 'routeDefault',
          'configs/:id/rules/:rule_index(/)': 'routeDefault',

          'forms(/)': 'routeFormNotFound',
          'forms/:name(/)': 'routeDefault',
          'forms/:name/thankyou(/)': 'routeDefault',

          'data(/)': 'routeDataNotFound',
          'data/:name(/)': 'routeDefault',
          'data/:name/:id(/)': 'routeDefault',

          '*default': 'routeDefault'
        },

        // Configs

        //////////
        /* global ConfigCollection ConfigsPageView */
        routeConfigs() {
          return (
            Promise.resolve()
              // Render Loading Page View
              .then(() => {
                if (!(mainView instanceof LoadingPageView)) {
                  const view = new LoadingPageView();
                  return mainView.swapWith(view).then(() => {
                    mainView = view;
                  });
                }
              })
              // Render Configs Page View
              .then(() => {
                const collection = new ConfigCollection();
                const view = new ConfigsPageView({ collection });
                return mainView.swapWith(view).then(() => {
                  mainView = view;
                });
              })
              // Set Title, Breadcrumb, Focus and Cleanup Callback
              .then(() => {
                app.setTitle(APP_TITLE);
                app.setBreadcrumb([{ name: APP_TITLE }], true);

                if (this._showFocus) {
                  app.titleElement.focus();
                } else {
                  this._showFocus = true;
                }

                return () => {};
              })
              // Catch Unexpected Errors
              .catch(error => {
                /* eslint-disable no-console */
                if (window.console && console.error) {
                  console.error('Error', error);
                }
                /* eslint-enabled no-console */

                alert('An error has occured.');
              })
          );
        },

        //////////
        /* global ConfigModel ConfigDetailsPageView */
        routeConfigDetails(id) {
          return (
            Promise.resolve()
              // Render Loading Page View
              .then(() => {
                if (!(mainView instanceof LoadingPageView)) {
                  const view = new LoadingPageView();
                  return mainView.swapWith(view).then(() => {
                    mainView = view;
                  });
                }
              })
              // Load Config Details Model
              .then(() => {
                if (
                  !this.configModel ||
                  (id === 'new' && !this.configModel.isNew()) ||
                  (id !== 'new' && this.configModel.id !== id)
                ) {
                  // Reset Config Model
                  this.configModel = new ConfigModel();

                  if (id !== 'new') {
                    this.configModel.set({ id });
                    return this.configModel.fetch();
                  } else {
                    this.configModel.setSnapShot();
                  }
                }
              })
              // Render Config Details Page View
              .then(() => {
                const model = this.configModel;
                const view = new ConfigDetailsPageView({ model });
                return mainView.swapWith(view).then(() => {
                  mainView = view;
                });
              })
              // Set Title, Breadcrumb, Focus and Cleanup Callback
              .then(() => {
                const update = () => {
                  if (this.configModel.isNew()) {
                    app.setTitle('New Model');
                    app.setBreadcrumb([{ name: APP_TITLE, link: '#configs' }, { name: 'New Model' }], true);
                  } else {
                    app.setTitle(`${this.configModel.get('name')} (Model)`);
                    app.setBreadcrumb(
                      [{ name: APP_TITLE, link: '#configs' }, { name: `${this.configModel.get('name')} (Model)` }],
                      true
                    );
                  }
                };

                update();

                mainView.listenTo(this.configModel, `change:${this.configModel.idAttribute}`, update);
                mainView.listenTo(this.configModel, 'change:name', update);

                if (this._showFocus) {
                  app.titleElement.focus();
                } else {
                  this._showFocus = true;
                }

                return nextRoute => {
                  // TODO Add Valid Next Routes
                  console.log(this.configModel.hasChangedSinceSnapShot());
                  if (this.configModel.hasChangedSinceSnapShot() && nextRoute !== 'routeDefault') {
                    if (confirm('Changes will not be saved. Click Ok to proceed.')) {
                      this.configModel = null;
                    } else {
                      return false;
                    }
                  }
                };
              })
              // Catch Unexpected Errors
              .catch(error => {
                /* eslint-disable no-console */
                if (window.console && console.error) {
                  console.error('Error', error);
                }
                /* eslint-enabled no-console */

                alert('An error has occured.');
              })
          );
        },

        // Sections

        routeConfigSections() {},

        routeConfigSectionDetails() {},

        // Rows

        routeConfigSectionRows() {},

        routeConfigSectionRowDetails() {},

        // Fields

        routeConfigSectionRowFields() {},

        routeConfigSectionRowFieldDetails() {},

        // Validations

        routeConfigSectionRowFieldValidations() {},

        routeConfigSectionRowFieldValidationDetails() {},

        // Rules

        routeConfigRules() {},

        routeConfigRuleDetails() {},

        // Forms

        routeFormNotFound() {},

        // Data

        routeDataNotFound() {}
      });

      new NewRouter();

      Backbone.history.start();
    });
});
