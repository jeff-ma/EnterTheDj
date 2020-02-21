import {SET_TRACK_INDEX} from '../actions/tracksList';

const initialState = {
    trackIndex: 0
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_TRACK_INDEX: 
            return {...state, trackIndex: action.index};
        default: 
            return state;
    }
};