import {put, select, takeEvery, takeLatest} from "redux-saga/effects";
import * as albumActions from "../actions/album";
import {getTracksExtras} from "../actions/tracksList";
import {addAlert} from "../actions/alert";
import {getAlbum, removeAlbum, saveAlbum} from "../../utils";

export function* getAlbumRequest({albumId}) {
    try {
        const {data} = yield getAlbum(albumId);
        yield put(albumActions.getAlbumSuccess(data));
        yield put(getTracksExtras(data.tracks.items, "album"));
    } catch(error) {
        console.log(error);
        yield put(albumActions.getAlbumFailure(error));
    }
};

export function* removeAlbumRequest({albumId}) {  
    try {
        const {album} = yield select((state) => state.album);
        yield removeAlbum(albumId);
        album.isSaved = false;
        yield put(albumActions.getAlbumSuccess(album));
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to remove album"));
    }
};

export function* saveAlbumRequest({albumId}) {  
    try {
        const {album} = yield select((state) => state.album);
        yield saveAlbum(albumId);
        album.isSaved = true;
        yield put(albumActions.getAlbumSuccess(album));
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to save album"));
    }
};

export default function*() {
    yield takeLatest(albumActions.GET_ALBUM_REQUEST, getAlbumRequest);
    yield takeEvery(albumActions.REMOVE_ALBUM_REQUEST, removeAlbumRequest);
    yield takeLatest(albumActions.SAVE_ALBUM_REQUEST, saveAlbumRequest);
};