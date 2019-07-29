import {
    GET_FAVORITES_REQUEST,
    GET_FAVORITES_SUCCESS,
    GET_FAVORITES_FAILURE
} from '../actions/favorites';

const initialState = {
    albums: {},
    tracks: {},
    isLoading: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_FAVORITES_REQUEST: 
            return Object.assign({}, state, {isLoading: action.isLoading});
        case GET_FAVORITES_SUCCESS:
            return Object.assign({}, state, {isLoading: action.isLoading, albums: action.data.albums, tracks: action.data.tracks});
        case GET_FAVORITES_FAILURE:
            return Object.assign({}, state, {isLoading: false, error: action.error});
        default: return state;
    }
};