import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import * as Style from './index.style';
import SearchItem from './SearchItem';

export class SearchResults extends React.Component {
  render() {
    const { mainSearchResults, searchText, handleSearching } = this.props;
    const searchList = mainSearchResults.map((result, index) => {
      return (
        <SearchItem
          onMouseOver={this.props.onMouseOver}
          onMouseOut={this.props.onMouseOut}
          key={result.get('type') + result.get('id')}
          result={result}
          searchText={searchText}
          index={index}
          resultSize={mainSearchResults.size}
          hover={this.props.hoverPos === index}
          handleSearching={handleSearching}
        />
      );
    });


    return (
      <Style.ResultSegment onMouseDown={(event) => { event.preventDefault(); }}>
        {searchList}
        <Style.RightAlignedDiv>
          <Style.ButtonMeta>원하시는 질문이 없으신가요?</Style.ButtonMeta>
          <Style.TealButton onClick={this.props.onAskQuestionButtonClick}>질문하기</Style.TealButton>
        </Style.RightAlignedDiv>
      </Style.ResultSegment>
    );
  }
}

SearchResults.propTypes = {
  searchText: PropTypes.string.isRequired,
  mainSearchResults: PropTypes.object,
  onAskQuestionButtonClick: PropTypes.func.isRequired,
  hoverPos: PropTypes.number.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  handleSearching: PropTypes.func.isRequired,
};

export default SearchResults;
