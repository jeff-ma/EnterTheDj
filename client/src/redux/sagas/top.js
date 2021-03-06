import {put, takeLatest} from "redux-saga/effects";
import * as topActions from "../actions/top";
import {getTracksExtras} from "../actions/tracksList";
import {getTop} from "../../utils";

export function* getTopRequest() {
    try {
        const data = yield getTop();
        yield put(topActions.getTopSuccess(data));
        yield put(getTracksExtras(data.tracks.items, "top"));
    } catch(error) {
        console.log(error);
        yield put(topActions.getTopFailure(error));
    }
};

export default function* () {
    yield takeLatest(topActions.GET_TOP_REQUEST, getTopRequest);
};