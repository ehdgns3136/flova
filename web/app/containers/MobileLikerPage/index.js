/*
 *
 * MobileLikerPage
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
  makeSelectLikers,
  makeSelectIsLikersLoading,
} from '../../global/models/answer/selectors';

import {
  getAnswerLikersRequest,
} from '../../global/models/answer/actions';

import {
  followUserRequest,
} from '../../global/models/user/actions';

import {
  makeSelectLoggedInUser,
} from '../../global/selectors';
import * as Style from './index.style';


export class MobileLikerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onGetAnswerLikersRequest(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.onGetAnswerLikersRequest(nextProps.params.id);
    }
  }

  render() {
    const { likers, onFollowUserRequest, loggedInUser, isLikersLoading } = this.props;

    return (
      <div>
        <Helmet>
          <title>이 답변을 좋아요한 유저 - 플로바(Flova)</title>
          <meta name="description" content="이 답변을 좋아요한 유저들입니다." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <MediaQuery minWidth={1008}>
          <Navbar transparent={false} />
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <MobileSimpleNavbar title="이 답변을 좋아요한 유저" />
        </MediaQuery>
        <Style.Container>
          <ActionUserList
            users={likers}
            onFollowUserRequest={onFollowUserRequest}
            loggedInUser={loggedInUser}
            isUsersLoading={isLikersLoading}
          />
        </Style.Container>
      </div>
    );
  }
}

MobileLikerPage.propTypes = {
  params: PropTypes.object,
  likers: PropTypes.instanceOf(Immutable.List),
  onFollowUserRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onGetAnswerLikersRequest: PropTypes.func.isRequired,
  isLikersLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  likers: makeSelectLikers(),
  loggedInUser: makeSelectLoggedInUser(),
  isLikersLoading: makeSelectIsLikersLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFollowUserRequest: (id) => {
      dispatch(followUserRequest(id));
    },
    onGetAnswerLikersRequest: (id) => {
      dispatch(getAnswerLikersRequest(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileLikerPage);
