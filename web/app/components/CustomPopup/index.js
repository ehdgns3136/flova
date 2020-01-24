/**
*
* CustomPopup
*
*/


// import PropTypes from 'prop-types';
// import styled from 'styled-components';


import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import * as Style from './index.style';

export class CustomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      windowHeight: 0,
      componentHeight: 0,
      triggerHeight: 0,
      mouseY: 0,
      isHover: false,
    };

    this.changeOpenState = this.changeOpenState.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);

    if (typeof props.changeOpenStateFunctionRef === 'function') {
      props.changeOpenStateFunctionRef(this.changeOpenState);
    }
  }

  componentDidMount() {
    this.setState({ windowHeight: window.innerHeight });
  }

  handleTriggerClick(e) {
    this.changeOpenState(!this.state.isOpen);
    this.setState({
      componentHeight: ReactDOM.findDOMNode(this.container).clientHeight,
      triggerHeight: ReactDOM.findDOMNode(this.trigger).clientHeight,
      mouseY: e.screenY,
    });

    if (typeof this.props.onTriggerClick === 'function') {
      this.props.onTriggerClick();
    }
  }

  onMouseEnter(e) {
    setTimeout(() => {
      if (this.state.isHover && document.body.classList.contains('noTouchDevice')) {
        this.changeOpenState(true);
      }
    }, 300);
    this.setState({
      isHover: true,
      componentHeight: ReactDOM.findDOMNode(this.container).clientHeight,
      mouseY: e.screenY,
    });
  }

  onMouseLeave() {
    setTimeout(() => this.changeOpenState(false), 300);
    this.setState({
      isHover: false,
    });
  }

  changeOpenState(isOpen) {
    this.setState({
      isOpen,
    });

    if (typeof this.props.onOpenStateChange === 'function') {
      this.props.onOpenStateChange(isOpen);
    }
  }

  handleClickOutside() {
    this.changeOpenState(false);
  }

  handleClick() {
    if (this.props.closeOnInsideClick) {
      this.changeOpenState(false);
    }
  }

  render() {
    const isUpsideDown = (this.state.mouseY + this.state.componentHeight - 100) > this.state.windowHeight;
    if (this.props.isHoverTrigger) {
      const clonedTrigger = React.cloneElement(
        this.props.trigger,
        {
          onMouseEnter: this.onMouseEnter,
          key: 'clonedTrigger',
        },
      );
      return React.cloneElement(
        this.props.wrapElement,
        {
          ...this.props.wrapElement.props,
          // TODO : 이미 style 있었으면 override 시켜버림. 혹시 그런 에러가 있으면 이 부분 해결할 것.
          style: { position: 'relative' },
          onMouseLeave: this.onMouseLeave,
        },
        clonedTrigger,
        <Style.PopupContainer
          ref={(node) => { this.container = node; }}
          key="PopupContainer"
          arrowPositionRight={this.props.arrowPositionRight}
          marginTop={this.props.marginTop}
          componentHeight={this.state.componentHeight}
          isUpsideDown={isUpsideDown}
          smoothOpen
          isOpen={this.state.isOpen}
          triggerHeight={this.state.triggerHeight}
        >
          <Style.TransparentBox isUpsideDown={isUpsideDown} arrowPositionRight={this.props.arrowPositionRight} />
          <Style.Arrow isUpsideDown={isUpsideDown} arrowPositionRight={this.props.arrowPositionRight} />
          {this.props.children}
        </Style.PopupContainer>
      );
    } else {
      const clonedTrigger = React.cloneElement(
        this.props.trigger,
        {
          // TODO : 이미 onClick이 있었으면 override 시켜버림. 혹시 그런 에러가 있으면 이 부분 해결할 것.
          onClick: this.handleTriggerClick,
          key: 'clonedTrigger',
          ref: (node) => { this.trigger = node; },
        },
      );
      return React.cloneElement(
        this.props.wrapElement,
        {
          ...this.props.wrapElement.props,
          // TODO : 이미 style 있었으면 override 시켜버림. 혹시 그런 에러가 있으면 이 부분 해결할 것.
          style: { position: 'relative' },
        },
        clonedTrigger,
        <Style.PopupContainer
          ref={(node) => { this.container = node; }}
          onClick={this.handleClick}
          key="PopupContainer"
          arrowPositionRight={this.props.arrowPositionRight}
          marginTop={this.props.marginTop}
          componentHeight={this.state.componentHeight}
          isUpsideDown={isUpsideDown}
          smoothOpen={false}
          isOpen={this.state.isOpen}
          triggerHeight={this.state.triggerHeight}
        >
          <Style.Arrow isUpsideDown={isUpsideDown} arrowPositionRight={this.props.arrowPositionRight} />
          {this.props.children}
        </Style.PopupContainer>
      );
    }
  }
}

CustomPopup.defaultProps = {
  wrapElement: <div />,
  closeOnInsideClick: false,
};

CustomPopup.propTypes = {
  wrapElement: PropTypes.element,
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  arrowPositionRight: PropTypes.string.isRequired,
  marginTop: PropTypes.string.isRequired,
  closeOnInsideClick: PropTypes.bool,
  changeOpenStateFunctionRef: PropTypes.func,
  onOpenStateChange: PropTypes.func,
  isHoverTrigger: PropTypes.bool,
  onTriggerClick: PropTypes.func,
};

export default onClickOutside(CustomPopup);
