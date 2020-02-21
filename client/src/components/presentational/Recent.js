import React from 'react';
import TracksList from './TracksList';

const Recent = (props) => {

    return (
        <div id="main-wrapper" className="container">
            <div id="recent-header">
                <h2 className="section-title">Recently Played</h2>
            </div>
            {<TracksList tracks={props.tracks}/>}
        </div>
    );
};


// Recent.propTypes = {
    // albums: PropTypes.object,
    // tracks: PropTypes.object,
    // onload: PropTypes.func
// };

export default Recent;