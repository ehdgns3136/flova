/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Helmet from 'react-helmet';
import * as Style from './index.style';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Style.MessageContainer>
        <Helmet>
          <title>존재하지 않는 페이지입니다. - 플로바(Flova)</title>
          <meta name="description" content="페이지를 찾을 수 없습니다." />
        </Helmet>
        <Style.StyledIcon className="fa fa-meh-o" />
        존재하지 않는 페이지입니다.
      </Style.MessageContainer>
    );
  }
}
