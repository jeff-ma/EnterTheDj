import {put, takeLatest} from "redux-saga/effects";
import * as searchActions from "../actions/search";
import {getTracksExtras} from "../actions/tracksList";
import axios from "axios";

export function* getSearchRequest({query}) {
    try {
        const {data} = yield axios("/api/search?q=" + query);
        yield put(searchActions.getSearchSuccess(data));
        yield put(getTracksExtras(data.tracks.items, "search"));
    } catch(error) {
        yield put(searchActions.getSearchFailure(error));
    }
};

export default function*() {
    yield takeLatest(searchActions.GET_SEARCH_REQUEST, getSearchRequest);
};