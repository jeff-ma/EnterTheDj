export const GET_TOP_REQUEST = "GET_TOP_REQUEST"; 
export const GET_TOP_SUCCESS = "GET_TOP_SUCCESS";
export const GET_TOP_FAILURE = "GET_TOP_FAILURE";

export const getTopRequest = () => ({
    type: GET_TOP_REQUEST,
    isLoading: true
});

export const getTopSuccess = (data) => ({
    type: GET_TOP_SUCCESS,
    isLoading: false,
    data
});

export const getTopFailure = (error) => ({
    type: GET_TOP_FAILURE,
    isLoading: false,
    error
});