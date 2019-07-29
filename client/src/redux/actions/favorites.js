export const GET_FAVORITES_REQUEST = 'GET_FAVORITES_REQUEST'; 
export const GET_FAVORITES_SUCCESS = 'GET_FAVORITES_SUCCESS';
export const GET_FAVORITES_FAILURE = 'GET_FAVORITES_FAILURE';

export const getFavoritesRequest = (accessToken) => ({
    type: GET_FAVORITES_REQUEST,
    isLoading: true,
    accessToken
});

export const getFavoritesSuccess = (data) => ({
    type: GET_FAVORITES_SUCCESS,
    isLoading: false,
    data
});

export const getFavoritesFailure = (error) => ({
    type: GET_FAVORITES_FAILURE,
    isLoading: false,
    error
});