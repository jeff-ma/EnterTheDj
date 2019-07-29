export const GET_ARTIST_REQUEST = 'GET_ARTIST_REQUEST';
export const GET_ARTIST_SUCCESS = 'GET_ARTIST_SUCCESS';
export const GET_ARTIST_FAILURE = 'GET_ARTIST_FAILURE';

export const getArtistRequest = (artistId) => {
    return {
        type: GET_ARTIST_REQUEST,
        isLoading: true,
        artistId: artistId
    }
};

export const getArtistSuccess = (data) => ({
    type: GET_ARTIST_SUCCESS,
    isLoading: false,
    data
});

export const getArtistFailure = (error) => ({
    type: GET_ARTIST_FAILURE,
    isLoading: false,
    error
});