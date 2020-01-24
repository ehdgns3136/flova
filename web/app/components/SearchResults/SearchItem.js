/**
 * Created by donghoon on 17. 7. 28.
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './SearchItem.style';
import DEFAULT_TOPIC_IMAGE from '../../assets/topic_image.png';
import DEFAULT_PROFILE_IMAGE from '../../assets/default-profile.png';

class SearchItem extends React.Component {
  renderHighlight(content, searchText) {
    // DO NOT TRY TO MODIFY THIS CODE UNTIL THERE IS A BUG...
    if (searchText.replace(/\s/g, '').length) {
      searchText = searchText.trim();
    }
    searchText = searchText.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    const regexedText = new RegExp(searchText, 'ig');
    const indices = [];
    let result;
    while ((result = regexedText.exec(content))) {
      indices.push(result.index);
    }
    if (indices.length === 0) {
      return content;
    }

    const highlightedText = [];
    for (let i = indices.length - 1; i >= 0; i--) {
      const front = content.slice(0, indices[i]);
      const middle = (<Style.HighLight key={i} >{content.substring(indices[i], indices[i] + searchText.length)}</Style.HighLight>);
      const end = content.slice(indices[i] + searchText.length, content.length);
      highlightedText.unshift(end);
      highlightedText.unshift(middle);
      content = front;
    }
    highlightedText.unshift(content);
    return highlightedText;
  }

  render() {
    const { result, searchText, index, resultSize, hover } = this.props;
    const type = result.get('type');
    if (searchText !== '') {
      if (type === 'question') {
        const id = result.get('id');
        const title = result.get('title');
        const answerNum = result.get('answer_num');
        const followedNum = result.get('followed_num');
        return (
          <Style.ItemContainer
            to={`/question/${id}`}
            flex={false}
            underline={index + 1 < resultSize}
            onMouseOver={() => this.props.onMouseOver(index)}
            onMouseOut={() => this.props.onMouseOut(index)}
            hover={hover}
            onClick={() => this.props.handleSearching(false)}
          >
            <Style.ResultHeader>
              {this.renderHighlight(title, searchText)}
            </Style.ResultHeader>
            <Style.ResultMeta>답변 {answerNum}&nbsp;&middot;&nbsp;팔로우 {followedNum}</Style.ResultMeta>
            <Style.ResultIcon className="icon" name="chevron right"></Style.ResultIcon>
          </Style.ItemContainer>
        );
      } else if (type === 'topic') {
        const title = result.get('title');
        const sampleImage = result.get('topic_image');
        const id = result.get('id');
        const followedNum = result.get('followed_num');
        return (
          <Style.ItemContainer
            to={`/topic/${id}`}
            flex
            underline={index + 1 < resultSize}
            onMouseOver={() => this.props.onMouseOver(index)}
            onMouseOut={() => this.props.onMouseOut(index)}
            hover={hover}
            onClick={() => this.props.handleSearching(false)}
          >
            {(sampleImage) ? <Style.TopicImage src={sampleImage} /> : <Style.TopicImage src={DEFAULT_TOPIC_IMAGE} />}
            <Style.ContentContainer>
              <Style.ResultHeader>
                {this.renderHighlight(title, searchText)}
              </Style.ResultHeader>
              <Style.ResultMeta>주제&nbsp;&middot;&nbsp;팔로워 {followedNum}</Style.ResultMeta>
              <Style.ResultIcon name="chevron right"></Style.ResultIcon>
            </Style.ContentContainer>
          </Style.ItemContainer>
        );
      } else if (type === 'user') {
        const name = result.get('name');
        const profileImage = result.get('profile_image');
        const id = result.get('id');
        const followerNum = result.get('follower_num');
        const description = result.get('description');
        return (
          <Style.ItemContainer
            to={`/user/${id}`}
            flex
            underline={index + 1 < resultSize}
            onMouseOver={() => this.props.onMouseOver(index)}
            onMouseOut={() => this.props.onMouseOut(index)}
            hover={hover}
            onClick={() => this.props.handleSearching(false)}
          >
            {(profileImage) ? <Style.ProfileImage src={profileImage} /> : <Style.ProfileImage src={DEFAULT_PROFILE_IMAGE} />}
            <Style.ContentContainer>
              <Style.ResultHeader>
                {this.renderHighlight(name, searchText)}
              </Style.ResultHeader>
              <Style.ResultMeta>
                프로필&nbsp;&middot;&nbsp;
                {
                  (description) ? (
                    `${description} · `
                  ) : null
                }
                팔로워 {followerNum}</Style.ResultMeta>
              <Style.ResultIcon name="chevron right"></Style.ResultIcon>
            </Style.ContentContainer>
          </Style.ItemContainer>
        );
      }
    }
    return null;
  }
}

SearchItem.propTypes = {
  result: PropTypes.object.isRequired,
  searchText: PropTypes.string.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  resultSize: PropTypes.number.isRequired,
  hover: PropTypes.bool.isRequired,
  handleSearching: PropTypes.func.isRequired,
};

export default SearchItem;
