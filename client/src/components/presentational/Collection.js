import React from "react";
import {Link} from "react-router-dom";
import {PropTypes} from "prop-types";
import {commafyNumber} from "../../utils";
import CatalogHeader from "./CatalogHeader";
import TracksList from "./TracksList";
import EpisodesList from "./EpisodesList";
import noImage from "../../images/no-image.jpg";

const Collection = ({collection, remove, save}) => {
    const collectionAction = collection.isSaved ? remove : save;
    let artistThumbnail = noImage;
    if (collection.type === "album" && collection.artists[0].images.length > 0) {
        artistThumbnail = collection.artists[0].images[collection.artists[0].images.length - 1].url;
    } 
    return (
        <div className="container">
            <CatalogHeader action={collectionAction} catalog={collection}>
                {collection.type === "album" &&
                    <React.Fragment>
                        <h2>{collection.name}</h2>
                        <h3>
                            <Link to={"/artist/" + collection.artists[0].id}>
                                <img className="artist-thumbnail rounded-circle" src={artistThumbnail} alt="artist"/>
                                &nbsp;
                                {collection.artists[0].name}
                            </Link>
                        </h3>
                        <p>{collection.release_date.slice(0,4)}</p>
                        <p>{collection.popularity} Popularity</p>
                        <p>{collection.tracks.total} {collection.tracks.total > 1 ? "Tracks" : "Track"}</p>
                    </React.Fragment>
                }
                {collection.type === "playlist" &&
                    <React.Fragment>
                        <h2>{collection.name}</h2>
                        <h3>{collection.owner.display_name}</h3>
                        <p>{collection.description}</p>
                        <p>{commafyNumber(collection.followers.total)} Followers</p>
                        <p>{collection.tracks.total} {collection.tracks.total > 1 ? "Tracks" : "Track"}</p>
                    </React.Fragment>
                } 
                {collection.type === "show" &&
                    <React.Fragment>
                        <h2>{collection.name}</h2>
                        <h3>{collection.publisher}</h3>
                        <p>{collection.description}</p>
                        <p>{collection.episodes.total} {collection.episodes.total > 1 ? "Episodes" : "Episode"}</p>
                    </React.Fragment>
                }
            </CatalogHeader>
            <hr/>
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