export const GET_PLAYLIST_TRACKS_REQUEST = 'GET_PLAYLIST_TRACKS_REQUEST';
export const GET_PLAYLIST_TRACKS_SUCCESS = 'GET_PLAYLIST_TRACKS_SUCCESS';
export const GET_PLAYLIST_TRACKS_FAILURE = 'GET_PLAYLIST_TRACKS_FAILURE';
export const GET_PLAYLIST_LYRICS_REQUEST = 'GET_PLAYLIST_LYRICS_REQUEST';
export const GET_PLAYLIST_LYRICS_SUCCESS = 'GET_PLAYLIST_LYRICS_SUCCESS';
export const GET_PLAYLIST_LYRICS_FAILURE = 'GET_PLAYLIST_LYRICS_FAILURE';

export const getPlaylistTracksRequest = (playlistId) => ({
        type: GET_PLAYLIST_TRACKS_REQUEST,
        isLoading: true,
        playlistId
});

export const getPlaylistTracksSuccess = (data) => ({
    type: GET_PLAYLIST_TRACKS_SUCCESS,
    isLoading: false,
    data
});

export const getPlaylistTracksFailure = (error) => ({
    type: GET_PLAYLIST_TRACKS_FAILURE,
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