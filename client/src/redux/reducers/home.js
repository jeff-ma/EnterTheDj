import { 
    GET_HOME_REQUEST,
    GET_HOME_SUCCESS,
    GET_HOME_FAILURE
} from "../actions/home";

const initialState = {
    latestAlbums: [],
    newAlbums: [],
    mostPopular: [],
    turnItUp: [],
    bruceLeePicks: [],
    top50: [],
    featuredPlaylists: [],
    newShows: [],
    isLoading: true,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_HOME_REQUEST:
            return {...state, isLoading: action.isLoading, error: action.error};
        case GET_HOME_SUCCESS: 
            return {...state, 
                isLoading: action.isLoading, 
                latestAlbums: action.data.latestAlbums,
                newAlbums: action.data.newAlbums,
                categories: action.data.categories,
                turnItUp: action.data.turnItUp,
                newShows: action.data.newShows,
                mostPopular: action.data.mostPopular,
                top50: action.data.top50,
                featuredPlaylists: action.data.featuredPlaylists,
                bruceLeePicks: action.data.bruceLeePicks,
            };
        case GET_HOME_FAILURE: 
            return {...state, isLoading: action.isLoading, error: action.error};
        default: 
            return state;
    }
};