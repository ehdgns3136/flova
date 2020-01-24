// Absolute imports
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';
import Immutable from 'immutable';
import ProfilePopup from 'components/ProfilePopup';

// Relative imports
import * as Style from './index.style';
import defaultProfileImg from '../../assets/default-profile.png';

class AnswerWriterInfo extends React.Component {
  render() {
    const { answerWriter, showCreated, created, loggedInUser } = this.props;

    return answerWriter ? (
      <Style.AnswerWriterInfoContainer>
        {
          this.props.disableProfilePopup ? (
            <Link to={`/user/${answerWriter.get('id')}`} >
              {(answerWriter.get('profile_image')) ?
                (<Style.ProfileImage src={answerWriter.get('profile_image')} />)
                : (<Style.ProfileImage src={defaultProfileImg} />)}
            </Link>
          ) : (
              <ProfilePopup
                trigger={<Link to={`/user/${answerWriter.get('id')}`} >
                  {(answerWriter.get('profile_image')) ?
                    (<Style.ProfileImage src={answerWriter.get('profile_image')} />)
                    : (<Style.ProfileImage src={defaultProfileImg} />)}
                </Link>}
                user={answerWriter}
                loggedInUser={loggedInUser}
                onFollowUserRequest={this.props.onFollowUserRequest}
              />
            )
        }
        <Style.Writer>
          <Style.WriterInfo>
            {
              this.props.disableProfilePopup ? (
                <Style.WriterName to={`/user/${answerWriter.get('id')}`}>{answerWriter.get('name')}</Style.WriterName>
              ) :
                <ProfilePopup
                  trigger={<Style.WriterName to={`/user/${answerWriter.get('id')}`} >{answerWriter.get('name')}</Style.WriterName>}
                  user={answerWriter}
                  loggedInUser={loggedInUser}
                  onFollowUserRequest={this.props.onFollowUserRequest}
                />
            }
            {
              (answerWriter.get('description')) ? (
                (`, ${answerWriter.get('description')}`)
              ) : (
                  null
                )
            }
          </Style.WriterInfo>
          {
            showCreated ?
              <Style.Description>
                {`${moment(created).fromNow()}에 답변함`}
              </Style.Description>
              : null
          }
        </Style.Writer>
      </Style.AnswerWriterInfoContainer>
    ) : null;
  }
}

AnswerWriterInfo.defaultProps = {
  showCreated: true,
  disableProfilePopup: false,
};

AnswerWriterInfo.propTypes = {
  answerWriter: PropTypes.object,
  created: PropTypes.string,
  showCreated: PropTypes.bool,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onFollowUserRequest: PropTypes.func,
  disableProfilePopup: PropTypes.bool,
};

export default AnswerWriterInfo;
