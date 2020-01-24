import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { browserHistory } from 'react-router';
import MediaQuery from 'react-responsive';

import CustomPopup from 'components/CustomPopup';
import NotificationPopup from 'components/NotificationPopup';
import AnnounceModal from 'components/AnnounceModal';
import QuestionFormModal from 'global/containers/QuestionFormModal';
import QuestionEditFormModal from 'global/containers/QuestionEditFormModal';
import FollowerModal from 'global/containers/FollowerModal';
import LikerModal from 'global/containers/LikerModal';
import SearchForm from 'global/containers/SearchForm';
import * as Style from './index.style';
import defaultProfileImg from '../../assets/default-profile.png';
import AvatarPopup from './AvatarPopup';
import SearchIcon from '../../assets/search_icon.svg';

class Navbar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      isSearching: false,
    };

    this.handleSearching = this.handleSearching.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
  }

  onClickStart() {
    this.props.updateRedirectPage(browserHistory.getCurrentLocation().pathname);
    browserHistory.push('/intro');
  }

  handleSearching(isSearching) {
    this.setState({
      isSearching,
    });
  }

  handleNotificationClick() {
    if (!this.props.isNotificationListPulledBefore) {
      this.props.requestGetNotifications();
    }

    if (this.props.notificationList.count() > 0) {
      this.props.requestUpdateLastNotificationCheck(this.props.notificationList.get(0).get('added_time'));
    }
  }

  renderAvatar() {
    const { transparent, onLogout, loggedInUser } = this.props;
    const trigger = (
      <Style.ItemContainer transparent={transparent}>
        {(loggedInUser.get('profile_image')) ? <Style.UserAvatar src={loggedInUser.get('profile_image')} />
          : <Style.UserAvatar src={defaultProfileImg} />}
      </Style.ItemContainer>
    );
    if (document.body.classList.contains('touchDevice')) {
      return (
        <Style.UnstyledLink to={`/user/${loggedInUser.get('id')}`}>
          {trigger}
        </Style.UnstyledLink>
      );
    }
    return (
      <CustomPopup
        wrapElement={<div />}
        trigger={trigger}
        width="320px"
        arrowPositionRight="25px"
        marginTop="0px"
      >
        <AvatarPopup loggedInUser={loggedInUser} onLogout={onLogout} />
      </CustomPopup>
    );
  }

  render() {
    const { transparent, loggedInUser, mainPage } = this.props;
    return (
      <Style.Navbar className="wonder-navbar" transparent={transparent} size="massive" fixed="top" secondary={transparent} inverted={transparent} icon borderless mainPage={mainPage}>
        <Style.NavbarContainer>
          {
            this.props.isQuestionFormModalOpened ? (
              <QuestionFormModal />
            ) : null
          }
          {
            this.props.isQuestionEditFormModalOpened ? (
              <QuestionEditFormModal />
            ) : null
          }
          <FollowerModal />
          <LikerModal />
          <Style.LogoContainer onClick={() => browserHistory.push('/')}>
            Flova
            <Style.Beta>beta</Style.Beta>
          </Style.LogoContainer>
          <Style.SearchFormContainer>
            <SearchForm
              isSearching={this.state.isSearching}
              handleSearching={this.handleSearching}
              isSearchPage={false}
            />
          </Style.SearchFormContainer>
          {
            loggedInUser ? (
              <Style.MenuContainer>
                <MediaQuery minWidth={1008}>
                  <Style.QuestionButton transparent={transparent} onClick={() => this.props.openQuestionFormModal()}>
                    질문하기
                  </Style.QuestionButton>
                </MediaQuery>
                <MediaQuery maxWidth={1008}>
                  <Style.SearchPageButton to="/search">
                    <SearchIcon />
                  </Style.SearchPageButton>
                </MediaQuery>
                <MediaQuery minWidth={1008}>
                  <CustomPopup
                    wrapElement={<div />}
                    trigger={
                      <Style.ItemContainer transparent={transparent}>
                        <Style.AlarmIcon name="alarm outline">
                          {
                            (this.props.unreadNotificationCount) ? (
                              <Style.AlarmLabel>{this.props.unreadNotificationCount}</Style.AlarmLabel>
                            ) : null
                          }
                        </Style.AlarmIcon>
                      </Style.ItemContainer>
                    }
                    width="320px"
                    arrowPositionRight="25px"
                    marginTop="0px"
                    onTriggerClick={this.handleNotificationClick}
                  >
                    <NotificationPopup
                      notificationList={this.props.notificationList}
                      isNotificationListLoading={this.props.isNotificationListLoading}
                      notificationListNextUrl={this.props.notificationListNextUrl}
                      requestReadNotification={this.props.requestReadNotification}
                      requestGetNotifications={this.props.requestGetNotifications}
                    />
                  </CustomPopup>
                </MediaQuery>
                <MediaQuery maxWidth={1008}>
                  <Style.MobileMenuLink to="/notification">
                    <Style.ItemContainer transparent={transparent}>
                      <Style.AlarmIcon name="alarm outline">
                        {
                          (this.props.unreadNotificationCount) ? (
                            <Style.AlarmLabel>{this.props.unreadNotificationCount}</Style.AlarmLabel>
                          ) : null
                        }
                      </Style.AlarmIcon>
                    </Style.ItemContainer>
                  </Style.MobileMenuLink>
                </MediaQuery>
                {this.renderAvatar()}
              </Style.MenuContainer>
            ) : (
                <Style.MenuContainer>
                  <MediaQuery maxWidth={1008}>
                    <Style.SearchPageButton to="/search">
                      <SearchIcon />
                    </Style.SearchPageButton>
                  </MediaQuery>
                  <Style.SignInButton onClick={this.onClickStart}>
                    시작하기
                </Style.SignInButton>
                </Style.MenuContainer>
              )
          }
          <AnnounceModal
            onCloseModalRequest={this.props.onCloseAnnounceModalRequest}
            isAnnounceModalOpened={this.props.isAnnounceModalOpened}
            announceType={this.props.announceType}
          />
        </Style.NavbarContainer>
      </Style.Navbar>
    );
  }
}

Navbar.propTypes = {
  transparent: PropTypes.bool,
  unreadNotificationCount: PropTypes.number,
  isNotificationListPulledBefore: PropTypes.bool.isRequired,
  notificationList: PropTypes.instanceOf(Immutable.Iterable),
  isNotificationListLoading: PropTypes.bool.isRequired,
  notificationListNextUrl: PropTypes.string,
  requestGetNotifications: PropTypes.func.isRequired,
  requestUpdateLastNotificationCheck: PropTypes.func.isRequired,
  requestReadNotification: PropTypes.func.isRequired,
  openQuestionFormModal: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  onLogout: PropTypes.func.isRequired,
  mainPage: PropTypes.bool,
  updateRedirectPage: PropTypes.func.isRequired,
  isQuestionEditFormModalOpened: PropTypes.bool.isRequired,
  isQuestionFormModalOpened: PropTypes.bool.isRequired,
  isAnnounceModalOpened: PropTypes.bool.isRequired,
  onCloseAnnounceModalRequest: PropTypes.func.isRequired,
  announceType: PropTypes.string.isRequired,
};

export default Navbar;
