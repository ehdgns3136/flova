/**
*
* TopicMultiSelect
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import request from 'utils/request';

import Select from 'react-select';


class TopicMultiSelect extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      // isLoading: false,
      // firefox ubuntu, isLoading을 setState할때 rerender되서 input이 매번 초기화되서 comment out.
    };

    this._isMounted = false; // eslint-disable-line no-underscore-dangle
    this.lastAddedPromise = null; // for implementing takeLatest behavior

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this._isMounted = true; // eslint-disable-line no-underscore-dangle
  }

  componentWillUnmount() {
    this._isMounted = false; // eslint-disable-line no-underscore-dangle
  }

  handleChange(newValue) {
    this.props.onChange(newValue);

    const inputNode = document.getElementById('topics-select');
    inputNode.blur();
    inputNode.focus();
  }

  handleInputChange(inputValue) {
    // this.setState({
    //   isLoading: true,
    // });

    const searchPromise = request(`${API_ROOT}/search/topic?q=${inputValue}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    this.lastAddedPromise = searchPromise;

    searchPromise.then((topicSearchResults) => {
      if (this._isMounted && this.lastAddedPromise === searchPromise) { // eslint-disable-line no-underscore-dangle
        const options = topicSearchResults.map((topicSearchResult) => ({
          value: topicSearchResult.id,
          label: topicSearchResult.title,
        }));

        this.setState({
          options,
          // isLoading: false,
        });
      }
    });

    return inputValue;
  }

  newOptionCreator({ label, labelKey, valueKey }) {
    const option = {};
    option[valueKey] = label;
    option[labelKey] = label;
    option.new = true;
    return option;
  }

  promptTextCreator(label) {
    return `주제 추가: "${label}"`;
  }

  filterFunction() {
    return true;
  }

  render() {
    return (
      <Select.Creatable
        id="topics-select"
        name="form-field-name"
        multi
        placeholder="주제를 검색해보세요..."
        noResultsText="검색결과가 없습니다."
        options={this.state.options}
        value={this.props.value}
        // isLoading={this.state.isLoading}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        newOptionCreator={this.newOptionCreator}
        promptTextCreator={this.promptTextCreator}
        filterOption={this.filterFunction}
      />
    );
  }
}

TopicMultiSelect.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TopicMultiSelect;
