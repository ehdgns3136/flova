/**
 * Created by donghoon on 18. 1. 29.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MobileSimpleNavbar from 'components/MobileSimpleNavbar';

import {
  closeAnnounceModalRequestAction,
} from '../actions';
import {
  makeSelectIsAnnounceModalOpened,
  makeSelectAnnounceType,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  isAnnounceModalOpened: makeSelectIsAnnounceModalOpened(),
  announceType: makeSelectAnnounceType(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCloseAnnounceModalRequest: () => {
      dispatch(closeAnnounceModalRequestAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileSimpleNavbar);
