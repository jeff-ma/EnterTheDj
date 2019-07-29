import { put, takeLatest } from 'redux-saga/effects';
import * as homeActions from '../actions/home';
import axios from 'axios';

export function* getHomeAlbumsRequest() {
    try {
    const data = yield axios('/api/home').then((response) => response.data);
       yield put(homeActions.getHomeAlbumsSuccess(data));
    } catch(error) {
        console.log(error);
        yield put(homeActions.getHomeAlbumsFailure(error));
    }
}

export function* watchHomeSaga() {
    yield takeLatest(homeActions.GET_HOME_ALBUMS_REQUEST, getHomeAlbumsRequest);
}