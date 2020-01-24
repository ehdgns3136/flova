import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import TopicItem from './TopicItem';
import * as Style from './TopicContainer.style';


function TopicContainer({ topicList, onClickTopicItem }) {
  return (
    <Style.TopicContainer>
      {
        topicList.map((topicItem) => <TopicItem key={topicItem.get('id')} topicItem={topicItem} onClickTopicItem={onClickTopicItem} />)
      }
    </Style.TopicContainer>
  );
}

TopicContainer.propTypes = {
  topicList: PropTypes.instanceOf(Immutable.Iterable),
  onClickTopicItem: PropTypes.func.isRequired,
};

export default TopicContainer;
