import { put, takeLatest } from 'redux-saga/effects';
import * as browseActions from '../actions/browse';
import axios from 'axios';

export function* getBrowseRequest({ query }) {
    try {
        const data = yield axios('/api/browse' + query).then((response) => response.data);
        yield put(browseActions.getBrowseSuccess(data));
    } catch(error) {
        console.log(error);
        yield put(browseActions.getBrowseFailure(error));
    }
}

export default function*() {
    yield takeLatest(browseActions.GET_BROWSE_REQUEST, getBrowseRequest);
}