import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import MediaQuery from 'react-responsive';
import DEFAULT_TOPIC_IMAGE from '../../assets/topic_image.png';

import * as Style from './index.style';


class TopicDescription extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleFollowButtonClick = this.handleFollowButtonClick.bind(this);
    this.onTopicImageChange = this.onTopicImageChange.bind(this);
    this.onTopicImageClick = this.onTopicImageClick.bind(this);
  }

  onTopicImageClick() {
    this.input.value = null;
    this.input.click();
  }

  onTopicImageChange(e) {
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      const src = URL.createObjectURL(file);
      this.props.onUpdateTopicImage(src, this.props.topic.get('id'));
    }
  }

  handleFollowButtonClick() {
    this.props.onFollowTopicRequest();
  }

  renderFollowButton(size) {
    const { topic } = this.props;
    return topic.get('is_following') ?
      <Style.UnfollowButton size={size} onClick={this.handleFollowButtonClick}>
        <span>팔로잉</span>
      </Style.UnfollowButton>
      :
      <Style.FollowButton size={size} onClick={this.handleFollowButtonClick}>
        팔로우
      </Style.FollowButton>;
  }

  render() {
    const { topic, loggedInUser } = this.props;

    return (
      <Style.BackgroundDiv>
        <Style.Container>
          <MediaQuery minWidth={640}>
            <Style.SpaceBetween>
              <Style.FlexContainer>
                {
                  loggedInUser && loggedInUser.get('is_staff') ? (
                    <Style.CameraButton
                      onClick={this.onTopicImageClick}
                    >
                      <Style.CameraBoxWrapper className="camera_icon">
                        <Style.CameraButtonIcon name="camera" size="large" />
                        주제사진 수정
                      </Style.CameraBoxWrapper>
                      <Style.TopicImage src={topic.get('topic_image') ? topic.get('topic_image') : DEFAULT_TOPIC_IMAGE} />
                      <input
                        type="file"
                        accept="image/*"
                        ref={(c) => { this.input = c; }}
                        onChange={this.onTopicImageChange}
                        style={{ display: 'none' }}
                      />
                    </Style.CameraButton>
                  ) : (
                    <Style.TopicImage src={topic.get('topic_image') ? topic.get('topic_image') : DEFAULT_TOPIC_IMAGE} />
                  )
                }
                <Style.TopicInfo>
                  <Style.Title>
                    {topic.get('title')}
                  </Style.Title>
                  <Style.Stats>
                    팔로워
                    <Style.StatNumber>
                      {topic.get('followed_num')}
                    </Style.StatNumber>
                    질문
                    <Style.StatNumber>
                      {topic.get('question_num')}
                    </Style.StatNumber>
                    답변
                    <Style.StatNumber>
                      {topic.get('answer_num')}
                    </Style.StatNumber>
                  </Style.Stats>
                </Style.TopicInfo>
              </Style.FlexContainer>
              <Style.UserFollowButtonContainer>
                {this.renderFollowButton('big')}
              </Style.UserFollowButtonContainer>
            </Style.SpaceBetween>
          </MediaQuery>
          <MediaQuery maxWidth={640}>
            <Style.SpaceBetween>
              <Style.TopicImage src={topic.get('topic_image') ? topic.get('topic_image') : DEFAULT_TOPIC_IMAGE} />
              <Style.FlexItem>
                <Style.StatElement>
                  <Style.StatNumber>
                    {topic.get('followed_num')}
                  </Style.StatNumber>
                  팔로워
                </Style.StatElement>
                <Style.StatElement>
                  <Style.StatNumber>
                    {topic.get('question_num')}
                  </Style.StatNumber>
                  질문
                </Style.StatElement>
                <Style.StatElement>
                  <Style.StatNumber>
                    {topic.get('answer_num')}
                  </Style.StatNumber>
                  답변
                </Style.StatElement>
              </Style.FlexItem>
            </Style.SpaceBetween>
            <Style.SpaceBetween>
              <Style.Title>
                {topic.get('title')}
              </Style.Title>
              <Style.UserFollowButtonContainer>
                {this.renderFollowButton('small')}
              </Style.UserFollowButtonContainer>
            </Style.SpaceBetween>
          </MediaQuery>
        </Style.Container>
      </Style.BackgroundDiv>
    );
  }
}

TopicDescription.propTypes = {
  topic: PropTypes.instanceOf(Immutable.Map).isRequired,
  onFollowTopicRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onUpdateTopicImage: PropTypes.func.isRequired,
};

export default TopicDescription;
