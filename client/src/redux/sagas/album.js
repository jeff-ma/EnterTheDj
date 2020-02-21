import { put, takeLatest } from 'redux-saga/effects';
import * as albumActions from '../actions/album';
import {getTracksExtras} from '../actions/library';
import axios from 'axios';

export function* getAlbumRequest({ albumId }) {
    try {
        const data = yield axios('/api/album/' + albumId).then((response) => response.data);
        yield put(albumActions.getAlbumSuccess(data));
        yield put(getTracksExtras(data.tracks.items));
    } catch(error) {
        console.log(error);
        yield put(albumActions.getAlbumFailure(error));
    }
};

export default function*() {
    yield takeLatest(albumActions.GET_ALBUM_REQUEST, getAlbumRequest);
};