import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Modal from './Modal';
import '../../styles/album.scss';

const Album = (props) => {
    const [selectedTrack, selectTrack] = useState(0);
    const { album, isLoading, updatePlayer } = props;

    if(isLoading) {
        return <Loader/>;
        // return (<h1>LOADING.....</h1>);
    } else {
        return (
            <div id="album-header" className="container">
                <Modal title={album.name}>
                    {album.tracks.items[selectedTrack].lyrics}
                </Modal>
                <section className="row">
                    <div className="col-sm-4"><img src={album.images[1].url} alt="album cover" /></div>
                    <div className="col-sm-8">
                        <h2>
                            <Link to={`/artist/${album.artists[0].id}`}>{album.artists[0].name}</Link>
                        </h2>
                        <h3>{album.name}</h3>
                        {
                            album.featuredArtists.length > 0 &&
                            <p>
                            Featured Artists: {
                                album.featuredArtists.map((artist, index) =>
                                <React.Fragment key={index}><Link to={"/artist/" + artist.id }>{artist.name}</Link>{album.featuredArtists.length === index + 1 ? '' : ", "}</React.Fragment>)
                                }
                        </p>
                        }
                        
                        <p>Popularity: {album.popularity}</p>
                        <p>Amount of Tracks: {album.total_tracks}</p>
                        <p>Release Date: {album.release_date}</p>
                        <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-primary">View in Spotify</button>
                        </a>
                        </div>
                    </section>
                    <section>
                        <h2 className="section-title">Album Tracks</h2>
                        <div className="tracks-wrapper">
                            <ul className="list-group list-group-flush">
                        {
                        album.tracks.items.map((track, index) => (
                            <li key={index} className="list-group-item">
                            <div className="container-fluid">
                            <div className="row">
                                <div className="col-1">
                                <i className="fas fa-play" onClick={() => updatePlayer(track.id, "track")}></i>
                                </div>
                                <div className="track-name col-7">
                                    
                                    {track.name}
                                </div>
                                <div className="track-duration col-2">
                                    {track.duration_time}
                                </div>
                                <div className="col-2">
                            <button type="button" className="btn btn-dark btn-sm" data-toggle="modal" data-target="#myModal" onClick={() => selectTrack(index)}>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            </div>
                            </div>
                            </div>
                            </li>
                        ))
                    }
                        </ul>
                    </div> 
                </section>
            </div>
        );
    }
};

Album.propTypes = {
    album: PropTypes.object,
    isLoading: PropTypes.bool,
    // onload: PropTypes.func
}

export default Album;