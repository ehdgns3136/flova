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

import * as Style from './ActivityCardActionSheet.style';

class ActivityCardActionSheet extends React.Component {
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
    const { isBookmark, onBookmarkRequest, type } = this.props;

    return (
      <Style.Wrapper>
        <Style.IconButton onClick={this.handleOpen}>
          <Icon name="ellipsis horizontal" />
        </Style.IconButton>
        {
          isOpened ?
            <ActionSheet onClose={this.handleClose} title={(type) === 'question' ? '질문' : '답변'}>
              <div>
                <Style.Item onClick={onBookmarkRequest}>
                  {
                    isBookmark ? (
                      '북마크 취소'
                    ) : (
                      '북마크'
                    )
                  }
                </Style.Item>
              </div>
            </ActionSheet>
            : null
        }
      </Style.Wrapper>
    );
  }
}

ActivityCardActionSheet.propTypes = {
  onBookmarkRequest: PropTypes.func.isRequired,
  isBookmark: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default ActivityCardActionSheet;
