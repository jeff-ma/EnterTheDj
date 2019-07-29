export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILURE = 'GET_CATEGORY_FAILURE';

export const getCategoryRequest = (categoryId) => {
    return {
        type: GET_CATEGORY_REQUEST,
        isLoading: true,
        categoryId
    }
};

export const getCategorySuccess = (data) => {
    return {
        type: GET_CATEGORY_SUCCESS,
        isLoading: false,
        data
    }
};

export const getCategoryFailure = (error) => {
    return {
        type: GET_CATEGORY_FAILURE,
        isLoading: false,
        error
    }
};