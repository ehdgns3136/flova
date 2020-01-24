/**
 * Created by donghoon on 17. 10. 14.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { FeedCategories } from 'components/FeedCategories';
import { makeSelectFollowingTopics } from 'global/selectors';
import { makeSelectActiveCategory } from './selectors';
import { changeActiveCategory } from './actions';

const mapStateToProps = createStructuredSelector({
  followingTopics: makeSelectFollowingTopics(),
  activeCategory: makeSelectActiveCategory(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeActiveCategory: (category) => {
      dispatch(changeActiveCategory(category));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedCategories);
