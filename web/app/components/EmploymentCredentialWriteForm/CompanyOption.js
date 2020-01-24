/**
 * Created by donghoon on 17. 9. 18.
 */
import React from 'react';
import PropTypes from 'prop-types';

class CompanyOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  }

  handleMouseEnter(event) {
    this.props.onFocus(this.props.option, event);
  }

  handleMouseMove(event) {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  }

  render() {
    const style = {
      borderRadius: 2,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      verticalAlign: 'middle',
    };
    return (
      (this.props.children.substr(0, 6) === '학교 추가:') ? (
        <div
          className={this.props.className}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseMove={this.handleMouseMove}
          title={this.props.option.title}>
          {this.props.children}
        </div>
      ) : (
        <div
          className={this.props.className}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseMove={this.handleMouseMove}
          title={this.props.option.title}>
          <img src={this.props.option.image} width="30" height="30" style={style} />
          {this.props.children}
        </div>
      )
    );
  }
}

CompanyOption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  option: PropTypes.object.isRequired,
};

export default CompanyOption;
