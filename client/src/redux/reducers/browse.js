import {
    GET_BROWSE_REQUEST,
    GET_BROWSE_SUCCESS,
    GET_BROWSE_FAILURE
} from "../actions/browse";

const initialState = {
    isLoading: true,
    categories: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_BROWSE_REQUEST: 
            return {...state, isLoading: action.isLoading, query: action.query, error: action.error};
        case GET_BROWSE_SUCCESS:
            return {...state, isLoading: action.isLoading, data: action.data.categories};
        case GET_BROWSE_FAILURE:
            return {...state, isLoading: action.isLoading, error: action.error};
        default: return state;
    }
};