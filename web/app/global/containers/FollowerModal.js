/**
 * Created by donghoon on 17. 12. 5.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FollowerModal from 'components/FollowerModal';
import {
  makeSelectIsFollowerModalOpened,
  makeSelectFollowers,
  makeSelectIsFollowersLoading,
} from '../models/question/selectors';

import {
  closeFollowerModal,
} from '../models/question/actions';

import {
  followUserRequest,
} from '../models/user/actions';

import {
  makeSelectLoggedInUser,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  isFollowerModalOpened: makeSelectIsFollowerModalOpened(),
  followers: makeSelectFollowers(),
  loggedInUser: makeSelectLoggedInUser(),
  isFollowersLoading: makeSelectIsFollowersLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCloseFollowerModalRequest: () => {
      dispatch(closeFollowerModal());
    },
    onFollowUserRequest: (id) => {
      dispatch(followUserRequest(id));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FollowerModal);
