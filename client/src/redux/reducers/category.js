import {
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILURE
} from '../actions/category';

const initialState = {
    isLoading: false,
    playlists: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORY_REQUEST:
            return Object.assign({}, state, {isLoading: action.isLoading});
        case GET_CATEGORY_SUCCESS: 
            return Object.assign({}, state, {isLoading: action.isLoading, playlists: action.data});
        case GET_CATEGORY_FAILURE:
            return Object.assign({}, state, {isLoading: action.isLoading, error: action.error});
        default:
            return state;
    }
}