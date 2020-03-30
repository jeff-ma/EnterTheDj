import React from "react";
import PropTypes from "prop-types";
import TracksList from "./TracksList";

const Recent = ({tracks}) => (
    <section className="container">
        <h2 className="section-title">Recently Played</h2>
        <TracksList tracks={tracks}/>
    </section>
);

Recent.propTypes = {
    tracks: PropTypes.object,
};

export default Recent;