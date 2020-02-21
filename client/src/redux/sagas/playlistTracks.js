import { put, takeLatest } from 'redux-saga/effects';
import * as playlistTracksActions  from '../actions/playlistTracks';
// import * as homeActions from '../actions/home';
import axios from 'axios';

export function* getPlaylistTracksRequest({playlistId}) {
    try {
        const data  = yield axios('/api/playlist/' + playlistId).then((response => response.data));
        // const data  = yield axios('/api/playlist/' + playlistId).then((response => response.data));
        yield put(playlistTracksActions.getPlaylistTracksSuccess(data));
    } catch(error) {
        yield put(playlistTracksActions.getPlaylistTracksFailure(error));
    }
};

export function* getPlaylistLyricsRequest({ tracks }) {
    try {
        const data = yield axios.post('/api/lyrics', {tracks: tracks}).then((response) => response.data);
        yield put(playlistTracksActions.getPlaylistLyricsSuccess(data));
    } catch(error) {
        console.log(error);
        yield put(playlistTracksActions.getPlaylistLyricsFailure(error));
    }
};

export default function* () {
    yield takeLatest(playlistTracksActions.GET_PLAYLIST_TRACKS_REQUEST, getPlaylistTracksRequest);
    yield takeLatest(playlistTracksActions.GET_PLAYLIST_LYRICS_REQUEST, getPlaylistLyricsRequest);
};