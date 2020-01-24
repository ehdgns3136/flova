import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Icon } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import Immutable from 'immutable';
import * as Style from './index.style';

class ProfileCredentials extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderCredentials(credentials) {
    const { profile, loggedInUser } = this.props;
    const isMine = (profile && loggedInUser) ? profile.get('id') === loggedInUser.get('id') : false;
    const credentialList = credentials.map((credential) => {
      if (credential.get('type') === 'employment') {
        return (
          <li key={credential.get('id')}>
            <Style.IconContainer>
              <Icon name="suitcase" />
            </Style.IconContainer>
            {credential.get('to_string')}
          </li>
        );
      } else if (credential.get('type') === 'education') {
        return (
          <li key={credential.get('id')}>
            <Style.IconContainer>
              <Icon name="student" />
            </Style.IconContainer>
            {credential.get('to_string')}
          </li>
        );
      } else if (credential.get('type') === 'text') {
        return (
          <li key={credential.get('id')}>
            <Style.IconContainer>
              <Icon name="user" />
            </Style.IconContainer>
            {credential.get('to_string')}
          </li>
        );
      }
      console.error('not implemented profile');
      return null;
    });
    if (credentialList.size === 0) {
      return (
        <li key={0}>
          <Style.IconContainer>
            <Icon name="warning" />
          </Style.IconContainer>
          {
            (isMine) ? (
              <div>상세 프로필을 추가해주세요.</div>
            ) : (
              <div>상세 프로필을 추가하지 않았습니다.</div>
            )
          }
        </li>
      );
    }
    return credentialList;
  }
  render() {
    const { profile, onOpenCredentialFormModal, loggedInUser } = this.props;
    const isMine = (profile && loggedInUser) ? profile.get('id') === loggedInUser.get('id') : false;
    return (
      <Style.Container>
        <Style.ListHeader>
          <MediaQuery minWidth={1008}>
            상세 프로필
          </MediaQuery>
          <MediaQuery minWidth={1008}>
            {
              (isMine) ? (
                <Style.CredentialButton onClick={onOpenCredentialFormModal}>
                  수정
                </Style.CredentialButton>
                ) : (
                <Style.CredentialButton onClick={onOpenCredentialFormModal}>
                  더 보기
                </Style.CredentialButton>
                )
            }
          </MediaQuery>
        </Style.ListHeader>
        <Style.Divider />
        <Style.CredentialList>
          <MediaQuery maxWidth={1008}>
            {
              (isMine) ? (
                <Style.MobileCredentialButton to={`/user/${profile.get('id')}/credential`}>
                  수정
                </Style.MobileCredentialButton>
              ) : (
                <Style.MobileCredentialButton to={`/user/${profile.get('id')}/credential`}>
                  더 보기
                </Style.MobileCredentialButton>
              )
            }
          </MediaQuery>
          {
            this.renderCredentials(profile.get('string_credentials'))
          }
        </Style.CredentialList>
      </Style.Container>
    );
  }
}

ProfileCredentials.propTypes = {
  profile: PropTypes.object.isRequired,
  onOpenCredentialFormModal: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
};

export default ProfileCredentials;
