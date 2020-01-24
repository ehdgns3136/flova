/*
 *
 * MobileSearchPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import SearchForm from 'global/containers/SearchForm';

export class MobileSearchPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isSearching: true,
    };
    this.handleSearching = this.handleSearching.bind(this);
  }

  handleSearching(isSearching) {
    this.setState({
      isSearching,
    });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>검색 - 플로바(Flova)</title>
          <meta name="description" content="검색 페이지입니다." />
        </Helmet>
        <SearchForm
          handleSearching={this.handleSearching}
          isSearchPage
        />
      </div>
    );
  }
}

MobileSearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(null, null)(MobileSearchPage);
