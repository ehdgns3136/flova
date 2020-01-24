import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from 'components/ActionSheet';

import * as Style from './CommentActionSheet.style';

class CommentActionSheet extends React.Component {
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
    const { onModify, onDelete } = this.props;

    return (
      <Style.Wrapper>
        <Style.IconButton onClick={this.handleOpen}>
          <i className="fa fa-ellipsis-h" />
        </Style.IconButton>
        {
          isOpened ?
            <ActionSheet onClose={this.handleClose} title="댓글">
              <div>
                <Style.Item onClick={onModify}>
                  수정하기
                </Style.Item>
                <Style.Item onClick={onDelete}>
                  삭제하기
                </Style.Item>
              </div>
            </ActionSheet>
            : null
        }
      </Style.Wrapper>
    );
  }
}

CommentActionSheet.propTypes = {
  onModify: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentActionSheet;
