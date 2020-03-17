import React from "react";
import PropTypes from "prop-types";
import TracksList from "./TracksList";

const Recent = ({tracks}) => (
    <div id="main-wrapper" className="container">
        <div id="recent-header">
            <h2 className="section-title">Recently Played</h2>
        </div>
        <TracksList tracks={tracks}/>
    </div>
);

Recent.propTypes = {
    tracks: PropTypes.object,
};

export default Recent;