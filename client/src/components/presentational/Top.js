import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Tiles from "./Tiles";
import TracksList from "./TracksList";
import "../../styles/top.scss";

const Top = (props) => {
    const topViews = ["artists", "tracks"];
    const {view = "artists"} = props.match.params;
    const data = props[view];
    const path = view.slice(0,-1);
    const viewButtons = topViews.map((topView, index) => <Link key={index} className={view === topView ? "view-button active" : "view-button"} to={`/top/${topView}`}><span>{topView}</span></Link>);
    return (
        <div id="main-wrapper" className="container">
            <div id="top-header">
                <h2 className="section-title">Top Most Played</h2>
                <div id="view-buttons">
                    {viewButtons}
                </div>
            </div>
            {view === "tracks" ? <TracksList tracks={data}/> : <Tiles data={data} path={path}/>}
        </div>
    );
};


Top.propTypes = {
    artists: PropTypes.object.isRequired,
    tracks: PropTypes.object.isRequired,
};

export default Top;