/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';


// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import { ThemeProvider } from 'styled-components';
import 'sanitize.css/sanitize.css';
import FontFaceObserver from 'fontfaceobserver';
import moment from 'moment';
import Clipboard from 'clipboard/dist/clipboard';

// Import root app
import App from 'containers/App';

// Import selector for `syncHistoryWithStore`
import { makeSelectLocationState } from 'containers/App/selectors';
import { unsubscribeClient } from 'utils/service-worker-notification';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import '!file-loader?name=[name].[ext]!./sitemap.xml';
import '!file-loader?name=[name].[ext]!./robots.txt';
import '!file-loader?name=[name].[ext]!./assets/favicons/android-chrome-192x192.png';
import '!file-loader?name=[name].[ext]!./assets/favicons/android-chrome-512x512.png';
import '!file-loader?name=[name].[ext]!./assets/favicons/apple-touch-icon.png';
import '!file-loader?name=[name].[ext]!./assets/favicons/browserconfig.xml';
import '!file-loader?name=[name].[ext]!./assets/favicons/favicon-16x16.png';
import '!file-loader?name=[name].[ext]!./assets/favicons/favicon-32x32.png';
import '!file-loader?name=[name].[ext]!./assets/favicons/mstile-150x150.png';
import '!file-loader?name=[name].[ext]!./assets/favicons/safari-pinned-tab.svg';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './store';

// Import CSS reset and Global Styles
import './global-styles';

// Import root routes
import createRoutes from './routes';

import theme from './theme';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

moment.locale('ko');
// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const NotoSansKRObserver = new FontFaceObserver('Noto Sans KR', {});

Promise.all([NotoSansKRObserver.load()]).then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

if ('ontouchstart' in window || navigator.maxTouchPoints) {
  document.body.classList.add('touchDevice');
} else {
  document.body.classList.add('noTouchDevice');
}

// Browser Checks
const isIE = /*@cc_on!@*/false || !!document.documentMode;
if (isIE) {
  alert('IE는 현재 공식적으로 지원하지 않습니다. 가급적 Chrome을 사용해주세요.');
}

const isEdge = /Edge/.test(navigator.userAgent);
if (isEdge) {
  alert('Edge는 현재 공식적으로 지원하지 않습니다. 가급적 Chrome을 사용해주세요.')
}

// Set up the router, wrapping all Routes in the App component
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router
        history={history}
        routes={rootRoute}
        render={
          // Scroll to top when going to a new page, imitating default browser
          // behaviour
          applyRouterMiddleware(useScroll())
        }
      />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
);

// Facebook api setup
FB.init({
  appId: '1429194040449767',
  autoLogAppEvents: true,
  xfbml: true,
  version: 'v2.10',
});
FB.AppEvents.logPageView();

// Kakao api setup
Kakao.init('d7078f70433406cf4eab870062dc294f');

// Clipboard copy api setup
new Clipboard('.clipboard');

// Unsubscribe when token is undefined
if (!localStorage.getItem('token') && 'serviceWorker' in navigator) {
  unsubscribeClient();
}
