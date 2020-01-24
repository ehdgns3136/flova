/*
 *
 * IntroEmailCheckPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import backgroundImg from '../../assets/intro-background.jpg';
import * as Style from './index.style';
import EmailCheckForm from './EmailCheckForm';


export class IntroEmailCheckPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>이메일 확인 - 플로바(Flova)</title>
          <meta name="description" content="이메일 확인 페이지입니다." />
          <style type="text/css">{'body, html { background-color: #ffffff; }'}</style>
        </Helmet>
        <Style.IntroEmailCheckPageContainer>
          <Style.BackgroundImage src={backgroundImg} role="presentation" width="100%" height="135%" />
          <EmailCheckForm />
        </Style.IntroEmailCheckPageContainer>
      </div>
    );
  }
}

IntroEmailCheckPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroEmailCheckPage);
