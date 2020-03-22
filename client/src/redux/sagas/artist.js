import {put, select, takeEvery, takeLatest} from "redux-saga/effects";
import * as artistActions from "../actions/artist";
import {getTracksExtras } from "../actions/tracksList";
import {getArtist, removeArtist, saveArtist} from "../../utils";
import {addAlert} from "../actions/alert";

export function* getArtistRequest({artistId}) {
    try {
        const {data} = yield getArtist(artistId);
        yield put(artistActions.getArtistSuccess(data));
        yield put(getTracksExtras(data.topTracks.items, "artist"));
    } catch(error) {
        console.log(error);
        yield put(artistActions.getArtistFailure(error));
    }
};

export function* removeArtistRequest({artistId}) {
    try {
        const artist = yield select((state) => state.artist);
        yield removeArtist(artistId);
        artist.artist.isSaved = false;
        yield put(artistActions.getArtistSuccess(artist));
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to remove artist"));
    }
};

export function* saveArtistRequest({artistId}) {
    try {
        const artist = yield select((state) => state.artist);
        yield saveArtist(artistId);
        artist.artist.isSaved = true;
        yield put(artistActions.getArtistSuccess(artist));
    } catch(error) {
        console.log(error);
        yield put(addAlert("Unable to save artist"));
    }
};

export default function*() {
    yield takeLatest(artistActions.GET_ARTIST_REQUEST, getArtistRequest);
    yield takeEvery(artistActions.REMOVE_ARTIST_REQUEST, removeArtistRequest);
    yield takeLatest(artistActions.SAVE_ARTIST_REQUEST, saveArtistRequest);
};