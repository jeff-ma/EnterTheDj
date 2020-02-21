import { all } from 'redux-saga/effects';
// import { watchBrowseSaga } from './browse';
import { watchHomeSaga } from './home';
// import { watchLoginSaga } from './login';
import { watchArtistRequest } from './artist';
// import { watchAlbumRequest, watchLyricsRequest } from './album';
import album from './album';
import browse from './browse';
import category from './category';
// import login from './login';
import search from './search';
import playlists from './playlists';
import playlist from './playlist';
import show from './show';
import library from './library';
import top from './top';
import recent from './recent';

export default function* rootSaga() {
    yield all([
        // watchBrowseSaga(),
        watchHomeSaga(),
        // watchLoginSaga(),
        // login(),
        search(),
        watchArtistRequest(),
        // watchAlbumRequest(),
        // watchLyricsRequest(),
        album(),
        browse(),
        category(),
        playlists(),
        playlist(),
        show(),
        library(),
        top(),
        recent()
    ]);
}