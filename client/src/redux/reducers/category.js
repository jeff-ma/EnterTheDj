import {
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILURE
} from "../actions/category";

const initialState = {
    isLoading: true,
    playlists: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_CATEGORY_REQUEST:
            return {...state, isLoading: action.isLoading, query: action.query, error: action.error};
        case GET_CATEGORY_SUCCESS: 
            return {...state, isLoading: action.isLoading, data: action.data};
        case GET_CATEGORY_FAILURE:
            return {...state, isLoading: action.isLoading, error: action.error};
        default:
            return state;
    }
};