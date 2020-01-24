import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ActivityList from 'containers/TopicDetailPage/ActivityList';

import * as Style from './index.style';
import Users from './Users';


class TopicContents extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    this.props.onGetContentsRequest();
  }

  handleItemClick(e) {
    const itemName = e.target.getAttribute('name');
    this.props.onChangeActiveItem(itemName);
    this.props.onGetContentsRequest();
  }

  renderContents() {
    const { activeItem, contents, isContentsLoading, updateRedirectPage } = this.props;

    switch (activeItem) {
      case 'popularQuestions':
      case 'questionsToAnswer':
        return <ActivityList border updateRedirectPage={updateRedirectPage} />;
      case 'popularAnswerers':
        return <Users contents={contents} isContentsLoading={isContentsLoading} />
      default:
        return null;
    }
  }

  render() {
    const { activeItem } = this.props;
    return (
      <Style.Wrapper>
        <Style.Menu>
          <Style.MenuContainer>
            <Style.Item active={activeItem === 'popularQuestions'} name="popularQuestions" onClick={this.handleItemClick}>인기 있는</Style.Item>
            <Style.Item active={activeItem === 'questionsToAnswer'} name="questionsToAnswer" onClick={this.handleItemClick}>답변할만한</Style.Item>
            <Style.Item active={activeItem === 'popularAnswerers'} name="popularAnswerers" onClick={this.handleItemClick}>인기 있는 답변자</Style.Item>
          </Style.MenuContainer>
        </Style.Menu>
        <Style.Container>
          <Style.ContentContainer>
            <Style.Contents>
              {
                this.renderContents()
              }
            </Style.Contents>
          </Style.ContentContainer>
        </Style.Container>
      </Style.Wrapper>
    );
  }
}

TopicContents.propTypes = {
  onChangeActiveItem: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  onGetContentsRequest: PropTypes.func.isRequired,
  contents: PropTypes.instanceOf(Immutable.List),
  isContentsLoading: PropTypes.bool,
  updateRedirectPage: PropTypes.func.isRequired,
};

export default TopicContents;
