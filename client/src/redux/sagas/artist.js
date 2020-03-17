import { put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import * as artistActions from '../actions/artist';
import { getTracksExtras } from '../actions/tracksList';
import {removeArtist, saveArtist} from '../../utils';
import axios from 'axios';

export function* getArtistRequest({ artistId }) {
    try {
        const data = yield axios('/api/artist/' + artistId).then((response) => response.data);
        console.log(data);
        yield put(artistActions.getArtistSuccess(data));
        yield put(getTracksExtras(data.topTracks.items, "artist"));
    } catch(error) {
        console.log(error);
        yield put(artistActions.getArtistFailure(error));
    }
};

export function* removeArtistRequest({ artistId}) {
    try {
        const artist = yield select((state) => state.artist);
        yield removeArtist(artistId);
        artist.artist.isSaved = false;
        yield put(artistActions.getArtistSuccess(artist));
    } catch(error) {
        yield put(artistActions.getArtistFailure(error));
    }
};

export function* saveArtistRequest({ artistId}) {
    try {
        const artist = yield select((state) => state.artist);
        yield saveArtist(artistId);
        artist.artist.isSaved = true;
        yield put(artistActions.getArtistSuccess(artist));
    } catch(error) {
        yield put(artistActions.getArtistFailure(error));
    }
};

export function* watchArtistRequest() {
    yield takeLatest(artistActions.GET_ARTIST_REQUEST, getArtistRequest);
    yield takeEvery(artistActions.REMOVE_ARTIST_REQUEST, removeArtistRequest);
    yield takeLatest(artistActions.SAVE_ARTIST_REQUEST, saveArtistRequest);
};