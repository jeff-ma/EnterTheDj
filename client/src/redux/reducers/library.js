import {
    GET_LIBRARY_REQUEST,
    GET_LIBRARY_SUCCESS,
    GET_LIBRARY_FAILURE,
    REMOVE_ALBUM_REQUEST,
    REMOVE_ALBUM_SUCCESS,
    REMOVE_ALBUM_FAILURE,
    REMOVE_TRACK_REQUEST,
    REMOVE_TRACK_SUCCESS,
    REMOVE_TRACK_FAILURE,
    SAVE_ALBUM_REQUEST,
    SAVE_ALBUM_SUCCESS,
    SAVE_ALBUM_FAILURE,
    SAVE_TRACK_REQUEST,
    SAVE_TRACK_SUCCESS,
    SAVE_TRACK_FAILURE,
    REMOVE_PLAYLIST_REQUEST,
    REMOVE_PLAYLIST_SUCCESS,
    REMOVE_PLAYLIST_FAILURE,   
    SAVE_PLAYLIST_REQUEST,
    SAVE_PLAYLIST_SUCCESS,
    SAVE_PLAYLIST_FAILURE,
    // REMOVE_ARTIST_REQUEST,
    // REMOVE_ARTIST_SUCCESS,
    // REMOVE_ARTIST_FAILURE,
    // SAVE_ARTIST_REQUEST,
    // SAVE_ARTIST_SUCCESS,
    // SAVE_ARTIST_FAILURE
    GET_TRACKS_EXTRAS
} from '../actions/library';

const initialState = {
    albums: {},
    tracks: {},
    isLoading: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_LIBRARY_REQUEST: 
            return Object.assign({}, state, {isLoading: action.isLoading});
        case GET_LIBRARY_SUCCESS:
            return Object.assign({}, state, {
                isLoading: action.isLoading, 
                albums: action.data.albums, 
                tracks: action.data.tracks, 
                playlists: action.data.playlists,
                artists: action.data.artists
            });
        case GET_LIBRARY_FAILURE:
            return Object.assign({}, state, {isLoading: false, error: action.error});
        case REMOVE_ALBUM_REQUEST:
            return {...state, isLoading: action.isLoading};
        case REMOVE_ALBUM_SUCCESS:
            return {...state, isLoading: action.isLoading};
        case REMOVE_ALBUM_FAILURE:
            return {...state, isLoading: action.isLoading};
        case REMOVE_TRACK_REQUEST:
            return {...state, isLoading: action.isLoading};
        case REMOVE_TRACK_SUCCESS:
            return {...state, isLoading: action.isLoading};
        case REMOVE_TRACK_FAILURE:
            return {...state, isLoading: action.isLoading};
        case SAVE_ALBUM_REQUEST:
            return {...state, isLoading: action.isLoading};
        case SAVE_ALBUM_SUCCESS:
            return {...state, isLoading: action.isLoading};
        case SAVE_ALBUM_FAILURE:
            return {...state, isLoading: action.isLoading};
        case SAVE_TRACK_REQUEST:
            return {...state, isLoading: action.isLoading};
        case SAVE_TRACK_SUCCESS:
            return {...state, isLoading: action.isLoading};
        case SAVE_TRACK_FAILURE:
            return {...state, isLoading: action.isLoading};
        case REMOVE_PLAYLIST_REQUEST:
            return {...state, isLoading: action.isLoading};
        case REMOVE_PLAYLIST_SUCCESS:
            return {...state, isLoading: action.isLoading};
        case REMOVE_PLAYLIST_FAILURE:
            return {...state, isLoading: action.isLoading};
        case SAVE_PLAYLIST_REQUEST:
            return {...state, isLoading: action.isLoading};
        case SAVE_PLAYLIST_SUCCESS:
            return {...state, isLoading: action.isLoading};
        case SAVE_PLAYLIST_FAILURE: 
            return {...state, isLoading: action.isLoading};
        case GET_TRACKS_EXTRAS:
            return {...state, isLoading: action.isLoading};
        default: 
            return state;
    }
}