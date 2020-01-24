/**
*
* CommentContainer
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import * as Style from './index.style';
import CommentItem from './CommentItem';
import DEFAULT_IMAGE from '../../assets/default-profile.png';

class CommentContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    this.props.onPostCommentRequest(this.state.comment);
    this.setState({
      comment: '',
    });
    // TODO textarea resize library
    // initialize height to 39px of all textarea which has class name 'comment'
    const commentInput = document.getElementsByClassName('comment');
    Object.keys(commentInput).forEach((key, index) => {
      if (commentInput[index].type === 'textarea') {
        commentInput[index].style.height = '39px';
      }
    });
  }

  handleInputChange(event) {
    this.setState({
      comment: event.target.value,
    });
    event.target.style.height = '39px';
    event.target.style.height = (event.target.scrollHeight+4) + 'px';
  }

  render() {
    return (
      <Style.CommentWrapper>
        {
          <Style.CommentInputWrapper>
            {
              (this.props.loggedInUser) ? (
                <Style.ProfileImage src={this.props.loggedInUser.get('profile_image') ? this.props.loggedInUser.get('profile_image') : DEFAULT_IMAGE} />
              ) : (
                <Style.ProfileImage src={DEFAULT_IMAGE} />
              )
            }
            <Style.CommentInput
              className="comment"
              placeholder="댓글 내용을 작성하세요..."
              onChange={this.handleInputChange}
              value={this.state.comment}
              spellCheck="false"
            />
            <Style.SubmitButton onClick={this.onSubmit}>게시</Style.SubmitButton>
          </Style.CommentInputWrapper>
        }
        {
          (this.props.isCommentsLoading) ? (
            <Style.MoreLoader active />
          ) : (
            (this.props.commentSize !== this.props.comments.size) ? (
              <Style.MoreComment onClick={this.props.onGetCommentRequest}>
                댓글 더 보기
              </Style.MoreComment>
            ) : (
              null
            )
          )
        }
        {
          this.props.comments.map((comment) => <CommentItem
            comment={comment}
            key={parseInt(`${moment(comment.get('created')).valueOf()}${comment.get('id')}`)}
            onPutCommentRequest={this.props.onPutCommentRequest}
            onDeleteCommentRequest={this.props.onDeleteCommentRequest}
            onLikeCommentRequest={this.props.onLikeCommentRequest}
            loggedInUser={this.props.loggedInUser}
            updateRedirectPage={this.props.updateRedirectPage}
          />)
        }
      </Style.CommentWrapper>
    );
  }
}

CommentContainer.propTypes = {
  comments: PropTypes.object.isRequired,
  commentSize: PropTypes.number.isRequired,
  loggedInUser: PropTypes.object,
  onGetCommentRequest: PropTypes.func.isRequired,
  onPostCommentRequest: PropTypes.func.isRequired,
  onPutCommentRequest: PropTypes.func.isRequired,
  onDeleteCommentRequest: PropTypes.func.isRequired,
  onLikeCommentRequest: PropTypes.func.isRequired,
  isCommentsLoading: PropTypes.bool,
  updateRedirectPage: PropTypes.func.isRequired,
};

export default CommentContainer;
