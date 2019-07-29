import { put, fork, takeLatest, select} from 'redux-saga/effects';
import * as albumActions from '../actions/album';
import axios from 'axios';

export function* getAlbumRequest({ albumId }) {
    try {
        const data = yield axios('/api/album/' + albumId).then((response) => response.data);
        // const s  = yield select(state => state.album);
        yield put(albumActions.getAlbumSuccess(data));
    } catch(error) {
        console.log(error);
        yield put(albumActions.getAlbumFailure(error));
    }
};

export function* getLyricsRequest({ tracks }) {
    try {
        const data = yield axios.post('/api/lyrics', {tracks: tracks}).then((response) => response.data);
        yield put(albumActions.getLyricsSuccess(data));
    } catch(error) {
        console.log(error);
        yield put(albumActions.getLyricsFailure(error));
    }
};

export default function*() {
    yield takeLatest(albumActions.GET_ALBUM_REQUEST, getAlbumRequest);
    yield takeLatest(albumActions.GET_LYRICS_REQUEST, getLyricsRequest);
};