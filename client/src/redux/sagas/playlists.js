import { put, takeLatest } from 'redux-saga/effects';
import * as playlistsActions  from '../actions/playlists';
// import * as homeActions from '../actions/home';
import axios from 'axios';

export function* getPlaylistsRequest({accessToken}) {
    try {
        const data = yield axios.post('/api/playlists/', {accessToken: accessToken}).then(response => response.data);
        yield put(playlistsActions.getPlaylistsSuccess(data));
    } catch(error) {
        yield put(playlistsActions.getPlaylistsFailure(error));
    }
};

export default function* () {
    yield takeLatest(playlistsActions.GET_PLAYLISTS_REQUEST, getPlaylistsRequest);
};