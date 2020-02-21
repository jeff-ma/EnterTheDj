import { put, takeLatest} from 'redux-saga/effects';
import * as artistActions from '../actions/artist';
import { getTracksExtras } from '../actions/library';
import axios from 'axios';

export function* getArtistRequest({ artistId }) {
    try {
        const data = yield axios('/api/artist/' + artistId).then((response) => response.data);
        yield put(artistActions.getArtistSuccess(data));
        yield put(getTracksExtras(data.topTracks.items));
    } catch(error) {
        console.log(error);
        yield put(artistActions.getArtistFailure(error));
    }
};

export function* watchArtistRequest() {
    yield takeLatest(artistActions.GET_ARTIST_REQUEST, getArtistRequest);
};