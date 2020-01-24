import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TopicForm from 'components/TopicForm';
import { makeSelectTopicList } from './selectors';
import { loadTopicsRequestAction, selectTopicItemAction, addTopicsToUserRequestAction, signUpSuccessRedirectRequestAction } from './actions';

const mapStateToProps = createStructuredSelector({
  topicList: makeSelectTopicList(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestLoadTopics: () => {
      dispatch(loadTopicsRequestAction());
    },
    onClickTopicItem: (topicID) => {
      dispatch(selectTopicItemAction(topicID));
    },
    requestAddTopicsToUser: (selectedTopicItemList) => {
      dispatch(addTopicsToUserRequestAction(selectedTopicItemList));
    },
    signUpSuccessRedirect: () => {
      dispatch(signUpSuccessRedirectRequestAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm);
