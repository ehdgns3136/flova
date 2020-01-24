import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import { makeSelectIsLoggedIn, makeSelectCheckingAuth } from 'global/selectors';

import { Dimmer, Loader } from 'semantic-ui-react';


/**
 * Return a higher order component that redirects to Login page if not authenticated
 * also display loader while cheking authentication
 *
 * @param  {React.Component}
 *
 * @return {React.Component}
 */
function withAuthentication(Component) {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      if (!props.checkingAuth && (props.isLoggedIn === false)) {
        browserHistory.push('/intro');
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.checkingAuth && (nextProps.isLoggedIn === false)) {
        browserHistory.push('/intro');
      }
    }

    render() {
      return (
        (this.props.checkingAuth || (this.props.isLoggedIn === false)) ? (
          <Dimmer active>
            <Loader size='large' />
          </Dimmer>
        ) : (
          <Component {...this.props} />
        )
      );
    }
  }

  WithAuthentication.displayName = `WithAuthentication(${Component.displayName || Component.name || 'Component'})`;

  WithAuthentication.propTypes = {
    isLoggedIn: PropTypes.bool,
    checkingAuth: PropTypes.bool.isRequired,
  };

  const mapStateToProps = createStructuredSelector({
    isLoggedIn: makeSelectIsLoggedIn(),
    checkingAuth: makeSelectCheckingAuth(),
  });

  return connect(mapStateToProps, null)(WithAuthentication);
}

export default withAuthentication;
