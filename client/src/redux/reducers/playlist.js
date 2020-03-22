import { 
    GET_PLAYLIST_REQUEST,
    GET_PLAYLIST_SUCCESS,
    GET_PLAYLIST_FAILURE,
} from "../actions/playlist";

const initialState = {
    playlist: {},
    isLoading: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_PLAYLIST_REQUEST:
            return {...state, isLoading: action.isLoading, error: action.error};
        case GET_PLAYLIST_SUCCESS: 
            return {...state, isLoading: action.isLoading, playlist: action.data};
        case GET_PLAYLIST_FAILURE: 
            return {...state, isLoading: action.isLoading, error: action.error};
        default: return state;
    }
};