import { combineReducers } from 'redux';
import footer from './footer';
import home from './home';
import browse from './browse';
import search from './search';
import login from './login';
import artist from './artist';
import album from './album';
import category from './category';
import show from './show';
import playlists from './playlists';
import playlistTracks from './playlistTracks';
import favorites from './favorites';
import top from './top';

export default combineReducers({
    footer,
    home,
    browse,
    search,
    login,
    artist,
    album,
    category,
    show,
    playlists,
    playlistTracks,
    favorites,
    top
});