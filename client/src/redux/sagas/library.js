import {put, takeEvery, takeLatest, select} from 'redux-saga/effects';
import axios from 'axios';
import {Cookies} from 'react-cookie';
import * as libraryActions from '../actions/library';
import { getPlaylistSuccess } from '../actions/playlist';
import {getTracksExtras} from '../actions/tracksList';
// import {getTracksExtras} from '../actions/tracksList';
import {addAlert} from '../actions/alert';
import {getSavedAlbums, getSavedTracks, getSavedPlaylists, getSavedArtists, addIsSavedToTracks} from '../../utils';

const cookies = new Cookies();
const accessToken = cookies.get("access_token");

export function* getLibraryRequest() {
    try {
        console.log("getting library.");

        const responses = yield axios.all([
            getSavedAlbums(),
            getSavedTracks(),
            getSavedPlaylists(),
            getSavedArtists()
        ]);
        const albums = responses[0];
        const tracks = responses[1];
        const playlists = responses[2];
        const artists = responses[3].artists;
        // modify object to conform to standard structure
        albums.items = albums.items.map((item) => item.album);
        tracks.items = tracks.items.map((item) => item.track);
        yield addIsSavedToTracks(tracks.items, accessToken);
        // await addAudioDataToTracks(tracks.items);
        yield put(libraryActions.getLibrarySuccess({albums, tracks, playlists, artists}));
        console.log("getting lyrics..");
        yield put(getTracksExtras(tracks.items));
    } catch(error) {
        console.log(error);
        yield put(libraryActions.getLibraryFailure(error));
    }
};

// export function* playlistRemoveTrack({playlistId, trackUri}) {
//     try {
//         yield axios({
//             method: "delete",
//             url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`),
//             headers: {'Authorization': 'Bearer ' + accessToken},
//             data: {
//                 tracks: [{uri: trackUri}]
//             },
//             timeout: 20000
//         });
//         yield put(addAlert("Track removed from playlist"));
//         const playlist = yield select((state) => state.playlist.playlist);
//         playlist.tracks.items = playlist.tracks.items.filter((item) => item.uri !== trackUri);
//         // if tracks already have audio analysis update playlist or else get tracks extras
//         if (playlist.tracks.items[0].audioAnalysis && playlist.tracks.items[0].audioAnalysis !== "loading") {
//             yield put(getPlaylistSuccess({...playlist}));
//         } else {
//             yield put(getTracksExtras(playlist.tracks.items));
//         }
//     } catch(error) {
//         console.log(error);
//     }
// };

// export function* playlistAddTrack({playlistId, trackUri}) {
//     try {
//         // only add track if not in playlist
//         const playlist = yield axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {headers: {'Authorization': 'Bearer ' + accessToken}}).then(response => response.data);
//         if (playlist.tracks.items.length > 0 && !playlist.tracks.items.some((item) => item.track.uri === trackUri)) {
//             yield axios({
//                 method: "post",
//                 url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`),
//                 headers: {'Authorization': 'Bearer ' + accessToken},
//                 timeout: 30000
//             });
//             yield put(addAlert("Track added to playlist"));
//         }
//     } catch(error) {
//         console.log(error);
//     }
// };

export default function* () {
    yield takeLatest(libraryActions.GET_LIBRARY_REQUEST, getLibraryRequest);
    // yield takeEvery(libraryActions.PLAYLIST_REMOVE_TRACK, playlistRemoveTrack);
    // yield takeEvery(libraryActions.PLAYLIST_ADD_TRACK, playlistAddTrack);
    // yield takeLatest(libraryActions.GET_TRACKS_EXTRAS, getTracksExtras);
};