/**
 *
 * TermsUpForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'semantic-ui-react';
import BigLogo from 'components/BigLogo';
import WonderEditorView from 'components/WonderEditor/WonderEditorView';
import { browserHistory } from 'react-router';
import {
  safelyParseEditorStateString,
} from 'components/WonderEditor/utils/editor-state-utils';
import { terms, privacy } from '../../terms';

import * as Style from './index.style';


class TermsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsEditorState: safelyParseEditorStateString(terms),
      privacyEditorState: safelyParseEditorStateString(privacy),
      checkedTerms: false,
      checkedPrivacy: false,
      validation: {
        checkedTerms: null,
        checkedPrivacy: null,
      },
    };

    this.handleTermsCheckBox = function (event) {
      let newState = {
        ...this.state,
        checkedTerms: !this.state.checkedTerms,
      };

      if (newState.checkedTerms) {
        newState.validation['checkedTerms'] = true;
      }
      else {
        newState.validation['checkedTerms'] = false;
      }

      this.setState(newState);
    }.bind(this);

    this.handlePrivacyCheckBox = function (event) {
      let newState = {
        ...this.state,
        checkedPrivacy: !this.state.checkedPrivacy,
      };

      if (newState.checkedPrivacy) {
        newState.validation['checkedPrivacy'] = true;
      }
      else {
        newState.validation['checkedPrivacy'] = false;
      }

      this.setState(newState);
    }.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { accessToken, accessTokenType, onMoveSignUp, onSocialUserContinue } = this.props;
    if (Object.keys(this.state.validation).every((key) => (this.state.validation[key] === true))) {
      if (accessToken) {
        onSocialUserContinue(accessToken, accessTokenType);
      } else {
        onMoveSignUp();
      }
    }
  }

  render() {
    const signUpDisabled = !Object.keys(this.state.validation).every((key) => (this.state.validation[key] === true));

    return (
      <Style.FlexFormContainer>
        <Style.TermsFormContainer>
          <BigLogo />
          <Style.Description>
            서비스 이용약관 및 개인정보처리방침에 동의해주세요.
          </Style.Description>
          <Style.FormContainer>
            <Form noValidate >
              <Form.Field>
                <Style.BoxTitle>
                  플로바 서비스 이용약관
                  <Style.CustomLink target="_blank" to="https://flova.kr/about/terms">(전문보기)</Style.CustomLink>
                </Style.BoxTitle>
                <Style.ScrollBox>
                  <WonderEditorView
                    editorState={this.state.termsEditorState}
                    readOnly
                  />
                </Style.ScrollBox>
                <Style.FormCheckBoxWrapper onClick={this.handleTermsCheckBox}>
                  <Style.CheckBox checked={this.state.checkedTerms} onChange={this.handleTermsCheckBox} />
                  <Style.HoverText>
                    플로바 이용약관 동의
                    <Style.Necessary>(필수)</Style.Necessary>
                  </Style.HoverText>
                </Style.FormCheckBoxWrapper>
                <Style.BoxTitle>
                  플로바 서비스 개인정보처리방침
                  <Style.CustomLink target="_blank" to="https://flova.kr/about/privacy">(전문보기)</Style.CustomLink>
                </Style.BoxTitle>
                <Style.ScrollBox>
                  <WonderEditorView
                    editorState={this.state.privacyEditorState}
                    readOnly
                  />
                </Style.ScrollBox>
                <Style.FormCheckBoxWrapper onClick={this.handlePrivacyCheckBox}>
                  <Style.CheckBox checked={this.state.checkedPrivacy} onChange={this.handlePrivacyCheckBox} />
                  <Style.HoverText>
                    플로바 개인정보처리방침 동의
                    <Style.Necessary>(필수)</Style.Necessary>
                  </Style.HoverText>
                </Style.FormCheckBoxWrapper>
                <Style.SignUpButton onClick={this.handleSubmit} disabled={signUpDisabled}>동의하기</Style.SignUpButton>
                <Style.GoBackButton onClick={browserHistory.goBack} >뒤로가기</Style.GoBackButton>
              </Form.Field>
            </Form>
          </Style.FormContainer>
        </Style.TermsFormContainer>
      </Style.FlexFormContainer>
    );
  }
}

TermsForm.propTypes = {
  onMoveSignUp: PropTypes.func.isRequired,
  accessToken: PropTypes.string,
  accessTokenType: PropTypes.string,
  onSocialUserContinue: PropTypes.func.isRequired,
};

export default TermsForm;
