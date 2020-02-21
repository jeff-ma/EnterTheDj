export const GET_LIBRARY_REQUEST = 'GET_LIBRARY_REQUEST'; 
export const GET_LIBRARY_SUCCESS = 'GET_LIBRARY_SUCCESS';
export const GET_LIBRARY_FAILURE = 'GET_LIBRARY_FAILURE';
export const REMOVE_ALBUM_REQUEST = 'REMOVE_ALBUM_REQUEST';
export const REMOVE_ALBUM_SUCCESS = 'REMOVE_ALBUM_SUCCESS';
export const REMOVE_ALBUM_FAILURE = 'REMOVE_ALBUM_FAILURE';
export const REMOVE_TRACK_REQUEST = 'REMOVE_TRACK_REQUEST';
export const REMOVE_TRACK_SUCCESS = 'REMOVE_TRACK_SUCCESS';
export const REMOVE_TRACK_FAILURE = 'REMOVE_TRACK_FAILURE';
export const SAVE_ALBUM_REQUEST = 'SAVE_ALBUM_REQUEST';
export const SAVE_ALBUM_SUCCESS = 'SAVE_ALBUM_SUCCESS';
export const SAVE_ALBUM_FAILURE = 'SAVE_ALBUM_FAILURE';
export const SAVE_TRACK_REQUEST = 'SAVE_TRACK_REQUEST';
export const SAVE_TRACK_SUCCESS = 'SAVE_TRACK_SUCCESS';
export const SAVE_TRACK_FAILURE = 'SAVE_TRACK_FAILURE';
export const REMOVE_PLAYLIST_REQUEST = 'REMOVE_PLAYLIST_REQUEST';
export const REMOVE_PLAYLIST_SUCCESS = 'REMOVE_PLAYLIST_SUCCESS';
export const REMOVE_PLAYLIST_FAILURE = 'REMOVE_PLAYLIST_FAILURE';
export const SAVE_PLAYLIST_REQUEST = 'SAVE_PLAYLIST_REQUEST';
export const SAVE_PLAYLIST_SUCCESS = 'SAVE_PLAYLIST_SUCCESS';
export const SAVE_PLAYLIST_FAILURE = 'SAVE_PLAYLIST_FAILURE';
export const REMOVE_ARTIST_REQUEST = 'REMOVE_ARTIST_REQUEST';
export const REMOVE_ARTIST_SUCCESS = 'REMOVE_ARTIST_SUCCESS';
export const REMOVE_ARTIST_FAILURE = 'REMOVE_ARTIST_FAILURE';
export const SAVE_ARTIST_REQUEST = 'SAVE_ARTIST_REQUEST';
export const SAVE_ARTIST_SUCCESS = 'SAVE_ARTIST_SUCCESS';
export const SAVE_ARTIST_FAILURE = 'SAVE_ARTIST_FAILURE';
export const PLAYLIST_REMOVE_TRACK = 'PLAYLIST_REMOVE_TRACK';
export const PLAYLIST_ADD_TRACK = 'PLAYLIST_ADD_TRACK';
export const GET_TRACKS_EXTRAS = 'GET_TRACKS_EXTRAS';

export const getLibraryRequest = (accessToken) => ({
    type: GET_LIBRARY_REQUEST,
    isLoading: true,
    accessToken
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

export const removeAlbumRequest = (albumId, accessToken) => ({
    type: REMOVE_ALBUM_REQUEST,
    isLoading: false,
    albumId,
    accessToken
});

export const removeAlbumSuccess = (data) => ({
    type: REMOVE_ALBUM_SUCCESS,
    isLoading: false,
    data
});

export const removeAlbumFailure = (error) => ({
    type: REMOVE_ALBUM_FAILURE,
    isLoading: false,
    error
});

export const removeTrackRequest = (trackId, accessToken) => ({
    type: REMOVE_TRACK_REQUEST,
    isLoading: false,
    trackId,
    accessToken
});

export const removeTrackSuccess = (data) => ({
    type: REMOVE_TRACK_SUCCESS,
    isLoading: false,
    data
});

export const removeTrackFailure = (error) => ({
    type: REMOVE_TRACK_FAILURE,
    isLoading: false,
    error
});

export const saveAlbumRequest = (albumId, accessToken) => ({
    type: SAVE_ALBUM_REQUEST,
    isLoading: false,
    albumId,
    accessToken
});

export const saveAlbumSuccess = (data) => ({
    type: SAVE_ALBUM_SUCCESS,
    isLoading: false,
    data
});

export const saveAlbumFailure = (error) => ({
    type: SAVE_ALBUM_FAILURE,
    isLoading: false,
    error
});

export const saveTrackRequest = (trackId, accessToken) => ({
    type: SAVE_TRACK_REQUEST,
    isLoading: false,
    trackId,
    accessToken
});

export const saveTrackSuccess = (data) => ({
    type: SAVE_TRACK_SUCCESS,
    isLoading: false,
    data
});

export const saveTrackFailure = (error) => ({
    type: SAVE_TRACK_FAILURE,
    isLoading: false,
    error
});

export const removePlaylistRequest = (playlistId, accessToken) => ({
    type: REMOVE_PLAYLIST_REQUEST,
    isLoading: false,
    playlistId,
    accessToken
});

export const removePlaylistSuccess = (data) => ({
    type: REMOVE_PLAYLIST_SUCCESS,
    isLoading: false,
    data
});

export const removePlaylistFailure = (error) => ({
    type: REMOVE_PLAYLIST_FAILURE,
    isLoading: false,
    error
});

export const savePlaylistRequest = (playlistId, accessToken) => ({
    type: SAVE_PLAYLIST_REQUEST,
    isLoading: false,
    playlistId,
    accessToken
});

export const savePlaylistSuccess = (data) => ({
    type: SAVE_PLAYLIST_SUCCESS,
    isLoading: false,
    data
});

export const savePlaylistFailure = (error) => ({
    type: SAVE_PLAYLIST_FAILURE,
    isLoading: false,
    error
});

export const removeArtistRequest = (artistId, accessToken) => ({
    type: REMOVE_ARTIST_REQUEST,
    isLoading: true,
    artistId, 
    accessToken
});

export const removeArtistSuccess = (data) => ({
    type: REMOVE_ARTIST_SUCCESS,
    isLoading: false,
    data
});

export const removeArtistFailure = (error) => ({
    type: REMOVE_ARTIST_FAILURE,
    isLoading: false,
    error
});

export const saveArtistRequest = (artistId, accessToken) => ({
    type: SAVE_ARTIST_REQUEST,
    isLoading: true,
    artistId,
    accessToken
});

export const saveArtistSuccess = (data) => ({
    type: SAVE_ARTIST_SUCCESS,
    isLoading: false,
    data
});

export const saveArtistFailure = (error) => ({
    type: SAVE_ARTIST_FAILURE,
    isLoading: false,
    error
});

export const playlistRemoveTrack = (playlistId, trackUri) => ({
    type: PLAYLIST_REMOVE_TRACK,
    isLoading: false,
    playlistId,
    trackUri,
});

export const playlistAddTrack = (playlistId, trackUri) => ({
    type: PLAYLIST_ADD_TRACK,
    isLoading: false,
    playlistId,
    trackUri
});

export const getTracksExtras = (tracks) => ({
    type: GET_TRACKS_EXTRAS,
    isLoading: false,
    tracks
});