import { 
    GET_ARTIST_REQUEST,
    GET_ARTIST_SUCCESS,
    GET_ARTIST_FAILURE
} from '../actions/artist';

const initialState = {
    artist: {},
    albums: [],
    bio: "",
    recommendations: [],
    isLoading: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_ARTIST_REQUEST: 
        return Object.assign({}, state, {
            isLoading: action.isLoading,
        });
        case GET_ARTIST_SUCCESS: 
        return Object.assign({}, state, {
            isLoading: action.isLoading,
            artist: action.data.artist,
            albums: action.data.albums,
            bio: action.data.bio,
            recommendations: action.data.recommendations
        });
        case GET_ARTIST_FAILURE: 
        return Object.assign({}, state, {
            isLoading: action.isLoading,
            error: action.error
        });
        default: return state;
    };
};