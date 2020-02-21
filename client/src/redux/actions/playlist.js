export const GET_PLAYLIST_REQUEST = 'GET_PLAYLIST_REQUEST';
export const GET_PLAYLIST_SUCCESS = 'GET_PLAYLIST_SUCCESS';
export const GET_PLAYLIST_FAILURE = 'GET_PLAYLIST_FAILURE';
export const GET_PLAYLIST_LYRICS_REQUEST = 'GET_PLAYLIST_LYRICS_REQUEST';
export const GET_PLAYLIST_LYRICS_SUCCESS = 'GET_PLAYLIST_LYRICS_SUCCESS';
export const GET_PLAYLIST_LYRICS_FAILURE = 'GET_PLAYLIST_LYRICS_FAILURE';

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

export const getPlaylistLyricsRequest = (tracks) => ({
    type: GET_PLAYLIST_LYRICS_REQUEST,
    isLoading: false,
    tracks
});

export const getPlaylistLyricsSuccess = (data) => ({
    type: GET_PLAYLIST_LYRICS_SUCCESS,
    isLoading: false,
    tracks: data
});

export const getPlaylistLyricsFailure = (error) => ({
    type: GET_PLAYLIST_LYRICS_FAILURE,
    isLoading: false,
    error
});