import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as albumActions from '../actions/album';
import {getTracksExtras} from '../actions/tracksList';
import {addAlert} from '../actions/alert';
import {removeAlbum, saveAlbum} from "../../utils";
import axios from 'axios';

export function* getAlbumRequest({ albumId }) {
    try {
        const data = yield axios('/api/album/' + albumId).then((response) => response.data);
        yield put(albumActions.getAlbumSuccess(data));
        yield put(getTracksExtras(data.tracks.items, "album"));
    } catch(error) {
        console.log(error);
        yield put(albumActions.getAlbumFailure(error));
    }
};

export function* removeAlbumRequest({albumId}) {  
    console.log("removing album...");
    try {
        const {album} = yield select((state) => state.album);
        yield removeAlbum(albumId);
        album.isSaved = false;
        yield put(albumActions.getAlbumSuccess(album));
        console.log("done ");
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to remove album"));
        // yield put(libraryActions.removeAlbumFailure(error));
    }
};

export function* saveAlbumRequest({ albumId}) {  
    console.log("saveing album...");
    try {
        const {album} = yield select((state) => state.album);
        yield saveAlbum(albumId);
        album.isSaved = true;
        yield put(albumActions.getAlbumSuccess(album));
        console.log("done ");
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to save album"));
        // yield put(libraryActions.saveAlbumFailure(error));
    }
};

export default function*() {
    yield takeLatest(albumActions.GET_ALBUM_REQUEST, getAlbumRequest);
    yield takeEvery(albumActions.REMOVE_ALBUM_REQUEST, removeAlbumRequest);
    yield takeLatest(albumActions.SAVE_ALBUM_REQUEST, saveAlbumRequest);
};