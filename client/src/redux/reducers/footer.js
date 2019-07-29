import { UPDATE_AUDIO} from '../actions/footer';

const initialState = {
    audioId: null,
    audioType: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_AUDIO: 
        return Object.assign({}, state, {
            audioId: action.audioId,
            audioType: action.audioType
        });
        default: return state;
    }
}