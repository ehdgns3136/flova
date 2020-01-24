/**
 * Created by donghoon on 18. 2. 8.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import TermsForm from 'components/TermsForm';
import { makeSelectAccessToken, makeSelectAccessTokenType } from '../../global/selectors';
import { socialUserContinueRequestAction } from '../IntroPage/actions';
import { moveToSignUpAction } from './actions';

const mapStateToProps = createStructuredSelector({
  accessToken: makeSelectAccessToken(),
  accessTokenType: makeSelectAccessTokenType(),
});

function mapDispatchToProps(dispatch) {
  return {
    onMoveSignUp: () => {
      dispatch(moveToSignUpAction());
    },
    onSocialUserContinue: (accessToken, accessTokenType) => {
      dispatch(socialUserContinueRequestAction(accessToken, accessTokenType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsForm);
