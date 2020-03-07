export const GET_ALBUM_REQUEST = 'GET_ALBUM_REQUEST';
export const GET_ALBUM_SUCCESS = 'GET_ALBUM_SUCCESS';
export const GET_ALBUM_FAILURE = 'GET_ALBUM_FAILURE';
export const REMOVE_ALBUM_REQUEST = 'REMOVE_ALBUM_REQUEST';
export const REMOVE_ALBUM_SUCCESS = 'REMOVE_ALBUM_SUCCESS';
export const REMOVE_ALBUM_FAILURE = 'REMOVE_ALBUM_FAILURE';
export const SAVE_ALBUM_REQUEST = 'SAVE_ALBUM_REQUEST';
export const SAVE_ALBUM_SUCCESS = 'SAVE_ALBUM_SUCCESS';
export const SAVE_ALBUM_FAILURE = 'SAVE_ALBUM_FAILURE';

export const getAlbumRequest = (albumId) => ({
    type: GET_ALBUM_REQUEST,
    isLoading: true,
    albumId, 
});

export const getAlbumSuccess = (data) => ({
    type: GET_ALBUM_SUCCESS,
    isLoading: false,
    data
});

export const getAlbumFailure = (error) => ({
    type: GET_ALBUM_FAILURE,
    isLoading: false,
    error
});

export const removeAlbumRequest = (albumId) => ({
    type: REMOVE_ALBUM_REQUEST,
    isLoading: false,
    albumId
});

export const saveAlbumRequest = (albumId) => ({
    type: SAVE_ALBUM_REQUEST,
    isLoading: false,
    albumId
});