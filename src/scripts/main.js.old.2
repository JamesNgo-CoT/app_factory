// The main javascript file for app_factory.
// IMPORTANT:
// Any resources from this project should be referenced using SRC_PATH preprocessor var
// Ex: let myImage = '/*@echo SRC_PATH*//img/sample.jpg';

/* global $ Backbone doAjax toQueryObject cot_app BaseRouter LoadingPageView */

let app;

$(function() {
  const APP_TITLE = 'App Factory';

  app = new cot_app(APP_TITLE, {
    hasContentTop: false,
    hasContentBottom: false,
    hasContentRight: false,
    hasContentLeft: false,
    searchcontext: 'INTRA'
  });

  app.setBreadcrumb([{ name: APP_TITLE, link: '#apps' }], true);

  app.render();

  app.container = document.getElementById('app_factory_container');
  app.mainViewContainer = app.container.appendChild(document.createElement('div'));

  app.mainView = new LoadingPageView();
  app.mainView.appendTo(app.mainViewContainer).render();

  app.models = {};

  //////////////////////////////////////////////////////////////////////////////

  const AppRouter = BaseRouter.extend({
    defaultFragment: 'apps',

    routes: {
      apps: 'routeAppsPage',

      'apps/:id': 'routeAppDetailsPage',

      'apps/:id/fields': 'routeFieldsPage',
      'apps/:id/fields/:order': 'routeFieldDetailsPage',

      'apps/:id/validations': 'routeValidationsPage',
      'apps/:id/validations/:order': 'routeValidationDetailsPage',

      'apps/:id/rules': 'routeRulesPage',
      'apps/:id/rules/:order': 'routeRuleDetailsPage',

      app: 'routeNotFoundPage',

      'app/:entityset': 'routeTablePage',
      'app/:entityset/:entityId': 'routeFormPage',

      '*default': 'routeDefault'
    },

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE APPS PAGE
    ////////////////////////////////////////////////////////////////////////////

    /* global AppCollection AppsPageView */
    routeAppsPage() {
      return Promise.resolve()
        .then(() => {
          const collection = new AppCollection();
          const view = new AppsPageView({ collection });
          return app.mainView.swapWith(view);
        })
        .then(view => {
          app.mainView = view;

          app.setTitle(APP_TITLE);
          app.setBreadcrumb([{ name: APP_TITLE, link: '#apps' }], true);

          if (this._showFocus) {
            app.titleElement.focus();
          } else {
            this._showFocus = true;
          }

          return () => {};
        })
        .catch(error => {
          /* eslint-disable no-console */
          if (window.console && console.error) {
            console.error('Error', error);
          }
          /* eslint-enabled no-console */

          alert('An error has occured.');
        });
    },

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE APP DETAILS PAGE
    ////////////////////////////////////////////////////////////////////////////

    /* global AppModel AppDetailsPageView */
    routeAppDetailsPage(id, queryString) {
      const { reset = false } = toQueryObject(queryString) || {};
      if (reset) {
        this.lastFragment = `apps/${id}`;
        this.navigate(this.lastFragment, { trigger: false, replace: true });
      }

      if (!app.models.appDetailsModel || reset) {
        app.models.appDetailsModel = new AppModel();
        app.models.appDetailsModel.setSnapShotData();
      }

      return Promise.resolve()
        .then(() => {
          const model = app.models.appDetailsModel;

          if ((id === 'new' && !model.isNew()) || (id !== 'new' && !model.isNew() && model.id !== id)) {
            throw 'Data Error';
          }

          if (id !== 'new' && model.isNew()) {
            model.set(model.idAttribute, id);
            return model.fetch();
          }
        })
        .then(() => {
          const model = app.models.appDetailsModel;
          const view = new AppDetailsPageView({ model });
          return app.mainView.swapWith(view);
        })
        .then(view => {
          app.mainView = view;

          const model = app.models.appDetailsModel;

          const handler = (replaceFragment = true) => {
            app.setTitle(model.isNew() ? 'New App' : `App: ${model.get('app')}`);
            app.setBreadcrumb(
              [{ name: APP_TITLE, link: '#apps' }, { name: model.isNew() ? 'New App' : `App: ${model.get('app')}` }],
              true
            );

            if (replaceFragment) {
              const newId = model.isNew() ? 'new' : model.id;
              this.lastFragment = `apps/${newId}`;
              this.navigate(this.lastFragment, { trigger: false, replace: true });
            }
          };
          handler(false);
          view.listenTo(model, `change:${model.idAttribute}`, handler);

          if (this._showFocus) {
            app.titleElement.focus();
          } else {
            this._showFocus = true;
          }
        })
        .then(() => {
          const model = app.models.appDetailsModel;

          return name => {
            if (
              model.hasChanged() &&
              name !== 'routeFieldDetailsPage' &&
              name !== 'routeValidationDetailsPage' &&
              name !== 'routeRuleDetailsPage'
            ) {
              return confirm('Changes will not be saved. Click Ok to proceed.') === true;
            }
          };
        })
        .catch(error => {
          /* eslint-disable no-console */
          if (window.console && console.error) {
            console.error('Error', error);
          }
          /* eslint-enabled no-console */

          alert('An error has occured.');

          this.navigate(this.defaultFragment, { trigger: true });
        });
    },

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE FIELDS PAGE
    ////////////////////////////////////////////////////////////////////////////

    routeFieldsPage(id) {
      this.navigate(`apps/${id}`, { trigger: true });
    },

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE FIELD DETAILS PAGE
    ////////////////////////////////////////////////////////////////////////////

    /* global FieldModel FieldDetailsPageView */
    routeFieldDetailsPage(id, order, queryString) {
      const { reset = false } = toQueryObject(queryString) || {};
      if (reset) {
        this.lastFragment = `apps/${id}/fields/${order}`;
        this.navigate(this.lastFragment, { trigger: false, replace: true });
      }

      if (!app.models.fieldDetailsModel || reset) {
        app.models.fieldDetailsModel = new FieldModel();
        app.models.fieldDetailsModel.setSnapShotData();
      }

      return Promise.resolve()
        .then(() => {
          const model = app.models.appDetailsModel;
          const model2 = app.models.fieldDetailsModel;

          if (
            !model ||
            (id === 'new' && !model.isNew()) ||
            (id !== 'new' && !model.isNew() && model.id !== id) ||
            (order === 'new' && !model2.isNew()) ||
            (order !== 'new' && isNaN(order)) ||
            (order !== 'new' && !isNaN(order) && +order <= 0) ||
            (order !== 'new' && !isNaN(order) && +order > model.get('fields').length) ||
            (order !== 'new' && !model2.isNew() && order !== model2.id)
          ) {
            throw 'Data Error';
          }

          if (order !== 'new' && model2.isNew()) {
            model2.set(model.get('fields')[order - 1]);
            model2.set(model2.idAttribute, String(order));
          }
        })
        .then(() => {
          const model2 = app.models.fieldDetailsModel;
          const view = new FieldDetailsPageView({ model: model2 });
          return app.mainView.swapWith(view);
        })
        .then(view => {
          app.mainView = view;

          const model = app.models.appDetailsModel;
          const model2 = app.models.fieldDetailsModel;

          const appBreadcrumb = { name: model.isNew() ? 'New App' : `App: ${model.get('app')}`, link: `#apps/${id}` };
          const handler = (replaceFragment = true) => {
            app.setTitle(model2.isNew() ? 'New Field' : `Field: ${model2.get('type')}`);
            app.setBreadcrumb(
              [
                app.breadcrumbItems[0],
                appBreadcrumb,
                { name: model2.isNew() ? 'New Field' : `Field: ${model2.id} - ${model2.get('type')}` }
              ],
              true
            );

            if (replaceFragment) {
              const newOrder = model2.isNew() ? 'new' : model2.id;
              this.lastFragment = `apps/${id}/fields/${newOrder}`;
              this.navigate(this.lastFragment, { trigger: false, replace: true });
            }
          };
          handler(false);
          view.listenTo(model2, `change:${model.idAttribute}`, handler);
          view.listenTo(model2, `change:type`, handler);

          if (this._showFocus) {
            app.titleElement.focus();
          } else {
            this._showFocus = true;
          }
        })
        .then(() => {
          const model = app.models.appDetailsModel;
          const model2 = app.models.fieldDetailsModel;
          return name => {
            if (model2.hasChanged() || (model.hasChanged() && name !== 'routeAppDetailsPage')) {
              return confirm('Changes will not be saved. Click Ok to proceed.') === true;
            }
          };
        })
        .catch(error => {
          /* eslint-disable no-console */
          if (window.console && console.error) {
            console.error('Error', error);
          }
          /* eslint-enabled no-console */

          alert('An error has occured.');

          this.navigate(this.defaultFragment, { trigger: true });
        });
    },

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE VALIDATIONS PAGE
    ////////////////////////////////////////////////////////////////////////////

    routeValidationsPage(appId) {
      this.navigate(`apps/${appId}`, { trigger: true });
    },

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE VALIDATION DETAILS PAGE
    ////////////////////////////////////////////////////////////////////////////

    routeValidationDetailsPage(appId, validationIndex) {},

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE RULES PAGE
    ////////////////////////////////////////////////////////////////////////////

    routeRulesPage(appId) {
      this.navigate(`apps/${appId}`, { trigger: true });
    },

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE RULE DETAILS PAGE
    ////////////////////////////////////////////////////////////////////////////

    routeRuleDetailsPage(appId, ruleIndex) {},

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE NOT FOUND PAGE
    ////////////////////////////////////////////////////////////////////////////

    /* global NotFoundPageView */
    routeNotFoundPage() {
      return Promise.resolve()
        .then(() => {
          const view = new NotFoundPageView();
          return app.mainView.swapWith(view);
        })
        .then(view => {
          app.mainView = view;

          app.setTitle('Page Not Found');
          app.setBreadcrumb([{ name: 'Page Not Found' }], true);

          if (this._showFocus) {
            app.titleElement.focus();
          } else {
            this._showFocus = true;
          }
        })
        .then(() => {
          return () => {};
        })
        .catch(error => {
          /* eslint-disable no-console */
          if (window.console && console.error) {
            console.error('Error', error);
          }
          /* eslint-enabled no-console */

          alert('An error has occured.');
        });
    },

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE TABLE PAGE
    ////////////////////////////////////////////////////////////////////////////

    /* global TablePageView */
    routeTablePage(entityset, queryString) {
      const queryObject = toQueryObject(queryString) || {};

      let title = 'Table View';

      return Promise.resolve()
        .then(() => {
          const id = queryObject.config || `${entityset}.datatable.json`;
          console.log('ID', id);
          return doAjax({
            url: `/* @echo C3DATA_MEDIA_URL */('${id}')/$value`,
            method: 'GET'
          });
        })
        .then(({ data: datatableDefinition }) => {
          title = datatableDefinition.title || title;

          // const NewFormView = FormView.extend({ formDefinition: datatableDefinition });
          // const NewFormPageView = FormPageView.extend({ FormView: NewFormView });
          const view = new TablePageView({  });
          return app.mainView.swapWith(view);
        })
        .then(view => {
          app.mainView = view;

          app.setTitle(title);
          app.setBreadcrumb([{ name: title }], true);

          if (this._showFocus) {
            app.titleElement.focus();
          } else {
            this._showFocus = true;
          }
        })
        .then(() => {
          return () => {};
        })
        .catch(error => {
          /* eslint-disable no-console */
          if (window.console && console.error) {
            console.error('Error', error);
          }
          /* eslint-enabled no-console */

          alert('An error has occured.');

          this.navigate('app', { trigger: true });
        });
    },

    ////////////////////////////////////////////////////////////////////////////
    // ROUTE FORM PAGE
    ////////////////////////////////////////////////////////////////////////////

    /* global FormView FormModel FormPageView */
    routeFormPage(entityset, entityId, queryString) {
      const queryObject = toQueryObject(queryString) || {};

      let title = 'Form View';

      return Promise.resolve()
        .then(() => {
          const id = queryObject.config || `${entityset}.cotform.json`;
          return doAjax({
            url: `/* @echo C3DATA_MEDIA_URL */('${id}')/$value`,
            method: 'GET'
          });
        })
        .then(({ data: formDefinition }) => {
          title = formDefinition.title || title;
          delete formDefinition.title;

          const NewFormModel = FormModel.extend({
            datatableColumns: formDefinition.datatableColumns,
            urlRoot: `/* @echo C3DATA_BASE_URL *//${entityset}`
          });
          const model = new NewFormModel();

          return Promise.resolve()
            .then(() => {
              if (entityId !== 'new') {
                model.set(model.idAttribute, entityId);
                return model.fetch();
              }
            })
            .then(() => {
              const NewFormView = FormView.extend({ formDefinition });
              const NewFormPageView = FormPageView.extend({ FormView: NewFormView });
              const view = new NewFormPageView({ model });
              return app.mainView.swapWith(view);
            });
        })
        .then(view => {
          app.mainView = view;

          app.setTitle(title);
          app.setBreadcrumb([{ name: title }], true);

          const handler = (replaceFragment = true) => {
            if (replaceFragment) {
              const id = view.model.isNew() ? 'new' : view.model.id;
              this.lastFragment = `apps/${entityset}/${id}`;
              this.navigate(this.lastFragment, { trigger: false, replace: true });
            }
          };
          handler(false);
          view.listenTo(view.model, `change:${view.model.idAttribute}`, handler);

          if (this._showFocus) {
            app.titleElement.focus();
          } else {
            this._showFocus = true;
          }
        })
        .then(() => {
          return () => {};
        })
        .catch(error => {
          /* eslint-disable no-console */
          if (window.console && console.error) {
            console.error('Error', error);
          }
          /* eslint-enabled no-console */

          alert('An error has occured.');

          this.navigate('app', { trigger: true });
        });
    }
  });

  new AppRouter();

  //////////////////////////////////////////////////////////////////////////////

  Backbone.history.start();
});
