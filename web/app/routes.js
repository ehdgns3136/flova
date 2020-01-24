// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/(feed/:subpath(/:topicID))',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('homePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/intro',
      name: 'introPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/IntroPage/reducer'),
          import('containers/IntroPage/sagas'),
          import('containers/IntroPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('introPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/question/:questionID',
      name: 'questionDetailPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/QuestionDetailPage/reducer'),
          import('containers/QuestionDetailPage/sagas'),
          import('containers/QuestionDetailPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('questionDetailPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/answer/:answerID',
      name: 'answerDetailPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/AnswerDetailPage/reducer'),
          import('containers/AnswerDetailPage/sagas'),
          import('containers/AnswerDetailPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('answerDetailPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/user/:id',
      name: 'profilePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ProfilePage/reducer'),
          import('containers/ProfilePage/sagas'),
          import('containers/ProfilePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('profilePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/intro/password_reset/:key',
      name: 'passwordResetPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/IntroPasswordResetPage/reducer'),
          import('containers/IntroPasswordResetPage/sagas'),
          import('containers/IntroPasswordResetPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('passwordResetPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/topic/:id',
      name: 'topicDetailPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/TopicDetailPage/reducer'),
          import('containers/TopicDetailPage/sagas'),
          import('containers/TopicDetailPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('topicDetailPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/invite/:key',
      name: 'invitePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/InvitePage/reducer'),
          import('containers/InvitePage/sagas'),
          import('containers/InvitePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('invitePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/signup',
      name: 'introSignUpPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/IntroSignUpPage/reducer'),
          import('containers/IntroSignUpPage/sagas'),
          import('containers/IntroSignUpPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('introSignUpPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/email_check',
      name: 'introEmailCheckPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/IntroEmailCheckPage/reducer'),
          import('containers/IntroEmailCheckPage/sagas'),
          import('containers/IntroEmailCheckPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('introEmailCheckPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/notification',
      name: 'notificationPage',
      getComponent(location, cb) {
        import('containers/NotificationPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/search',
      name: 'mobileSearchPage',
      getComponent(nextState, cb) {
        import('containers/MobileSearchPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/user/:id/credential',
      name: 'mobileCredentialPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MobileCredentialPage/reducer'),
          import('containers/MobileCredentialPage/sagas'),
          import('containers/MobileCredentialPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('mobileCredentialPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/settings',
      name: 'settingsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SettingsPage/reducer'),
          import('containers/SettingsPage/sagas'),
          import('containers/SettingsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('settingsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/settings/profile',
      name: 'mobileProfileSettingPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MobileProfileSettingPage/reducer'),
          import('containers/MobileProfileSettingPage/sagas'),
          import('containers/MobileProfileSettingPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('mobileProfileSettingPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/settings/password',
      name: 'mobilePasswordResetPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MobilePasswordResetPage/reducer'),
          import('containers/MobilePasswordResetPage/sagas'),
          import('containers/MobilePasswordResetPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('mobilePasswordResetPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/create_invitement',
      name: 'mobileCreateInvitementPage',
      getComponent(location, cb) {
        import('containers/MobileCreateInvitementPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/write_question',
      name: 'mobileQuestionWritePage',
      getComponent(location, cb) {
        import('containers/MobileQuestionWritePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/question/:id/edit',
      name: 'mobileQuestionEditPage',
      getComponent(location, cb) {
        import('containers/MobileQuestionEditPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/question/:id/write_answer',
      name: 'mobileAnswerWritePage',
      getComponent(location, cb) {
        import('containers/MobileAnswerWritePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/answer/:id/edit',
      name: 'mobileAnswerEditPage',
      getComponent(location, cb) {
        import('containers/MobileAnswerEditPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/question/:id/followers',
      name: 'mobileFollowerPage',
      getComponent(location, cb) {
        import('containers/MobileFollowerPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/answer/:id/likers',
      name: 'mobileLikerPage',
      getComponent(location, cb) {
        import('containers/MobileLikerPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/about/:subpath',
      name: 'termsPage',
      getComponent(location, cb) {
        import('containers/TermsPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
