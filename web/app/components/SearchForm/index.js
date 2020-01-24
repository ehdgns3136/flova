import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import SearchResults from 'components/SearchResults';
import MediaQuery from 'react-responsive';
import { browserHistory } from 'react-router';
import { Icon } from 'semantic-ui-react';
import SearchIcon from 'assets/search_icon.svg';
import * as Style from './index.style';

export class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverPos: -1,
    };
    this.onFocus = this.onFocus.bind(this);
    this.handleAskQuestionButtonClick = this.handleAskQuestionButtonClick.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      resultSize: nextProps.mainSearchResults.size,
    });
  }

  onFocus() {
    this.props.handleSearching(true);
  }

  handleAskQuestionButtonClick() {
    if (this.props.isSearchPage) {
      browserHistory.push('write_question');
      this.props.setInitialTitle(this.props.searchText);
    } else {
      this.props.openQuestionFormModal(this.props.searchText);
      this.handleClickOutside();
    }
  }

  handleClickOutside() {
    this.props.handleSearching(false);
  }

  handleSearchTextChange(event) {
    this.setState({
      hoverPos: -1,
    });
    this.props.requestGetMainSearch(event.target.value);
  }

  handleKeyDown(e) {
    if (e.which === 38) {
      // UP KEY
      if (this.state.hoverPos === -1) {
        this.setState({
          hoverPos: this.props.mainSearchResults.size - 1,
        });
      } else {
        this.setState({
          hoverPos: this.state.hoverPos - 1,
        });
      }
    } else if (e.which === 40) {
      // DOWN KEY
      if (this.state.hoverPos === this.props.mainSearchResults.size - 1) {
        this.setState({
          hoverPos: -1,
        });
      } else {
        this.setState({
          hoverPos: this.state.hoverPos + 1,
        });
      }
    } else if (e.which === 13) {
      // ENTER KEY
      this.props.handleSearching(false);
      if (this.state.hoverPos === -1) {
        // TODO: GO TO SEARCH DETAIL PAGE
      } else {
        const item = this.props.mainSearchResults.get(this.state.hoverPos);
        if (item.get('type') === 'topic') {
          browserHistory.push(`/topic/${item.get('id')}`);
        } else if (item.get('type') === 'question') {
          browserHistory.push(`/question/${item.get('id')}`);
        } else if (item.get('type') === 'user') {
          browserHistory.push(`/user/${item.get('id')}`);
        }
      }
    }
  }

  onMouseOver(index) {
    this.setState({
      hoverPos: index,
    });
  }

  onMouseOut(index) {
    if (this.state.hoverPos === index) {
      this.setState({
        hoverPos: -1,
      });
    }
  }

  render() {
    const { searchText, mainSearchResults, isSearching, isSearchPage } = this.props;
    return (
      (isSearchPage) ? (
        <Style.MobileContainer>
          <Style.MobileInputContainer>
            <Style.Action>
              <Style.ActionButton onClick={browserHistory.goBack}>
                <Icon name="chevron left" />
              </Style.ActionButton>
            </Style.Action>
            <Style.MobileStyledInput
              placeholder="무엇이 궁금하신가요?"
              onChange={this.handleSearchTextChange}
              onKeyDown={this.handleKeyDown}
              value={searchText}
              spellCheck={false}
              onClick={this.onFocus}
            />
            <Style.MobileIconContainer>
              <SearchIcon width="18px" height="18px" />
            </Style.MobileIconContainer>
          </Style.MobileInputContainer>
          <Style.MobileSearchResultsContainer>
            <SearchResults
              searchText={searchText}
              mainSearchResults={mainSearchResults}
              onAskQuestionButtonClick={this.handleAskQuestionButtonClick}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
              hoverPos={this.state.hoverPos}
              handleSearching={this.props.handleSearching}
            />
          </Style.MobileSearchResultsContainer>
        </Style.MobileContainer>
      ) : (
          <MediaQuery minWidth={1008} >
            <Style.RelativeDiv>
              <Style.StyledInput
                placeholder="무엇이 궁금하신가요?"
                onChange={this.handleSearchTextChange}
                onKeyDown={this.handleKeyDown}
                value={searchText}
                spellCheck={false}
                onClick={this.onFocus}
              />
              <Style.IconContainer>
                <SearchIcon width="25px" height="25px" />
              </Style.IconContainer>
              {
                (isSearching) ? (
                  <Style.SearchResultsContainer>
                    <SearchResults
                      searchText={searchText}
                      mainSearchResults={mainSearchResults}
                      onAskQuestionButtonClick={this.handleAskQuestionButtonClick}
                      onMouseOver={this.onMouseOver}
                      onMouseOut={this.onMouseOut}
                      hoverPos={this.state.hoverPos}
                      handleSearching={this.props.handleSearching}
                    />
                  </Style.SearchResultsContainer>
                ) : null
              }
              <Style.StyledDimmer active={isSearching} page />
            </Style.RelativeDiv>
          </MediaQuery>
        )
    );
  }
}

SearchForm.propTypes = {
  openQuestionFormModal: PropTypes.func.isRequired,
  requestGetMainSearch: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  mainSearchResults: PropTypes.object,
  isSearchLoading: PropTypes.bool,
  handleSearching: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
  isSearchPage: PropTypes.bool.isRequired,
  setInitialTitle: PropTypes.func.isRequired,
};

export default onClickOutside(SearchForm);
