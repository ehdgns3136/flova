/**
 * Created by donghoon on 17. 9. 20.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CredentialFormModal from 'components/CredentialFormModal';

import {
  closeCredentialFormModal,
} from './actions';

import {
  makeSelectIsCredentialFormModalOpened,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  isCredentialFormModalOpened: makeSelectIsCredentialFormModalOpened(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCloseModalRequest: () => {
      dispatch(closeCredentialFormModal());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CredentialFormModal);
