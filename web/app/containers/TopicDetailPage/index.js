import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Navbar from 'global/containers/Navbar';
import { createStructuredSelector } from 'reselect';
import TopicDescription from 'components/TopicDescription';
import TopicContents from 'components/TopicContents';
import { Loader } from 'semantic-ui-react';
import Helmet from 'react-helmet';

import {
  makeSelectIsTopicDetailLoading,
  makeSelectTopic,
  makeSelectActiveItem,
  makeSelectIsContentsLoading,
  makeSelectContents,
} from './selectors';
import {
  getTopicDetailRequest,
  changeActiveItem,
  getContentsRequest,
  followTopicRequest,
  updateTopicImageRequestAction,
} from './actions';
import * as Style from './index.style';

import {
  updateRedirectPageRequestAction,
} from '../../global/actions';

import {
  makeSelectLoggedInUser,
} from '../../global/selectors';

export class TopicDetailPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onGetTopicDetailRequest(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.onGetTopicDetailRequest(nextProps.params.id);
    }
  }

  render() {
    const { topic, isTopicDetailLoading, onChangeActiveItem, activeItem, onGetContentsRequest,
      onFollowTopicRequest, contents, isContentsLoading, updateRedirectPage, loggedInUser, onUpdateTopicImage } = this.props;
    const title = topic ? `${topic.get('title')} - 플로바(Flova)` : '플로바(Flova) - 세상을 이해하는 더 나은 방법';
    const description = topic ? topic.get('description') : null;

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        <Navbar transparent={false} />
        {
          isTopicDetailLoading ?
            <Style.LoaderWrapper>
              <Loader active />
            </Style.LoaderWrapper>
            :
            <Style.PaddingTopDiv>
              <TopicDescription
                topic={topic}
                onFollowTopicRequest={onFollowTopicRequest}
                loggedInUser={loggedInUser}
                onUpdateTopicImage={onUpdateTopicImage}
              />
              <TopicContents
                onChangeActiveItem={onChangeActiveItem}
                activeItem={activeItem}
                onGetContentsRequest={onGetContentsRequest}
                contents={contents}
                isContentsLoading={isContentsLoading}
                updateRedirectPage={updateRedirectPage}
              />
            </Style.PaddingTopDiv>
        }
      </div>
    );
  }
}

TopicDetailPage.propTypes = {
  onGetTopicDetailRequest: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  topic: PropTypes.instanceOf(Immutable.Map),
  isTopicDetailLoading: PropTypes.bool,
  onChangeActiveItem: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  onGetContentsRequest: PropTypes.func.isRequired,
  onFollowTopicRequest: PropTypes.func.isRequired,
  contents: PropTypes.instanceOf(Immutable.List),
  isContentsLoading: PropTypes.bool,
  updateRedirectPage: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onUpdateTopicImage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isTopicDetailLoading: makeSelectIsTopicDetailLoading(),
  topic: makeSelectTopic(),
  activeItem: makeSelectActiveItem(),
  contents: makeSelectContents(),
  isContentsLoading: makeSelectIsContentsLoading(),
  loggedInUser: makeSelectLoggedInUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetTopicDetailRequest: (id) => {
      dispatch(getTopicDetailRequest(id));
    },
    onChangeActiveItem: (name) => {
      dispatch(changeActiveItem(name));
    },
    onGetContentsRequest: () => {
      dispatch(getContentsRequest());
    },
    onFollowTopicRequest: () => {
      dispatch(followTopicRequest());
    },
    updateRedirectPage: (url) => {
      dispatch(updateRedirectPageRequestAction((url)));
    },
    onUpdateTopicImage: (blobSrc, id) => {
      dispatch(updateTopicImageRequestAction(blobSrc, id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetailPage);
