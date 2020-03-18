import {
    GET_RECENT_REQUEST,
    GET_RECENT_SUCCESS,
    GET_RECENT_FAILURE
} from "../actions/recent";

const initialState = {
    tracks: {},
    isLoading: true
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_RECENT_REQUEST: 
            return  {...state, isLoading: action.isLoading, error: action.error};
        case GET_RECENT_SUCCESS:
            return {...state, isLoading: action.isLoading, tracks: action.data};
        case GET_RECENT_FAILURE:
            return {...state, isLoading: action.isLoading, error: action.error};
        default: return state;
    }
};