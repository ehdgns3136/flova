/**
*
* TopicForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import MediaQuery from 'react-responsive';

import { Button, Input, Icon, Container } from 'semantic-ui-react';
import * as Style from './index.style';
import TopicContainer from './TopicContainer';


class TopicForm extends React.Component {
  constructor(props) {
    super(props);

    this.onClickNextButton =  this.onClickNextButton.bind(this);
  }

  componentWillMount() {
    this.props.requestLoadTopics();
  }

  onClickNextButton() {
    const selectedTopicItemList = this.props.topicList
                                .filter((topicItem) => (topicItem.get('selected')))
                                .map((topicItem) => (topicItem.get('id')))
                                .toJS();

    this.props.requestAddTopicsToUser(selectedTopicItemList);
    this.props.signUpSuccessRedirect();
  }

  render() {
    const { topicList, onClickTopicItem } = this.props;
    const selectedItemNum = topicList.filter((topicItem) => (topicItem.get('selected'))).count();
    const nextDisabled = (selectedItemNum < 3);
    return (
      <Style.TopicFormContainer>
        <Style.Header>
          관심사를 알려주세요.
        </Style.Header>
        <TopicContainer topicList={topicList} onClickTopicItem={onClickTopicItem} />
        <Style.Explain>
          현재는 스타트업, 암호화폐, 인공지능 등 몇몇 주제에만 집중하고 있습니다. 추후에는 더 다양한 주제로 확장해나갈 예정이니 기대해주세요 :)
        </Style.Explain>
        <MediaQuery minWidth={640}>
          <Style.NextButton type="submit" fluid animated="fade" disabled={nextDisabled} onClick={this.onClickNextButton}>
            <Button.Content visible>{(nextDisabled) ? `${3 - selectedItemNum}개 더 선택해보세요` : '가입 완료'}</Button.Content>
            <Button.Content hidden>
              <Icon name="right arrow" />
            </Button.Content>
          </Style.NextButton>
        </MediaQuery>
        <MediaQuery maxWidth={640}>
          <Style.NextButton type="submit" fluid disabled={nextDisabled} onClick={this.onClickNextButton}>
            <Button.Content visible>{(nextDisabled) ? `${3 - selectedItemNum}개 더 선택해보세요` : '가입 완료'}</Button.Content>
          </Style.NextButton>
        </MediaQuery>
      </Style.TopicFormContainer>
    );
  }
}

TopicForm.propTypes = {
  topicList: PropTypes.instanceOf(Immutable.Iterable),
  requestLoadTopics: PropTypes.func.isRequired,
  onClickTopicItem: PropTypes.func.isRequired,
  requestAddTopicsToUser: PropTypes.func.isRequired,
  signUpSuccessRedirect: PropTypes.func.isRequired,
};

export default TopicForm;
