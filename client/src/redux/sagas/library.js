import {put, takeEvery, takeLatest, select} from 'redux-saga/effects';
import axios from 'axios';
import {Cookies} from 'react-cookie';
import * as libraryActions from '../actions/library';
import { getPlaylistSuccess } from '../actions/playlist';
import { GET_ARTIST_SUCCESS } from '../actions/artist';
import {addAlert} from '../actions/alert';
// import { getPlaylist } from '../../utils';

const cookies = new Cookies();
const accessToken = cookies.get("access_token");

function* updateCollection() {
    const path = window.location.pathname.split("/")[1];
    const state = yield select((state) => state[path]);
    const data = {...state[path]};
    data.isSaved = !data.isSaved;
    yield put({type: `GET_${path.toUpperCase()}_SUCCESS`, isLoading: false, data});
};

function* updateTracks(tracks) {
    console.log("updating tracks");
    try {
    const path = window.location.pathname.split("/")[1];
    const state = yield select((state) => state[path]);

    let data;
    console.log("updateing T");
    if (path === "album" || path ==="playlist") {
        state[path].tracks.items = tracks;
        // data = {...state[path], tracks: {...state[path].tracks}};
        data = state[path];
    } else if (path === "artist") {
        state.topTracks.items = tracks;
        data = {albums: state.albums, appearsOn: state.appearsOn, artist: state.artist, bio: state.bio, latest: state.latest, playlists: state.playlists, recommendations: state.recommendations, relatedArtists: state.relatedArtists, singles: state.singles, topTracks: {...state.topTracks}};
    } else if (path === "library") {
        state.tracks.items = tracks;
        data = {albums: state.albums, artists: state.artists, playlists: state.playlists, tracks: {...state.tracks}};
    } else if (path === "recent") {
        state.tracks.items = tracks;
        data = {...state.tracks};
    } else if (path === "top") {
        state.tracks.items = tracks;
        data = {artists: state.artists, tracks: {...state.tracks}};
    } else if (path === "search") {
        state.searchResults.tracks.items = tracks;
        data = {...state.searchResults};
    }
    console.log("updating T and putting");
    yield put({type: `GET_${path.toUpperCase()}_SUCCESS`, isLoading: false, data: data});
    } catch(error) {
        console.log(error);
    }
};

function* updateTrack(trackId) {
    console.log("updating track");
    const path = window.location.pathname.split("/")[1];
    console.log(path);
    const state = yield select((state) => state[path]);
    console.log(state);
    let tracks;
    if (path === "album") {
        tracks = state.album.tracks;
    } else if (path === "artist") {
        tracks = state.topTracks;
    } else if (path === "playlist") {
        tracks = state.playlist.tracks;
    } else if (path === "search") {
        tracks = state.searchResults.tracks;
    } else {
        tracks = state.tracks;
    }
    tracks.items.forEach((item) => {
        if (item.id === trackId) {
            item.isSaved = !item.isSaved;
        }
    });
    console.log("done updating track");
    yield updateTracks(tracks.items);
};

function* updateArtist() {
    const state = yield select((state) => state.artist);
    const artist = {...state.artist};
    artist.isSaved = !artist.isSaved;
    yield put({type: GET_ARTIST_SUCCESS, isLoading: false, data: {...state, artist}});
};

function* getTracksExtras({tracks}) {
// set each track to loading
    tracks.forEach((track, index) => {
        track.lyrics = "loading";
        track.audioAnalysis = "loading"; 
        track.audioFeatures = "loading";
    });
    yield updateTracks(tracks);
    console.log("getting track extras...");
    const lyrics = yield axios.post('/api/lyrics', {tracks});
    tracks.forEach((track, index) => {
        track.lyrics = lyrics.data[index].lyrics;
    });
    console.log("update traks for lyrics");
    yield updateTracks(tracks);
    console.log("done lyrcis ");        
    const audioData = yield axios.post('/api/audio_data', {tracks});
    tracks.forEach((track, index) => {
        track.audioAnalysis = audioData.data[index].audioAnalysis;
        track.audioFeatures = audioData.data[index].audioFeatures; 
    });
    yield updateTracks(tracks);
    console.log("done audio data ");
};

export function* getLibraryRequest({ accessToken }) {
    try {
        const data = yield axios.post('/api/library', {accessToken: accessToken}).then(response => response.data);
        yield put(libraryActions.getLibrarySuccess(data));
        console.log("getting lyrics..");
        yield put(libraryActions.getTracksExtras(data.tracks.items));
    } catch(error) {
        console.log(error);
        yield put(libraryActions.getLibraryFailure(error));
    }
};

export function* removeTrackRequest({ trackId, accessToken }) {
    console.log("removing track...");
    try {
        yield axios.delete('/api/library/tracks', { data:{accessToken, trackId}});
        console.log("track removed...");
        yield updateTrack(trackId);
    } catch(error) {
        console.log(error);
        yield put(libraryActions.removeTrackFailure(error));
    }
};

export function* saveTrackRequest({ trackId, accessToken }) {  
    console.log("saving track...");
    try {
        yield axios.put('/api/library/tracks', {accessToken, trackId});
        console.log("track saved");
        yield updateTrack(trackId);
    } catch(error) {
        console.log(error);
        yield put(libraryActions.saveTrackFailure(error));
    }
};

export function* removeAlbumRequest({ albumId, accessToken }) {  
    console.log("removing album...");
    console.log(albumId);
    console.log(accessToken);
    try {
        const data = yield axios.delete('/api/library/album', {data:{accessToken, albumId}}).then(response => response.data);
        yield put(libraryActions.removeAlbumSuccess(data));
        yield updateCollection();
        console.log("done ");
    } catch(error) {
        console.log(error);
        yield put(libraryActions.removeAlbumFailure(error));
    }
};

export function* saveAlbumRequest({ albumId, accessToken }) {  
    console.log("saveing album...");
    try {
        yield axios.put('/api/library/album', {accessToken, albumId}).then(response => response.data);
        yield updateCollection();
        console.log("done ");
    } catch(error) {
        console.log(error);
        yield put(libraryActions.saveAlbumFailure(error));
    }
};

export function* removePlaylistRequest({ playlistId, accessToken }) {  
    try {
        const data = yield axios.delete('/api/library/playlist', {data:{accessToken, playlistId}}).then(response => response.data);
        yield put(libraryActions.removePlaylistSuccess(data));
        // yield put(recentActions.getRecentRequest(accessToken));
        yield updateCollection();
        console.log("done ");
    } catch(error) {
        console.log(error);
        yield put(libraryActions.removePlaylistFailure(error));
    }
};

export function* savePlaylistRequest({ playlistId, accessToken }) {  
    console.log("saveing playlist..");
    try {
        yield axios.put('/api/library/playlist', {accessToken, playlistId}).then(response => response.data);
        yield updateCollection();
        // yield put(libraryActions.removePlaylistSuccess(data));
        // yield put(recentActions.getRecentRequest(accessToken));
        console.log("done ");
    } catch(error) {
        console.log(error);
        yield put(libraryActions.savePlaylistFailure(error));
    }
};

export function* removeArtistRequest({ artistId, accessToken}) {
    try {
        yield axios({
            method: "delete",
            url: encodeURI("https://api.spotify.com/v1/me/following?type=artist&ids=" + artistId),
            headers: {'Authorization': 'Bearer ' + accessToken},
            timeout: 20000
        });
        yield updateArtist();
    } catch(error) {
        yield put(libraryActions.removeArtistFailure(error));
    }
};

export function* saveArtistRequest({ artistId, accessToken}) {
    try {
        yield axios({
            method: "put",
            url: encodeURI("https://api.spotify.com/v1/me/following?type=artist&ids=" + artistId),
            headers: {'Authorization': 'Bearer ' + accessToken},
            timeout: 20000
        });
        yield updateArtist();
    } catch(error) {
        yield put(libraryActions.saveArtistFailure(error));
    }
};

export function* playlistRemoveTrack({playlistId, trackUri}) {
    try {
        yield axios({
            method: "delete",
            url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`),
            headers: {'Authorization': 'Bearer ' + accessToken},
            data: {
                tracks: [{uri: trackUri}]
            },
            timeout: 20000
        });
        yield put(addAlert("Track removed from playlist"));
        const playlist = yield select((state) => state.playlist.playlist);
        playlist.tracks.items = playlist.tracks.items.filter((item) => item.uri !== trackUri);
        // if tracks already have audio analysis update playlist or else get tracks extras
        if (playlist.tracks.items[0].audioAnalysis && playlist.tracks.items[0].audioAnalysis !== "loading") {
            yield put(getPlaylistSuccess({...playlist}));
        } else {
            yield put(libraryActions.getTracksExtras(playlist.tracks.items));
        }
    } catch(error) {
        console.log(error);
    }
};

export function* playlistAddTrack({playlistId, trackUri}) {
    try {
        // only add track if not in playlist
        const playlist = yield axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {headers: {'Authorization': 'Bearer ' + accessToken}}).then(response => response.data);
        if (playlist.tracks.items.length > 0 && !playlist.tracks.items.some((item) => item.track.uri === trackUri)) {
            yield axios({
                method: "post",
                url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`),
                headers: {'Authorization': 'Bearer ' + accessToken},
                timeout: 30000
            });
            yield put(addAlert("Track added to playlist"));
        }
    } catch(error) {
        console.log(error);
    }
};

export default function* () {
    yield takeLatest(libraryActions.GET_LIBRARY_REQUEST, getLibraryRequest);
    yield takeLatest(libraryActions.REMOVE_TRACK_REQUEST, removeTrackRequest);
    yield takeEvery(libraryActions.SAVE_TRACK_REQUEST, saveTrackRequest);
    yield takeEvery(libraryActions.REMOVE_ALBUM_REQUEST, removeAlbumRequest);
    yield takeLatest(libraryActions.SAVE_ALBUM_REQUEST, saveAlbumRequest);
    yield takeLatest(libraryActions.REMOVE_PLAYLIST_REQUEST, removePlaylistRequest);
    yield takeLatest(libraryActions.SAVE_PLAYLIST_REQUEST, savePlaylistRequest);
    yield takeLatest(libraryActions.REMOVE_ARTIST_REQUEST, removeArtistRequest);
    yield takeLatest(libraryActions.SAVE_ARTIST_REQUEST, saveArtistRequest);
    yield takeEvery(libraryActions.PLAYLIST_REMOVE_TRACK, playlistRemoveTrack);
    yield takeEvery(libraryActions.PLAYLIST_ADD_TRACK, playlistAddTrack);
    yield takeLatest(libraryActions.GET_TRACKS_EXTRAS, getTracksExtras);
};