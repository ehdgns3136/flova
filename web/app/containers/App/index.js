/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ToastContainer, ToastMessage } from 'react-toastr';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { showToastSuccess } from 'global/actions';

import { makeSelectNextToastContent, makeSelectNextToastTitle, makeSelectNextToastType } from './selectors';
import * as Style from './index.style';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.node,
    nextToastType: PropTypes.string,
    nextToastTitle: PropTypes.string,
    nextToastContent: PropTypes.string,
    onShowToastSuccess: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    // TODO
    // if (nextProps.nextToastType) {
    //   switch (nextProps.nextToastType) {
    //     case 'SUCCESS':
    //       this.container.success(
    //         <Style.TransparentMessage icon size="small">
    //           <Icon name="checkmark" />
    //           <Message.Content>
    //             <Message.Header>{nextProps.nextToastTitle}</Message.Header>
    //             {nextProps.nextToastContent}
    //           </Message.Content>
    //         </Style.TransparentMessage>,
    //         null, {
    //           timeOut: 3000,
    //           extendedTimeOut: 1000,
    //           closeButton: true,
    //           showAnimation: 'animated fadeIn',
    //           hideAnimation: 'animated fadeOut',
    //         });
    //       break;
    //     case 'ERROR':
    //       this.container.error(
    //         <Style.TransparentMessage icon size="small">
    //           <Icon name="warning circle" />
    //           <Message.Content>
    //             <Message.Header>{nextProps.nextToastTitle}</Message.Header>
    //             {nextProps.nextToastContent}
    //           </Message.Content>
    //         </Style.TransparentMessage>,
    //         null, {
    //           timeOut: 3000,
    //           extendedTimeOut: 1000,
    //           closeButton: true,
    //           showAnimation: 'animated fadeIn',
    //           hideAnimation: 'animated fadeOut',
    //         }
    //       );
    //       break;
    //     default:
    //       break;
    //   }
    //   this.props.onShowToastSuccess();
    // }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Flova</title>
        </Helmet>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nextToastType: makeSelectNextToastType(),
  nextToastTitle: makeSelectNextToastTitle(),
  nextToastContent: makeSelectNextToastContent(),
});

function mapDispatchToProps(dispatch) {
  return {
    onShowToastSuccess: () => {
      dispatch(showToastSuccess());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
