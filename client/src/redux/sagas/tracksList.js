import {put, select, takeEvery, takeLatest} from "redux-saga/effects";
import {addAlert} from "../actions/alert";
import {removeTrack, saveTrack} from "../../utils";
import {REMOVE_TRACK_REQUEST, SAVE_TRACK_REQUEST, GET_TRACKS_EXTRAS} from "../actions/tracksList";
import axios from "axios";

function* updateTracks(tracks, path) {
    let data;
    const state = yield select((state) => state[path]);
    if (path === "album" || path ==="playlist") {
        data = {...state[path], tracks: {...state[path].tracks, items: tracks}};
    } else if (path === "artist") {
        data = {...state, topTracks: {...state.topTracks, items: tracks}};
    } else if (path === "library") {
        data = {...state, tracks: {...state.tracks, items: tracks}};
    } else if (path === "recent") {
        data = {...state.tracks, items: tracks};
    } else if (path === "top") {
        data = {artists: state.artists, tracks: {...state.tracks, items: tracks}};
    } else if (path === "search") {
        data = {...state.searchResults, tracks: {...state.searchResults.tracks, items: tracks}};
    } 
    yield put({type: `GET_${path.toUpperCase()}_SUCCESS`, isLoading: false, data: data});
};

function* updateTrack(trackId) {
    let tracks;
    const path = window.location.pathname.split("/")[1];
    const state = yield select((state) => state[path]);
    if (path === "album") {
        tracks = {...state.album.tracks};
    } else if (path === "artist") {
        tracks = {...state.topTracks};
    } else if (path === "playlist") {
        tracks = {...state.playlist.tracks};
    } else if (path === "search") {
        tracks = {...state.searchResults.tracks};
    } else {
        tracks = {...state.tracks};
    }
    tracks.items.forEach((item) => {
        if (item.id === trackId) {
            item.isSaved = !item.isSaved;
        }
    });
    yield updateTracks(tracks.items, path);
};

function* getTracksExtras({tracks, path}) {
    try {
        if (tracks.length > 0) {
            tracks.forEach((track) => {
                track.lyrics = "loading";
                track.audioAnalysis = "loading"; 
                track.audioFeatures = "loading";
            });
            yield updateTracks(tracks, path);
            const lyrics = yield axios.post("/api/lyrics", {tracks});
            tracks.forEach((track, index) => {
                track.lyrics = lyrics.data[index].lyrics;
            });
            yield updateTracks(tracks, path);
            const audioData = yield axios.post("/api/audio_data", {tracks});
            tracks.forEach((track, index) => {
                track.audioAnalysis = audioData.data[index].audioAnalysis;
                track.audioFeatures = audioData.data[index].audioFeatures; 
            });
        }
        yield updateTracks(tracks, path);
    } catch (error) {
        console.log(error);
        if (tracks) {
            yield updateTracks(tracks, path);
        }
    }
};

export function* removeTrackRequest({trackId}) {
    try {
        yield removeTrack(trackId);
        yield updateTrack(trackId);
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to remove track"));
    }
};

export function* saveTrackRequest({trackId}) {  
    try {
        yield saveTrack(trackId);
        yield updateTrack(trackId);
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to save track"));
    }
};

export default function* () {
    yield takeEvery(REMOVE_TRACK_REQUEST, removeTrackRequest);
    yield takeLatest(SAVE_TRACK_REQUEST, saveTrackRequest);
    yield takeLatest(GET_TRACKS_EXTRAS, getTracksExtras);
};