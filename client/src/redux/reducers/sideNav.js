import { CLOSE_NAV, TOGGLE_NAV } from '../actions/sideNav';

const initialState = {
    isNavActive: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case CLOSE_NAV: 
            return {...state, isNavActive: false};
        case TOGGLE_NAV: 
            return {...state, isNavActive: !state.isNavActive};
        default: 
            return state;
    }
};