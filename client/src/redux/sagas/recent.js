import { put, takeLatest } from 'redux-saga/effects';
import * as recentActions from '../actions/recent';
import {getTracksExtras} from '../actions/library';
import axios from 'axios';

export function* getRecentRequest({ accessToken }) {
    try {
        const data = yield axios.post('/api/recent', {accessToken: accessToken}).then((response) => response.data);
        yield put(recentActions.getRecentSuccess(data));
        yield put(getTracksExtras(data.items));
    } catch(error) {
        console.log(error);
        yield put(recentActions.getRecentFailure(error));
    }
}

export default function*() {
    yield takeLatest(recentActions.GET_RECENT_REQUEST, getRecentRequest);
}