import {put, takeLatest} from 'redux-saga';
import axios from 'axios';
import { GET_TRACKS_REQUEST, getTracksSuccess, getTracksFailure } from '../actions/tracksList';

export function* getTracksRequest({collectionId, type}) {
    try {
        const data = yield axios(`/api/${type}/${collectionId}`);
        yield put(getTracksSuccess(data.response));
    } catch(error) {
        console.log(error);
        yield put(getTracksFailure(error));
    }
};

export default function* () {
    yield takeLatest(GET_TRACKS_REQUEST, getTracksRequest);
}