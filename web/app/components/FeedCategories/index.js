// Absolute imports
import React from 'react';
import Immutable from 'immutable';
import { Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Relative imports
import * as Style from './index.style';

export class FeedCategories extends React.Component {
  render() {
    const { activeCategory, mobile } = this.props;

    return (mobile) ? (
      <Style.MobileMenu>
        <Style.MobileContainer>
          <Style.UnstyledLink to={'/'}>
            <Style.MobileItem
              isActive={activeCategory === 'home'}
            >홈</Style.MobileItem>
          </Style.UnstyledLink>
          <Style.UnstyledLink to={'/feed/bookmark_contents'}>
            <Style.MobileItem
              isActive={activeCategory === 'bookmark_contents'}
            >
              북마크
          </Style.MobileItem>
          </Style.UnstyledLink>
          {
            this.props.followingTopics.map((item) => (
              <Style.UnstyledLink key={item.get('id')} to={`/feed/topic/${item.get('id')}`}>
                <Style.MobileItem
                  isActive={activeCategory === `topic/${item.get('id')}`}
                >
                  {item.get('title')}
                </Style.MobileItem>
              </Style.UnstyledLink>
            ))
          }
        </Style.MobileContainer>
      </Style.MobileMenu>
    ) : (
        <Style.PaddingTopDiv>
          <Style.TealHeader>
            My Feeds
        </Style.TealHeader>
          <Divider />
          <Style.ListContainer>
            <Style.UnstyledLink to={'/'}>
              <Style.ListItem isActive={activeCategory === 'home'}>
                홈
              </Style.ListItem>
            </Style.UnstyledLink>
            <Style.UnstyledLink to={'/feed/bookmark_contents'}>
              <Style.ListItem to={'/feed/bookmark_contents'} isActive={activeCategory === 'bookmark_contents'}>
                북마크
              </Style.ListItem>
            </Style.UnstyledLink>
            <Style.ConstantListItem>
              내 관심사들
            </Style.ConstantListItem>
            {
              this.props.followingTopics.map((item) => (
                <Style.UnstyledLink key={item.get('id')} to={`/feed/topic/${item.get('id')}`}>
                  <Style.IndentedListItem
                    isActive={activeCategory === `topic/${item.get('id')}`}
                  >
                    {item.get('title')}
                  </Style.IndentedListItem>
                </Style.UnstyledLink>
              ))
            }
          </Style.ListContainer>
        </Style.PaddingTopDiv>
      );
  }
}

FeedCategories.propTypes = {
  followingTopics: PropTypes.instanceOf(Immutable.Iterable),
  activeCategory: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
};

export default FeedCategories;
