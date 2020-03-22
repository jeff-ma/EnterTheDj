import {put, select, takeEvery, takeLatest} from "redux-saga/effects";
import * as showActions from "../actions/show";
import {addAlert} from "../actions/alert";
import {getShow, removeShow, saveShow} from "../../utils";

export function* getShowRequest({showId}) {
    try {
        const {data} = yield getShow(showId);
        yield put(showActions.getShowSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(showActions.getShowFailure(error));
    }
};

export function* removeShowRequest({showId}) {
    try {
        yield removeShow(showId);
        const {show} = yield select((state) => state.show);
        show.isSaved = false;
        yield put(showActions.getShowSuccess(show))
    } catch (error) {
        console.log(error);
        yield put(addAlert("Unable to remove show"));
    }
};

export function* saveShowRequest({showId}) {
    try {
        yield saveShow(showId);
        const {show} = yield select((state) => state.show);
        show.isSaved = true;
        yield put(showActions.getShowSuccess(show));
    } catch (error) {
        console.log(error);
        yield put(addAlert("Unable to save show"));
    }
};

export default function* () {
    yield takeLatest(showActions.GET_SHOW_REQUEST, getShowRequest);
    yield takeEvery(showActions.REMOVE_SHOW_REQUEST, removeShowRequest);
    yield takeLatest(showActions.SAVE_SHOW_REQUEST, saveShowRequest);
};