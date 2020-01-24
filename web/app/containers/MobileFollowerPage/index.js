/*
 *
 * MobileFollowerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Immutable from 'immutable';
import Helmet from 'react-helmet';
import MediaQuery from 'react-responsive';
import Navbar from 'global/containers/Navbar';
import MobileSimpleNavbar from 'global/containers/MobileSimpleNavbar';
import ActionUserList from 'components/ActionUserList';

import {
  makeSelectFollowers,
  makeSelectIsFollowersLoading,
} from '../../global/models/question/selectors';

import {
  getQuestionFollowersRequest,
} from '../../global/models/question/actions';

import {
  followUserRequest,
} from '../../global/models/user/actions';

import {
  makeSelectLoggedInUser,
} from '../../global/selectors';
import * as Style from './index.style';


export class MobileFollowerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onGetQuestionFollowersRequest(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.onGetQuestionFollowersRequest(nextProps.params.id);
    }
  }

  render() {
    const { followers, onFollowUserRequest, loggedInUser, isFollowersLoading } = this.props;

    return (
      <div>
        <Helmet>
          <title>이 질문을 팔로우한 유저 - 플로바(Flova)</title>
          <meta name="description" content="이 질문을 팔로우한 유저들입니다." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <MediaQuery minWidth={1008}>
          <Navbar transparent={false} />
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <MobileSimpleNavbar title="이 질문을 팔로우한 유저" />
        </MediaQuery>
        <Style.Container>
          <ActionUserList
            users={followers}
            onFollowUserRequest={onFollowUserRequest}
            loggedInUser={loggedInUser}
            isUsersLoading={isFollowersLoading}
          />
        </Style.Container>
      </div>
    );
  }
}

MobileFollowerPage.propTypes = {
  params: PropTypes.object,
  followers: PropTypes.instanceOf(Immutable.List),
  onFollowUserRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onGetQuestionFollowersRequest: PropTypes.func.isRequired,
  isFollowersLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  followers: makeSelectFollowers(),
  loggedInUser: makeSelectLoggedInUser(),
  isFollowersLoading: makeSelectIsFollowersLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFollowUserRequest: (id) => {
      dispatch(followUserRequest(id));
    },
    onGetQuestionFollowersRequest: (id) => {
      dispatch(getQuestionFollowersRequest(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileFollowerPage);
