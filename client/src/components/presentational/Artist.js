import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {commafyNumber, formatDate} from "../../utils";
import CatalogHeader from "./CatalogHeader";
import Tiles from "./Tiles";
import TracksList from "./TracksList";
import noImage from "../../images/no-image.jpg";

const Artist = ({artist, albums, appearsOn, bio, latest, playlists, relatedArtists, singles, topTracks, match, remove, save}) => {
    const {artistId, view} = match.params;
    const artistViews = ["top_tracks", "playlists", "featured_in", "related_artists", "bio"]
    const latestImage = latest.images.length > 0 ? latest.images[0].url : noImage;
    const artistAction = artist.isSaved ? remove : save;
    const top4Playlists = {...playlists, items: playlists.items.slice(0, 4)};
    const viewButtons = [
        <Link key="overview" className={view === undefined ? "view-button active" : "view-button"} to={`/artist/${artistId}`}><span>Overview</span></Link>
    ];
    artistViews.forEach((artistView, index) => {
        viewButtons.push(
            <Link key={index} className={view === artistView ? "view-button active" : "view-button"} to={`/artist/${artistId}/${artistView}`}><span>{artistView.replace(/_/g, " ")}</span></Link>
        );
    });
    if (latest) {
        latest.tracks.items = latest.tracks.items.slice(0,5);
    }
    return (
        <div className="container">
            <CatalogHeader action={artistAction} catalog={artist}>
                <h2>{artist.name}</h2>
                <p>{artist.popularity} Popularity</p>
                <p>{artist.monthlyListeners} Monthly Listeners</p>                    
                <p>{commafyNumber(artist.followers.total)} Followers</p>
            </CatalogHeader>
            <div className="view-buttons">
                {viewButtons}
            </div>
            <hr/>
            {view === undefined &&
                <React.Fragment>
                    {latest &&
                        <section>
                            <h2 className="section-title">Latest Release</h2>
                            <div className="latest-album">
                                <Link className="latest-album-link" to={`/album/${latest.id}`}>
                                    <img className="latest-album-image" src={latestImage} alt={artist.name}/>
                                </Link>
                                <div>
                                    <h4><Link className="latest-album-link" to={`/album/${latest.id}`}>{latest.name}</Link></h4>
                                    <p>{formatDate(latest.release_date)}</p>
                                    <p>{latest.tracks.total} {latest.tracks.total > 1 ? "Tracks" : "Track"}</p>
                                </div>
                            </div>
                            <TracksList tracks={latest.tracks} type="album"/>
                        </section>
                    }
                    <section>
                        <div className="section-header">
                            <h2 className="section-title">
                                <Link to={`/artist/${artistId}/top_tracks`}>Top Tracks <i className="fas fa-chevron-right"></i></Link>
                            </h2>
                            <Link className="view-button" to={`/artist/${artistId}/top_tracks`}>View more</Link>
                        </div>                
                        <TracksList tracks={{items: topTracks.items.slice(0, 3)}}/>
                    </section>
                    <section>
                        <div className="section-header">
                            <h2 className="section-title">
                                <Link to={`/artist/${artistId}/playlists`}>Playlists <i className="fas fa-chevron-right"></i></Link>
                            </h2>
                            <Link className="view-button" to={`/artist/${artistId}/playlists`}>View more</Link>
                        </div>
                        <Tiles data={top4Playlists} path="playlist"/>
                    </section>
                    {albums.total > 0 &&
                        <section>
                            <h2 className="section-title">Albums</h2>
                            <Tiles data={albums} path="album"/>
                        </section>
                    }
                    {singles.total > 0 &&
                        <section>
                            <h2 className="section-title">
                                Singles
                            </h2>
                            <Tiles data={singles} path="album"/>
                        </section>
                    }
                </React.Fragment>
            }
            {view !== undefined && 
                <section>
                    {view === "top_tracks" &&
                        <TracksList tracks={topTracks}/>
                    }
                    {view === "playlists" && 
                        <Tiles data={playlists} path="playlist"/>
                    }
                    {view === "related_artists" && 
                        <Tiles data={relatedArtists} path="artist"/>
                    }
                    {view === "bio" && 
                        <div dangerouslySetInnerHTML={{__html: bio || "<p>No biography is available.</p>"}}></div>
                    }
                    {view === "featured_in" && 
                        <Tiles data={appearsOn} path="album"/>
                    }
                </section>
            }
        </div>
    );
};

Artist.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    artist: PropTypes.object.isRequired,
    albums: PropTypes.object,
    appearsOn: PropTypes.object,
    bio: PropTypes.string, 
    latest: PropTypes.object,
    playlists: PropTypes.object, 
    relatedArtists: PropTypes.object,
    singles: PropTypes.object,
    topTracks: PropTypes.object,
    remove: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
};

export default Artist;