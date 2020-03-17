import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import {closeNav} from "../../redux/actions/sideNav";
import {Cookies} from "react-cookie";
import "../../styles/sideNav.scss";

const SideNav = ({closeNav, isNavActive}) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    return (
        <nav id="side-nav" className={isNavActive ? "active" : ""}>
            <ul>
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/" onClick={closeNav} exact={true}><i className="fas fa-home"></i> Home</NavLink></li>
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/browse" onClick={closeNav}><i className="far fa-eye"></i> Browse</NavLink></li>
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/playlists" onClick={closeNav}><i className="fas fa-music"></i> Playlists</NavLink></li>
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/recent" onClick={closeNav}><i className="fas fa-history"></i> Recent</NavLink></li>                
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/top" onClick={closeNav}><i className="fas fa-tasks"></i> Top</NavLink></li>                                
                <li className="side-nav-item"><NavLink className="side-nav-link" to="/library" onClick={closeNav}><i className="fas fa-headphones"></i> Library</NavLink></li>
                <li className="side-nav-item">
                    {accessToken ? 
                        <NavLink className="side-nav-link" to="/logout" onClick={closeNav}><i className="fas fa-sign-out-alt"></i> Log out</NavLink>
                        :
                        <NavLink className="side-nav-link" to="/login" onClick={closeNav}><i className="fas fa-sign-in-alt"></i> Log in</NavLink>
                    }
                </li>
            </ul>
        </nav>
    );
};

SideNav.propTypes = {
    cookies: PropTypes.object,
    closeNav: PropTypes.func.isRequired
};

const mapStateToProps = (state) => state.sideNav;

const mapDispatchToProps = (dispatch) => ({
    closeNav: () => dispatch(closeNav())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);