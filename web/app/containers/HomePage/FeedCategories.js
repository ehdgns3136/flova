import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FeedCategories from 'components/FeedCategories';
import { makeSelectFollowingTopics } from 'global/selectors';
import { makeSelectActiveCategory } from './selectors';

const mapStateToProps = createStructuredSelector({
  followingTopics: makeSelectFollowingTopics(),
  activeCategory: makeSelectActiveCategory(),
});

export default connect(mapStateToProps, null)(FeedCategories);
