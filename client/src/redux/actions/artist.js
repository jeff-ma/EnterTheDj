export const GET_ARTIST_REQUEST = "GET_ARTIST_REQUEST";
export const GET_ARTIST_SUCCESS = "GET_ARTIST_SUCCESS";
export const GET_ARTIST_FAILURE = "GET_ARTIST_FAILURE";
export const REMOVE_ARTIST_REQUEST = "REMOVE_ARTIST_REQUEST";
export const SAVE_ARTIST_REQUEST = "SAVE_ARTIST_REQUEST";

export const getArtistRequest = (artistId) => ({
    type: GET_ARTIST_REQUEST,
    isLoading: true,
    artistId
});

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

export const removeArtistRequest = (artistId) => ({
    type: REMOVE_ARTIST_REQUEST,
    artistId
});

export const saveArtistRequest = (artistId) => ({
    type: SAVE_ARTIST_REQUEST,
    artistId
});