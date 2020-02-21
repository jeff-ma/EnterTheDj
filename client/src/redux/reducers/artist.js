import { 
    GET_ARTIST_REQUEST,
    GET_ARTIST_SUCCESS,
    GET_ARTIST_FAILURE
} from '../actions/artist';

const initialState = {
    artist: {},
    albums: [],
    appearsOn: {},
    bio: "",
    playlists: {},
    latest: {},
    recommendations: [],
    relatedArtists: [],
    singles: {},
    topTracks: {},
    isLoading: true
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
            appearsOn: action.data.appearsOn,
            bio: action.data.bio,
            latest: action.data.latest,
            playlists: action.data.playlists,
            recommendations: action.data.recommendations,
            relatedArtists: action.data.relatedArtists,
            singles: action.data.singles,
            topTracks: action.data.topTracks
        });
        case GET_ARTIST_FAILURE: 
        return Object.assign({}, state, {
            isLoading: action.isLoading,
            error: action.error
        });
        default: return state;
    }
};