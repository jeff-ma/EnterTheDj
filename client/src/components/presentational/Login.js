import React from 'react';
import { PropTypes } from 'prop-types';
import {Redirect} from 'react-router-dom';
import '../../styles/login.scss';
import Cookies from 'universal-cookie';

const login = (props) => {
    // const { user } = props;
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const spotifyScopes = [
        "user-read-private", 
        "user-read-birthdate", 
        "user-read-email",
        "user-top-read",
        "user-library-modify",
        "user-library-read",
    ];
    const spotifyAuthorizeUrl = encodeURI(`https://accounts.spotify.com/authorize?client_id=2d6223f5a7d74315a03e819aee4e3934&response_type=code&redirect_uri=http://localhost:3000/authorize&scope=${spotifyScopes.join(" ")}&show_dialog=true`);

    if(accessToken) {
        // if user is already logged in redirect to home
        return <Redirect to="/" />;
    } else {
return <React.Fragment>
        <div id="login-card">
            <div>
                <img src="/images/bruce-lee-dj.png" alt="bruce lee djing "/>
            </div>
            <h2>LOG IN</h2>
            <p>
                Log in to get more features
            </p>
            <a href={spotifyAuthorizeUrl}>
        <button type="button" className="btn btn-outline-dark">Login</button>
        </a>
        </div>
</React.Fragment>;
    }
};

export default login;