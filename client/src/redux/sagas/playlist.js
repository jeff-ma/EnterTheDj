import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as playlistActions  from '../actions/playlist';
import { getTracksExtras } from '../actions/tracksList';
import {addAlert} from '../actions/alert';
import {removePlaylist, savePlaylist, playlistRemoveTrack, playlistAddTrack} from '../../utils';
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

export function* removePlaylistRequest({ playlistId}) {  
    try {
        const {playlist} = yield select((state) => state.playlist);
        yield removePlaylist(playlistId);
        playlist.isSaved = false;
        yield put(playlistActions.getPlaylistSuccess(playlist));
    } catch(error) {
        console.log(error);
        yield put(playlistActions.getPlaylistFailure(error));
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
        yield put(playlistActions.getPlaylistFailure(error));
    }
};

export function* playlistRemoveTrackRequest({playlistId, trackUri}) {
    try {
        // yield axios({
        //     method: "delete",
        //     url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`),
        //     headers: {'Authorization': 'Bearer ' + accessToken},
        //     data: {
        //         tracks: [{uri: trackUri}]
        //     },
        //     timeout: 20000
        // });
        yield playlistRemoveTrack(playlistId, trackUri);
        yield put(addAlert("Track removed from playlist"));
        const playlist = yield select((state) => state.playlist.playlist);
        playlist.tracks.items = playlist.tracks.items.filter((item) => item.uri !== trackUri);
        // if tracks already have audio analysis update playlist or else get tracks extras
        if (playlist.tracks.items[0].audioAnalysis && playlist.tracks.items[0].audioAnalysis !== "loading") {
            yield put(playlistActions.getPlaylistSuccess({...playlist}));
        } else {
            yield put(getTracksExtras(playlist.tracks.items));
        }
    } catch(error) {
        console.log(error);
    }
};

export function* playlistAddTrackRequest({playlistId, trackUri}) {
    try {
        // only add track if not in playlist
        // const playlist = yield axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {headers: {'Authorization': 'Bearer ' + accessToken}}).then(response => response.data);
        // if (playlist.tracks.items.length > 0 && !playlist.tracks.items.some((item) => item.track.uri === trackUri)) {
            // yield axios({
            //     method: "post",
            //     url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`),
            //     headers: {'Authorization': 'Bearer ' + accessToken},
            //     timeout: 30000
            // });
            yield playlistAddTrack(playlistId, trackUri);
            yield put(addAlert("Track added to playlist"));
        // }
    } catch(error) {
        console.log(error);
    }
};

export default function* () {
    yield takeLatest(playlistActions.GET_PLAYLIST_REQUEST, getPlaylistRequest);
    yield takeEvery(playlistActions.REMOVE_PLAYLIST_REQUEST, removePlaylistRequest);
    yield takeLatest(playlistActions.SAVE_PLAYLIST_REQUEST, savePlaylistRequest);
    yield takeEvery(playlistActions.PLAYLIST_REMOVE_TRACK_REQUEST, playlistRemoveTrackRequest);
    yield takeEvery(playlistActions.PLAYLIST_ADD_TRACK_REQUEST, playlistAddTrackRequest);
};