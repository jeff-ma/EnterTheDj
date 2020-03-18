import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Tiles from "./Tiles";
import TracksList from "./TracksList";
import "../../styles/library.scss";

const Library = (props) => {
    const libraryViews = ["albums", "artists", "playlists", "shows", "tracks"];
    const {view = "albums"} = props.match.params;
    const data = props[view];
    const path = view.slice(0,-1);
    const viewButtons = libraryViews.map((libraryView, index) => <Link key={index} className={view === libraryView ? "view-button active" : "view-button"} to={`/library/${libraryView}`}><span>{libraryView}</span></Link>);
    return (
        <div id="main-wrapper" className="container">
            <div id="library-header">
                <h2 className="section-title">Your Library</h2>
                <div>
                    {viewButtons}
                </div>
            </div>
            {view === "tracks" ? <TracksList tracks={data}/> : <Tiles data={data} path={path}/>}
        </div>
    );
};

Library.propTypes = {
    albums: PropTypes.object.isRequired,
    artists: PropTypes.object.isRequired,
    playlists: PropTypes.object.isRequired,
    shows: PropTypes.object.isRequired,
    tracks: PropTypes.object.isRequired,
};

export default Library;