export const GET_ALBUM_REQUEST = 'GET_ALBUM_REQUEST';
export const GET_ALBUM_SUCCESS = 'GET_ALBUM_SUCCESS';
export const GET_ALBUM_FAILURE = 'GET_ALBUM_FAILURE';
export const GET_LYRICS_REQUEST = 'GET_LYRICS_REQUEST';
export const GET_LYRICS_SUCCESS = 'GET_LYRICS_SUCCESS';
export const GET_LYRICS_FAILURE = 'GET_LYRICS_FAILURE';

export const getAlbumRequest = (albumId) => {
    return {
        type: GET_ALBUM_REQUEST,
        isLoading: true,
        albumId
    }
};

export const getAlbumSuccess = (data) => {
    return {
        type: GET_ALBUM_SUCCESS,
        isLoading: false,
        data: data
    }
};

export const getAlbumFailure = (error) => {
    return {
        type: GET_ALBUM_FAILURE,
        isLoading: false,
        error: error
    }
};

export const getLyricsRequest = (tracks) => {
    return {
        type: GET_LYRICS_REQUEST,
        isLoading: false,
        tracks
    }
};

export const getLyricsSuccess = (data) => {
    return {
        type: GET_LYRICS_SUCCESS,
        isLoading: false,
        tracks: data
    }
};

export const getLyricsFailure = (error) => {
    return {
        type: GET_LYRICS_FAILURE,
        isLoading: false,
        error
    }
};