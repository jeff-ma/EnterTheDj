export const GET_LIBRARY_REQUEST = 'GET_LIBRARY_REQUEST'; 
export const GET_LIBRARY_SUCCESS = 'GET_LIBRARY_SUCCESS';
export const GET_LIBRARY_FAILURE = 'GET_LIBRARY_FAILURE';

export const getLibraryRequest = () => ({
    type: GET_LIBRARY_REQUEST,
    isLoading: true
});

export const getLibrarySuccess = (data) => ({
    type: GET_LIBRARY_SUCCESS,
    isLoading: false,
    data
});

export const getLibraryFailure = (error) => ({
    type: GET_LIBRARY_FAILURE,
    isLoading: false,
    error
});