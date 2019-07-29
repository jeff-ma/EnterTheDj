import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../../styles/sideNav.scss';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const accessToken = cookies.get("access_token");

const SideNav = (props) => {
    return <nav id="side-nav">
        <ul>
            <li className="side-nav-item"><NavLink className="side-nav-link" to="/"><i className="fas fa-home"></i> HOME</NavLink></li>
            <li className="side-nav-item"><NavLink className="side-nav-link" to="/browse"><i className="far fa-eye"></i> BROWSE</NavLink></li>
            <li className="side-nav-item"><NavLink className="side-nav-link" to="/top"><i className="fas fa-tasks"></i> TOP</NavLink></li>
            <li className="side-nav-item"><NavLink className="side-nav-link" to="/favorites"><i className="fas fa-heart"></i> FAVORITES</NavLink></li>
            <li className="side-nav-item"><NavLink className="side-nav-link" to="/playlists"><i className="fas fa-music"></i> PLAYLISTS</NavLink></li>
            {/* <li className="side-nav-item"><NavLink className="side-nav-link" to="/search"><i className="fas fa-search"></i> SEARCH</NavLink></li> */}
            <li className="side-nav-item">
                {
                    accessToken ? 
                        <a className="side-nav-link" href="/logout"><i className="fas fa-sign-out-alt"></i> LOG OUT</a> 
                    : 
                        <NavLink className="side-nav-link" to="/login"><i className="fas fa-sign-in-alt"></i> LOG IN</NavLink> 
                }
                
            </li>   
        </ul>
    </nav>;
}

export default SideNav;