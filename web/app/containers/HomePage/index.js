// Absolute imports
import React from 'react';
import MediaQuery from 'react-responsive';
import withAuthentication from 'hoc/withAuthentication';
import Navbar from 'global/containers/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectIsOpened,
} from 'global/inviteModal/selectors';
import InviteModal from 'global/containers/InviteModal';

// Relative imports
import FeedCategories from './FeedCategories';
import MobileFeedCategories from './MobileFeedCategories';
import ActivityList from './ActivityList';
import HomeContentRight from './HomeContentRight';
import MobileQuestionFormButton from './MobileQuestionFormButton';
import * as Style from './index.style';
import {
  getActivitiesRequest,
  checkActiveCategory,
} from './actions';
import { makeSelectActivities } from './selectors';

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { params } = this.props;
    this.props.requestCheckActiveCategory(params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.subpath !== this.props.params.subpath || nextProps.params.topicID !== this.props.params.topicID) {
      /**
        * 1. HomePage에서 다른 Feed Category를 클릭했을 때.
        * 2. HomePage에서 Navbar의 Home 버튼을 눌렀을 때.(requestCheckActiveCategory로 처리)
        * 3. CheckActiveCategory에서 activeCategory가 바뀌었을 때.
        */
      this.props.requestCheckActiveCategory(nextProps.params);
    }
  }

  loadMore() {
    this.props.requestGetActivities(this.props.params);
  }

  render() {
    return (
      <Style.RelativeDiv>
        <Helmet>
          <title>홈 - 플로바(Flova)</title>
        </Helmet>
        {
          this.props.isInviteModalOpened
            ? <InviteModal />
            : null
        }
        <MediaQuery minWidth={1008}>
          <Navbar transparent={false} />
          <Style.PaddingTopDiv top={90}>
            <Style.Container>
              <Style.FeedCategoriesContainer>
                <FeedCategories mobile={false} />
              </Style.FeedCategoriesContainer>
              <Style.QuestionListContainer>
                <ActivityList loadMore={this.loadMore} />
              </Style.QuestionListContainer>
              <Style.HomeContentRightContainer>
                <HomeContentRight />
              </Style.HomeContentRightContainer>
            </Style.Container>
          </Style.PaddingTopDiv>
        </MediaQuery>
        <MediaQuery maxWidth={1008}>
          <Navbar transparent={false} mainPage />
          <Style.PaddingTopDiv top={48}>
            <MobileFeedCategories mobile />
          </Style.PaddingTopDiv>
          <Style.PaddingTopDiv top={55}>
            <MobileQuestionFormButton />
          </Style.PaddingTopDiv>
          <Style.MobileActivityListContainer>
            <ActivityList loadMore={this.loadMore} />
          </Style.MobileActivityListContainer>
        </MediaQuery>
      </Style.RelativeDiv >
    );
  }
}

HomePage.propTypes = {
  params: PropTypes.object,
  isInviteModalOpened: PropTypes.bool.isRequired,
  requestGetActivities: PropTypes.func.isRequired,
  requestCheckActiveCategory: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isInviteModalOpened: makeSelectIsOpened(),
  activities: makeSelectActivities(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestGetActivities: (params) => {
      dispatch(getActivitiesRequest(params));
    },
    requestCheckActiveCategory: (params) => {
      dispatch(checkActiveCategory(params));
    },
  };
}

export default withAuthentication(connect(mapStateToProps, mapDispatchToProps)(HomePage));
