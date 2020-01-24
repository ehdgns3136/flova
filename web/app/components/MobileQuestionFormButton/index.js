/**
*
* MobileQuestionFormButton
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import * as Style from './index.style';
import defaultProfileImg from '../../assets/default-profile.png';

class MobileQuestionFormButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { loggedInUser, setInitialTitle } = this.props;
    return (
      <Style.Container to="/write_question" onClick={() => setInitialTitle('')}>
        {
          (loggedInUser && loggedInUser.get('profile_image')) ? (
            <Style.ProfileImage src={loggedInUser.get('profile_image')} />
          ) : (
            <Style.ProfileImage src={defaultProfileImg} />
          )
        }
        <Style.Placeholder>
          질문이 있으신가요?
        </Style.Placeholder>
      </Style.Container>
    );
  }
}

MobileQuestionFormButton.propTypes = {
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  setInitialTitle: PropTypes.func.isRequired,
};

export default MobileQuestionFormButton;
