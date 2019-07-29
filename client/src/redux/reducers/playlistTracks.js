import { 
    GET_PLAYLIST_TRACKS_REQUEST,
    GET_PLAYLIST_TRACKS_SUCCESS,
    GET_PLAYLIST_TRACKS_FAILURE,
    GET_PLAYLIST_LYRICS_REQUEST,
    GET_PLAYLIST_LYRICS_SUCCESS,
    GET_PLAYLIST_LYRICS_FAILURE
} from '../actions/playlistTracks';

const initialState = {
    playlistTracks: {},
    isLoading: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_PLAYLIST_TRACKS_REQUEST:
        return Object.assign({}, state, {isLoading: action.isLoading});
        case GET_PLAYLIST_TRACKS_SUCCESS: 
        return Object.assign({}, state, {
            isLoading: action.isLoading, 
            playlistTracks: action.data,
        });
        case GET_PLAYLIST_TRACKS_FAILURE: 
        return Object.assign({}, state, {error: action.error, isLoading: action.isLoading});
        case GET_PLAYLIST_LYRICS_REQUEST:
        return Object.assign({}, state, {isLoading: action.isLoading});
        case GET_PLAYLIST_LYRICS_SUCCESS:
        let playlistTracks = {...state.playlistTracks, lyricsAvailable: true};
        playlistTracks.tracks.items = action.tracks;
        return Object.assign({}, state, {isLoading: action.isLoading, playlistTracks});
        case GET_PLAYLIST_LYRICS_FAILURE:
        return Object.assign({}, state, {error: action.error, isLoading: action.isLoading});
        default: return state;
    }
};