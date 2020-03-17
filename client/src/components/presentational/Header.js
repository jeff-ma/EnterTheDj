import React, {useRef, useState} from "react";
import {PropTypes} from "prop-types";
import {NavLink, Link, withRouter} from "react-router-dom";
import {Cookies} from "react-cookie";
import "../../styles/header.scss";
import defaultProfile from "../../images/default-profile.jpg";

const Header = ({isNavActive, toggleNav, history}) => {
    const cookies = new Cookies();  
    const displayName = cookies.get("display_name");
    const imageUrl = cookies.get("image_url") || defaultProfile;
    const search = useRef();
    const [isSearchBarActive, setIsSearchBarActive] = useState(false);
    const handleSubmit = (event) => {
        const searchInput = search.current.value;
        event.preventDefault();
        if(searchInput) {
            setIsSearchBarActive(false);
            history.push(`/search/${searchInput}`);        
        }
    }
    return (
        <header>
            <div id="nav-header">
                <button className="nav-button" onClick={toggleNav}>
                    <span className={isNavActive ? "top navbar-bar active" : "top navbar-bar"}></span>
                    <span className={isNavActive ? "middle navbar-bar active" : "middle navbar-bar"}></span>
                    <span className={isNavActive ? "bottom navbar-bar active" : "bottom navbar-bar"}></span>
                </button>
                <NavLink className="navbar-brand" to="/">Enter the Dj</NavLink>
                <form id="search-bar" className={isSearchBarActive ? "active" : ""} onSubmit={handleSubmit}>
                    <i id="search-bar-icon" className="fas fa-search"></i>
                    <input
                        id="search-input"
                        type="search"
                        name="search"
                        ref={search}
                    />
                </form>
                {displayName ? 
                    <Link id="user-profile" to="/profile"><img src={imageUrl} alt="avatar"/></Link> 
                    :
                    <div id="user-profile-placeholder">
                    {/* empty placeholder */}
                    </div>
                }
                <div id="search-icon-box"> 
                    <button id="search-toggle-button" onClick={() => setIsSearchBarActive(!isSearchBarActive)}><i id="search-toggle-icon" className="fas fa-search"></i></button>
                </div>
            </div>
            <div className={isNavActive ? "overlay active" : "overlay"}>
                {/* dark transparent overlay */}
            </div>
        </header>
    );
};

Header.propTypes = {
    isNavActive: PropTypes.bool.isRequired,
    toggleNav: PropTypes.func.isRequired,
    history: PropTypes.object
};

export default withRouter(Header);