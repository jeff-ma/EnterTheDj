import { put, takeLatest } from 'redux-saga/effects';
import * as playlistActions  from '../actions/playlist';
import { getTracksExtras } from '../actions/library';
import axios from 'axios';

export function* getPlaylistRequest({playlistId}) {
    try {
        const data = yield axios('/api/playlist/' + playlistId).then((response => response.data));
        yield put(playlistActions.getPlaylistSuccess(data));
        yield put(getTracksExtras(data.tracks.items));
    } catch(error) {
        yield put(playlistActions.getPlaylistFailure(error));
    }
};

export default function* () {
    yield takeLatest(playlistActions.GET_PLAYLIST_REQUEST, getPlaylistRequest);
};