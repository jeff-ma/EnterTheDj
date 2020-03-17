export const SET_TRACK_INDEX = 'SET_TRACK_INDEX';
export const REMOVE_TRACK_REQUEST = 'REMOVE_TRACK_REQUEST';
export const SAVE_TRACK_REQUEST = 'SAVE_TRACK_REQUEST';
export const GET_TRACKS_EXTRAS = 'GET_TRACKS_EXTRAS';

export const setTrackIndex = (index) => ({
    type: SET_TRACK_INDEX,
    index
});

export const removeTrackRequest = (trackId) => ({
    type: REMOVE_TRACK_REQUEST,
    trackId
});

export const saveTrackRequest = (trackId) => ({
    type: SAVE_TRACK_REQUEST,
    trackId
});

export const getTracksExtras = (tracks, path) => ({
    type: GET_TRACKS_EXTRAS,
    isLoading: false,
    tracks,
    path
});