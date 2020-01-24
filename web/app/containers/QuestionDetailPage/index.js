/*
 *
 * QuestionDetailPage
 *
 */


import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MediaQuery from 'react-responsive';
import Immutable from 'immutable';
import { safelyParseEditorStateString, editorStateToString } from 'components/WonderEditor/utils/editor-state-utils';

import Navbar from 'global/containers/Navbar';
import QuestionDetailAnswerList from './QuestionDetailAnswerList';
import QuestionDetailQuestion from './QuestionDetailQuestion';
import QuestionDetailStats from './QuestionDetailStats';
import { questionGetRequestAction, answersGetRequestAction, initializeReducer } from './actions';
import * as Style from './index.style';
import { makeSelectQuestion } from './selectors';


export class QuestionDetailPage extends React.Component {
  componentDidMount() {
    this.props.onGetQuestionRequest(this.props.params.questionID);
    this.props.onGetAnswersRequest(this.props.params.questionID);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.questionID !== nextProps.params.questionID) {
      this.props.onInitializeReducer();
      this.props.onGetQuestionRequest(nextProps.params.questionID);
      this.props.onGetAnswersRequest(nextProps.params.questionID);
    }
  }

  render() {
    const { state: locationState } = this.props.location;
    const { question } = this.props;

    const title = question ? `${question.get('title')} - 플로바(Flova)` : '플로바(Flova) - 세상을 이해하는 더 나은 방법';
    const description = question ? `${editorStateToString(safelyParseEditorStateString(question.get('content')))}` : null;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <Navbar transparent={false} />
        <Style.PaddingTopDiv>
          <Style.FlexContainer>
            <Style.Container>
              <QuestionDetailQuestion willWriteAnswer={locationState ? locationState.willWriteAnswer : false} />
              <QuestionDetailAnswerList />
            </Style.Container>
            <MediaQuery minWidth={1008} >
              <QuestionDetailStats />
            </MediaQuery>
          </Style.FlexContainer>
        </Style.PaddingTopDiv>
        <Style.Footer>
          &copy; 2017 Flova <br />
        </Style.Footer>
      </div>
    );
  }
}

QuestionDetailPage.propTypes = {
  onGetQuestionRequest: PropTypes.func.isRequired,
  onGetAnswersRequest: PropTypes.func.isRequired,
  params: PropTypes.object,
  location: PropTypes.object,
  question: PropTypes.instanceOf(Immutable.Map),
  onInitializeReducer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  question: makeSelectQuestion(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetAnswersRequest: (questionID) => {
      dispatch(answersGetRequestAction(questionID));
    },
    onGetQuestionRequest: (questionID) => {
      dispatch(questionGetRequestAction(questionID));
    },
    onInitializeReducer: () => {
      dispatch(initializeReducer());
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetailPage);
