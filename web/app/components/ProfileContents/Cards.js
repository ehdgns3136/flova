import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Loader } from 'semantic-ui-react';

import Card from './Card';
import * as Style from './Cards.style';

function Cards({ isLoading, topics, onFollowRequest, type, users, loggedInUser }) {
  if (type === 'topic') {
    return (
      (!isLoading && topics.size === 0) ? (
        <Style.GreyCenteredDiv>
          관심 설정한 주제가 없습니다.
        </Style.GreyCenteredDiv>
      ) : (
        <Style.FlexContainer>
          {
            isLoading ? (
              <Style.LoaderWrapper>
                <Loader active />
              </Style.LoaderWrapper>
            ) : (
              topics.map((topic) =>
                <Card type={type} topic={topic} key={topic.get('id')} onFollowRequest={() => onFollowRequest(topic.get('id'))} />
              )
            )
          }
        </Style.FlexContainer>
      )
    );
  } else {
    return (
      (!isLoading && users.size === 0) ? (
        (type === 'followingUsers') ? (
          <Style.GreyCenteredDiv>
            팔로우 중인 유저가 없습니다.
          </Style.GreyCenteredDiv>
        ) : (
          <Style.GreyCenteredDiv>
            팔로워가 없습니다.
          </Style.GreyCenteredDiv>
        )
      ) : (
        <Style.FlexContainer>
          {
            isLoading ? (
              <Style.LoaderWrapper>
                <Loader active />
              </Style.LoaderWrapper>
            ) : (
              users.map((user) =>
                <Card loggedInUser={loggedInUser} type="user" user={user} key={user.get('id')} onFollowRequest={() => onFollowRequest(user.get('id'))} />
              )
            )
          }
        </Style.FlexContainer>
      )
    );
  }
}

Cards.propTypes = {
  isLoading: PropTypes.bool,
  topics: PropTypes.instanceOf(Immutable.List),
  users: PropTypes.instanceOf(Immutable.List),
  onFollowRequest: PropTypes.func,
  type: PropTypes.string.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
};

export default Cards;
