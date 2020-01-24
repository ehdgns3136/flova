import { injectGlobal } from 'styled-components';
// Semantic-UI CSS(customized)
import '../semantic/dist/semantic.css';

// React-toastr CSS(customized)
import './assets/animate.css';
import './assets/toastr.css';

// React-select CSS(Customized)
import './assets/react-select.css';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
  @import url('https://fonts.googleapis.com/css?family=Droid+Sans+Mono');
  @import url('https://fonts.googleapis.com/css?family=Raleway:700');

  html, body {
    min-width: 100vw;
    min-height: 100vh;
    background-color: #F3F3F3;
    font-size: 14px;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @media (max-width: 640px) {
      background-color: #F2F2F2;
    }

    &:-moz-focus-inner {
      border:0;
    }
  }

  body {
    -webkit-tap-highlight-color: transparent;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
    color: #303030;
  }

  body.fontLoaded {
    font-family: 'Noto Sans KR', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  }

  body.stop-scrolling {
    height: 100%;
    overflow: hidden;
  }
  
  body.touchDevice a:active {
    color: inherit;
    text-decoration: none;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  p,
  label {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.5em;
    color: #303030;
  }

  input {
    font-family: 'Noto Sans KR', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  }

  #app > [data-reactroot] {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  :focus {
    outline: none;
  }

  a {
  color: #2BC3A3;
}

  body.noTouchDevice a:hover {
    color: #25a78b;
  }
  
  body.touchDevice a:active {
    color: #25a78b;
  }

  input::-webkit-contacts-auto-fill-button {
    visibility: hidden;
    display: none !important;
    pointer-events: none;
    position: absolute;
    right: 0;
  } /** remove contact safari autofill input icon */ 
`;
