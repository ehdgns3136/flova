/**
*
* QuestionDetailStats
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Style from './index.style';
import Immutable from 'immutable';

class QuestionDetailStats extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Style.QuestionStatContainer>
        통계
        <Style.Divider />
        {
          this.props.question ? (
            <div>
              <Style.StatElement>
                <Style.CustomIcon name="clock" />
                {`${moment(this.props.question.get('created')).fromNow()} 질문`}
              </Style.StatElement>
              <Style.StatElement>
                <Style.CustomIcon name="users" />
                팔로워 {this.props.question.get('followed_num')}
              </Style.StatElement>
              {/*<Style.StatElement>*/}
                {/* TODO 조회수 구현 */}
                {/*<Style.CustomIcon name="eye" />*/}
                {/*조회수 1.3만*/}
              {/*</Style.StatElement>*/}
              {
                this.props.question.get('last_answer_date') ? (
                  <Style.StatElement>
                    <Style.CustomIcon name="pencil" />
                    마지막 답변 {`${moment(this.props.question.get('last_answer_date')).fromNow()}`}
                  </Style.StatElement>
                ) : (
                  null
                )
              }
            </div>
          ) : (
            null
          )
        }
      </Style.QuestionStatContainer>
    );
  }
}

QuestionDetailStats.propTypes = {
  question: PropTypes.instanceOf(Immutable.Map),
};

export default QuestionDetailStats;
