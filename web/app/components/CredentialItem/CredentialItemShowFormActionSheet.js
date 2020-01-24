/**
 * Created by donghoon on 17. 11. 15.
 */
/**
 * Created by donghoon on 17. 11. 14.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from 'components/ActionSheet';
import { Icon } from 'semantic-ui-react';

import * as Style from './CredentialItemShowFormActionSheet.style';

class CredentialItemShowFormActionSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({
      isOpened: true,
    });
  }

  handleClose() {
    this.setState({
      isOpened: false,
    });
  }

  render() {
    const { isOpened } = this.state;

    return (
      <Style.Wrapper>
        <Style.IconButton onClick={this.handleOpen}>
          <Icon name="ellipsis horizontal" />
        </Style.IconButton>
        {
          isOpened ?
            <ActionSheet onClose={this.handleClose} title="상세 프로필">
              <div>
                <Style.Item onClick={this.props.updateDescription}>
                  자기소개로 만들기
                </Style.Item>
                <Style.Item onClick={this.props.toggleModify}>
                  수정
                </Style.Item>
                <Style.Item onClick={this.props.deleteItem}>
                  삭제
                </Style.Item>
              </div>
            </ActionSheet>
            : null
        }
      </Style.Wrapper>
    );
  }
}

CredentialItemShowFormActionSheet.propTypes = {
  updateDescription: PropTypes.func.isRequired,
  toggleModify: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default CredentialItemShowFormActionSheet;
