import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import QuestionEditFormModal from 'components/QuestionEditFormModal';
import {
  makeSelectIsQuestionUploading,
  makeSelectIsQuestionUploadError,
  makeSelectQuestionID,
  makeSelectInitialTitle,
  makeSelectInitialContent,
  makeSelectInitialTopics,
} from '../models/question/selectors';
import {
  closeQuestionEditFormModal,
  editQuestionRequest,
} from '../models/question/actions';


const mapStateToProps = createStructuredSelector({
  isUploading: makeSelectIsQuestionUploading(),
  isUploadError: makeSelectIsQuestionUploadError(),
  questionID: makeSelectQuestionID(),
  initialTitle: makeSelectInitialTitle(),
  initialContent: makeSelectInitialContent(),
  initialTopics: makeSelectInitialTopics(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCloseRequest: () => {
      dispatch(closeQuestionEditFormModal());
    },
    requestEditQuestion: (questionID, title, editorState, topics) => {
      dispatch(editQuestionRequest(questionID, title, editorState, topics));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionEditFormModal);
