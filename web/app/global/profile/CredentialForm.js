/**
 * Created by donghoon on 17. 9. 20.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CredentialForm from 'components/CredentialForm';

import {
  getTopicSearchRequestAction,
  getConcentrationSearchRequestAction,
  getRoleSearchRequestAction,
  addTopicRequestAction,
  addConcentrationRequestAction,
  addRoleRequestAction,
  postCredentialRequestAction,
  deleteCredentialRequestAction,
  modifyCredentialRequestAction,
  getCredentialListRequestAction,
  updateProfileImageRequestAction,
  updateDescriptionRequestAction,
  updateProfileRequestAction,
} from '../../global/profile/actions';

import {
  makeSelectTopicList,
  makeSelectConcentrationList,
  makeSelectRoleList,
  makeSelectEducationCredentialList,
  makeSelectEmploymentCredentialList,
  makeSelectTextCredentialList,
} from '../../global/profile/selectors';

const mapStateToProps = createStructuredSelector({
  topicList: makeSelectTopicList(),
  concentrationList: makeSelectConcentrationList(),
  roleList: makeSelectRoleList(),
  educationCredentialList: makeSelectEducationCredentialList(),
  employmentCredentialList: makeSelectEmploymentCredentialList(),
  textCredentialList: makeSelectTextCredentialList(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetTopicSearch: (searchText) => {
      dispatch(getTopicSearchRequestAction(searchText));
    },
    onGetConcentrationSearch: (searchText) => {
      dispatch(getConcentrationSearchRequestAction(searchText));
    },
    onGetRoleSearch: (searchText) => {
      dispatch(getRoleSearchRequestAction(searchText));
    },
    onAddTopic: (title) => {
      dispatch(addTopicRequestAction(title));
    },
    onAddConcentration: (title) => {
      dispatch(addConcentrationRequestAction(title));
    },
    onAddRole: (title) => {
      dispatch(addRoleRequestAction(title));
    },
    onPostCredential: (credential, credentialType) => {
      dispatch(postCredentialRequestAction(credential, credentialType));
    },
    onDeleteCredential: (id, credentialType) => {
      dispatch(deleteCredentialRequestAction(id, credentialType));
    },
    onModifyCredential: (id, credential) => {
      dispatch(modifyCredentialRequestAction(id, credential));
    },
    onUpdateProfileImage: (blobSrc) => {
      dispatch(updateProfileImageRequestAction(blobSrc));
    },
    onUpdateDescription: (credentialId) => {
      dispatch(updateDescriptionRequestAction(credentialId));
    },
    onUpdateProfile: (data) => {
      dispatch(updateProfileRequestAction(data));
    },
    onGetCredentialList: () => {
      dispatch(getCredentialListRequestAction());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CredentialForm);
