export const GET_PLAYLISTS_REQUEST = 'GET_PLAYLISTS_REQUEST'; 
export const GET_PLAYLISTS_SUCCESS = 'GET_PLAYLISTS_SUCCESS';
export const GET_PLAYLISTS_FAILURE = 'GET_PLAYLISTS_FAILURE';

export const getPlaylistsRequest = () => ({
    type: GET_PLAYLISTS_REQUEST,
    isLoading: true
});

export const getPlaylistsSuccess = (data) => ({
    type: GET_PLAYLISTS_SUCCESS,
    isLoading: false,
    data
});

export const getPlaylistsFailure = (error) => ({
    type: GET_PLAYLISTS_FAILURE,
    isLoading: false,
    error
});