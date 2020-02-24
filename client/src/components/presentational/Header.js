import React, { useRef, useState } from 'react';
import { NavLink, Link, withRouter} from 'react-router-dom';
// import { PropTypes } from 'prop-types';
import '../../styles/header.scss';
import defaultProfile from "../../images/default-profile.jpg";

const Header = (props) => {
    const { isNavActive, toggleNav } = props;
    const displayName = props.cookies.display_name;
    const imageUrl = props.cookies.image_url || defaultProfile;
    const search = useRef();
    const [isSearchActive, setIsSearchActive] = useState(false);
    const handleSubmit = (event) => {
        const searchInput = search.current.value;
        event.preventDefault();
        if(searchInput) {
            setIsSearchActive(false);
            props.history.push(`/search/` + searchInput);        
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
                <form id="search-bar" className={isSearchActive ? "active" : ""} onSubmit={handleSubmit}>
                    {/* <div className="input-group input-group-sm"> */}
                    <div>
                        <i id="search-bar-icon" className="fas fa-search"></i>
                        <input
                            id="search-input"
                            className="form-control" 
                            type="search"
                            name="search"
                            ref={search}
                        />
                    </div>
                </form>
                {displayName ? 
                    <Link id="user-profile" to="/profile"><img src={imageUrl} alt="avatar"/></Link> :
                    <div id="user-profile-placeholder">
                    {/* empty placeholder */}
                    </div>
                }
                <div id="search-icon-box"> 
                    <button id="search-toggle-button" onClick={() => setIsSearchActive(!isSearchActive)}><i id="search-toggle-icon" className="fas fa-search"></i></button>
                </div>
            </div>
            <div className={isNavActive ? "overlay active" : "overlay"}>
                {/* dark transparent overlay */}
            </div>
        </header>
    );
};

export default withRouter(Header);