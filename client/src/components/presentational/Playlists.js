import React from 'react';
// import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import Tiles from './Tiles';

const Playlists = (props) => {
    // const {featuredPlaylists, userPlaylists = {}, isLoading} = props;
    return (
        <div id="main-wrapper" className="container-fluid">
            {props.userPlaylists &&
                <section>
                    <h2 className="section-title">Your Playlists</h2>
                    <Tiles data={props.userPlaylists} path="playlist"/>
                </section>    
            }
            <section>
            <h2 className="section-title">Featured Playlists</h2>
            <Tiles data={props.featuredPlaylists} path="playlist"/>
            </section>
        </div>
    );
};

// Playlists.propTypes = {
//     featuredPlaylists: PropTypes.object
// };

export default Playlists;