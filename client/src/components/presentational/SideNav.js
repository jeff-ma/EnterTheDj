import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../../styles/sideNav.scss';

const SideNav = (props) => {
    const {closeNav} = props;
    let loginLink;         
    if (props.cookies.access_token) {
        loginLink = <a className="side-nav-link" href="/logout"><i className="fas fa-sign-out-alt"></i> Log out</a>;
        // loginLink = <li className="side-nav-item"><NavLink className="side-nav-link" to="/login" onClick={closeNav} exact={true}><i className="fas fa-home"></i> Log in</NavLink></li>
    } else {
        // loginLink = <a className="side-nav-link" href="#login-modal" data-toggle="modal"><i className="fas fa-sign-in-alt"></i> Login</a>
        loginLink = <NavLink className="side-nav-link" to="/login" onClick={closeNav}><i className="fas fa-sign-in-alt"></i> Log in</NavLink>;
    }
    return (
        <nav id="side-nav" className={props.isNavActive ? "active" : ""}>
            <ul>
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/" onClick={closeNav} exact={true}><i className="fas fa-home"></i> Home</NavLink></li>
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/browse" onClick={closeNav}><i className="far fa-eye"></i> Browse</NavLink></li>
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/playlists" onClick={closeNav}><i className="fas fa-music"></i> Playlists</NavLink></li>
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/recent" onClick={closeNav}><i className="fas fa-history"></i> Recent</NavLink></li>                
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/top" onClick={closeNav}><i className="fas fa-tasks"></i> Top</NavLink></li>                                
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/library" onClick={closeNav}><i className="fas fa-headphones"></i> Library</NavLink></li>
                <li className="side-nav-item">{loginLink}</li>
                {/* <li className="side-nav-item"><a className="side-nav-link" href="#login-modal" data-toggle="modal">Login</a></li> */}
            </ul>
        </nav>
    );
};

SideNav.propTypes = {
    cookies: PropTypes.object,
    closeNav: PropTypes.func.isRequired
};

export default SideNav;