import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {Cookies} from 'react-cookie';
import * as libraryActions from '../actions/library';
import {getTracksExtras} from '../actions/tracksList';
import {getSavedAlbums, getSavedTracks, getSavedPlaylists, getSavedArtists, getSavedShows, addIsSavedToTracks} from '../../utils';

const cookies = new Cookies();
const accessToken = cookies.get("access_token");

export function* getLibraryRequest() {
    try {
        const responses = yield axios.all([
            getSavedAlbums(),
            getSavedTracks(),
            getSavedPlaylists(),
            getSavedArtists(),
            getSavedShows()
        ]);
        const albums = responses[0];
        const tracks = responses[1];
        const playlists = responses[2];
        const artists = responses[3].artists;
        const shows = responses[4];
        // modify object to conform to standard structure
        albums.items = albums.items.map((item) => item.album);
        tracks.items = tracks.items.map((item) => item.track);
        yield addIsSavedToTracks(tracks.items, accessToken);
        yield put(libraryActions.getLibrarySuccess({albums, artists, playlists, shows, tracks}));
        yield put(getTracksExtras(tracks.items, "library"));
    } catch(error) {
        console.log(error);
        yield put(libraryActions.getLibraryFailure(error));
    }
};

export default function* () {
    yield takeLatest(libraryActions.GET_LIBRARY_REQUEST, getLibraryRequest);
};