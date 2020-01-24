/**
*
* CredentialForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';
import EducationCredentialWriteForm from 'components/EducationCredentialWriteForm';
import EmploymentCredentialWriteForm from 'components/EmploymentCredentialWriteForm';
import TextCredentialWriteForm from 'components/TextCredentialWriteForm';
import CredentialItem from 'components/CredentialItem';

import * as Style from './index.style';

class CredentialForm extends React.Component {
  render() {
    const { educationCredentialList, employmentCredentialList, textCredentialList, isMine,
      educationAdd, employmentAdd, textAdd } = this.props;

    return (
      <Style.ListWrapper divided relaxed>
        <Style.FlexWrapper>
          <Style.ListHeader>학력</Style.ListHeader>
          {
            (educationAdd) ? (
              null
            ) : (
              (isMine) ? (
                <Style.AddListItem onClick={this.props.onAddEducation}>
                  <Style.PlusIcon name="plus" />
                  추가하기
                </Style.AddListItem>
              ) : (
                null
              )
            )
          }
        </Style.FlexWrapper>
        {
          (educationCredentialList.size === 0 && !educationAdd) ? (
            <div>
              <Style.Divider />
              {
                (isMine) ? (
                  <Style.EmptyText>
                    학력을 추가해보세요.
                  </Style.EmptyText>
                ) : (
                  <Style.EmptyText>
                    학력을 추가하지 않았습니다.
                  </Style.EmptyText>
                )
              }
            </div>
          ) : (
            null
          )
        }
        {(educationCredentialList).map((education, index) =>
          <CredentialItem
            item={education}
            key={education.get('school').concat(index)}
            onDeleteCredential={this.props.onDeleteCredential}
            onModifyCredential={this.props.onModifyCredential}
            onGetTopicSearch={this.props.onGetTopicSearch}
            onGetConcentrationSearch={this.props.onGetConcentrationSearch}
            onAddTopic={this.props.onAddTopic}
            onAddConcentration={this.props.onAddConcentration}
            topicList={this.props.topicList}
            concentrationList={this.props.concentrationList}
            onUpdateDescription={this.props.onUpdateDescription}
            isMine={isMine}
          />)
        }
        {
          (isMine) ? (
            (educationAdd) ? (
              <EducationCredentialWriteForm
                onClickCancel={this.props.onCancelAddEducation}
                onGetTopicSearch={this.props.onGetTopicSearch}
                onGetConcentrationSearch={this.props.onGetConcentrationSearch}
                onAddTopic={this.props.onAddTopic}
                onAddConcentration={this.props.onAddConcentration}
                onPostCredential={this.props.onPostCredential}
                topicList={this.props.topicList}
                concentrationList={this.props.concentrationList}
              />) : (
              null
            )
          ) : (
            null
          )
        }
        <Style.HiddenDivider />
        <Style.FlexWrapper>
          <Style.ListHeader>직장</Style.ListHeader>
          {
            (employmentAdd) ? (
              null
            ) : (
              (isMine) ? (
                <Style.AddListItem onClick={this.props.onAddEmployment}>
                  <Style.PlusIcon name="plus" />
                  추가하기
                </Style.AddListItem>
              ) : (
                null
              )
            )
          }
        </Style.FlexWrapper>
        {
          (employmentCredentialList.size === 0 && !employmentAdd) ? (
            <div>
              <Style.Divider />
              {
                (isMine) ? (
                  <Style.EmptyText>
                    직장을 추가해보세요.
                  </Style.EmptyText>
                ) : (
                  <Style.EmptyText>
                    직장을 추가하지 않았습니다.
                  </Style.EmptyText>
                )
              }
            </div>
          ) : (
            null
          )
        }

        {(employmentCredentialList).map((employment, index) =>
          <CredentialItem
            item={employment}
            key={employment.get('company').concat(index)}
            onDeleteCredential={this.props.onDeleteCredential}
            onModifyCredential={this.props.onModifyCredential}
            onGetTopicSearch={this.props.onGetTopicSearch}
            onGetRoleSearch={this.props.onGetRoleSearch}
            onAddTopic={this.props.onAddTopic}
            onAddRole={this.props.onAddRole}
            topicList={this.props.topicList}
            roleList={this.props.roleList}
            onUpdateDescription={this.props.onUpdateDescription}
            isMine={isMine}
          />)
        }
        {
          (isMine) ? (
            (employmentAdd) ? (
              <EmploymentCredentialWriteForm
                onClickCancel={this.props.onCancelAddEmployment}
                onGetTopicSearch={this.props.onGetTopicSearch}
                onGetRoleSearch={this.props.onGetRoleSearch}
                onAddTopic={this.props.onAddTopic}
                onAddRole={this.props.onAddRole}
                onPostCredential={this.props.onPostCredential}
                topicList={this.props.topicList}
                roleList={this.props.roleList}
              />) : (
              null
            )
          ) : (
            null
          )
        }
        <Style.HiddenDivider />
        <Style.FlexWrapper>
          <Style.ListHeader>기타</Style.ListHeader>
          {
            (textAdd) ? (
              null
            ) : (
              (isMine) ? (
                <Style.AddListItem onClick={this.props.onAddText}>
                  <Style.PlusIcon name="plus" />
                  추가하기
                </Style.AddListItem>
              ) : (
                null
              )
            )
          }
        </Style.FlexWrapper>
        {
          (textCredentialList.size === 0 && !textAdd) ? (
            <div>
              <Style.Divider />
              {
                (isMine) ? (
                  <Style.EmptyText>
                    기타를 추가해보세요.
                  </Style.EmptyText>
                ) : (
                  <Style.EmptyText>
                    기타를 추가하지 않았습니다.
                  </Style.EmptyText>
                )
              }
            </div>
          ) : (
            null
          )
        }
        {(textCredentialList).map((text, index) =>
          <CredentialItem
            item={text}
            key={text.get('title').concat(index)}
            onDeleteCredential={this.props.onDeleteCredential}
            onModifyCredential={this.props.onModifyCredential}
            onUpdateDescription={this.props.onUpdateDescription}
            isMine={isMine}
          />)
        }
        {
        (isMine) ? (
          (textAdd) ? (
            <TextCredentialWriteForm
              onClickCancel={this.props.onCancelAddText}
              onPostCredential={this.props.onPostCredential}
            />) : (
            null
          )
        ) : (
          null
        )
      }
      </Style.ListWrapper>
    );
  }
}

CredentialForm.propTypes = {
  onUpdateDescription: PropTypes.func.isRequired,
  onGetTopicSearch: PropTypes.func.isRequired,
  onGetConcentrationSearch: PropTypes.func.isRequired,
  onGetRoleSearch: PropTypes.func.isRequired,
  onAddTopic: PropTypes.func.isRequired,
  onAddConcentration: PropTypes.func.isRequired,
  onAddRole: PropTypes.func.isRequired,
  onPostCredential: PropTypes.func.isRequired,
  onDeleteCredential: PropTypes.func.isRequired,
  onModifyCredential: PropTypes.func.isRequired,
  topicList: PropTypes.object,
  concentrationList: PropTypes.object,
  roleList: PropTypes.object,
  educationCredentialList: PropTypes.object,
  employmentCredentialList: PropTypes.object,
  textCredentialList: PropTypes.object,
  isMine: PropTypes.bool.isRequired,
  educationAdd: PropTypes.bool.isRequired,
  employmentAdd: PropTypes.bool.isRequired,
  textAdd: PropTypes.bool.isRequired,
  onAddEducation: PropTypes.func.isRequired,
  onAddEmployment: PropTypes.func.isRequired,
  onAddText: PropTypes.func.isRequired,
  onCancelAddEducation: PropTypes.func.isRequired,
  onCancelAddEmployment: PropTypes.func.isRequired,
  onCancelAddText: PropTypes.func.isRequired,
};

export default CredentialForm;
