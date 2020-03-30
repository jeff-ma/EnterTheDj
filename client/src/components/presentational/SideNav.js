import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import {closeNav} from "../../redux/actions/sideNav";
import {Cookies} from "react-cookie";

const SideNav = ({closeNav, isNavActive}) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    return (
        <nav className={isNavActive ? "active" : ""}>
            <ul>
                <li><NavLink to="/" onClick={closeNav} exact={true}><i className="fas fa-home"></i> Home</NavLink></li>
                <li><NavLink to="/browse" onClick={closeNav}><i className="far fa-eye"></i> Browse</NavLink></li>
                <li><NavLink to="/playlists" onClick={closeNav}><i className="fas fa-music"></i> Playlists</NavLink></li>
                <li><NavLink to="/recent" onClick={closeNav}><i className="fas fa-history"></i> Recent</NavLink></li>                
                <li><NavLink to="/top" onClick={closeNav}><i className="fas fa-tasks"></i> Top</NavLink></li>                                
                <li><NavLink to="/library" onClick={closeNav}><i className="fas fa-headphones"></i> Library</NavLink></li>
                <li>
                    {accessToken ? 
                        <NavLink to="/logout" onClick={closeNav}><i className="fas fa-sign-out-alt"></i> Log out</NavLink>
                        :
                        <NavLink to="/login" onClick={closeNav}><i className="fas fa-sign-in-alt"></i> Log in</NavLink>
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