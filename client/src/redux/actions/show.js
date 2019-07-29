export const GET_SHOW_REQUEST = 'GET_SHOW_REQUEST';
export const GET_SHOW_SUCCESS = 'GET_SHOW_SUCCESS';
export const GET_SHOW_FAILURE = 'GET_SHOW_FAILURE';

export const getShowRequest = (showId) => {
    return {
        type: GET_SHOW_REQUEST,
        isLoading: true,
        showId
    }
};

export const getShowSuccess = (data) => {
    return {
        type: GET_SHOW_SUCCESS,
        isLoading: false,
        data: data
    }
};

export const getShowFailure = (error) => {
    return {
        type: GET_SHOW_FAILURE,
        isLoading: false,
        error: error
    }
};