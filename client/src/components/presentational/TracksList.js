import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Cookies} from "react-cookie";
import axios from "axios";
import PropTypes from "prop-types";
import {setTrackIndex} from "../../redux/actions/tracksList";
import {saveTrackRequest, removeTrackRequest} from "../../redux/actions/tracksList";
import {updatePlayer} from "../../redux/actions/player";
import {formatDuration, getSavedPlaylists} from "../../utils";
import CreatePlaylistModal from "./CreatePlaylistModal";
import TrackModal from "./TrackModal";
import PlaylistDropdown from "./PlaylistDropdown";
import "../../styles/tracksList.scss";
import ipod from "../../images/ipod.svg";
import heartOutline from "../../images/heart-outline.svg";
import heartSolid from "../../images/heart-solid.svg";
import more from "../../images/more.svg";

const TracksList = ({tracks, type, trackIndex, setTrackIndex, removeTrack, saveTrack, updatePlayer}) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const [savedPlaylists, setSavedPlaylists] = useState();
    useEffect(() => {
        const source = axios.CancelToken.source();
        const fetchData = async () => {
            try {
                const playlists = await getSavedPlaylists(source.token);
                setSavedPlaylists(playlists);
            } catch(error) {
                console.log(error);
            }
        }
        if (accessToken) {
            fetchData();
        }  
        // cancel the request when unmounting
        return () => source.cancel("request canceled");
    }, [accessToken]);
    if (tracks && tracks.items && tracks.items.length > 0) {
        if (trackIndex >= tracks.items.length) {
            // set track index back to 0 in case of removing last track from playlist to prevent track modal error
            setTrackIndex(0);
        }
        return (
            <React.Fragment>
                <ul className="list-container">
                    {tracks.items.map((item, index) => {
                        const heartIcon = item.isSaved ? heartSolid : heartOutline;
                        const updateTrack = item.isSaved ? removeTrack : saveTrack;
                        return (
                            <li className={type === "album" ? "album-list-item" : "list-item"} key={index}>
                                <div className="player-icon-box">
                                    <img src={ipod} height="20" alt="player" onClick={() => updatePlayer(item.id, "track")}/>
                                </div>
                                {type !== "album" &&
                                    <div className="list-image">
                                        <Link to={"/album/" + item.album.id}>
                                            <img src={item.album.images[2].url} alt={item.name}/>
                                        </Link>
                                    </div>
                                }
                                <div className="list-details">
                                    {type === "album" ? 
                                        <React.Fragment>
                                            <div>{item.name}</div>
                                            <div>{formatDuration(item.duration_ms)}</div>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <div className="track-name">
                                                <Link to={"/album/" + item.album.id} className="track-link">
                                                    <div className="tile-track">{item.name}</div>
                                                    <div className="track-artist">{item.artists[0].name} &middot; {item.album.name}</div>
                                                </Link>
                                            </div>
                                            <div className="track-duration">{formatDuration(item.duration_ms)}</div>
                                        </React.Fragment>
                                    }
                                </div>
                                {accessToken && 
                                    <React.Fragment>
                                        <PlaylistDropdown dropDirection="dropleft" playlists={savedPlaylists} trackIndex={index} track={item}/>
                                        <div className="option-box">
                                            <img className="option-icon" src={heartIcon} alt="like" onClick={()=> updateTrack(item.id, accessToken)}/>
                                        </div>
                                    </React.Fragment>
                                }
                                <div>
                                    <a href="#track-modal" data-toggle="modal" onClick={() => setTrackIndex(index)}>
                                        <img className="option-icon" src={more} alt="add to playlist"/>
                                    </a> 
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <TrackModal track={tracks.items[trackIndex]} playlists={savedPlaylists} removeTrack={removeTrack} saveTrack={saveTrack}/>
                <CreatePlaylistModal track={tracks.items[trackIndex]}/>     
            </React.Fragment>
        );
    } else {
        return <div>No tracks available</div>;
    }
};

TracksList.propTypes = {
    removeTrack: PropTypes.func.isRequired,
    saveTrack: PropTypes.func.isRequired,
    setTrackIndex: PropTypes.func.isRequired,
    trackIndex: PropTypes.number,
    tracks: PropTypes.object.isRequired,
    type: PropTypes.string,
    updatePlayer: PropTypes.func.isRequired
};

const mapStateToProps = (state) => state.tracksList;

const mapDispatchToProps = (dispatch) => ({
    setTrackIndex: (trackIndex) => dispatch(setTrackIndex(trackIndex)),
    saveTrack: (trackId) => dispatch(saveTrackRequest(trackId)),
    removeTrack: (trackId) => dispatch(removeTrackRequest(trackId)),
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType))
});

export default connect(mapStateToProps, mapDispatchToProps)(TracksList);