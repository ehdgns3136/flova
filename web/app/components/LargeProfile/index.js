import React from 'react';
import PropTypes from 'prop-types';
import defaultProfileImg from 'assets/default-profile.png';
import { Icon } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import Immutable from 'immutable';
import UserFollowButton from 'components/UserFollowButton';
import ProfileActionSheet from './ProfileActionSheet';


import * as Style from './index.style';

class LargeProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      nameValidation: true,
      nameChange: false,
      name: this.props.profile.get('name'),
      descriptionChange: false,
      description: this.props.profile.get('description'),
      editingOnMobile: false,
      isActionSheetOpened: false,
    };

    this.renderProfileDetail = this.renderProfileDetail.bind(this);

    this.onNameChange = this.onNameChange.bind(this);
    this.onModifyName = this.onModifyName.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onEnterName = this.onEnterName.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onModifyDescription = this.onModifyDescription.bind(this);
    this.onSubmitDescription = this.onSubmitDescription.bind(this);
    this.onEnterDescription = this.onEnterDescription.bind(this);
    this.onCancelDescription = this.onCancelDescription.bind(this);
    this.onCancelName = this.onCancelName.bind(this);
    this.handleFollowUserRequest = this.handleFollowUserRequest.bind(this);
    this.handleCloseActionSheet = this.handleCloseActionSheet.bind(this);
    this.handleOpenActionSheet = this.handleOpenActionSheet.bind(this);
    this.onSubmitAll = this.onSubmitAll.bind(this);
    this.onCancelAll = this.onCancelAll.bind(this);
    this.toggleMobileEditMode = this.toggleMobileEditMode.bind(this);
    this.onProfileClick = this.onProfileClick.bind(this);
    this.onProfileChange = this.onProfileChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      description: nextProps.profile.get('description'),
    });
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value,
    });
    if (e.target.value !== '') {
      this.setState({
        nameValidation: true,
      });
    }
  }

  onModifyName() {
    this.setState({
      nameChange: true,
    });
  }

  onSubmitName() {
    if (this.state.name !== '') {
      this.props.onUpdateProfile({
        name: this.state.name,
      });
      this.setState({
        nameChange: false,
      });
    } else {
      this.setState({
        nameValidation: false,
      });
    }
  }

  onCancelName() {
    this.setState({
      name: this.props.profile.get('name'),
      nameChange: false,
    });
  }

  onEnterName(e) {
    if (e.which === 13) {
      if (this.state.name !== '') {
        this.props.onUpdateProfile({
          name: this.state.name,
        });
        this.setState({
          nameChange: false,
        });
      } else {
        this.setState({
          nameValidation: false,
        });
      }
    }
  }

  onDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onModifyDescription() {
    this.setState({
      descriptionChange: true,
    });
  }

  onSubmitDescription() {
    this.setState({
      descriptionChange: false,
    });
    this.props.onUpdateProfile({
      description: this.state.description,
    });
  }

  onCancelDescription() {
    this.setState({
      descriptionChange: false,
      description: this.props.profile.get('description'),
    });
  }

  onSubmitAll() {
    this.onSubmitName();
    this.onSubmitDescription();
    this.toggleMobileEditMode();
  }

  onCancelAll() {
    this.onCancelDescription();
    this.onCancelName();
    this.toggleMobileEditMode();
  }

  onEnterDescription(e) {
    if (e.which === 13) {
      this.setState({
        descriptionChange: false,
      });
      this.props.onUpdateProfile({
        description: this.state.description,
      });
    }
  }

  toggleMobileEditMode() {
    if (this.state.editingOnMobile) {
      document.body.classList.remove('stop-scrolling');
    } else {
      document.body.classList.add('stop-scrolling');
    }
    this.setState({
      editingOnMobile: !this.state.editingOnMobile,
    });
  }

  handleFollowUserRequest() {
    this.props.onFollowUserRequest(this.props.profile.get('id'));
  }

  handleOpenActionSheet() {
    this.setState({
      isActionSheetOpened: true,
    });
  }

  handleCloseActionSheet() {
    this.setState({
      isActionSheetOpened: false,
    });
  }

  renderProfileDetail(value) {
    const { loggedInUser, profile } = this.props;
    const isMine = (loggedInUser && profile) ? loggedInUser.get('id') === profile.get('id') : false;
    return (
      (this.state.descriptionChange) ? (
        <Style.ProfileDetailBox>
          <Style.ProfileDetailInput
            onChange={this.onDescriptionChange}
            onKeyDown={this.onEnterDescription}
            value={this.state.description}
            placeholder="자기소개를 만들어주세요."
          >
          </Style.ProfileDetailInput>
          <Style.CancelButton onClick={this.onCancelDescription}>
            취소
          </Style.CancelButton>
          <Style.SubmitButton onClick={this.onSubmitDescription}>
            완료
          </Style.SubmitButton>
        </Style.ProfileDetailBox>
      ) : (
          <Style.ModifyButtonWrapper>
            <Style.Description isMine={isMine}>
              {
                value ? value : '자기소개를 만들어주세요.'
              }
            </Style.Description>
            {
              isMine ? (
                <Style.WebEditToggleButton onClick={this.onModifyDescription}><Icon name="pencil" /></Style.WebEditToggleButton>
              ) :
                null
            }
          </Style.ModifyButtonWrapper>
        )
    );
  }

  onProfileClick() {
    this.input.value = null;
    this.input.click();
  }

  onProfileChange(e) {
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      const src = URL.createObjectURL(file);
      this.props.onUpdateProfileImage(src);
    }
  }

  render() {
    const { profile, loggedInUser, onOpenInviteModal, onLogout, handleItemClick } = this.props;
    const { description, name, isActionSheetOpened } = this.state;
    const profileImage = profile.get('profile_image');
    const isMine = (loggedInUser && profile) ? loggedInUser.get('id') === profile.get('id') : false;

    return (
      <Style.Container>
        <ProfileActionSheet
          isOpened={isActionSheetOpened}
          onClose={this.handleCloseActionSheet}
          onOpenInviteModal={onOpenInviteModal}
          onLogout={onLogout}
        />
        <Style.PaddingDiv>
          <MediaQuery maxWidth={1008}>
            <Style.MobileContainer>
              <Style.MobileFlexContainer>
                {
                  (profileImage) ? (
                    <Style.ProfileImage src={profileImage} />
                  ) : (
                      <Style.ProfileImage src={defaultProfileImg} />
                    )
                }
                <Style.FlexItem>
                  <Style.StatElement onClick={() => handleItemClick('followers')}>
                    <Style.StatNumber>
                      {profile.get('follower_num')}
                    </Style.StatNumber>
                    팔로워
                  </Style.StatElement>
                  <Style.StatElement onClick={() => handleItemClick('followingUsers')}>
                    <Style.StatNumber>
                      {profile.get('following_num')}
                    </Style.StatNumber>
                    팔로잉
                  </Style.StatElement>
                  <Style.StatElement>
                    <Style.StatNumber>
                      {profile.get('answer_likes')}
                    </Style.StatNumber>
                    좋아요
                  </Style.StatElement>
                </Style.FlexItem>
              </Style.MobileFlexContainer>
              <Style.HiddenDivider />
              <Style.MobileFlexContainer>
                {
                  isMine ?
                    <Style.ViewMoreButton onClick={this.handleOpenActionSheet}><i className="fa fa-cog" /></Style.ViewMoreButton>
                    : null
                }
                <div>
                  <Style.Name>
                    {name}
                  </Style.Name>
                  <Style.Description isMine={isMine}>
                    {description}
                  </Style.Description>
                </div>
                {
                  (isMine) ? (
                    null
                  ) : (
                      <Style.UserFollowButtonWrapper>
                        <UserFollowButton
                          isFollowing={profile.get('is_following')}
                          handleFollowUserRequest={this.handleFollowUserRequest}
                          size="small"
                        />
                      </Style.UserFollowButtonWrapper>
                    )
                }
              </Style.MobileFlexContainer>
            </Style.MobileContainer>
          </MediaQuery>
          <MediaQuery minWidth={1008}>
            <Style.SpaceBetween>
              <Style.FlexContainer>
                {
                  (isMine) ? (
                    <Style.CameraButton
                      onClick={this.onProfileClick}
                    >
                      <Style.CameraBoxWrapper className="camera_icon">
                        <Style.CameraButtonIcon name="camera" size="large" />
                        프로필사진 수정
                      </Style.CameraBoxWrapper>
                      {(profile.get('profile_image')) ? <Style.ProfileImage src={profile.get('profile_image')} />
                        : <Style.ProfileImage src={defaultProfileImg} />}
                      <input
                        type="file"
                        accept="image/*"
                        ref={(c) => { this.input = c; }}
                        onChange={this.onProfileChange}
                        style={{ display: 'none' }}
                      />
                    </Style.CameraButton>
                  ) : (
                    (profile.get('profile_image')) ? <Style.ProfileImage src={profile.get('profile_image')} />
                      : <Style.ProfileImage src={defaultProfileImg} />
                  )
                }
                <Style.ProfileContentContainer>
                  <Style.FlexItem>
                    <Style.Name>
                      {name}
                    </Style.Name>
                    {this.renderProfileDetail(description)}
                  </Style.FlexItem>
                  <Style.FlexItem>
                    <Style.StatElement onClick={() => handleItemClick('followers')}>
                      팔로워
                      <Style.StatNumber>
                        {profile.get('follower_num')}
                      </Style.StatNumber>
                    </Style.StatElement>
                    <Style.StatElement onClick={() => handleItemClick('followingUsers')}>
                      팔로잉
                      <Style.StatNumber>
                        {profile.get('following_num')}
                      </Style.StatNumber>
                    </Style.StatElement>
                    <Style.StatElement>
                      좋아요
                      <Style.StatNumber>
                        {profile.get('answer_likes')}
                      </Style.StatNumber>
                    </Style.StatElement>
                  </Style.FlexItem>
                </Style.ProfileContentContainer>
              </Style.FlexContainer>
              {
                (isMine) ? (
                  null
                ) : (
                    <Style.UserFollowButtonWrapper>
                      <UserFollowButton
                        isFollowing={profile.get('is_following')}
                        handleFollowUserRequest={this.handleFollowUserRequest}
                        size="big"
                      />
                    </Style.UserFollowButtonWrapper>
                  )
              }
            </Style.SpaceBetween>
          </MediaQuery>
        </Style.PaddingDiv>
      </Style.Container>
    );
  }
}

LargeProfile.propTypes = {
  profile: PropTypes.object,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onUpdateProfileImage: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
  onFollowUserRequest: PropTypes.func.isRequired,
  onOpenInviteModal: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  handleItemClick: PropTypes.func.isRequired,
};

export default LargeProfile;
