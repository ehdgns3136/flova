/**
 * Created by donghoon on 17. 11. 22.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MobileQuestionForm from 'components/MobileQuestionForm';
import {
  makeSelectIsQuestionUploading,
  makeSelectIsQuestionUploadError,
  makeSelectQuestionID,
  makeSelectInitialTitle,
  makeSelectInitialContent,
  makeSelectInitialTopics,
} from '../models/question/selectors';
import {
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
    requestEditQuestion: (questionID, title, editorState, topics) => {
      dispatch(editQuestionRequest(questionID, title, editorState, topics));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MobileQuestionForm);
