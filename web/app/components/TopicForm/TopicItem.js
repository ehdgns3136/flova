import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { Icon } from 'semantic-ui-react';
import * as Style from './TopicItem.style';


function TopicItem({ topicItem, onClickTopicItem }) {
  const id = topicItem.get('id');
  const selected = topicItem.get('selected');
  const backgroundImg = topicItem.get('topic_image');
  const title = topicItem.get('title');

  return (
    <Style.TopicItemContainer selected={selected} onClick={() => onClickTopicItem(id)}>
      <Style.Image backgroundImg={backgroundImg} selected={selected}>
        {
          (selected) ? (
            <Icon name="checkmark" color="green" size="big" />
          ) : null
        }
      </Style.Image>
      <Style.Name>
        {title}
      </Style.Name>
    </Style.TopicItemContainer>
  );
}

TopicItem.propTypes = {
  topicItem: PropTypes.instanceOf(Immutable.Map).isRequired,
  onClickTopicItem: PropTypes.func.isRequired,
};

export default TopicItem;
