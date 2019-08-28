// The main javascript file for app_factory.
// IMPORTANT:
// Any resources from this project should be referenced using SRC_PATH preprocessor var
// Ex: let myImage = '/*@echo SRC_PATH*//img/sample.jpg';

/* global $ Backbone cot_app BaseRouter LoadingPageView */

$(function() {
  const APP_TITLE = 'App Modules';

  const app = new cot_app(APP_TITLE, {
    hasContentTop: false,
    hasContentBottom: false,
    hasContentRight: false,
    hasContentLeft: false,
    searchcontext: 'INTRA'
  });
  app.setBreadcrumb([{ name: APP_TITLE, link: '#apps' }], true);
  app.render();

  const container = document.getElementById('app_factory_container');
  const mainViewContainer = container.appendChild(document.createElement('div'));

  let mainView = new LoadingPageView();
  mainView.appendTo(mainViewContainer).render();

  //////////////////////////////////////////////////////////////////////////////

  const AppRouter = BaseRouter.extend({
    defaultFragment: 'apps',

    routes: {
      'apps(/)': 'routeAppTablePageView',
      'apps/:id(/)': 'routeAppFormPageView',
      'apps/:id/home(/)': 'routeAppFormPageView__home',
      'apps/:id/section(/)': 'routeAppFormPageView__section',
      'apps/:id/row(/)': 'routeAppFormPageView__row',
      'apps/:id/field(/)': 'routeAppFormPageView__field',

      'table(/)': 'routeNotFoundPageView',
      'table/:name/:id(/)': 'routeDefault',

      'form(/)': 'routeNotFoundPageView',
      'form/:name/:id(/)': 'routeDefault',

      '*default': 'routeDefault'
    },

    /* global AppCollection AppTablePageView */
    routeAppTablePageView() {
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
    },

    /* global AppModel AppFormPageView */
    routeAppFormPageView(id) {
      const model = new AppModel();

      const renderHome = () => {
        return Promise.resolve()
          .then(() => {
            const view = new AppFormPageView({ model });
            return mainView.swapWith(view);
          })
          .then(view => {
            mainView = view;

            mainView.on('openSection', sectionIndex => {
              console.log('OPEN SECTION');
            });
            mainView.on('openField', (sectionIndex, rowIndex, fieldIndex) => {
              console.log('OPEN FIELD');
            });

            const update = (replaceFragment = true) => {
              if (model.isNew()) {
                app.setTitle('New App Module');
                app.setBreadcrumb([{ name: APP_TITLE, link: '#apps' }, { name: 'New App Module' }], true);
              } else {
                app.setTitle(`App Module: ${model.get('name')}`);
                app.setBreadcrumb([{ name: APP_TITLE, link: '#apps' }, { name: 'App Module' }], true);
              }

              if (replaceFragment) {
                const newId = model.isNew() ? 'new' : model.id;
                this.lastFragment = `apps/${newId}`;
                this.navigate(this.lastFragment, { trigger: false, replace: true });
              }
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

          // TODO - VERIFY
          if (nextRouteFunction === 'routeAppFormPageView__section') {
            return false;
          }

          // TODO - VERIFY
          if (nextRouteFunction === 'routeAppFormPageView__row') {
            return false;
          }

          // TODO - VERIFY
          if (nextRouteFunction === 'routeAppFormPageView__field') {
            return false;
          }

          // TODO - VERIFY
          if (model.hasChangedSinceSnapShot() && !confirm('Changes')) {
            return false;
          }
        });
    },

    /* global NotFoundPageView */
    routeNotFoundPageView() {
      return Promise.resolve()
        .then(() => {
          const view = new NotFoundPageView();
          return mainView.swapWith(view);
        })
        .then(view => {
          mainView = view;

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
    },

    routeFormPageView() {
      return Promise.resolve()
        .then(() => {
          const model = new AppModel();
          const view = new AppFormPageView({ model });
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
