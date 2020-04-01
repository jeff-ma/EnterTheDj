import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Cookies} from "react-cookie";
import axios from "axios";
import PropTypes from "prop-types";
import {saveTrackRequest, removeTrackRequest} from "../../redux/actions/tracksList";
import {updatePlayer} from "../../redux/actions/player";
import {formatDuration, getSavedPlaylists} from "../../utils";
import CreatePlaylistModal from "./CreatePlaylistModal";
import TrackModal from "./TrackModal";
import PlaylistDropdown from "./PlaylistDropdown";
import ipod from "../../images/ipod.svg";
import heartOutline from "../../images/heart-outline.svg";
import heartSolid from "../../images/heart-solid.svg";
import more from "../../images/more.svg";
import noImage from "../../images/no-image.jpg"

const TracksList = ({tracks, type, removeTrack, saveTrack, updatePlayer}) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const [trackIndex, setTrackIndex] = useState(0);
    const [savedPlaylists, setSavedPlaylists] = useState();
    const trackModalId = "modal" + Math.floor(Math.random() * 1000);
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
                <ul className="tracks-list-container">
                    {tracks.items.map((item, index) => {
                        const heartIcon = item.isSaved ? heartSolid : heartOutline;
                        const updateTrack = item.isSaved ? removeTrack : saveTrack;
                        return (
                            <li className={type === "album" ? "album-track-item" : "playlist-track-item"} key={index}>
                                <div>
                                    <img className="icon" src={ipod} alt="player" onClick={() => updatePlayer(item.id, "track")}/>
                                </div>
                                {type !== "album" &&
                                    <div>
                                        <Link to={"/album/" + item.album.id}>
                                            <img className="album-thumbnail" src={item.album.images && item.album.images[2] ? item.album.images[2].url : noImage} alt={item.name}/>
                                        </Link>
                                    </div>
                                }
                                <div className="track-details">
                                    {type === "album" ? 
                                        <div>{item.name}</div>
                                        :
                                        <div>
                                            <div><Link to={"/album/" + item.album.id}>{item.name}</Link></div>
                                            <div className="track-artist">{item.artists[0].name} &middot; {item.album.name}</div>
                                        </div>
                                    }
                                    <div>{formatDuration(item.duration_ms)}</div>
                                </div>
                                {accessToken && 
                                    <React.Fragment>
                                        <PlaylistDropdown dropDirection="dropleft" playlists={savedPlaylists} track={item} onClick={() => setTrackIndex(index)}/>
                                        <div className="option-box">
                                            <img className="icon" src={heartIcon} alt="like" onClick={()=> updateTrack(item.id, accessToken)}/>
                                        </div>
                                    </React.Fragment>
                                }
                                <div>
                                    <a href={`#${trackModalId}`} data-toggle="modal" onClick={() => setTrackIndex(index)}>
                                        <img className="icon" src={more} alt="add to playlist"/>
                                    </a> 
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <TrackModal id={trackModalId} track={tracks.items[trackIndex]} playlists={savedPlaylists} removeTrack={removeTrack} saveTrack={saveTrack}/>
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
    tracks: PropTypes.object.isRequired,
    type: PropTypes.string,
    updatePlayer: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    saveTrack: (trackId) => dispatch(saveTrackRequest(trackId)),
    removeTrack: (trackId) => dispatch(removeTrackRequest(trackId)),
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType))
});

export default connect(null, mapDispatchToProps)(TracksList);