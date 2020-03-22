import {put, takeLatest} from "redux-saga/effects";
import * as homeActions from "../actions/home";
import {getHome} from "../../utils";

export function* getHomeRequest() {
    try {
        const {data} = yield getHome();
       yield put(homeActions.getHomeSuccess(data));
    } catch(error) {
        console.log(error);
        yield put(homeActions.getHomeFailure(error));
    }
};

export default function* () {
    yield takeLatest(homeActions.GET_HOME_REQUEST, getHomeRequest);
};