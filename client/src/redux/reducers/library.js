import {
    GET_LIBRARY_REQUEST,
    GET_LIBRARY_SUCCESS,
    GET_LIBRARY_FAILURE,
} from '../actions/library';

const initialState = {
    albums: {},
    artists: {},
    playlists: {},
    shows: {},
    tracks: {},
    isLoading: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_LIBRARY_REQUEST: 
            return {...state, isLoading: action.isLoading};
        case GET_LIBRARY_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading,
                albums: action.data.albums,
                artists: action.data.artists,
                playlists: action.data.playlists,
                shows: action.data.shows,
                tracks: action.data.tracks
            };
        case GET_LIBRARY_FAILURE:
            return {...state, isLoading: false, error: action.error};
        default: 
            return state;
    }
}