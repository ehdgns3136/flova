/**
 * Created by donghoon on 17. 8. 15.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

import CustomPopup from 'components/CustomPopup';
import * as Style from './CredentialItemShowForm.style';
import DEFAULT_IMAGE from '../../assets/topic_image.png';
import CredentialItemShowFormActionSheet from './CredentialItemShowFormActionSheet';

class CredentialItemShowForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image: '',
      type: '',
    };
    this.updateShowContent = this.updateShowContent.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }
  componentWillMount() {
    this.updateShowContent(this.props.item);
  }
  componentWillReceiveProps(nextProps) {
    this.updateShowContent(nextProps.item);
  }

  makeDescription(description, word) {
    let newDescription = '';
    if (description === '') {
      newDescription = word;
    } else {
      newDescription = description.concat(`・${word}`);
    }
    return newDescription;
  }

  updateShowContent(item) {
    const id = item.get('id');
    const type = item.get('type');
    let title = '';
    let image = '';
    let description = '';
    if (type === 'education') {
      title = item.get('school');
      image = item.get('school_image');
      if (item.get('major') !== null) {
        description = this.makeDescription(description, item.get('major'));
      }
      if (item.get('minor') !== null) {
        description = this.makeDescription(description, item.get('minor'));
      }
      if (item.get('degree') !== '') {
        description = this.makeDescription(description, item.get('degree'));
      }
      if (item.get('attending') === true) {
        description = this.makeDescription(description, '재학중');
      } else {
        if (item.get('graduation_year') === 0) {
          description = this.makeDescription(description, '졸업함');
        } else {
          description = this.makeDescription(description, `${item.get('graduation_year')}년 졸업함`);
        }
      }
    } else if (type === 'employment') {
      title = item.get('company');
      image = item.get('company_image');
      if (item.get('role') !== null) {
        description = this.makeDescription(description, item.get('role'));
      }
      if (item.get('working') === true) {
        description = this.makeDescription(description, '근무중');
      } else {
        description = this.makeDescription(description, '근무했음');
      }
    } else {
      title = item.get('title');
    }
    this.setState({
      title,
      description,
      image,
      id,
      type,
    });
  }

  updateDescription() {
    this.props.onUpdateDescription(this.state.id);
  }

  render() {
    const { title, description, image, type } = this.state;
    return (
      <Style.ListItemWrapper>
        {
          (type !== 'text') ? (
            <Style.ImageBox src={(image) ? (image) : (DEFAULT_IMAGE)} />
          ) : (
            null
          )
        }
        {
          (type !== 'text') ? (
            <List.Content>
              <Style.HeaderWrapper>{title}</Style.HeaderWrapper>
              <Style.DescriptionWrapper>{description}</Style.DescriptionWrapper>
            </List.Content>
          ) : (
            <List.Content>
              <Style.HeaderOnlyWrapper>{title}</Style.HeaderOnlyWrapper>
            </List.Content>
          )
        }
        {
          (this.props.isMine) ? (
            <div>
              <MediaQuery maxWidth={1008}>
                <CredentialItemShowFormActionSheet
                  updateDescription={this.updateDescription}
                  toggleModify={this.props.toggleModify}
                  deleteItem={this.props.deleteItem}
                />
              </MediaQuery>
              <MediaQuery minWidth={1008}>
                <Style.OptionWrapper>
                  <CustomPopup
                    closeOnInsideClick
                    wrapElement={<div />}
                    trigger={
                      <Style.OptionText >
                        <Style.Ellipsis name="ellipsis horizontal" size="large" />
                      </Style.OptionText>
                    }
                    arrowPositionRight="20px"
                    marginTop="4px"
                  >
                    <Style.PopupContent>
                      <Style.BlockA onClick={this.updateDescription}>자기소개로 만들기</Style.BlockA>
                      <Style.BlockA onClick={this.props.toggleModify}>수정</Style.BlockA>
                      <Style.BlockA onClick={this.props.deleteItem}>삭제</Style.BlockA>
                    </Style.PopupContent>
                  </CustomPopup>
                </Style.OptionWrapper>
              </MediaQuery>
            </div>
          ) : (
            null
          )
        }
      </Style.ListItemWrapper>
    );
  }
}

CredentialItemShowForm.propTypes = {
  toggleModify: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  onUpdateDescription: PropTypes.func.isRequired,
  isMine: PropTypes.bool,
};

export default CredentialItemShowForm;
