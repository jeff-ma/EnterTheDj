import {
    GET_TOP_REQUEST,
    GET_TOP_SUCCESS,
    GET_TOP_FAILURE
} from '../actions/top';

const initialState = {
    artists: {},
    tracks: {},
    isLoading: true
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_TOP_REQUEST: 
            return Object.assign({}, state, {isLoading: action.isLoading});
        case GET_TOP_SUCCESS:
            return Object.assign({}, state, {isLoading: action.isLoading, artists: action.data.artists, tracks: action.data.tracks});
        case GET_TOP_FAILURE:
            return Object.assign({}, state, {isLoading: false, error: action.error});
        default: return state;
    }
};