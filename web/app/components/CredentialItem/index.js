/**
*
* CredentialItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import EducationCredentialWriteForm from 'components/EducationCredentialWriteForm';
import EmploymentCredentialWriteForm from 'components/EmploymentCredentialWriteForm';
import TextCredentialWriteForm from 'components/TextCredentialWriteForm';
import CredentialItemShowForm from './CredentialItemShowForm';

class CredentialItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modify: false,
    };
    this.toggleModify = this.toggleModify.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  toggleModify() {
    this.setState({
      modify: !this.state.modify,
    });
  }

  deleteItem() {
    this.props.onDeleteCredential(this.props.item.get('id'), this.props.item.get('type'));
  }

  render() {
    let ModifyForm = '';
    if (this.props.item.get('type') === 'education') {
      ModifyForm = (
        <EducationCredentialWriteForm
          onClickCancel={this.toggleModify}
          onGetTopicSearch={this.props.onGetTopicSearch}
          onGetConcentrationSearch={this.props.onGetConcentrationSearch}
          onAddTopic={this.props.onAddTopic}
          onAddConcentration={this.props.onAddConcentration}
          onPostCredential={(credential, credentialType) =>
            this.props.onModifyCredential(this.props.item.get('id'), Object.assign(credential, { type: credentialType }))}
          topicList={this.props.topicList}
          concentrationList={this.props.concentrationList}
          credential={this.props.item}
        />
      );
    } else if (this.props.item.get('type') === 'employment') {
      ModifyForm = (
        <EmploymentCredentialWriteForm
          onClickCancel={this.toggleModify}
          onGetTopicSearch={this.props.onGetTopicSearch}
          onGetRoleSearch={this.props.onGetRoleSearch}
          onAddTopic={this.props.onAddTopic}
          onAddRole={this.props.onAddRole}
          onPostCredential={(credential, credentialType) =>
            this.props.onModifyCredential(this.props.item.get('id'), Object.assign(credential, { type: credentialType }))}
          topicList={this.props.topicList}
          roleList={this.props.roleList}
          credential={this.props.item}
        />
      );
    } else {
      ModifyForm = (
        <TextCredentialWriteForm
          onClickCancel={this.toggleModify}
          onPostCredential={(credential, credentialType) =>
            this.props.onModifyCredential(this.props.item.get('id'), Object.assign(credential, { type: credentialType }))}
          credential={this.props.item}
        />
      );
    }
    return (
      (this.state.modify) ? (ModifyForm) : (
        <CredentialItemShowForm
          item={this.props.item}
          toggleModify={this.toggleModify}
          deleteItem={this.deleteItem}
          onUpdateDescription={this.props.onUpdateDescription}
          isMine={this.props.isMine}
        />
      )
    );
  }
}

CredentialItem.propTypes = {
  onGetTopicSearch: PropTypes.func,
  onGetConcentrationSearch: PropTypes.func,
  onGetRoleSearch: PropTypes.func,
  onAddTopic: PropTypes.func,
  onAddConcentration: PropTypes.func,
  onAddRole: PropTypes.func,
  onModifyCredential: PropTypes.func.isRequired,
  onDeleteCredential: PropTypes.func.isRequired,
  item: PropTypes.object,
  topicList: PropTypes.object,
  concentrationList: PropTypes.object,
  roleList: PropTypes.object,
  onUpdateDescription: PropTypes.func.isRequired,
  isMine: PropTypes.bool,
};

export default CredentialItem;

