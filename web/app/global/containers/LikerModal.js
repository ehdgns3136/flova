/**
 * Created by donghoon on 17. 12. 5.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LikerModal from 'components/LikerModal';
import {
  makeSelectIsLikerModalOpened,
  makeSelectLikers,
  makeSelectIsLikersLoading,
} from '../models/answer/selectors';

import {
  closeLikerModal,
} from '../models/answer/actions';

import {
  followUserRequest,
} from '../models/user/actions';

import {
  makeSelectLoggedInUser,
} from '../selectors';

const mapStateToProps = createStructuredSelector({
  isLikerModalOpened: makeSelectIsLikerModalOpened(),
  likers: makeSelectLikers(),
  loggedInUser: makeSelectLoggedInUser(),
  isLikersLoading: makeSelectIsLikersLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCloseLikerModalRequest: () => {
      dispatch(closeLikerModal());
    },
    onFollowUserRequest: (id) => {
      dispatch(followUserRequest(id));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LikerModal);
