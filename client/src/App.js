import React, {useEffect, useRef} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Album from './components/containers/AlbumContainer';
import Alert from './components/containers/AlertContainer';
import Artist from './components/containers/ArtistContainer';
import Browse from './components/containers/BrowseContainer';
import Category from './components/containers/CategoryContainer';
import Footer from './components/presentational/Footer';
import Header from './components/containers/HeaderContainer';
import Home from './components/containers/HomeContainer';
import Library from './components/containers/LibraryContainer';
import Login from './components/presentational/Login';
import Logout from './components/presentational/Logout';
import NotFound from './components/presentational/NotFound';
import Player from './components/presentational/Player';
import Playlist from './components/containers/PlaylistContainer';
import Playlists from './components/containers/PlaylistsContainer';
import Profile from './components/presentational/Profile';
import Recent from './components/containers/RecentContainer';
import Search from './components/containers/SearchContainer';
import Show from './components/containers/ShowContainer';
import SideNav from './components/presentational/SideNav';
import Top from './components/containers/TopContainer';
import './styles/App.scss';

const usePrevious = (location) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = location;
  });
  return ref.current;
};

const App = (props) => {  
  console.log(props);
  const previous = usePrevious(props.location);
  if (previous && (props.location.pathname + props.location.search !== previous.pathname + previous.search)) {
    window.scrollTo(0, 0);
  }
    
  return (
    <React.Fragment>
    <Header/>
    <Alert/>
    <SideNav/>
    <main id="app" className="container-fluid">
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/album/:albumId" exact component={Album}/>
        <Route path="/artist/:artistId/:view?" exact component={Artist}/>
        <Route path="/browse" exact component={Browse} />
        <Route path="/category/:categoryId?" exact component={Category} />
        <Route path="/library/:view?" exact component={Library}/>
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout}/>
        <Route path="/playlist/:playlistId" exact component={Playlist}/>
        <Route path="/playlists" component={Playlists}/>
        <Route path="/profile" exact component={Profile}/>
        <Route path="/recent" exact component={Recent}/>
        <Route path="/search/:q/:view?" exact component={Search}/>
        <Route path="/show/:showId?" exact component={Show} />
        <Route path="/top/:view?" exact component={Top}/>
        <Route component={NotFound}/>
      </Switch>
    </main>
    <Player/>
    <Footer/>
    </React.Fragment>
  );
}

export default withRouter(App);