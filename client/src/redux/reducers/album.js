import { 
    GET_ALBUM_REQUEST,
    GET_ALBUM_SUCCESS,
    GET_ALBUM_FAILURE
} from '../actions/album';

const initialState = {
    album: {},
    isLoading: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_ALBUM_REQUEST:
            return {...state, isLoading: action.isLoading};
        case GET_ALBUM_SUCCESS: 
            return {...state, isLoading: action.isLoading, album: {...action.data, tracks: {...action.data.tracks}}};
        case GET_ALBUM_FAILURE:
            return {...state, isLoading: action.isLoading, error: action.error}; 
        default: 
            return state;
    }
};