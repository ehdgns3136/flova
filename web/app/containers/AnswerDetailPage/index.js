/*
 *
 * AnswerDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import Immutable from 'immutable';
import { safelyParseEditorStateString, editorStateToString } from 'components/WonderEditor/utils/editor-state-utils';

import Navbar from 'global/containers/Navbar';
import AnswerDetailQuestion from './AnswerDetailQuestion';
import Answer from './Answer';

import {
  questionGetRequestAction,
  answerGetRequestAction,
  initializeReducer,
} from './actions';
import {
  makeSelectQuestion,
  makeSelectAnswer,
  makeSelectIsQuestionLoading,
  makeSelectIsAnswerLoading,
} from './selectors';
import * as Style from './index.style';

export class AnswerDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onGetQuestionRequest(this.props.params.answerID);
    this.props.onGetAnswerRequest(this.props.params.answerID);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.answerID !== nextProps.params.answerID) {
      this.props.onInitializeReducer();
      this.props.onGetQuestionRequest(nextProps.params.answerID);
      this.props.onGetAnswerRequest(nextProps.params.answerID);
    }
  }

  render() {
    const { answer, question, isAnswerLoading, isQuestionLoading } = this.props;

    const title = (answer && question) ? `${answer.get('writer').get('name')}님의 ${question.get('title')}에 대한 답변입니다 - 플로바(Flova)` : '플로바(Flova) - 세상을 이해하는 더 나은 방법';
    const description = answer ? `${editorStateToString(safelyParseEditorStateString(answer.get('content')))}` : null;

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
              {
                (!isAnswerLoading && !isQuestionLoading) ? (
                  question && answer ? (
                    <div>
                      <AnswerDetailQuestion />
                      <Style.Divider1 />
                      <Answer />
                      <Style.Divider2 />
                      {
                        question.get('answer_num') > 1 ? (
                          <Style.MoreAnswer to={`/question/${question.get('id')}`}>
                            더 많은 답변들 보러가기 ({question.get('answer_num')})
                            <Style.ArrowRight className="fa fa-arrow-right" />
                          </Style.MoreAnswer>
                        ) : (
                          null
                        )
                      }
                    </div>
                  ) : (
                    <Style.GreyCenteredDiv>
                      <Style.StyledIcon className="fa fa-meh-o" />
                      <div>답변이 존재하지 않습니다.</div>
                    </Style.GreyCenteredDiv>
                  )
                ) : (
                  // should be loading bar
                  null
                )
              }
            </Style.Container>
          </Style.FlexContainer>
        </Style.PaddingTopDiv>
        <Style.Footer>
          &copy; 2017 Flova
        </Style.Footer>
      </div>
    );
  }
}

AnswerDetailPage.propTypes = {
  onGetAnswerRequest: PropTypes.func.isRequired,
  onGetQuestionRequest: PropTypes.func.isRequired,
  onInitializeReducer: PropTypes.func.isRequired,
  params: PropTypes.object,
  question: PropTypes.instanceOf(Immutable.Map),
  answer: PropTypes.instanceOf(Immutable.Map),
  isQuestionLoading: PropTypes.bool.isRequired,
  isAnswerLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  question: makeSelectQuestion(),
  answer: makeSelectAnswer(),
  isQuestionLoading: makeSelectIsQuestionLoading(),
  isAnswerLoading: makeSelectIsAnswerLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetAnswerRequest: (answerID) => {
      dispatch(answerGetRequestAction(answerID));
    },
    onGetQuestionRequest: (answerID) => {
      dispatch(questionGetRequestAction(answerID));
    },
    onInitializeReducer: () => {
      dispatch(initializeReducer());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerDetailPage);
