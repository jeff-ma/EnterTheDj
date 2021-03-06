import {
    GET_SEARCH_REQUEST,
    GET_SEARCH_SUCCESS,
    GET_SEARCH_FAILURE
} from "../actions/search";

const initialState = {
    isLoading: true,
    searchResults: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_SEARCH_REQUEST: 
            return {...state, isLoading: action.isLoading, error: action.error}; 
        case GET_SEARCH_SUCCESS: 
            return {...state, isLoading: action.isLoading, searchResults: action.data};
        case GET_SEARCH_FAILURE:
            return {...state, isLoading: action.isLoading, error: action.error};
        default: return state;
    }
};