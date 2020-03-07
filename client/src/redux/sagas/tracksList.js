import {put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
// import {Cookies} from 'react-cookie';
import {addAlert} from '../actions/alert';
import {removeTrack, saveTrack} from "../../utils";
import {REMOVE_TRACK_REQUEST, SAVE_TRACK_REQUEST, GET_TRACKS_EXTRAS} from '../actions/tracksList';

function* updateTracks(tracks) {
    // console.log("updating tracks");
    try {
    const path = window.location.pathname.split("/")[1];
    const state = yield select((state) => state[path]);

    let data;
    // console.log("updateing T");
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
    // console.log("updating T and putting");
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

function* getTracksExtras({tracks}) {
// set each track to loading
    tracks.forEach((track, index) => {
        track.lyrics = "loading";
        track.audioAnalysis = "loading"; 
        track.audioFeatures = "loading";
    });
    yield updateTracks(tracks);
    // console.log("getting track extras...");
    const lyrics = yield axios.post('/api/lyrics', {tracks});
    tracks.forEach((track, index) => {
        track.lyrics = lyrics.data[index].lyrics;
    });
    // console.log("update traks for lyrics");
    yield updateTracks(tracks);
    console.log("done lyrcis ");        
    const audioData = yield axios.post('/api/audio_data', {tracks});
    tracks.forEach((track, index) => {
        track.audioAnalysis = audioData.data[index].audioAnalysis;
        track.audioFeatures = audioData.data[index].audioFeatures; 
    });
    yield updateTracks(tracks);
    // console.log("done audio data ");
};

export function* removeTrackRequest({trackId}) {
    console.log("removing track...");
    try {
        // yield axios.delete('/api/library/tracks', { data:{accessToken, trackId}});
        yield removeTrack(trackId);
        console.log("track removed...");
        yield updateTrack(trackId);
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to remove track"));
        // yield put(libraryActions.removeTrackFailure(error));
    }
};

export function* saveTrackRequest({ trackId}) {  
    console.log("saving track...");
    try {
        // yield axios.put('/api/library/tracks', {accessToken, trackId});
        yield saveTrack(trackId);
        console.log("track saved");
        yield updateTrack(trackId);
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to save track"));
        // yield put(libraryActions.saveTrackFailure(error));
    }
};

export default function* () {
    yield takeEvery(REMOVE_TRACK_REQUEST, removeTrackRequest);
    yield takeLatest(SAVE_TRACK_REQUEST, saveTrackRequest);
    yield takeLatest(GET_TRACKS_EXTRAS, getTracksExtras);
};