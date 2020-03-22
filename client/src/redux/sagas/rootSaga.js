import {all} from "redux-saga/effects";
import album from "./album";
import artist from "./artist";
import browse from "./browse";
import category from "./category";
import home from "./home";
import library from "./library";
import playlist from "./playlist";
import playlists from "./playlists";
import recent from "./recent";
import search from "./search";
import show from "./show";
import top from "./top";
import tracksList from "./tracksList";

export default function* rootSaga() {
    yield all([
        album(),
        artist(),
        browse(),
        category(),
        home(),
        library(),
        playlist(),
        playlists(),
        recent(),
        search(),
        show(),
        top(),
        tracksList()
    ]);
};