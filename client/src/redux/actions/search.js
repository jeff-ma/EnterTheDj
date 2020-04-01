export const GET_SEARCH_REQUEST = "GET_SEARCH_REQUEST";
export const GET_SEARCH_SUCCESS = "GET_SEARCH_SUCCESS";
export const GET_SEARCH_FAILURE = "GET_SEARCH_FAILURE";

export const getSearchRequest = (query) => ({
    type: GET_SEARCH_REQUEST,
    isLoading: true,
    query
});

export const getSearchSuccess = (data) => ({
    type: GET_SEARCH_SUCCESS,
    isLoading: false,
    data
});

export const getSearchFailure = (error) => ({
    type: GET_SEARCH_FAILURE,
    isLoading: false,
    error
});