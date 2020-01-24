import ProfileContents from 'components/ProfileContents';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoggedInUser } from '../../global/selectors';
import { makeSelectIsContentsLoading, makeSelectActiveItem, makeSelectTopics, makeSelectQuestions, makeSelectUsers } from './selectors';
import { getQuestionsRequest, followTopicRequest } from './actions';
import { updateRedirectPageRequestAction } from '../../global/actions';
import { followUserRequest } from '../../global/models/user/actions';

const mapStateToProps = createStructuredSelector({
  loggedInUser: makeSelectLoggedInUser(),
  isContentsLoading: makeSelectIsContentsLoading(),
  activeItem: makeSelectActiveItem(),
  topics: makeSelectTopics(),
  questions: makeSelectQuestions(),
  users: makeSelectUsers(),
});


function mapDispatchToProps(dispatch) {
  return {
    onGetQuestionsRequest: (userId) => {
      dispatch(getQuestionsRequest(userId));
    },
    updateRedirectPage: (url) => {
      dispatch(updateRedirectPageRequestAction(url));
    },
    onFollowTopicRequest: (id) => {
      dispatch(followTopicRequest(id));
    },
    onFollowUserRequest: (id) => {
      dispatch(followUserRequest(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContents);
