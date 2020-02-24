// import * as actions from '../actions/home';
import { 
    GET_HOME_ALBUMS_REQUEST,
    GET_HOME_ALBUMS_SUCCESS,
    GET_HOME_ALBUMS_FAILURE
} from '../actions/home';

const initialState = {
    albums: [],
    featured: [],
    mostPopular: [],
    newShows: [],
    topSongs: [],
    top50: [],
    featuredPlaylists: [],
    isLoading: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_HOME_ALBUMS_REQUEST:
        return Object.assign({}, state, {isLoading: action.isLoading});
        case GET_HOME_ALBUMS_SUCCESS: 
        return Object.assign({}, state, {
            isLoading: action.isLoading, 
            featured: action.data.featured,
            albums: action.data.albums,
            categories: action.data.categories,
            topSongs: action.data.topSongs,
            newShows: action.data.newShows,
            mostPopular: action.data.mostPopular,
            top50: action.data.top50,
            featuredPlaylists: action.data.featuredPlaylists,
            recommends: action.data.recommends,
            // data: action.data
        });
        case GET_HOME_ALBUMS_FAILURE: 
        return Object.assign({}, state, {isLoading: action.isLoading});
        default: return state;
    }
};