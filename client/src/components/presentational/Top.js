import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import '../../styles/top.scss';

class Top extends Component {
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
        let topArtists;
        let topTracks;
        let content;
        if(accessToken) {
            const { artists, tracks } = this.props;
            if(artists.items && artists.items.length > 0) {
                topArtists = artists.items.map((artist) => <div><Link to={`/artist/${artist.id}`}><img src={artist.images[0].url} height="150" width="150"/></Link><p>{artist.name}</p></div>)
            } else {
                topArtists = <p>You have no top artists.</p>;
            }
            if(tracks.items && tracks.items.length > 0) {
                topTracks = tracks.items.map((track) => <div><Link to={`/album/${track.album.id}`}><img src={track.album.images[0].url} height="150" width="150"/></Link><p>{track.name}</p></div>)
            } else {
                topTracks = <p>You have no top tracks.</p>;
            }
        } else {
            content = <p>Please <Link to="/login">login</Link> to view your top played.</p>;
        }
        return (
            <React.Fragment>
                <h1>Top Most Played</h1>
                {content}
                {
                    topArtists &&
                    <section>
                    <h2>Artists</h2>
                    {topArtists}
                    </section>
                }
                {
                    topTracks &&
                    <section>
                    <h2>Tracks</h2>
                    {topTracks}
                    </section>
                }
            </React.Fragment>
        );
    }
};

Top.propTypes = {
    artists: PropTypes.object,
    tracks: PropTypes.object
};

export default Top;