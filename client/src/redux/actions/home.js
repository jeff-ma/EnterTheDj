export const GET_HOME_REQUEST = "GET_HOME_REQUEST";
export const GET_HOME_SUCCESS = "GET_HOME_SUCCESS";
export const GET_HOME_FAILURE = "GET_HOME_FAILURE";

export const getHomeRequest = () => ({
    type: GET_HOME_REQUEST,
    isLoading: true
});

export const getHomeSuccess = (data) => ({
    type: GET_HOME_SUCCESS,
    isLoading: false,
    data
});

export const getHomeFailure = (error) => ({
    type: GET_HOME_FAILURE,
    isLoading: false,
    error
});