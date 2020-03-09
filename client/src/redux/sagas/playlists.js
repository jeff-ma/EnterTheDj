import { put, takeLatest } from 'redux-saga/effects';
import * as playlistsActions  from '../actions/playlists';
import axios from 'axios';

export function* getPlaylistsRequest() {
    try {
        const data = yield axios.get('/api/playlists/').then(response => response.data);
        yield put(playlistsActions.getPlaylistsSuccess(data));
    } catch(error) {
        yield put(playlistsActions.getPlaylistsFailure(error));
    }
};

export default function* () {
    yield takeLatest(playlistsActions.GET_PLAYLISTS_REQUEST, getPlaylistsRequest);
};