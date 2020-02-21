import React from 'react';
// import { PropTypes }from 'prop-types';
import { Link } from 'react-router-dom';
// import Swiper from 'react-id-swiper';
import Tiles from './Tiles';
import TracksList from './TracksList';
import '../../styles/search.scss';

const Search = (props) => {
    const {albums, artists, playlists, shows, tracks} = props.searchResults;
    const {q, view} = props.match.params;
    const url = "/search/" + q;
    const viewButtons = [
        <Link key="all" className={view === undefined ? "view-button active" : "view-button"} to={url}><span>All</span></Link>
    ];
    let display;    
    for (let key in props.searchResults) {
        viewButtons.push(
            <Link key={key} className={view === key ? "view-button active" : "view-button"} to={`${url}/${key}`}><span>{key}</span></Link>
        );
    }
    if (view === "albums") {
        display = (
            <section>
                {/* <h2 className="section-title">Albums</h2> */}
                <Tiles data={albums} path="album"/>
            </section>
        );
    } else if (view === "artists") {
        display = (
            <section>
                {/* <h2 className="section-title">Artists</h2> */}
                <Tiles data={artists} path="artist"/>
            </section>
        );
    } else if (view === "playlists") {
        display = (
            <section>
                {/* <h2 className="section-title">Playlists</h2> */}
                <Tiles data={playlists} path="playlist"/>
            </section>
        );
    } else if (view === "shows") {
        display = (
            <section>
                {/* <h2 className="section-title">Shows</h2> */}
                <Tiles data={shows} path="show"/> 
            </section>
        );
    } else if (view === "tracks") {
        display = (
            <section>
                {/* <h2 className="section-title">Tracks</h2> */}
                <TracksList tracks={tracks} />
            </section>
        );
    } else {
        display = (
            <React.Fragment>
                {Object.entries(props.searchResults).map(([key, value]) =>
                    <section key={key}>
                        <div className="section-header">
                        <h2><Link to={`${url}/${key}`}>{key} <i className="fas fa-chevron-right"></i></Link></h2>
                        {value.total > 10 && 
                            <Link key={key} className="view-button" to={`${url}/${key}`}><span>Viev more</span></Link>                    
                        }
                        </div>
                        {key === "tracks" ?
                            <TracksList tracks={{...value, items: value.items.slice(0, 10)}} path={key}/> : 
                            <Tiles data={{...value, items: value.items.slice(0, 10)}} path={key.slice(0, -1)}/>
                        }
                    </section>
                )}
            </React.Fragment>                                         
        );
    }
    return (
        <div id="main-wrapper" className="container">
            <h2 className="section-title">
                Search Results
            </h2>
            <div id="view-buttons">
                {viewButtons}
            </div>
            <hr/>
            {display}
        </div>
    );
};
    
export default Search;