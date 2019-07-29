import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import '../../styles/favorites.scss';

class Favorites extends Component {
    constructor(props) {
        super(props);

        const cookies = new Cookies();
        this.state = {
            accessToken: cookies.get("access_token")
        }
    }

    componentDidMount() {
        // user needs an access token to get top artists and tracks
        const {accessToken} = this.state; 
        if(accessToken) {
            this.props.onload(accessToken);
        }
    }

    render() {
        const { accessToken } = this.state;
        let favoriteAlbums;
        let favoriteTracks;
        let content;
        if(accessToken) {
            const { albums, tracks } = this.props;
            if(albums.items && albums.items.length > 0) {
                favoriteAlbums = albums.items.map((album) => <div><Link to={`/album/${album.album.id}`}><img src={album.album.images[0].url} height="150" width="150"/></Link><p>{album.album.name}</p></div>)
            } else {
                favoriteAlbums = <p>You have no favorite albums.</p>;
            }
            if(tracks.items && tracks.items.length > 0) {
                favoriteTracks = tracks.items.map((track) => <div><Link to={`/album/${track.track.album.id}`}><img src={track.track.album.images[0].url} height="150" width="150"/></Link><p>{track.track.name}</p></div>)
            } else {
                favoriteTracks = <p>You have no favorite tracks.</p>;
            }
        } else {
            content = <p>Please <Link to="/login">login</Link> to view your favorites.</p>;
        }
        return (
            <React.Fragment>
                <h1>Favorites</h1>
                {content}
                {
                    favoriteAlbums &&
                    <section>
                    <h2>Albums</h2>
                    {favoriteAlbums}
                    </section>
                }
                {
                    favoriteTracks &&
                    <section>
                    <h2>Tracks</h2>
                    {favoriteTracks}
                    </section>
                }
            </React.Fragment>
        );
    }
};

Favorites.propTypes = {
    albums: PropTypes.object,
    tracks: PropTypes.object,
    onload: PropTypes.func
};

export default Favorites;