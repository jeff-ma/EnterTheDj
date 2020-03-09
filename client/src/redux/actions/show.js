export const GET_SHOW_REQUEST = 'GET_SHOW_REQUEST';
export const GET_SHOW_SUCCESS = 'GET_SHOW_SUCCESS';
export const GET_SHOW_FAILURE = 'GET_SHOW_FAILURE';
export const REMOVE_SHOW_REQUEST = 'REMOVE_SHOW_REQUEST';
export const SAVE_SHOW_REQUEST = 'SAVE_SHOW_REQUEST';

export const getShowRequest = (showId) => ({
    type: GET_SHOW_REQUEST,
    isLoading: true,
    showId
});

export const getShowSuccess = (data) => ({
    type: GET_SHOW_SUCCESS,
    isLoading: false,
    data
});

export const getShowFailure = (error) => ({
    type: GET_SHOW_FAILURE,
    isLoading: false,
    error
});

export const removeShowRequest = (showId) => ({
    type: REMOVE_SHOW_REQUEST,
    showId
});

export const saveShowRequest = (showId) => ({
    type: SAVE_SHOW_REQUEST,
    showId
});