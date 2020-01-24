import ProfileCredentials from 'components/ProfileCredentials';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectProfile } from './selectors';
import { makeSelectLoggedInUser } from '../../global/selectors';
import { openCredentialFormModal } from './actions';


const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  loggedInUser: makeSelectLoggedInUser(),
});


function mapDispatchToProps(dispatch) {
  return {
    onOpenCredentialFormModal: () => {
      dispatch(openCredentialFormModal());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCredentials);
