import {
    GET_PLAYLISTS_REQUEST, 
    GET_PLAYLISTS_SUCCESS, 
    GET_PLAYLISTS_FAILURE,
} from '../actions/playlists';

const initialState = {
    isLoading: false,
    playlists: {},
    featuredPlaylists: {},
    userPlaylists: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_PLAYLISTS_REQUEST: 
            return Object.assign({}, state, {isLoading: action.isLoading});
        case GET_PLAYLISTS_SUCCESS:
            // return Object.assign({}, state, {isLoading: action.isLoading, playlists: action.data});
            return Object.assign({}, state, {isLoading: action.isLoading, featuredPlaylists: action.data.featuredPlaylists, userPlaylists: action.data.userPlaylists});
        case GET_PLAYLISTS_FAILURE:
            return Object.assign({}, state, {isLoading: false, error: action.error});
        default: return state;
    }
};