/**
 * Created by donghoon on 17. 11. 22.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MobileQuestionForm from 'components/MobileQuestionForm';
import {
  makeSelectLoggedInUser,
} from '../selectors';
import {
  makeSelectIsQuestionUploading,
  makeSelectIsQuestionUploadError,
  makeSelectInitialTitle,
} from '../models/question/selectors';
import {
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
    onPostQuestionRequest: (title, editorState, anonymous, topics) => {
      dispatch(postQuestionRequest(title, editorState, anonymous, topics));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileQuestionForm);
