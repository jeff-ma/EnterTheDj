import {put, select, takeEvery, takeLatest} from "redux-saga/effects";
import * as playlistActions  from "../actions/playlist";
import {getTracksExtras} from "../actions/tracksList";
import {addAlert} from "../actions/alert";
import {getPlaylist, removePlaylist, savePlaylist, playlistRemoveTrack, playlistAddTrack} from "../../utils";

export function* getPlaylistRequest({playlistId}) {
    try {
        const {data} = yield getPlaylist(playlistId);
        yield put(playlistActions.getPlaylistSuccess(data));
        yield put(getTracksExtras(data.tracks.items, "playlist"));
    } catch(error) {
        console.log(error);
        yield put(playlistActions.getPlaylistFailure(error));
    }
};

export function* removePlaylistRequest({ playlistId}) {  
    try {
        const {playlist} = yield select((state) => state.playlist);
        yield removePlaylist(playlistId);
        playlist.isSaved = false;
        yield put(playlistActions.getPlaylistSuccess(playlist));
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to remove playlist"));
    }
};

export function* savePlaylistRequest({ playlistId}) {  
    try {
        const {playlist} = yield select((state) => state.playlist);
        yield savePlaylist(playlistId);
        playlist.isSaved = true;
        yield put(playlistActions.getPlaylistSuccess(playlist));
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to save playlist"));
    }
};

export function* playlistRemoveTrackRequest({playlistId, trackUri}) {
    try {
        yield playlistRemoveTrack(playlistId, trackUri);
        yield put(addAlert("Track removed from playlist"));
        const playlist = yield select((state) => state.playlist.playlist);
        playlist.tracks.items = playlist.tracks.items.filter((item) => item.uri !== trackUri);
        // if tracks already have audio analysis update playlist or else get tracks extras
        if (playlist.tracks.items.length > 0 && playlist.tracks.items[0].audioAnalysis && playlist.tracks.items[0].audioAnalysis !== "loading") {
            yield put(playlistActions.getPlaylistSuccess({...playlist}));
        } else {
            yield put(getTracksExtras(playlist.tracks.items, "playlist"));
        }
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to remove track"));
    }
};

export function* playlistAddTrackRequest({playlistId, trackUri}) {
    try {
        yield playlistAddTrack(playlistId, trackUri);
        yield put(addAlert("Track added to playlist"));
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to add track"));
    }
};

export default function* () {
    yield takeLatest(playlistActions.GET_PLAYLIST_REQUEST, getPlaylistRequest);
    yield takeEvery(playlistActions.REMOVE_PLAYLIST_REQUEST, removePlaylistRequest);
    yield takeLatest(playlistActions.SAVE_PLAYLIST_REQUEST, savePlaylistRequest);
    yield takeEvery(playlistActions.PLAYLIST_REMOVE_TRACK_REQUEST, playlistRemoveTrackRequest);
    yield takeEvery(playlistActions.PLAYLIST_ADD_TRACK_REQUEST, playlistAddTrackRequest);
};