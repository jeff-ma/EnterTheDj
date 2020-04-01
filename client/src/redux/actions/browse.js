export const GET_BROWSE_REQUEST = "GET_BROWSE_REQUEST";
export const GET_BROWSE_SUCCESS = "GET_BROWSE_SUCCESS";
export const GET_BROWSE_FAILURE = "GET_BROWSE_FAILURE";

export const getBrowseRequest = (query) => ({
    type: GET_BROWSE_REQUEST,
    isLoading: true,
    query
});

export const getBrowseSuccess = (data) => ({
    type: GET_BROWSE_SUCCESS,
    isLoading: false,
    data
});

export const getBrowseFailure = (error) => ({
    type: GET_BROWSE_FAILURE,
    isLoading: false,
    error
});