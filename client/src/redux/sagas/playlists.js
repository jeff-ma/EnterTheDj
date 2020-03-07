import { put, takeLatest } from 'redux-saga/effects';
import {Cookies} from 'react-cookie';
import * as playlistsActions  from '../actions/playlists';
import axios from 'axios';

const cookies = new Cookies();
const accessToken = cookies.get("access_token");

export function* getPlaylistsRequest() {
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