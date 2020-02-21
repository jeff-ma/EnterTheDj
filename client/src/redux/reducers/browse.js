import {GET_BROWSE_REQUEST, GET_BROWSE_SUCCESS, GET_BROWSE_FAILURE} from '../actions/browse';

const initialState = {
    isLoading: true,
    categories: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_BROWSE_REQUEST: 
            return Object.assign({}, state, {isLoading: action.isLoading, query: action.query});
        case GET_BROWSE_SUCCESS:
            return Object.assign({}, state, {isLoading: action.isLoading, categories: action.data.categories});
        case GET_BROWSE_FAILURE:
            return Object.assign({}, state, {isLoading: action.isLoading, error: action.error});
        default: return state;
    }
};