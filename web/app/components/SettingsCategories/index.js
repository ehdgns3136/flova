/**
*
* SettingsCategories
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
import * as Style from './index.style';


class SettingsCategories extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Style.CategoryContainer>
          <Style.Header>
            설정
          </Style.Header>
          <Style.Divider />
          <Style.Element>
            비밀번호 수정
          </Style.Element>
        </Style.CategoryContainer>
      </div>
    );
  }
}

SettingsCategories.propTypes = {

};

export default SettingsCategories;
