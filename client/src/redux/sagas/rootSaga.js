import { all } from 'redux-saga/effects';
// import { watchBrowseSaga } from './browse';
import { watchHomeSaga } from './home';
// import { watchLoginSaga } from './login';
import { watchArtistRequest } from './artist';
// import { watchAlbumRequest, watchLyricsRequest } from './album';
import album from './album';
import browse from './browse';
import category from './category';
import login from './login';
import search from './search';
import playlists from './playlists';
import playlistTracks from './playlistTracks';
import show from './show';
import favorites from './favorites';
import top from './top';

export default function* rootSaga() {
    yield all([
        // watchBrowseSaga(),
        watchHomeSaga(),
        // watchLoginSaga(),
        login(),
        search(),
        watchArtistRequest(),
        // watchAlbumRequest(),
        // watchLyricsRequest(),
        album(),
        browse(),
        category(),
        playlists(),
        playlistTracks(),
        show(),
        favorites(),
        top(),
    ]);
}