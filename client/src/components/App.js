import React, { Component } from 'react';
// import logo from './logo.svg';
// import '../../css/App.scss';
import '../styles/App.scss';
import Header from './presentational/Header';
import SideNav from './presentational/SideNav';
import Footer from './containers/Footer';
import Search from './containers/Search';
import Browse from './containers/Browse';
import Login from './containers/Login';
import Home from './containers/Home';
import Album from './containers/Album';
import Artist from './containers/Artist';
import Category from './containers/Category';
import Playlists from './containers/Playlists';
import PlaylistTracks from './containers/PlaylistTracks';
import Show from './containers/Show';
import Profile from './presentational/Profile';
import Favorites from './containers/Favorites';
import Top from './containers/Top';
import { Switch, Route, withRouter } from 'react-router-dom';

class App extends Component {
  componentDidUpdate(prevProps) {
    // when navigating to a new page set view position at top 
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <React.Fragment>
      <Header />
      <SideNav />
      <main id="app" className="container-fluid">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" exact component={Search} />
            <Route path="/browse" exact component={Browse} />
            <Route path="/category/:categoryId?" exact component={Category} />
            <Route path="/login" exact component={Login} />
            <Route path="/album/:albumId?" component={Album} />
            <Route path="/artist/:artistId?" component={Artist} />
            <Route path="/show/:showId?" component={Show} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/playlists/:playlistId" exact component={PlaylistTracks}/>
            <Route path="/playlists" exact component={Playlists}/>
            <Route path="/favorites" exact component={Favorites} />
            <Route path="/top" exact component={Top} />
          </Switch>
      </main>
      <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
