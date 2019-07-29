import { put, takeLatest } from 'redux-saga/effects';
import * as categoryActions from '../actions/category';
import axios from 'axios';

export function* getCategoryRequest({ categoryId }) {
    try {
        const data = yield axios('/api/category/' + categoryId ).then(response => response.data);
        yield put(categoryActions.getCategorySuccess(data));
    } catch(error) {
        console.log(error);
        yield put(categoryActions.getCategoryFailure(error));
    }
};

export default function*() {
    yield takeLatest(categoryActions.GET_CATEGORY_REQUEST, getCategoryRequest);
};