/**
*
* MobileSimpleNavbar
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import AnnounceModal from 'components/AnnounceModal';

import { Icon } from 'semantic-ui-react';

import * as Style from './index.style';


class MobileSimpleNavbar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { onCloseAnnounceModalRequest, isAnnounceModalOpened, announceType } = this.props;
    return (
      <Style.MobileSimpleNavbar className="wonder-navbar">
        <Style.Action>
          <Style.ActionButton onClick={this.props.onBackbuttonClick}>
            <Icon name="chevron left" />
          </Style.ActionButton>
        </Style.Action>
        <Style.Title>
          {this.props.title}
        </Style.Title>
        <Style.Action />
        <AnnounceModal
          onCloseModalRequest={onCloseAnnounceModalRequest}
          isAnnounceModalOpened={isAnnounceModalOpened}
          announceType={announceType}
        />
      </Style.MobileSimpleNavbar>
    );
  }
}

MobileSimpleNavbar.defaultProps = {
  onBackbuttonClick: browserHistory.goBack,
};

MobileSimpleNavbar.propTypes = {
  title: PropTypes.string,
  onBackbuttonClick: PropTypes.func,
  isAnnounceModalOpened: PropTypes.bool,
  onCloseAnnounceModalRequest: PropTypes.func,
  announceType: PropTypes.string,
};

export default MobileSimpleNavbar;
