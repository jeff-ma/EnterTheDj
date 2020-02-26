import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
// import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
// import logo from './logo.svg';
// import '../../css/App.scss';
import './styles/App.scss';
// import Alert from './components/presentational/Alert';
import AlertContainer from './components/containers/AlertContainer';
import Header from './components/containers/HeaderContainer';
import SideNav from './components/containers/SideNavContainer';
import Footer from './components/containers/Footer';
import Search from './components/containers/SearchContainer';
import Browse from './components/containers/BrowseContainer';
import Login from './components/presentational/Login';
import Logout from './components/presentational/Logout';
import Home from './components/containers/HomeContainer';
import Album from './components/containers/AlbumContainer';
import Artist from './components/containers/ArtistContainer';
import Category from './components/containers/CategoryContainer';
import Playlists from './components/containers/PlaylistsContainer';
import Playlist from './components/containers/PlaylistContainer';
import Show from './components/containers/Show';
import Profile from './components/presentational/Profile';
import Library from './components/containers/LibraryContainer';
import Top from './components/containers/TopContainer';
import Player from './components/containers/PlayerContainer';
// import LoginModal from './components/presentational/LoginModal';
import Recent from './components/containers/RecentContainer';
import { Switch, Route, withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props)
    
    this.state= {
      cookies: this.props.allCookies
    };
  }

  // componentDidMount() {
  //   console.log(this.props);
  // }
  componentDidUpdate(prevProps) {
    // when navigating to a new page set view position at top 
    if (this.props.location.pathname + this.props.location.search !== prevProps.location.pathname + prevProps.location.search) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const cookies  = this.props.allCookies
    
    // const props = {...this.props, cookies};
    console.log(this.props);
    return (
      <React.Fragment>
      <Header cookies={cookies}/>
      <AlertContainer/>
      {/* <div id="alert-container"><Alert/></div> */}
      <SideNav cookies={cookies} />
      <main id="app" className="container-fluid">
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/search" exact component={Search} /> */}
          <Route path="/search/:q/:view?" exact component={Search} />
          <Route path="/browse" exact component={Browse} />
          <Route path="/category/:categoryId?" exact component={Category} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout}/>
          {/* <Route path="/login" exact render={(props) => <Login {...props} cookies={cookies} />} /> */}
          <Route path="/album/:albumId" render={(props) => <Album {...props} cookies={cookies} />} />
          <Route path="/artist/:artistId/:view?" render={(props) => <Artist {...props} cookies={cookies}/> } />
          <Route path="/show/:showId?" component={Show} />
          <Route path="/profile" exact render={(props) => <Profile {...props} cookies={cookies} />} />
          <Route path="/playlist/:playlistId" exact render={(props) => <Playlist {...props} cookies={cookies}/>}/>
          <Route path="/playlists" exact render={(props) => <Playlists {...props} cookies={cookies} />} />
          <Route path="/library/:view?" exact render={(props) => <Library {...props} cookies={cookies}/>} />
          <Route path="/recent" exact render={(props) => <Recent {...props} cookies={cookies} />} />
          <Route path="/top/:view?" exact render={(props) => <Top {...props} cookies={cookies}/>} />
        </Switch>
      </main>
      {/* <LoginModal/> */}
      <Player />
      <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(withCookies(App));