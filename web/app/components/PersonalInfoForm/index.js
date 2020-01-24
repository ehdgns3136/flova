/**
*
* PersonalInfoForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { browserHistory } from 'react-router';
import CredentialForm from 'global/profile/CredentialForm';
import * as Style from './index.style';
import defaultProfileImg from '../../assets/default-profile.png';

import ClickOutsideUserName from './UserName';
import ClickOutsideDescription from './Description';

class PersonalInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      userName: '',
      educationAdd: false,
      employmentAdd: false,
      textAdd: false,
      descriptionChange: false,
      userNameChange: false,
    };
    this.onProfileClick = this.onProfileClick.bind(this);
    this.onProfileChange = this.onProfileChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddEducation = this.onAddEducation.bind(this);
    this.onAddEmployment = this.onAddEmployment.bind(this);
    this.onAddText = this.onAddText.bind(this);
    this.onCancelAddEducation = this.onCancelAddEducation.bind(this);
    this.onCancelAddEmployment = this.onCancelAddEmployment.bind(this);
    this.onCancelAddText = this.onCancelAddText.bind(this);
    this.onNameChangeToggle = this.onNameChangeToggle.bind(this);
    this.onDescriptionChangeToggle = this.onDescriptionChangeToggle.bind(this);
  }

  componentWillMount() {
    this.props.onGetCredentialList();
    if (this.props.user) {
      this.setState({
        userName: this.props.user.get('name'),
        description: this.props.user.get('description'),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userName: nextProps.user.get('name'),
      description: nextProps.user.get('description'),
    });
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

  onDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onNameChange(e) {
    this.setState({
      userName: e.target.value,
    });
  }

  onSubmit() {
    this.props.onUpdateProfile({
      description: this.state.description,
      name: this.state.userName,
    });
    if (this.props.page === 'MobileProfileSettingPage') {
      browserHistory.push(`/user/${this.props.user.get('id')}`);
    } else {
      this.props.signUpSuccessRedirect();
    }
  }

  onAddEducation() {
    this.setState({
      educationAdd: true,
    });
  }

  onAddEmployment() {
    this.setState({
      employmentAdd: true,
    });
  }

  onAddText() {
    this.setState({
      textAdd: true,
    });
  }

  onCancelAddEducation() {
    this.setState({
      educationAdd: false,
    });
  }

  onCancelAddEmployment() {
    this.setState({
      employmentAdd: false,
    });
  }

  onCancelAddText() {
    this.setState({
      textAdd: false,
    });
  }

  onNameChangeToggle() {
    this.setState({
      userNameChange: !this.state.userNameChange,
    });
  }

  onDescriptionChangeToggle() {
    this.setState({
      descriptionChange: !this.state.descriptionChange,
    });
  }
  render() {
    const { user } = this.props;

    return (
      <Style.PersonalInfoFormContainer>
        {
          (this.props.page === 'IntroPage') ? (
            <Style.FormHeader>
              정보를 입력해주세요.
            </Style.FormHeader>
          ) : (
            null
          )
        }
        <Style.ProfileContainer>
          <Style.CameraButton
            onClick={this.onProfileClick}
          >
            <Style.CameraIconWrapper>
              <Style.CameraIcon name="camera" size="large" />
            </Style.CameraIconWrapper>
            {(user.get('profile_image')) ? <Style.ProfileImage src={user.get('profile_image')} />
              : <Style.ProfileImage src={defaultProfileImg} />}
            <input
              type="file"
              accept="image/*"
              ref={(c) => { this.input = c; }}
              onChange={this.onProfileChange}
              style={{ display: 'none' }}
            />
          </Style.CameraButton>
          <Style.ProfileElement>
            <Style.ElementHeader>
              이름
            </Style.ElementHeader>
            <Style.Divider />
            {
              (this.state.userNameChange) ? (
                <ClickOutsideUserName
                  userName={this.state.userName}
                  onNameChange={this.onNameChange}
                  onNameChangeToggle={this.onNameChangeToggle}
                />
              ) : (
                (this.state.userName) ? (
                  <Style.FlexWrapper>
                    <Style.CustomText>{this.state.userName}</Style.CustomText>
                    <Style.PencilIcon name="pencil" onClick={this.onNameChangeToggle} />
                  </Style.FlexWrapper>
                ) : (
                  <Style.FlexWrapper>
                    <Style.CustomText grey>이름을 입력해주세요.</Style.CustomText>
                    <Style.PencilIcon name="pencil" onClick={this.onNameChangeToggle} />
                  </Style.FlexWrapper>
                )
              )
            }
          </Style.ProfileElement>
          <Style.ProfileElement>
            <Style.ElementHeader>
              자기소개
            </Style.ElementHeader>
            <Style.Divider />
            {
              (this.state.descriptionChange) ? (
                <ClickOutsideDescription
                  description={this.state.description}
                  onDescriptionChange={this.onDescriptionChange}
                  onDescriptionChangeToggle={this.onDescriptionChangeToggle}
                />
              ) : (
                (this.state.description) ? (
                  <Style.FlexWrapper>
                    <Style.CustomText>{this.state.description}</Style.CustomText>
                    <Style.PencilIcon name="pencil" onClick={this.onDescriptionChangeToggle} />
                  </Style.FlexWrapper>
                ) : (
                  <Style.FlexWrapper>
                    <Style.CustomText grey>자기소개를 입력해주세요.</Style.CustomText>
                    <Style.PencilIcon name="pencil" onClick={this.onDescriptionChangeToggle} />
                  </Style.FlexWrapper>
                )
              )
            }
          </Style.ProfileElement>
        </Style.ProfileContainer>
        {
          (this.props.page === 'IntroPage') ? (
            <Style.CredentialFormContainer>
              <CredentialForm
                isMine
                educationAdd={this.state.educationAdd}
                employmentAdd={this.state.employmentAdd}
                textAdd={this.state.textAdd}
                onAddEducation={this.onAddEducation}
                onAddEmployment={this.onAddEmployment}
                onAddText={this.onAddText}
                onCancelAddEducation={this.onCancelAddEducation}
                onCancelAddEmployment={this.onCancelAddEmployment}
                onCancelAddText={this.onCancelAddText}
              />
            </Style.CredentialFormContainer>
          ) : null
        }
        {
          (this.props.page === 'IntroPage') ? (
            <Style.StyleButton
              inverted
              onClick={this.onSubmit}
            >완료
            </Style.StyleButton>
          ) : (
            <Style.StyleButton
              inverted
              onClick={this.onSubmit}
            >수정 완료
            </Style.StyleButton>
          )
        }
      </Style.PersonalInfoFormContainer>
    );
  }
}

PersonalInfoForm.propTypes = {
  onUpdateProfileImage: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Immutable.Map),
  page: PropTypes.string,
  onUpdateProfile: PropTypes.func.isRequired,
  onGetCredentialList: PropTypes.func.isRequired,
  signUpSuccessRedirect: PropTypes.func,
};

export default PersonalInfoForm;
