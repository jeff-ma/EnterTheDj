import { UPDATE_PLAYER } from '../actions/player';

const initialState = {
    audioId: null,
    audioType: null,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_PLAYER:
            return {...state, audioId: action.audioId, audioType: action.audioType};
        default: 
            return state;
    }
};