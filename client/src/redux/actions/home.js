export const GET_HOME_ALBUMS_REQUEST = 'GET_HOME_ALBUMS_REQUEST';
export const GET_HOME_ALBUMS_SUCCESS = 'GET_HOME_ALBUMS_SUCCESS';
export const GET_HOME_ALBUMS_FAILURE = 'GET_HOME_ALBUMS_FAILURE';

export const getHomeAlbumsRequest = () => {
    return {
        type: GET_HOME_ALBUMS_REQUEST,
        isLoading: true
    }
};

export const getHomeAlbumsSuccess = (data) => {
    return {
        type: GET_HOME_ALBUMS_SUCCESS,
        isLoading: false,
        data: data
    }
};

export const getHomeAlbumsFailure = (error) => {
    return {
        type: GET_HOME_ALBUMS_FAILURE,
        isLoading: false,
        error: error
    }
};