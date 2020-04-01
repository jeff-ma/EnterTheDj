import React, {useRef, useState} from "react";
import {PropTypes} from "prop-types";
import {NavLink, Link, withRouter} from "react-router-dom";
import {Cookies} from "react-cookie";
import defaultProfile from "../../images/default-profile.jpg";

const Header = ({isNavActive, toggleNav, history}) => {
    const cookies = new Cookies();  
    const displayName = cookies.get("display_name");
    const image = cookies.get("image_url") || defaultProfile;
    const search = useRef();
    const [isSearchBarActive, setIsSearchBarActive] = useState(false);
    const handleSubmit = (event) => {
        const {value} = search.current;
        event.preventDefault();
        if (value) {
            setIsSearchBarActive(false);
            history.push(`/search/${value}`);        
        }
    }
    return (
        <header>
            <button className="nav-button" onClick={toggleNav}>
                <span className={isNavActive ? "top navbar-bar active" : "top navbar-bar"}></span>
                <span className={isNavActive ? "middle navbar-bar active" : "middle navbar-bar"}></span>
                <span className={isNavActive ? "bottom navbar-bar active" : "bottom navbar-bar"}></span>
            </button>
            <NavLink to="/">Enter the Dj</NavLink>
            <form className={isSearchBarActive ? "active" : ""} onSubmit={handleSubmit}>
                <i className="fas fa-search"></i>
                <input type="search" name="search" ref={search}/>
            </form>
            <Link className="user-profile" to="/profile">
                {displayName && <img src={image} alt="avatar"/>}
            </Link> 
            <button className="search-toggle-button" onClick={() => setIsSearchBarActive(!isSearchBarActive)}>
                <i className="fas fa-search"></i>
            </button>
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