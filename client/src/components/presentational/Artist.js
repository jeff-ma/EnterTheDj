import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Swiper from 'react-id-swiper';
import { commafyNumber } from '../../utils';
import Tiles from './Tiles';
import TracksList from './TracksList';
import '../../styles/artist.scss';

const Artist = (props) => {
    console.log(props);
    
    const artistViews = ["top_tracks", "playlists", "featured_in", "related_artists", "bio"]
    // const [view, setView] = useState(artistViews[0]);
    const {artist, bio, albums, latest, playlists, singles, topTracks} = props;
    // const genres = Array.from(new Set(artist.genres));
    const accessToken = props.cookies.access_token;
    const {artistId, view} = props.match.params;
    const url = "/artist/" + artistId;
    const heartIcon = artist.isSaved ? "fas fa-heart" : "far fa-heart";
    const updateArtist = artist.isSaved ? props.removeArtist : props.saveArtist;
    const viewButtons = [
        <Link key="overview" className={view === undefined ? "view-button active" : "view-button"} to={url}><span>Overview</span></Link>
    ];
    let display;
    artistViews.forEach((artistView, index) => {
        viewButtons.push(
            <Link key={index} className={view === artistView ? "view-button active" : "view-button"} to={`${url}/${artistView}`}><span>{artistView.replace(/_/g, ' ')}</span></Link>
        );
    });
    if (view === "top_tracks") {
        display = (
            <section>
                {/* <h2 className="section-title">Top Tracks</h2> */}
                <TracksList tracks={topTracks} />
            </section>
        );
    } else if (view === "playlists") {
        display = (
            <section>
                {/* <h2 className="section-title">Playlists</h2> */}
                <Tiles data={playlists} path="playlist"/>
            </section>
        );
    } else if (view === "related_artists") {
        display = (
            <section>
                {/* <h2 className="section-title">Related Artists</h2> */}
                <Tiles data={props.relatedArtists} path="artist"/>
            </section>
        );
    } else if (view === "bio") {
        let html = bio || "<p>No biography is available.</p>";
        display = (
            <section>
                {/* <h2 className="section-title">Bio</h2> */}
                <div dangerouslySetInnerHTML={{__html: html}}></div>
            </section>
        );
    } else if (view === "featured_in") {
        display = (
            <section>
                {/* <h2 className="section-title">Featured In</h2> */}
                <Tiles data={props.appearsOn} path="album"/>
            </section>
        );
    } else {
        // overview
        // show top 4 trakcs
        // const top3Tracks = {items: topTracks.items.slice(0, 3)};
        const top4Playlists = {...playlists, items: playlists.items.slice(0, 4)};
        // const top4RelatedArtists = {items: relatedArtists.items.slice(0,4)}
        // const latestAlbum = albums.items[0];
        latest.tracks.items = latest.tracks.items.slice(0,5);
        display = (
            <React.Fragment>
            <section>
                <div className="section-header">
                <h2 className="section-title">
                <Link to={`${url}/top_tracks`}>Top Tracks <i className="fas fa-chevron-right"></i></Link>
                </h2>
                {topTracks.items.length > 3 &&
                    <Link className="view-button" to={`${url}/top_tracks`}>View more</Link>
                }
                </div>                
                <TracksList tracks={{items: topTracks.items.slice(0, 3)}} />
            </section>
            <section>
                <div className="section-header">
                <h2 className="section-title">
                <Link to={`/album/${latest.id}`}>Latest Release <i className="fas fa-chevron-right"></i></Link>
                </h2>
                {latest.total_tracks > 5 && 
                    <Link className="view-button" to={`/album/${latest.id}`}>View more</Link>
                }
                </div>
                <div>
                    <Link to={`/album/${latest.id}`}>
                    <img src={latest.images[0].url} alt={artist.name} height="200"/>
                    <h3>{latest.name}</h3>                    
                    </Link>
                </div>
                <div>
                    <TracksList tracks={latest.tracks} type="album"/>
                </div>
            </section>
            <section>
            <div className="section-header">
            <h2 className="section-title">
            <Link to={`${url}/playlists`}>Playlists <i className="fas fa-chevron-right"></i></Link>
            </h2>
            {playlists.total > 4 &&
            <Link className="view-button" to={`${url}/playlists`}>View more</Link>
            }
            </div>
            <Tiles data={top4Playlists} path="playlist"/>
            </section>
            {/* <section>
            <div className="section-header">
            <h2 className="section-title">
            <Link to={`${url}/related_artists`}>Related Artists <i className="fas fa-chevron-right"></i></Link>
            </h2>
            <Link className="view-button" to={`${url}/related_artists`}>View more</Link>
            </div>
                <Tiles data={top4RelatedArtists} path="artist"/>
            </section> */}
            {albums.total > 0 &&
            <section>
                <h2 className="section-title">
                    Albums
                </h2>
                <Tiles data={albums} path="album"/>
            </section>}
            {singles.total > 0 &&
                <section>
                    <h2 className="section-title">
                        Singles
                    </h2>
                    <Tiles data={singles} path="album"/>
                </section>
            }
            </React.Fragment>
        );
    }
    return (
        <div id="main-wrapper" className="container">
        <section>
            <div id="artist-grid">
                <div id="artist-cover">
                    {artist.images && <img id="artist-image" src={artist.images[0].url} alt={artist.name} />}        
                </div>
                <div className="artist-info">
                    <h2>{artist.name}</h2>
                    <p className="tile-artist">{artist.popularity} popularity</p>
                    <p className="tile-artist">{artist.monthlyListeners} monthly listeners</p>                    
                    <p className="tile-artist">{commafyNumber(artist.followers.total)} followers</p>
                </div>
            </div>
            <div id="artist-button-grid">
                    {accessToken && <button className="button-outline" onClick={() => updateArtist(artistId, accessToken)}>
                    {/* <img className="playlist-icon" src="/images/add_playlist.svg" height="20" alt="add to playlist"/> */}
                    <i className={heartIcon}></i>
                    {/* <i className="fab fa-spotify"></i> */}
                    {/* <span> Remove</span> */}
                    </button>}
                    {/* <button className="button-outline"> */}
                    <a href={artist.external_urls.spotify} className="button-outline button-spotify" target="_blank" rel="noopener noreferrer">                            
                    {/* <img className="playlist-icon" src="/images/spotify.svg" height="20" alt="add to playlist"/> */}
                    <i className="fab fa-spotify"></i>
                    {/* <span> View In Spotify</span> */}
                    </a>                        
                    {/* </button> */}
                </div> 
        </section>
        <div id="view-buttons">
            {viewButtons}
        </div>
        <hr/>
       {display}
        </div>
    );
};

Artist.propTypes = {
    artist: PropTypes.object,
    isLoading: PropTypes.bool 
}

export default Artist;