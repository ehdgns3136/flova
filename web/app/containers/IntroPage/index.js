/*
 *
 * IntroPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import Immutable from 'immutable';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import { Dimmer, Loader } from 'semantic-ui-react';

import LoginForm from './LoginForm';
import * as Style from './index.style';
import { makeSelectIsLoggedIn, makeSelectCheckingAuth } from '../../global/selectors';
import backgroundImg from '../../assets/intro-background.jpg';

export class IntroPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    if (this.props.isLoggedIn) {
      browserHistory.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>플로바(Flova) - 세상을 이해하는 더 나은 방법</title>
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        {
          (this.props.checkingAuth || this.props.isLoggedIn) ? (
            <Dimmer active>
              <Loader size="large" />
            </Dimmer>
          ) : (
            <Style.IntroPageContainer>
              <Style.BackgroundImage src={backgroundImg} role="presentation" width="100%" height="135%" />
              <LoginForm />
            </Style.IntroPageContainer>
          )
        }
      </div>
    );
  }
}

IntroPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  checkingAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  checkingAuth: makeSelectCheckingAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroPage);
