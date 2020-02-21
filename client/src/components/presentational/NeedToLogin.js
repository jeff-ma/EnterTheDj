import React from 'react';
// import {Link} from 'react-router-dom';
import '../../styles/needToLogin.scss';

const NeedToLogin = (props) => {
    return (
        <div id="need-to-login">
            <div id="need-to-login-message">{props.children}
            <button type="button" className="btn">Log in with Spotify <i className="fab fa-spotify"></i></button>
            </div> 
        </div>
    );
};

export default NeedToLogin;