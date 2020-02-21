import React from 'react';
// import { PropTypes } from 'prop-types';
import TracksList from './TracksList';
// import '../../styles/playlists.scss';

const Playlist = (props) => {
        const { playlist } = props; 
        return (
            <div id="main-wrapper" className="container">
                {/* modal */}
                <section className="row">
                    <div className="col-sm-4"><img src={playlist.images[0].url} alt="cover" /></div>
                    <div className="col-sm-8">
                    <h2>
                        Playlist name here
                        {/* <Link to={`/artist/${album.artists[0].id}`}>
                            {album.artists[0].name}
                        </Link> */}
                    </h2>
                    <h3>{playlist.name}</h3>
                    {/* {
                        album.featuredArtists.length > 0 &&
                        <p>
                        Featured Artists: {
                            album.featuredArtists.map((artist, index) =>
                            <React.Fragment><Link key={index} to={"/artist/" + artist.id }>{artist.name}</Link>{album.featuredArtists.length === index + 1 ? '' : ", "}</React.Fragment>)
                            }
                    </p>
                    } */}
                    
                    {/* <p>Popularity: {album.popularity}</p> */}
                    <p>Amount of Tracks: {playlist.tracks.items.length}</p>
                    <p>Release Date: none</p>
                    <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-primary">View in Spotify</button>
                    </a>
                    </div>
                </section>
                <section>
                    <h2 className="section-title">Playlist Tracks</h2>
                    <div className="tracks-wrapper">
                        <TracksList tracks={playlist.tracks}/>
                    </div> 
                </section>
            </div>
            // add a section for artist who were featured in the album 
        );
    
};

// Playlists.propTypes = {
//     playlists: PropTypes.array
// };


export default Playlist;