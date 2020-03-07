export const GET_LIBRARY_REQUEST = 'GET_LIBRARY_REQUEST'; 
export const GET_LIBRARY_SUCCESS = 'GET_LIBRARY_SUCCESS';
export const GET_LIBRARY_FAILURE = 'GET_LIBRARY_FAILURE';
// export const PLAYLIST_REMOVE_TRACK = 'PLAYLIST_REMOVE_TRACK';
// export const PLAYLIST_ADD_TRACK = 'PLAYLIST_ADD_TRACK';
// export const GET_TRACKS_EXTRAS = 'GET_TRACKS_EXTRAS';

export const getLibraryRequest = () => ({
    type: GET_LIBRARY_REQUEST,
    isLoading: true
});

export const getLibrarySuccess = (data) => ({
    type: GET_LIBRARY_SUCCESS,
    isLoading: false,
    data
});

export const getLibraryFailure = (error) => ({
    type: GET_LIBRARY_FAILURE,
    isLoading: false,
    error
});

// export const getTracksExtras = (tracks) => ({
//     type: GET_TRACKS_EXTRAS,
//     isLoading: false,
//     tracks
// });