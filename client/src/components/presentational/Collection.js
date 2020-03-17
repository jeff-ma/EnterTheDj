import React from "react";
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import CatalogHeader from "./CatalogHeader";
import TracksList from "./TracksList";
import EpisodesList from "./EpisodesList";
import "../../styles/collection.scss";
import noImage from "../../images/no-image.jpg";

const Collection = ({collection, remove, save}) => {
    const collectionAction = collection.isSaved ? remove : save;
    let artistThumbnail = noImage;
    if (collection.type === "album" && collection.artists[0].images.length > 0) {
        artistThumbnail = collection.artists[0].images[collection.artists[0].images.length - 1].url;
    } 
    return (
        <div id="main-wrapper" className="container">
            <CatalogHeader action={collectionAction} catalog={collection}>
                {collection.type === "album" &&
                    <React.Fragment>
                        <h2>{collection.name}</h2>
                        <h3>
                            <Link to={"/artist/" + collection.artists[0].id}>
                                <img className="album-artist-thumbnail rounded-circle" src={artistThumbnail} alt="artist"/>
                                &nbsp;
                                {collection.artists[0].name}
                            </Link>
                        </h3>
                        <p className="tile-artist">{collection.release_date.slice(0,4)}</p>
                        <p className="tile-artist">{collection.tracks.total} {collection.tracks.total > 1 ? "Tracks" : "Track"}</p>
                        <p className="tile-artist">{collection.popularity} Popularity</p>
                    </React.Fragment>
                }
                {collection.type === "playlist" &&
                    <React.Fragment>
                        <h2>{collection.name}</h2>
                        <h3>{collection.owner.display_name}</h3>
                        <p className="tile-artist">{collection.description}</p>
                        <p className="tile-artist">{collection.tracks.total} {collection.tracks.total > 1 ? "tracks" : "track"}</p>
                        <p className="tile-artist">{collection.followers.total} Followers</p>
                    </React.Fragment>
                } 
                {collection.type === "show" &&
                    <React.Fragment>
                        <h2>{collection.name}</h2>
                        <h3>{collection.publisher}</h3>
                        <p className="tile-artist">{collection.description}</p>
                        <p className="tile-artist">{collection.episodes.total} {collection.episodes.total > 1 ? "episodes" : "episode"}</p>
                    </React.Fragment>
                }
            </CatalogHeader>
            <hr className="hr-spaced-out"/>
            <section>
                {collection.type === "show" &&
                    <EpisodesList episodes={collection.episodes} publisher={collection.publisher}/>
                }
                {collection.type !== "show" &&
                    <TracksList tracks={collection.tracks} type={collection.type}/>
                }
            </section>
        </div>
    );
};

Collection.propTypes = {
    collection: PropTypes.object.isRequired,
    remove: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired
};

export default Collection;