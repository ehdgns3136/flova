/**
*
* ActionUserList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Loader, Dimmer } from 'semantic-ui-react';
import User from './User';
import * as Style from './index.style';


class ActionUserList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { users, onFollowUserRequest, loggedInUser, onCloseModalRequest, isUsersLoading } = this.props;
    return (
      <Style.Container>
        {
          isUsersLoading ? (
            <Dimmer active inverted>
              <Loader inverted />
            </Dimmer>
          ) : (
            users ? (
              users.map((user, index) => {
                if (index === users.size - 1) {
                  return (
                    <User
                      key={user.get('id')}
                      user={user}
                      onFollowUserRequest={onFollowUserRequest}
                      loggedInUser={loggedInUser}
                      onCloseModalRequest={onCloseModalRequest}
                    />
                  );
                }
                return (
                  <User
                    key={user.get('id')}
                    underline
                    user={user}
                    onFollowUserRequest={onFollowUserRequest}
                    loggedInUser={loggedInUser}
                    onCloseModalRequest={onCloseModalRequest}
                  />
                );
              })
            ) : (
                null
            )
          )
        }
      </Style.Container>
    );
  }
}

ActionUserList.propTypes = {
  users: PropTypes.instanceOf(Immutable.List),
  onFollowUserRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onCloseModalRequest: PropTypes.func,
  isUsersLoading: PropTypes.bool.isRequired,
};

export default ActionUserList;
