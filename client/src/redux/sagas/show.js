import { put, takeLatest} from 'redux-saga/effects';
import * as showActions from '../actions/show';
import axios from 'axios';

export function* getShowRequest({ showId }) {
    try {
        const data = yield axios('/api/show/' + showId).then((response) => response.data);
        yield put(showActions.getShowSuccess(data));
    } catch(error) {
        console.log(error);
        yield put(showActions.getShowFailure(error));
    }
};

export default function* () {
    yield takeLatest(showActions.GET_SHOW_REQUEST, getShowRequest);
};