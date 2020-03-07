export const GET_PLAYLIST_REQUEST = 'GET_PLAYLIST_REQUEST';
export const GET_PLAYLIST_SUCCESS = 'GET_PLAYLIST_SUCCESS';
export const GET_PLAYLIST_FAILURE = 'GET_PLAYLIST_FAILURE';
export const REMOVE_PLAYLIST_REQUEST = 'REMOVE_PLAYLIST_REQUEST';
export const SAVE_PLAYLIST_REQUEST = 'SAVE_PLAYLIST_REQUEST';
export const PLAYLIST_REMOVE_TRACK_REQUEST = 'PLAYLIST_REMOVE_TRACK_REQUEST';
export const PLAYLIST_ADD_TRACK_REQUEST = 'PLAYLIST_ADD_TRACK_REQUEST';

export const getPlaylistRequest = (playlistId) => ({
    type: GET_PLAYLIST_REQUEST,
    isLoading: true,
    playlistId
});

export const getPlaylistSuccess = (data) => ({
    type: GET_PLAYLIST_SUCCESS,
    isLoading: false,
    data
});

export const getPlaylistFailure = (error) => ({
    type: GET_PLAYLIST_FAILURE,
    isLoading: false,
    error: error
});

export const removePlaylistRequest = (playlistId) => ({
    type: REMOVE_PLAYLIST_REQUEST,
    playlistId
});

export const savePlaylistRequest = (playlistId) => ({
    type: SAVE_PLAYLIST_REQUEST,
    playlistId
});

export const playlistRemoveTrackRequest = (playlistId, trackUri) => ({
    type: PLAYLIST_REMOVE_TRACK_REQUEST,
    isLoading: false,
    playlistId,
    trackUri
});

export const playlistAddTrackRequest = (playlistId, trackUri) => ({
    type: PLAYLIST_ADD_TRACK_REQUEST,
    isLoading: false,
    playlistId,
    trackUri
});