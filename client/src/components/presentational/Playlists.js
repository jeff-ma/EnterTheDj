import React from "react";
import PropTypes from "prop-types";
import Tiles from "./Tiles";

const Playlists = ({featuredPlaylists, playlists}) => {
    return (
        <div id="main-wrapper" className="container-fluid">
            {playlists &&
                <section>
                    <h2 className="section-title">Your Playlists</h2>
                    <Tiles data={playlists} path="playlist"/>
                </section>    
            }
            <section>
            <h2 className="section-title">Featured Playlists</h2>
            <Tiles data={featuredPlaylists} path="playlist"/>
            </section>
        </div>
    );
};

Playlists.propTypes = {
    featuredPlaylists: PropTypes.object.isRequired,
    playlists: PropTypes.object
};

export default Playlists;