import {put, takeLatest} from "redux-saga/effects";
import * as categoryActions from "../actions/category";
import {getCategory} from "../../utils";

export function* getCategoryRequest({categoryId, query}) {
    try {
        const {data} = yield getCategory(categoryId, query);
        yield put(categoryActions.getCategorySuccess(data));
    } catch(error) {
        console.log(error);
        yield put(categoryActions.getCategoryFailure(error));
    }
};

export default function*() {
    yield takeLatest(categoryActions.GET_CATEGORY_REQUEST, getCategoryRequest);
};