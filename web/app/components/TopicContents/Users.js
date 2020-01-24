import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Loader } from 'semantic-ui-react';
import { Link } from 'react-router';

import * as Style from './Users.style';
import defaultProfileImg from '../../assets/default-profile.png';

function Users({ contents, isContentsLoading }) {
  return (
    <div>
      {
        isContentsLoading ?
          <Style.LoaderWrapper>
            <Loader active />
          </Style.LoaderWrapper>
          :
          <div>
            {
              contents.size !== 0 ?
                <Style.UserList>
                  {
                    contents.map((user, index) =>
                      <div key={user.get('id')}>
                        {
                          index !== 0 ?
                            <hr />
                            : null
                        }
                        <Style.User>
                          <Style.Rank>
                            {index + 1}
                          </Style.Rank>
                          <Link to={`/user/${user.get('id')}`}>
                            <Style.ProfileImage src={user.get('profile_image') ? user.get('profile_image') : defaultProfileImg} />
                          </Link>
                          <Style.NameAndDescription>
                            <Style.Name to={`/user/${user.get('id')}`}>{user.get('name')}</Style.Name>
                            {
                              user.get('description') !== '' ?
                                <p> {user.get('description')}</p>
                                : null
                            }
                          </Style.NameAndDescription>
                        </Style.User>
                      </div>
                    )
                  }
                </Style.UserList>
                :
                <Style.GreyCentered>
                  아직 답변을 작성한 유저가 없습니다.
                </Style.GreyCentered>
            }
          </div>
      }
    </div>
  );
}

Users.propTypes = {
  contents: PropTypes.instanceOf(Immutable.List),
  isContentsLoading: PropTypes.bool,
};

export default Users;
