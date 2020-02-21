import {put, takeLatest} from 'redux-saga/effects';
import * as topActions from '../actions/top';
import {getTracksExtras} from '../actions/library';
import axios from 'axios';

export function* getTopRequest({ accessToken }) {
    try {
        const data = yield axios.post('/api/top', {accessToken: accessToken}).then(response => response.data);
        yield put(topActions.getTopSuccess(data));
        yield put(getTracksExtras(data.tracks.items));
    } catch(error) {
        console.log(error);
        yield put(topActions.getTopFailure(error));
    }
};

export default function* () {
    yield takeLatest(topActions.GET_TOP_REQUEST, getTopRequest);
};