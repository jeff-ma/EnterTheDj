import React from 'react';
// import { PropTypes } from 'prop-types';
import {Redirect} from 'react-router-dom';
import { withCookies } from 'react-cookie';
import '../../styles/login.scss';

const Login = (props) => {
    const accessToken = props.allCookies.access_token;
    const spotifyScopes = [
        "user-read-private", 
        "user-read-birthdate", 
        "user-read-email",
        "user-top-read",
        "user-library-modify",
        "user-library-read",
        "user-read-recently-played",
        "user-follow-read",
        "user-follow-modify",
        "user-read-playback-state",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "playlist-modify-private",
        "ugc-image-upload"
    ];
    const location = window.location.origin.replace(process.env.REACT_APP_PORT, process.env.REACT_APP_NODE_PORT);
    const spotifyAuthorizeUrl = encodeURI(`https://accounts.spotify.com/authorize?client_id=2d6223f5a7d74315a03e819aee4e3934&response_type=code&redirect_uri=${location}/authorize&state=${location}/authorize&scope=${spotifyScopes.join(" ")}&show_dialog=false`);
    const defaultMessage = (<React.Fragment>                 
<p>
    By logging in you get additional features:
</p>
<ul>
    <li>View your recent and top played tracks</li>
    <li>Add to and modify playlists</li>
    <li>Customize your library</li>
    </ul></React.Fragment>);
    if(accessToken) {
        // if user is already logged in redirect to home
        return <Redirect to="/" />;
    } else {

        return (
            <div id="need-to-login">
                <div id="need-to-login-message">
                    {props.children || defaultMessage}
                <a id="login-link" href={spotifyAuthorizeUrl}>
                    <button type="button" className="btn">Log in with Spotify <i className="fab fa-spotify"></i></button>
                </a>
                </div> 
            </div>
        );
    }
};

export default withCookies(Login);