import React from 'react';
import ReactDOM from 'react-dom';
import { Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import * as Style from './index.style';

/**
 * InfiniteScroll Component.
 * Recommended: Mount this after load initial items. false hasMore detaches all scrollListener.
 */
class InfiniteScroll extends React.Component {
  constructor(props) {
    super(props);

    this.isLoaderVisible = this.isLoaderVisible.bind(this);
    this.checkIfLoaderVisibleAndLoadMore = this.checkIfLoaderVisibleAndLoadMore.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
    this.attachScrollListener = this.attachScrollListener.bind(this);
    this.detachScrollListener = this.detachScrollListener.bind(this);
  }

  componentDidMount() {
    this.checkIfLoaderVisibleAndLoadMore();
    this.attachScrollListener();
  }

  componentDidUpdate() {
    this.checkIfLoaderVisibleAndLoadMore();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  isLoaderVisible() {
    if (this.props.isInScrollableArea) {
      const scrollableArea = ReactDOM.findDOMNode(this).parentNode;

      const scrollableAreaHeight = scrollableArea.clientHeight;
      const scrollableAreaTop = scrollableArea.getBoundingClientRect().top;

      const elemTop = this.container.getBoundingClientRect().top;

      return (elemTop >= 0) && (elemTop <= scrollableAreaHeight + scrollableAreaTop) && elemTop !== 0;
    } else {
      const elemTop = this.container.getBoundingClientRect().top;
      return (elemTop >= 0) && (elemTop <= window.innerHeight) && elemTop !== 0;
    }
  }

  checkIfLoaderVisibleAndLoadMore() {
    if (!this.props.isLoading && this.isLoaderVisible()) {
      this.props.loadMore();
    }
  }

  scrollListener() {
    this.checkIfLoaderVisibleAndLoadMore();

    if (!this.props.hasMore) {
      this.detachScrollListener();
    }
  }

  attachScrollListener() {
    if (!this.props.hasMore) {
      return;
    }

    if (this.props.isInScrollableArea) {
      ReactDOM.findDOMNode(this).parentNode.addEventListener('scroll', this.scrollListener);
    } else {
      window.addEventListener('scroll', this.scrollListener);
      window.addEventListener('resize', this.scrollListener);
    }
  }

  detachScrollListener() {
    if (this.props.isInScrollableArea) {
      ReactDOM.findDOMNode(this).parentNode.removeEventListener('scroll', this.scrollListener);
    } else {
      window.removeEventListener('scroll', this.scrollListener);
      window.removeEventListener('resize', this.scrollListener);
    }
  }

  render() {
    return (
      <Style.LoaderContainer innerRef={(container) => { this.container = container; }} hasMore={this.props.hasMore}>
        {
          this.props.hasMore ?
            <Loader active size="small" />
            : null
        }
      </Style.LoaderContainer>
    );
  }

}

InfiniteScroll.defaultProps = {
  isInScrollableArea: false,
};

/**
 * propTypes
 * @property {func} loadMore Function which load more items.
 * @property {bool} hasMore Boolean which means can fetch items more. If false, component detaches all scrollListeners.
 */
InfiniteScroll.propTypes = {
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isInScrollableArea: PropTypes.bool,
};

export default InfiniteScroll;
