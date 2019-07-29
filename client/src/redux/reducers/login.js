// import * as actions from '../actions/search';
import { LOGOUT } from '../actions/login';

const initialState = {
    isLoading: false,
    isLoggedIn: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGOUT: return Object.assign({}, state, {isLoggedIn: false});
        default: return state;
    }
};