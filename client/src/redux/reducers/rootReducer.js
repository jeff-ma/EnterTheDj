import {combineReducers} from 'redux';
import album from './album';
import alert from './alert';
import artist from './artist';
import browse from './browse';
import category from './category';
import home from './home';
import library from './library';
import player from './player';
import playlist from './playlist';
import playlists from './playlists';
import recent from './recent';
import search from './search';
import show from './show';
import sideNav from './sideNav';
import top from './top';

export default combineReducers({
    album,
    alert,
    artist,
    browse,
    category,
    home,
    library,
    player,
    playlist,
    playlists,
    recent,
    search,
    show,
    sideNav,
    top,
});