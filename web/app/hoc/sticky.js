import React from 'react';
/**
 * Return sticked component. Component start being sticky when scrolled more than startSticky.
 * Component is placed at offsetTop.
 *
 * @param  {React.Component} Component Component which will be sticky.
 * @param  {number} startSticky Position(px) where components starts to be sticky.
 * @param  {number} offsetTop Position from top(px) where components will be placed after being sticky.
 *
 * @return {React.Component}
 */
function Sticky(Component, startSticky, offsetTop) {
  return class StickyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        positionFixed: false,
      };
      this.getStyle = this.getStyle.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
      if (window.scrollY > startSticky) {
        this.setState({
          positionFixed: true,
        });
      } else {
        this.setState({
          positionFixed: false,
        });
      }
    }

    getParentWidth() {
      const style = window.getComputedStyle(this.wrapper.parentNode);
      const parseStyle = (pxString) => {
        return +pxString.slice(0, pxString.length - 2);
      };
      const width = parseStyle(style.width);
      const paddingLeft = parseStyle(style.paddingLeft);
      const paddingRight = parseStyle(style.paddingRight);
      const borderLeftWidth = parseStyle(style.borderLeftWidth);
      const borderRightWidth = parseStyle(style.borderRightWidth);
      return `${width - paddingLeft - paddingRight - borderLeftWidth - borderRightWidth}px`;
    }

    getStyle() {
      if (this.state.positionFixed) {
        return {
          position: 'fixed',
          top: offsetTop,
          width: this.getParentWidth(),
        };
      }
      return null;
    }

    render() {
      return (
        <div style={this.getStyle()} ref={(wrapper) => { this.wrapper = wrapper; }}>
          <Component {...this.props} />
        </div>
      );
    }
  };
}

export default Sticky;
