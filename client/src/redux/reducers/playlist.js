import { 
    GET_PLAYLIST_REQUEST,
    GET_PLAYLIST_SUCCESS,
    GET_PLAYLIST_FAILURE,
    // GET_PLAYLIST_LYRICS_REQUEST,
    // GET_PLAYLIST_LYRICS_SUCCESS,
    // GET_PLAYLIST_LYRICS_FAILURE
} from '../actions/playlist';

const initialState = {
    playlist: {},
    isLoading: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_PLAYLIST_REQUEST:
        return {...state, isLoading: action.isLoading};
        case GET_PLAYLIST_SUCCESS: 
        return {...state, isLoading: action.isLoading, playlist: {...action.data, tracks: {...action.data.tracks}}};
        case GET_PLAYLIST_FAILURE: 
        return {...state, error: action.error, isLoading: action.isLoading};
        // case GET_PLAYLIST_LYRICS_REQUEST:
        // return {...state, isLoading: action.isLoading};
        // case GET_PLAYLIST_LYRICS_SUCCESS:
        // let playlist = {...state.playlist, lyricsAvailable: true};
        // playlist.tracks.items = action.tracks;
        // return {...state, isLoading: action.isLoading, playlist};
        // case GET_PLAYLIST_LYRICS_FAILURE:
        // return {...state, error: action.error, isLoading: action.isLoading};
        default: return state;
    }
};