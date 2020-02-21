export const GET_ALBUM_REQUEST = 'GET_ALBUM_REQUEST';
export const GET_ALBUM_SUCCESS = 'GET_ALBUM_SUCCESS';
export const GET_ALBUM_FAILURE = 'GET_ALBUM_FAILURE';

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