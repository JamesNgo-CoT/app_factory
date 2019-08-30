// The main javascript file for app_factory.
// IMPORTANT:
// Any resources from this project should be referenced using SRC_PATH preprocessor var
// Ex: let myImage = '/*@echo SRC_PATH*//img/sample.jpg';

/* global $ Backbone doAjax cot_app BaseRouter LoadingPageView */

$(function() {
  const APP_TITLE = 'App Modules';

  const app = new cot_app(APP_TITLE, {
    hasContentTop: false,
    hasContentBottom: false,
    hasContentRight: false,
    hasContentLeft: false,
    searchcontext: 'INTRA'
  });
  app.setBreadcrumb([{ name: APP_TITLE, link: '#configs' }], true);
  app.render();

  const container = document.getElementById('app_factory_container');
  const mainViewContainer = container.appendChild(document.createElement('div'));

  let mainView = new LoadingPageView();
  mainView.appendTo(mainViewContainer).render();

  //////////////////////////////////////////////////////////////////////////////

  const AppRouter = BaseRouter.extend({
    defaultFragment: 'configs',

    routes: {
      'configs(/)': 'routeAppTablePageView',
      'configs/:id(/)': 'routeAppFormPageView',
      'configs/:id/home(/)': 'routeAppFormPageView__home',

      'form(/)': 'routeNotFoundPageView',
      'form/:name(/)': 'routeNotFoundPageView',
      'form/:name/:id(/)': 'routeFormPageView',

      'table(/)': 'routeNotFoundPageView',
      'table/:name(/)': 'routeNotFoundPageView',
      'table/:name/:id(/)': 'routeDefault',

      '*default': 'routeDefault'
    },

    /* global AppCollection AppTablePageView */
    routeAppTablePageView() {
      return Promise.resolve()
        .then(() => {
          const collection = new AppCollection();
          const view = new AppTablePageView({ collection });

          return mainView.swapWith(view).then(() => {
            mainView = view;
          });
        })
        .then(() => {
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

    /* global AppModel AppFormPageView AppFormSectionPageView AppFormFieldPageView fieldTypes AppFormRulePageView */
    /* global ruleConditions ruleTypes */
    routeAppFormPageView(id) {
      const model = new AppModel();

      const renderHome = () => {
        return Promise.resolve()
          .then(() => {
            const view = new AppFormPageView({ model, fieldTypes, ruleTypes, ruleConditions });

            view.on('openSection', sectionIndex => {
              renderSection(sectionIndex);
            });
            view.on('openField', (sectionIndex, rowIndex, fieldIndex) => {
              renderField(sectionIndex, rowIndex, fieldIndex);
            });
            view.on('openRule', ruleIndex => {
              renderRule(ruleIndex);
            });

            return mainView.swapWith(view).then(() => {
              mainView = view;
            });
          })
          .then(() => {
            const update = () => {
              app.setTitle(model.isNew() ? 'New App Module' : `App Module: ${model.get('name')}`);
              app.setBreadcrumb(
                [
                  { name: APP_TITLE, link: '#configs' },
                  model.isNew()
                    ? { name: 'New App Module', link: '#configs/home' }
                    : { name: 'App Module', link: `#configs/${id}` }
                ],
                true
              );

              const newId = model.isNew() ? 'new' : model.id;
              this.lastFragment = `configs/${newId}`;
              this.navigate(this.lastFragment, { trigger: false, replace: true });
            };
            update(false);
            mainView.listenTo(model, `change:${model.idAttribute}`, update);

            if (this._showFocus) {
              app.titleElement.focus();
            } else {
              this._showFocus = true;
            }
          })
          .catch(error => {
            /* eslint-disable no-console */
            if (window.console && console.error) {
              console.error('Error', error);
            }
            /* eslint-enabled no-console */

            alert('An error has occured.');
          });
      };

      const renderSection = sectionIndex => {
        return Promise.resolve()
          .then(() => {
            const view = new AppFormSectionPageView({ model, sectionIndex });

            view.on('navigateBack', () => {
              renderHome();
            });

            return mainView.swapWith(view).then(() => {
              mainView = view;
            });
          })
          .then(() => {
            app.setTitle('Section');
            app.setBreadcrumb(
              [
                { name: APP_TITLE, link: '#configs' },
                model.isNew()
                  ? { name: 'New App Module', link: '#configs/new/home' }
                  : { name: 'App Module', link: `#configs/${id}/home` },
                { name: 'Section' }
              ],
              true
            );

            if (this._showFocus) {
              app.titleElement.focus();
            } else {
              this._showFocus = true;
            }
          })
          .catch(error => {
            /* eslint-disable no-console */
            if (window.console && console.error) {
              console.error('Error', error);
            }
            /* eslint-enabled no-console */

            alert('An error has occured.');
          });
      };

      const renderField = (sectionIndex, rowIndex, fieldIndex) => {
        return Promise.resolve()
          .then(() => {
            const view = new AppFormFieldPageView({ model, sectionIndex, rowIndex, fieldIndex, fieldTypes });

            view.on('navigateBack', () => {
              renderHome();
            });

            return mainView.swapWith(view).then(() => {
              mainView = view;
            });
          })
          .then(() => {
            app.setTitle('Field');
            app.setBreadcrumb(
              [
                { name: APP_TITLE, link: '#configs' },
                model.isNew()
                  ? { name: 'New App Module', link: '#configs/new/home' }
                  : { name: 'App Module', link: `#configs/${id}/home` },
                { name: 'Field' }
              ],
              true
            );

            if (this._showFocus) {
              app.titleElement.focus();
            } else {
              this._showFocus = true;
            }
          })
          .catch(error => {
            /* eslint-disable no-console */
            if (window.console && console.error) {
              console.error('Error', error);
            }
            /* eslint-enabled no-console */

            alert('An error has occured.');
          });
      };

      const renderRule = ruleIndex => {
        return Promise.resolve()
          .then(() => {
            const view = new AppFormRulePageView({ model, ruleIndex, ruleConditions, ruleTypes });

            view.on('navigateBack', () => {
              renderHome();
            });

            return mainView.swapWith(view).then(() => {
              mainView = view;
            });
          })
          .then(() => {
            app.setTitle('Rule');
            app.setBreadcrumb(
              [
                { name: APP_TITLE, link: '#configs' },
                model.isNew()
                  ? { name: 'New App Module', link: '#configs/new/home' }
                  : { name: 'App Module', link: `#configs/${id}/home` },
                { name: 'Rule' }
              ],
              true
            );

            if (this._showFocus) {
              app.titleElement.focus();
            } else {
              this._showFocus = true;
            }
          })
          .catch(error => {
            /* eslint-disable no-console */
            if (window.console && console.error) {
              console.error('Error', error);
            }
            /* eslint-enabled no-console */

            alert('An error has occured.');
          });
      };

      return Promise.resolve()
        .then(() => {
          if (id !== 'new') {
            model.set({ id });
            return model.fetch();
          } else {
            model.setSnapShot();
          }
        })
        .then(() => renderHome())
        .then(() => nextRouteFunction => {
          if (nextRouteFunction === 'routeAppFormPageView__home') {
            renderHome();
            return false;
          }

          if (model.hasChangedSinceSnapShot() && !confirm('You have unsaved changes, would you like to proceed?')) {
            return false;
          }
        });
    },

    /* global NotFoundPageView */
    routeNotFoundPageView() {
      return Promise.resolve()
        .then(() => {
          const view = new NotFoundPageView();

          return mainView.swapWith(view).then(() => {
            mainView = view;
          });
        })
        .then(() => {
          app.setTitle('Page Not Found');
          app.setBreadcrumb([{ name: 'Page Not Found' }], true);

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

    /* global FormPageView_FormView FormPageView FormModel */
    routeFormPageView(name, id) {
      return Promise.resolve()
        .then(() => {
          return doAjax({
            url: `/* @echo C3DATA_MEDIA_URL */('${name}.form.json')/$value`,
            method: 'GET'
          }).then(response => {
            return response.data;
          });
        })
        .then(formDefinition => {
          const NewFormModel = FormModel.extend({
            datatableColumns: formDefinition.datatableColumns,
            urlRoot: `/* @echo C3DATA_BASE_URL *//${name}`
          });
          const model = new NewFormModel();

          if (id !== 'new') {
            model.set(model.idAttribute, id);
            return model.fetch().then(() => {
              return { formDefinition, model };
            });
          }

          return { formDefinition, model };
        })
        .then(({ formDefinition, model }) => {
          const NewFormView = FormPageView_FormView.extend({ formDefinition });
          const NewFormPageView = FormPageView.extend({
            formView: NewFormView
          });
          const view = new NewFormPageView({ model });
          return mainView.swapWith(view);
        })
        .then(view => {
          mainView = view;

          app.setTitle('Form');
          app.setBreadcrumb([{ name: 'Form' }], true);

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

    routeTablePageView() {
      return Promise.resolve()
        .then(() => {
          const collection = new AppCollection();
          const view = new AppTablePageView({ collection });
          return mainView.swapWith(view);
        })
        .then(view => {
          mainView = view;

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
    }
  });

  new AppRouter();

  //////////////////////////////////////////////////////////////////////////////

  Backbone.history.start();
});
