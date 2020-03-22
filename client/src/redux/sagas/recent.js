import {put, takeLatest} from "redux-saga/effects";
import * as recentActions from "../actions/recent";
import {getTracksExtras} from "../actions/tracksList";
import {getRecent} from "../../utils";

export function* getRecentRequest() {
    try {
        const data = yield getRecent();
        yield put(recentActions.getRecentSuccess(data));
        yield put(getTracksExtras(data.items, "recent"));
    } catch(error) {
        console.log(error);
        yield put(recentActions.getRecentFailure(error));
    }
};

export default function*() {
    yield takeLatest(recentActions.GET_RECENT_REQUEST, getRecentRequest);
};