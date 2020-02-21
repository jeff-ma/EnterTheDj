import { combineReducers } from 'redux';
import footer from './footer';
import home from './home';
import browse from './browse';
import search from './search';
import artist from './artist';
import album from './album';
import category from './category';
import show from './show';
import playlists from './playlists';
import playlist from './playlist';
import library from './library';
import top from './top';
import player from './player';
import recent from './recent';
import sideNav from './sideNav';
import tracksList from './tracksList';
import alert from './alert';

export default combineReducers({
    alert,
    footer,
    home,
    browse,
    search,
    artist,
    album,
    category,
    show,
    playlists,
    playlist,
    library,
    top,
    player,
    recent,
    sideNav,
    tracksList
});