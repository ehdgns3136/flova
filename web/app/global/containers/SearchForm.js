/**
 * Created by donghoon on 17. 11. 1.
 */
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import SearchForm from 'components/SearchForm';
import {
  getMainSearchRequest,
} from '../actions';
import {
  makeSelectSearchText,
  makeSelectMainSearchResults,
  makeSelectIsSearchLoading,
} from '../selectors';
import {
  openQuestionFormModal,
  setInitialTitle,
} from '../models/question/actions';

const mapStateToProps = createStructuredSelector({
  searchText: makeSelectSearchText(),
  mainSearchResults: makeSelectMainSearchResults(),
  isSearchLoading: makeSelectIsSearchLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestGetMainSearch: (content) => {
      dispatch(getMainSearchRequest(content));
    },
    openQuestionFormModal: (initialTitle) => {
      dispatch(openQuestionFormModal(initialTitle));
    },
    setInitialTitle: (initialTitle) => {
      dispatch(setInitialTitle(initialTitle));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
