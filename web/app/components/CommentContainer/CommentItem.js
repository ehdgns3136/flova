/**
 * Created by donghoon on 17. 8. 30.
 */
/**
 *
 * CommentItem
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import CustomPopup from 'components/CustomPopup';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import * as Style from './CommentItem.style';
import DEFAULT_IMAGE from '../../assets/default-profile.png';
import CommentActionSheet from './CommentActionSheet';

class CommentItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      modifiable: false,
      comment: '',
    };
    this.onClickLike = this.onClickLike.bind(this);
    this.onClickModify = this.onClickModify.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.modifiable && this.state.modifiable) {
      const comment = ReactDOM.findDOMNode(this.commentInput);
      comment.style.height = (comment.scrollHeight + 4) + 'px';
    }
  }

  onClickLike() {
    const { loggedInUser, comment } = this.props;
    if (loggedInUser) {
      this.props.onLikeCommentRequest(comment.get('id'));
    } else {
      this.props.updateRedirectPage(browserHistory.getCurrentLocation().pathname);
      browserHistory.push('/intro');
    }
  }

  onClickModify() {
    this.setState({
      modifiable: true,
      comment: this.props.comment.get('content'),
    });
  }

  onSubmit(event) {
    this.setState({
      modifiable: false,
    });
    this.props.onPutCommentRequest(this.state.comment, this.props.comment.get('id'));
  }

  onDelete() {
    this.props.onDeleteCommentRequest(this.props.comment.get('id'));
  }

  handleInputChange(event) {
    this.setState({
      comment: event.target.value,
    });
    event.target.style.height = '39px';
    event.target.style.height = (event.target.scrollHeight + 4) + 'px';
  }

  render() {
    const { modifiable } = this.state;
    const { comment } = this.props;
    const writer = comment.get('writer');
    const profileImage = writer.get('profile_image');
    const name = writer.get('name');
    const content = comment.get('content');
    const likedNum = comment.get('liked_num');
    const created = comment.get('created');
    const isLiked = comment.get('is_liked');
    const isMine = comment.get('is_mine');

    const replacedContent = content.split('\n').map((item, key) => {
      return <span key={key}>{item}<br/></span>
    });

    return (
      (modifiable) ? (
        <Style.CommentInputWrapper>
          {
            (profileImage) ? (
              <Style.ModifyProfileImage src={profileImage} />
            ) : (
              <Style.ModifyProfileImage src={DEFAULT_IMAGE} />
            )
          }
          <Style.CommentInput
            placeholder="댓글 내용을 작성하세요..."
            onChange={this.handleInputChange}
            value={this.state.comment}
            ref={(input) => { this.commentInput = input; }}
            spellCheck="false"
          />
          <Style.SubmitButton onClick={this.onSubmit}>수정</Style.SubmitButton>
        </Style.CommentInputWrapper>
      ) : (
        <Style.CommentItemWrapper>
          <Style.ProfileImageWrapper to={`/user/${this.props.comment.get('writer').get('id')}`}>
            {
              (profileImage) ? (
                <Style.ProfileImage src={profileImage} />
              ) : (
                <Style.ProfileImage src={DEFAULT_IMAGE} />
              )
            }
          </Style.ProfileImageWrapper>
          <Style.ContentWrapper>
            <Style.WriterName to={`/user/${this.props.comment.get('writer').get('id')}`}>
              {name}
            </Style.WriterName>
            <Style.Content>{replacedContent}</Style.Content>
            <Style.ExtraIntoWrapper>
              <Style.LikeWrapper is_liked={isLiked} onClick={this.onClickLike}>
                <Style.IconWrapper name="thumbs outline up" />
                {likedNum}
              </Style.LikeWrapper>
              <Style.MiddleDot>·</Style.MiddleDot>
              <Style.Created>{`${moment(created).fromNow()}`}</Style.Created>
            </Style.ExtraIntoWrapper>
          </Style.ContentWrapper>
          <MediaQuery minWidth={1008}>
            {
              (isMine) ? (
                <Style.OptionWrapper>
                  <CustomPopup
                    closeOnInsideClick
                    wrapElement={<span />}
                    trigger={<Style.OptionText className="option_button">
                      <Icon size="small" link name="ellipsis horizontal" />
                    </Style.OptionText>}
                    arrowPositionRight="25px"
                    marginTop="5px"
                  >
                    <Style.PopupContent>
                      <Style.BlockA onClick={this.onClickModify}>수정</Style.BlockA>
                      <Style.BlockA onClick={this.onDelete}>삭제</Style.BlockA>
                    </Style.PopupContent>
                  </CustomPopup>
                </Style.OptionWrapper>
              ) : (
                null
              )
            }
          </MediaQuery>
          <MediaQuery maxWidth={1008}>
            {
              (isMine) ? (
                <Style.CommentActionSheetWrapper>
                  <CommentActionSheet onModify={this.onClickModify} onDelete={this.onDelete}/>
                </Style.CommentActionSheetWrapper>
              ) : (
                null
              )
            }
          </MediaQuery>
        </Style.CommentItemWrapper>
      )
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  onPutCommentRequest: PropTypes.func.isRequired,
  onDeleteCommentRequest: PropTypes.func.isRequired,
  onLikeCommentRequest: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  updateRedirectPage: PropTypes.func.isRequired,
};

export default CommentItem;
