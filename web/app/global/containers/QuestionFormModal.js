import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import QuestionFormModal from 'components/QuestionFormModal';
import {
  makeSelectLoggedInUser,
} from '../selectors';
import {
  makeSelectIsQuestionUploading,
  makeSelectIsQuestionUploadError,
  makeSelectInitialTitle,
} from '../models/question/selectors';
import {
  closeQuestionFormModal,
  postQuestionRequest,
} from '../models/question/actions';


const mapStateToProps = createStructuredSelector({
  loggedInUser: makeSelectLoggedInUser(),
  isUploading: makeSelectIsQuestionUploading(),
  isUploadError: makeSelectIsQuestionUploadError(),
  initialTitle: makeSelectInitialTitle(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCloseRequest: () => {
      dispatch(closeQuestionFormModal());
    },
    onPostQuestionRequest: (title, editorState, anonymous, topics) => {
      dispatch(postQuestionRequest(title, editorState, anonymous, topics));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFormModal);
