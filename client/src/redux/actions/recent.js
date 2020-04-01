export const GET_RECENT_REQUEST = "GET_RECENT_REQUEST";
export const GET_RECENT_SUCCESS = "GET_RECENT_SUCCESS";
export const GET_RECENT_FAILURE = "GET_RECENT_FAILURE";

export const getRecentRequest = () => ({
    type: GET_RECENT_REQUEST,
    isLoading: true
});

export const getRecentSuccess = (data) => ({
    type: GET_RECENT_SUCCESS,
    isLoading: false,
    data
});

export const getRecentFailure = (error) => ({
    type: GET_RECENT_FAILURE,
    isLoading: false,
    error
});