import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Navbar from 'global/containers/Navbar';
import Immutable from 'immutable';
import { Loader } from 'semantic-ui-react';
import InviteBox from 'components/InviteBox';
import MediaQuery from 'react-responsive';
import { openInviteModal } from 'global/inviteModal/actions';
import { makeSelectIsOpened } from 'global/inviteModal/selectors';
import InviteModal from 'global/containers/InviteModal';
import Helmet from 'react-helmet';

import CredentialFormModal from './CredentialFormModal';
import ProfileContents from './ProfileContents';
import LargeProfile from './LargeProfile';
import ProfileCredentials from './ProfileCredentials';
import * as Style from './index.style';
import {
  makeSelectIsContentsLoading,
  makeSelectActiveItem,
  makeSelectTopics,
  makeSelectProfile,
  makeSelectIsProfilePageLoading,
} from './selectors';
import {
  makeSelectLoggedInUser,
} from '../../global/selectors';
import {
  changeActiveItem,
  getProfileRequest,
  initializeState,
} from './actions';


export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    const { profile, onGetProfileRequest, onInitializeState } = this.props;

    if (!profile) {
      onGetProfileRequest(this.props.params.id);
    }

    if (profile && profile.get('id') !== this.props.params.id) {
      onInitializeState();
      onGetProfileRequest(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.onGetProfileRequest(nextProps.params.id);
      this.props.onChangeActiveItem('writtenAnswers', nextProps.params.id);
    }
  }

  handleItemClick(itemName) {
    this.props.onChangeActiveItem(itemName);
  }

  render() {
    const { profile, activeItem, isProfilePageLoading, loggedInUser, onOpenInviteModal, isInviteModalOpened } = this.props;
    const userId = this.props.params.id;
    const isMine = loggedInUser && profile ? loggedInUser.get('id') === profile.get('id') : false;
    const title = profile ? `${profile.get('name')} - 플로바(Flova)` : '플로바(Flova) - 세상을 이해하는 더 나은 방법';
    const content = profile ? `${profile.get('name')}님의 프로필 페이지입니다. ${profile.get('name')}님이 작성한 질문과 답변을 확인해보세요.` : '프로필 페이지입니다.';

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={content} />
        </Helmet>
        <Navbar transparent={false} />
        {
          profile ? (
            <CredentialFormModal isMine={loggedInUser ? loggedInUser.get('id') === profile.get('id') : false} />
          ) : (
              null
            )
        }
        {
          isInviteModalOpened
            ? <InviteModal />
            : null
        }
        {
          isProfilePageLoading ? (
            <Style.LoaderWrapper>
              <Loader active size="huge" />
            </Style.LoaderWrapper>
          ) : (
              <div>
                {
                  profile ?
                    <Style.PaddingTopDiv>
                      <Style.Container>
                        <LargeProfile handleItemClick={this.handleItemClick} />
                        <MediaQuery maxWidth={1008}>
                          <ProfileCredentials />
                        </MediaQuery>
                      </Style.Container>
                      <Style.Menu>
                        <Style.MenuContainer>
                          <Style.Item onClick={() => this.handleItemClick('writtenAnswers')} active={activeItem === 'writtenAnswers'}>
                            답변 {profile.get('answer_num')}
                          </Style.Item>
                          <Style.Item active={activeItem === 'writtenQuestions'} onClick={() => this.handleItemClick('writtenQuestions')}>
                            질문 {profile.get('question_num')}
                          </Style.Item>
                          {
                            isMine ?
                              <Style.Item active={activeItem === 'bookmarkContents'} onClick={() => this.handleItemClick('bookmarkContents')}>
                                북마크 {profile.get('bookmark_contents_num')}
                              </Style.Item>
                              : null
                          }
                          {
                            isMine ?
                              <Style.Item active={activeItem === 'followingQuestions'} onClick={() => this.handleItemClick('followingQuestions')}>
                                팔로우한 질문 {profile.get('following_question_num')}
                              </Style.Item>
                              : null
                          }
                          <Style.Item active={activeItem === 'followingTopics'} onClick={() => this.handleItemClick('followingTopics')}>
                            관심주제 {profile.get('topic_num')}
                          </Style.Item>
                          <Style.Item active={activeItem === 'followers'} onClick={() => this.handleItemClick('followers')}>
                            팔로워 {profile.get('follower_num')}
                          </Style.Item>
                          <Style.Item active={activeItem === 'followingUsers'} onClick={() => this.handleItemClick('followingUsers')}>
                            팔로잉 {profile.get('following_num')}
                          </Style.Item>
                        </Style.MenuContainer>
                      </Style.Menu>
                      <Style.FlexDiv>
                        <Style.ProfileContentsContainer>
                          <ProfileContents userId={userId} />
                        </Style.ProfileContentsContainer>
                        <MediaQuery minWidth={1008}>
                          <Style.GridRight>
                            <ProfileCredentials />
                          </Style.GridRight>
                        </MediaQuery>
                      </Style.FlexDiv>
                    </Style.PaddingTopDiv>
                    : (
                      <Style.MessageContainer>
                        <Style.StyledIcon className="fa fa-meh-o" />
                        존재하지 않는 유저입니다.
                      </Style.MessageContainer>
                    )
                }
              </div>
            )
        }
      </div>
    );
  }
}

ProfilePage.propTypes = {
  params: PropTypes.object,
  profile: PropTypes.object,
  isProfilePageLoading: PropTypes.bool,
  onGetProfileRequest: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  onChangeActiveItem: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onOpenInviteModal: PropTypes.func.isRequired,
  isInviteModalOpened: PropTypes.bool,
  onInitializeState: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loggedInUser: makeSelectLoggedInUser(),
  profile: makeSelectProfile(),
  isProfilePageLoading: makeSelectIsProfilePageLoading(),
  isContentsLoading: makeSelectIsContentsLoading(),
  activeItem: makeSelectActiveItem(),
  topics: makeSelectTopics(),
  isInviteModalOpened: makeSelectIsOpened(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetProfileRequest: (id) => {
      dispatch(getProfileRequest(id));
    },
    onChangeActiveItem: (name, id) => {
      dispatch(changeActiveItem(name, id));
    },
    onOpenInviteModal: () => {
      dispatch(openInviteModal());
    },
    onInitializeState: () => {
      dispatch(initializeState());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
