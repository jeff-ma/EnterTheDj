import {put, takeLatest} from "redux-saga/effects";
import * as playlistsActions  from "../actions/playlists";
import {getPlaylists} from "../../utils";

export function* getPlaylistsRequest() {
    try {
        const {data} = yield getPlaylists();
        yield put(playlistsActions.getPlaylistsSuccess(data));
    } catch(error) {
        yield put(playlistsActions.getPlaylistsFailure(error));
    }
};

export default function* () {
    yield takeLatest(playlistsActions.GET_PLAYLISTS_REQUEST, getPlaylistsRequest);
};