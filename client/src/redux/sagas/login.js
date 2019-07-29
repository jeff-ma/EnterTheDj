import { put, fork, takeLatest, select} from 'redux-saga/effects';
import * as loginActions from '../actions/login';
import axios from 'axios';

export function* login() {
    let response = yield axios('https://accounts.spotify.com/revoke_sessions');
};

export function* logout() {
    let response = yield axios('https://accounts.spotify.com/revoke_sessions');
};

export default function*() {
    yield takeLatest(loginActions.LOGIN, login);
    yield takeLatest(loginActions.LOGOUT, logout);
};