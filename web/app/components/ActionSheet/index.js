import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './index.style';


class ActionSheet extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    document.body.classList.add('stop-scrolling');
  }

  componentWillUnmount() {
    document.body.classList.remove('stop-scrolling');
  }

  handleClose() {
    this.props.onClose();
  }

  render() {
    const { title, closeWhenContentClicked } = this.props;
    return (
      <Style.Wrapper onClick={this.handleClose}>
        <Style.ActionBox onClick={(e) => e.stopPropagation()}>
          <Style.ActionNavbar>
            <Style.NavbarItemContainer position="left">
              <Style.NavbarItem onClick={this.handleClose}>
                <i className="fa fa-times" aria-hidden="true" />
              </Style.NavbarItem>
            </Style.NavbarItemContainer>
            <Style.NavbarTitleContainer>
              {title}
            </Style.NavbarTitleContainer>
            <Style.NavbarItemContainer position="right" />
          </Style.ActionNavbar>
          <Style.Unstyled onClick={closeWhenContentClicked ? this.handleClose : null}>
            {this.props.children}
          </Style.Unstyled>
        </Style.ActionBox>
      </Style.Wrapper>
    );
  }
}

ActionSheet.defaultProps = {
  closeWhenContentClicked: true,
};

ActionSheet.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  closeWhenContentClicked: PropTypes.bool,
};

export default ActionSheet;
