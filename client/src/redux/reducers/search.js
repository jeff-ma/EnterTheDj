import {
    GET_SEARCH_REQUEST,
    GET_SEARCH_SUCCESS,
    GET_SEARCH_FAILURE
} from '../actions/search';

const initialState = {
    searchResults: {
        albums: null,
        artist: null,
        playlists: null,
        shows: null,
        tracks: null
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCH_REQUEST: 
            return Object.assign({}, state, {isLoading: action.isLoading}); 
        case GET_SEARCH_SUCCESS: 
            return Object.assign({}, state, {isLoading: action.isLoading, searchResults: action.data});
        case GET_SEARCH_FAILURE:
            return Object.assign({}, state, {isLoading: action.isLoading, error: action.error});
        default: return state;
    }
};