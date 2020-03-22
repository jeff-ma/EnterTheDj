import { 
    GET_SHOW_REQUEST,
    GET_SHOW_SUCCESS,
    GET_SHOW_FAILURE
} from "../actions/show";

const initialState = {
    show:{},
    isLoading: true
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_SHOW_REQUEST:
            return {...state, isLoading: action.isLoading, error: action.error};
        case GET_SHOW_SUCCESS:
            return {...state, isLoading: action.isLoading, show: {...action.data}};
        case GET_SHOW_FAILURE:
            return {...state, isLoading: action.isLoading, error: action.error};
        default: return state;
    }
};