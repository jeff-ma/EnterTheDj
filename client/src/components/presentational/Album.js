import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import '../../styles/album.scss';

class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrack: 0
        }
    }

    componentDidMount() {
        const { albumId } = this.props.match.params;
        this.props.onload(albumId);
    }

    updateLyrics(index) {
        const { getLyrics, album } = this.props;
        this.setState({selectedTrack: index});
        if(!album.lyricsAvailable) {
            getLyrics(album.tracks.items);
        }
    }

    render() {
        const { selectedTrack } = this.state;
        const { album, lyrics, isLoading, updateAudio, getLyrics } = this.props;
        if(isLoading) {
            return (<h1>LOADING.....</h1>);
        } else {
            return (
                <div id="album-header" className="container">
                    {/* modal */}
<div class="modal fade" id="myModal">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">{album.name}</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body" dangerouslySetInnerHTML={{__html: album.tracks.items[selectedTrack].lyrics}}>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
                    <section className="row">
                        <div className="col-sm-4"><img src={album.images[1].url} alt="album cover" /></div>
                        <div className="col-sm-8">
                        <h2>
                            <Link to={`/artist/${album.artists[0].id}`}>
                                {album.artists[0].name}
                            </Link>
                        </h2>
                        <h3>{album.name}</h3>
                        {
                            album.featuredArtists.length > 0 &&
                            <p>
                            Featured Artists: {
                                album.featuredArtists.map((artist, index) =>
                                <React.Fragment><Link key={index} to={"/artist/" + artist.id }>{artist.name}</Link>{album.featuredArtists.length === index + 1 ? '' : ", "}</React.Fragment>)
                                }
                        </p>
                        }
                        
                        <p>Popularity: {album.popularity}</p>
                        <p>Amount of Tracks: {album.total_tracks}</p>
                        <p>Release Date: {album.release_date}</p>
                        <a href={album.external_urls.spotify} target="_blank">
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
                                    <i className="fas fa-play" onClick={() => updateAudio(track.id, "track")}></i>
                                    </div>
                                    <div className="track-name col-7">
                                        
                                        {track.name}
                                    </div>
                                    <div className="track-duration col-2">
                                        {track.duration_time}
                                    </div>
                                    <div className="col-2">
                                {/* <button class="btn btn-dark btn-sm" type="button" data-toggle="collapse" data-target={"#track-" + index + "-info"}> */}
                                {/* <button type="button" class="btn btn-dark btn-sm" data-toggle="modal" data-target="#myModal" onClick={() => getLyrics(album.artists[0].name, track.name)}> */}
                                <button type="button" class="btn btn-dark btn-sm" data-toggle="modal" data-target="#myModal" onClick={() => this.updateLyrics(index)}>
                                    <i className="fas fa-chevron-down"></i>
                                </button>
                                </div>
                                </div>
                                <div class="collapse" id={"track-" + index + "-info"}>
                                <div class="card card-body">
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
                // add a section for artist who were featured in the album 
            );
        }
    }
};

Album.propTypes = {
    album: PropTypes.object,
    isLoading: PropTypes.bool,
    onload: PropTypes.func
}

export default Album;