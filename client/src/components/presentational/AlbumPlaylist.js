import React from 'react';
// import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import {Cookies} from 'react-cookie';
import TracksList from './TracksList';
import noImage from "../../images/no-image.jpg";
import '../../styles/albumPlaylist.scss';
import EpisodesList from './EpisodesList';

const AlbumPlaylist = (props) => {
    console.log(props);
        const cookies = new Cookies();
        const { collection } = props;
        const accessToken = cookies.get("access_token");
        const collectionImage = collection.images[0].url || noImage;
        const heartIcon = collection.isSaved ? "fas fa-heart" : "far fa-heart";
        let artistThumbnail, by, releaseYear, spotifyUrl, updateLibraryCollection;
        if (collection.type === "album") {
            artistThumbnail = collection.artists[0].images[collection.artists[0].images.length - 1].url;
            updateLibraryCollection = collection.isSaved ? props.removeAlbum : props.saveAlbum;
            by = <Link to={"/artist/" + collection.artists[0].id}>
                <img className="album-artist-thumbnail" src={artistThumbnail} alt="artist"/>
                &nbsp;
                {collection.artists[0].name}
            </Link>;
            releaseYear = collection.release_date.slice(0,4);
            spotifyUrl = collection.artists[0].external_urls.spotify;
        } else if (collection.type === "playlist") {
            by = collection.owner.display_name;
            spotifyUrl = collection.external_urls.spotify;
            updateLibraryCollection = collection.isSaved ? props.removePlaylist : props.savePlaylist;
        } else {
            by = collection.publisher;
            spotifyUrl = collection.external_urls.spotify;
            updateLibraryCollection = collection.isSaved ? props.removeShow : props.saveShow;
        }
        return (
            <div id="main-wrapper" className="container">
                <section>
                <div id="collection-grid">
                    <div className="collection-cover-art"><img src={collectionImage} alt="cover art" /></div>
                    <div className="collection-info">
                        <h2>{collection.name}</h2>
                        <h3>
                            {by}
                        </h3>
                        {releaseYear && <p className="tile-artist">{releaseYear}</p>}
                        {collection.tracks && collection.description &&
                            <p className="tile-artist" dangerouslySetInnerHTML={{__html: collection.description}}></p>
                        }
                        {collection.tracks && <p className="tile-artist">{collection.tracks.total} tracks</p>}
                        {/* <p>Release Date:</p> */}
                        {collection.followers && <p className="tile-artist">{collection.followers.total} followers</p>}
                        {collection.popularity && <p className="tile-artist">{collection.popularity} Popularity</p>}
                        {/* <button className="btn btn-primary">View in Spotify</button> */}
                    </div>
                </div>
                <div id="collection-button-grid">
                    {accessToken && <button className="button-outline" onClick={() => updateLibraryCollection(collection.id, accessToken)}>
                    <i className={heartIcon}></i>
                    </button>}                
                    {/* <button className="button-outline"> */}
                    <a href={spotifyUrl} className="button-outline button-spotify" target="_blank" rel="noopener noreferrer">                            
                    {/* <img className="playlist-icon" src="/images/spotify.svg" height="20" alt="add to playlist"/> */}
                    <i className="fab fa-spotify"></i>
                    {/* <span> View In Spotify</span> */}
                    </a>                        
                    {/* </button> */}
                </div> 
                </section>
                    <hr className="hr-spaced-out"/>
                <section>
                    {collection.type === "show" ?
                    <EpisodesList episodes={collection.episodes} publisher={collection.publisher}/>
                    :
                    <TracksList tracks={props.collection.tracks} type={collection.type}/>
                    }
                        
                </section>
            </div>
            // add a section for artist who were featured in the album 
        );
    
};

// Playlists.propTypes = {
//     playlists: PropTypes.array
// };


export default AlbumPlaylist;