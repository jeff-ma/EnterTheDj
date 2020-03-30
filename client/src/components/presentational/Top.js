import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Tiles from "./Tiles";
import TracksList from "./TracksList";

const Top = (props) => {
    const topViews = ["artists", "tracks"];
    const {view = "artists"} = props.match.params;
    const data = props[view];
    const path = view.slice(0,-1);
    const viewButtons = topViews.map((topView, index) => <Link key={index} className={view === topView ? "view-button active" : "view-button"} to={`/top/${topView}`}><span>{topView}</span></Link>);
    return (
        <section className="container">
            <div className="section-header">
                <h2 className="section-title">Top Most Played</h2>
                <div>{viewButtons}</div>
            </div>
            {view === "tracks" ? <TracksList tracks={data}/> : <Tiles data={data} path={path}/>}
        </section>
    );
};

Top.propTypes = {
    artists: PropTypes.object.isRequired,
    tracks: PropTypes.object.isRequired,
};

export default Top;