/**
 * Created by donghoon on 17. 12. 8.
 */
import { select, put } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { makeSelectLoggedInUser } from 'global/selectors';
import { updateRedirectPageRequestAction } from 'global/actions';

export function* handleAnonymous() {
  try {
    const loggedInUser = yield select(makeSelectLoggedInUser());
    if (!loggedInUser) {
      yield put(updateRedirectPageRequestAction(browserHistory.getCurrentLocation().pathname));
      browserHistory.push('');
    }
  } catch (err) {
    console.log(err);
  }
}
