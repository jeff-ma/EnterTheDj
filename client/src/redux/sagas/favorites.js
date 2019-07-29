import {put, takeLatest} from 'redux-saga/effects';
import * as favoritesActions from '../actions/favorites';
import axios from 'axios';

export function* getFavoritesRequest({ accessToken }) {
    try {
        const data = yield axios.post('/api/favorites', {accessToken: accessToken}).then(response => response.data);
        console.log(data);
        yield put(favoritesActions.getFavoritesSuccess(data));
    } catch(error) {
        console.log(error);
        yield put(favoritesActions.getFavoritesFailure(error));
    }
};

// export function* addFavoritesRequest({ accessToken }) {
//     try {
//         const data = yield axios.put('/api/favorites', {accessToken: accessToken}).then(response => response.data);
//         yield put(favoritesActions.addFavoritesSuccess(data));
//     } catch(error) {
//         console.log(error);
//         yield put(favoritesActions.addFavoritesFailure(error));
//     }
// };

// export function* removeFavoritesRequest({ accessToken }) {
//     try {
//         const data = yield axios.delete('/api/favorites', {accessToken: accessToken}).then(response => response.data);
//         yield put(favoritesActions.removeFavoritesSuccess(data));
//     } catch(error) {
//         console.log(error);
//         yield put(favoritesActions.removeFavoritesFailure(error));
//     }
// };

export default function* () {
    yield takeLatest(favoritesActions.GET_FAVORITES_REQUEST, getFavoritesRequest);
    // yield takeLatest(favoritesActions.ADD_FAVORITES_REQUEST, getFavoritesRequest);
    // yield takeLatest(favoritesActions.REMOVE_FAVORITES_REQUEST, getFavoritesRequest);
};