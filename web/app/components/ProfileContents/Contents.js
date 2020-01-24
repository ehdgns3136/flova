import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ActivityList from 'containers/ProfilePage/ActivityList';

class Contents extends React.Component {
  componentDidMount() {
    const { questions } = this.props;
    if (!questions || questions.count() === 0) {
      this.props.loadMore();
    }
  }

  render() {
    return (
      <ActivityList loadMore={this.props.loadMore} updateRedirectPage={this.props.updateRedirectPage} loggedInUser={this.props.loggedInUser} />
    );
  }
}

Contents.propTypes = {
  loadMore: PropTypes.func.isRequired,
  updateRedirectPage: PropTypes.func.isRequired,
  loggedInUser: PropTypes.instanceOf(Immutable.Map),
  questions: PropTypes.instanceOf(Immutable.List),
};

export default Contents;
