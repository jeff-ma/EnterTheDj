import { 
    GET_ALBUM_REQUEST,
    GET_ALBUM_SUCCESS,
    GET_ALBUM_FAILURE,
    GET_LYRICS_REQUEST,
    GET_LYRICS_SUCCESS,
    GET_LYRICS_FAILURE
} from '../actions/album';

const initialState = {
    album: {},
    lyrics: "",
    isLoading: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_ALBUM_REQUEST:
        return Object.assign({}, state, {isLoading: action.isLoading});
        case GET_ALBUM_SUCCESS: 
        return Object.assign({}, state, {
            isLoading: action.isLoading, 
            album: action.data,
        });
        case GET_ALBUM_FAILURE: 
        return Object.assign({}, state, {error: action.error, isLoading: action.isLoading});
        case GET_LYRICS_REQUEST:
        return Object.assign({}, state, {isLoading: action.isLoading});
        case GET_LYRICS_SUCCESS:
        let album = {...state.album, lyricsAvailable: true};
        album.tracks.items = action.tracks;
        return Object.assign({}, state, {isLoading: action.isLoading, album});
        case GET_LYRICS_FAILURE:
        return Object.assign({}, state, {error: action.error, isLoading: action.isLoading});
        default: return state;
    }
};