/*
 *
 * MobileCredentialPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { createStructuredSelector } from 'reselect';
import Immutable from 'immutable';
import { Loader } from 'semantic-ui-react';

import Navbar from 'global/containers/Navbar';
import MobileSimpleNavbar from 'global/containers/MobileSimpleNavbar';
import CredentialForm from 'global/profile/CredentialForm';

import * as Style from './index.style';
import { makeSelectLoggedInUser } from '../../global/selectors';
import { makeSelectProfile, makeSelectIsMobileCredentialPageLoading } from './selectors';
import { getProfileRequest } from './actions';
export class MobileCredentialPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      educationAdd: false,
      employmentAdd: false,
      textAdd: false,
    };
    this.onAddEducation = this.onAddEducation.bind(this);
    this.onAddEmployment = this.onAddEmployment.bind(this);
    this.onAddText = this.onAddText.bind(this);
    this.onCancelAddEducation = this.onCancelAddEducation.bind(this);
    this.onCancelAddEmployment = this.onCancelAddEmployment.bind(this);
    this.onCancelAddText = this.onCancelAddText.bind(this);
  }

  componentDidMount() {
    this.props.onGetProfileRequest(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.onGetProfileRequest(nextProps.params.id);
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

  render() {
    const { loggedInUser, profile, isMobileCredentialPageLoading } = this.props;

    return (
      <div>
        <Helmet>
          <title>상세 프로필 - 플로바(Flova)</title>
          <meta name="description" content="상세 프로필을 설정하여 자신을 나타내보세요!" />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <MediaQuery minWidth={1008}>
          <Navbar transparent={false} />
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <MobileSimpleNavbar title="상세 프로필" />
        </MediaQuery>
        {
          (isMobileCredentialPageLoading) ? (
            <Style.MessageContainer>
              <Loader active size="huge" />
            </Style.MessageContainer>
          ) : (
              profile ? (
                <Style.CredentialFormContainer>
                  <CredentialForm
                    isMine={loggedInUser ? loggedInUser.get('id') === profile.get('id') : false}
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
              ) : (
                  <Style.MessageContainer>
                    <Style.StyledIcon className="fa fa-meh-o" />
                    존재하지 않는 유저입니다.
              </Style.MessageContainer>
                )
            )
        }
      </div>
    );
  }
}

MobileCredentialPage.propTypes = {
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  profile: PropTypes.object,
  params: PropTypes.object,
  onGetProfileRequest: PropTypes.func.isRequired,
  isMobileCredentialPageLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loggedInUser: makeSelectLoggedInUser(),
  profile: makeSelectProfile(),
  isMobileCredentialPageLoading: makeSelectIsMobileCredentialPageLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetProfileRequest: (id) => {
      dispatch(getProfileRequest(id));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MobileCredentialPage);
