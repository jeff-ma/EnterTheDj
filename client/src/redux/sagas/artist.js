import { put, takeLatest} from 'redux-saga/effects';
import * as artistActions from '../actions/artist';
import axios from 'axios';

export function* getArtistRequest({ artistId }) {
    // const artistId = artist.artistId;
    try {
        const data = yield axios('/api/artist/' + artistId).then((response) => response.data);
        yield put(artistActions.getArtistSuccess(data));
    } catch(error) {
        console.log(error);
        yield put(artistActions.getArtistFailure(error));
    }
};

export function* watchArtistRequest() {
    yield takeLatest(artistActions.GET_ARTIST_REQUEST, getArtistRequest);
};