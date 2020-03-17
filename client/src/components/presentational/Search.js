import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import Tiles from "./Tiles";
import TracksList from "./TracksList";
import "../../styles/search.scss";

const Search = (props) => {
    const {q, view} = props.match.params;
    const viewButtons = [
        <Link key="all" className={view === undefined ? "view-button active" : "view-button"} to={`/search/${q}`}><span>All</span></Link>
    ];
    for (let key in props.searchResults) {
        viewButtons.push(
            <Link key={key} className={view === key ? "view-button active" : "view-button"} to={`/search/${q}/${key}`}><span>{key}</span></Link>
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
            {!view &&
                <React.Fragment>
                    {Object.entries(props.searchResults).map(([key, value]) =>
                        <section key={key}>
                            <div className="section-header">
                                <h2><Link to={`/search/${q}/${key}`}>{key} <i className="fas fa-chevron-right"></i></Link></h2>
                                <Link key={key} className="view-button" to={`/search/${q}/${key}`}><span>Viev more</span></Link>                    
                            </div>
                            {key === "tracks" ?
                                <TracksList tracks={{...value, items: value.items.slice(0, 10)}} path={key}/>
                                : 
                                <Tiles data={{...value, items: value.items.slice(0, 10)}} path={key.slice(0, -1)}/>
                            }
                        </section>
                    )}
                </React.Fragment>   
            }
            {!!view &&
                <section>
                    {view === "tracks"  ? 
                        <TracksList tracks={props.searchResults.tracks}/>
                        :
                        <Tiles data={props.searchResults[view]} path={view.slice(0, -1)}/>
                    }
                </section>
            }
        </div>
    );
};

Search.propTypes = {
    searchResults: PropTypes.shape({
        albums: PropTypes.object,
        artists: PropTypes.object,
        playlists: PropTypes.object,
        shows: PropTypes.object,
        tracks: PropTypes.object
    })
};

    
export default Search;