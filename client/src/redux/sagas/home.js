import { put, takeLatest } from 'redux-saga/effects';
import * as homeActions from '../actions/home';
import axios from 'axios';

export function* getHomeRequest() {
    try {
        const data = yield axios('/api/home').then((response) => response.data);
       yield put(homeActions.getHomeSuccess(data));
    } catch(error) {
        console.log(error);
        yield put(homeActions.getHomeFailure(error));
    }
}

export function* watchHomeSaga() {
    yield takeLatest(homeActions.GET_HOME_REQUEST, getHomeRequest);
}