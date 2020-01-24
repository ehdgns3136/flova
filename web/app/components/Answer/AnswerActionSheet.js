import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from 'components/ActionSheet';

import * as Style from './AnswerActionSheet.style';

class AnswerActionSheet extends React.Component {
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
    const { answer, onModify, onDelete, onBookmark } = this.props;

    return (
      <Style.Wrapper>
        <Style.IconButton onClick={this.handleOpen}>
          <i className="fa fa-ellipsis-h" />
        </Style.IconButton>
        {
          isOpened ?
            <ActionSheet onClose={this.handleClose} title="답변">
              {
                answer.get('is_mine') ? (
                  <div>
                    <Style.Item onClick={onModify}>
                      수정하기
                    </Style.Item>
                    <Style.Item onClick={onDelete}>
                      삭제하기
                    </Style.Item>
                  </div>
                ) : (
                  null
                )
              }
              <Style.Item onClick={onBookmark}>
                {
                  answer.get('is_bookmark') ? (
                    '북마크 취소'
                  ) : (
                    '북마크'
                  )
                }
              </Style.Item>
            </ActionSheet>
            : null
        }
      </Style.Wrapper>
    );
  }
}

AnswerActionSheet.propTypes = {
  onModify: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
};

export default AnswerActionSheet;
