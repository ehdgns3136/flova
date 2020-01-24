/**
 * Created by donghoon on 17. 9. 18.
 */
import React from 'react';
import PropTypes from 'prop-types';

class SchoolValue extends React.Component {
  render() {
    const style = {
      borderRadius: 2,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -1,
      verticalAlign: 'middle',
    };
    return (
      <div className="Select-value" title={this.props.value.title}>
        <span className="Select-value-label">
          <img src={this.props.value.image} height="30" width="30" style={style} />
          {this.props.children}
        </span>
      </div>
    );
  }
}

SchoolValue.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  value: PropTypes.object,
};

export default SchoolValue;
