import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Cookies} from 'react-cookie';
import PropTypes from 'prop-types';
import {setTrackIndex} from '../../redux/actions/tracksList';
import {saveTrackRequest, removeTrackRequest} from '../../redux/actions/library';
import { updatePlayer} from '../../redux/actions/player';
import { formatDuration} from '../../utils';
import CreatePlaylistModal from './CreatePlaylistModal';
import TrackModal from './TrackModal';
import PlaylistDropdown from './PlaylistDropdown';
import '../../styles/tracksList.scss';
import ipod3 from '../../images/ipod3.svg';
// import playlist1 from '../../images/playlist1.svg';
import heart_outline2 from '../../images/heart_outline2.svg';
import heart_solid2 from '../../images/heart_solid2.svg';
import more from '../../images/more.svg';

const TracksList = (props) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const { tracks, trackIndex, setTrackIndex, removeTrack, saveTrack, updatePlayer} = props;
    console.log(props);

    if (tracks && tracks.items && tracks.items.length > 0) {
        if (trackIndex >= tracks.items.length) {
            setTrackIndex(0);
        }
        return (
            <React.Fragment>
                <ul className="list-container">
                {tracks.items.map((item, index) => {
                    const heartIcon = item.isSaved ? heart_solid2 : heart_outline2;
                    const updateLibraryTrack = item.isSaved ? removeTrack : saveTrack;
                    return (
                        <li className={props.type === "album" ? "album-list-item" : "list-item"} key={index}>
                            <div className="player-icon-box">
                                <img src={ipod3} height="20" alt="player" onClick={() => updatePlayer(item.id, "track")}/>
                                {/* <i className="fas fa-play list-player-icon" onClick={() => updatePlayer(item.id, "track")}></i> */}
                            </div>
                            {props.type !== "album" &&
                                <div className="list-image">
                                    <Link to={"/album/" + item.album.id}>
                                        <img src={item.album.images[0].url} alt={item.name}/>
                                    </Link>
                                </div>
                            }
                            <div className="list-details">
                                {props.type === "album" ? 
                                    <React.Fragment>
                                        <div className="track-name" onClick={() => updatePlayer(item.id, "track")}>{item.name}</div>
                                        <div>{formatDuration(item.duration_ms)}</div>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <div className="track-name" onClick={() => updatePlayer(item.id, "track")}>
                                            {/* <Link to={"/album/" + item.album.id} className="track-link"> */}
                                                <div className="tile-track">{item.name}</div>
                                                <div className="track-artist">{item.artists[0].name} &middot; {item.album.name}</div>
                                            {/* </Link> */}
                                        </div>
                                        <div className="track-duration">{formatDuration(item.duration_ms)}</div>
                                    </React.Fragment>
                                }
                            </div>
                            {accessToken && 
                                <React.Fragment>
                                    <PlaylistDropdown dropDirection="dropleft" trackIndex={index} track={item}/>
                                    <div className="option-box">
                                        <img className="option-icon" src={heartIcon} alt="like" onClick={()=> updateLibraryTrack(item.id, accessToken)}/>
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
                <TrackModal track={tracks.items[trackIndex]} removeTrack={removeTrack} saveTrack={saveTrack}/>
                <CreatePlaylistModal track={tracks.items[trackIndex]}/>     
            </React.Fragment>
        );
    } else {
        return <div>Nothing to load</div>;
    }
};

const mapStateToProps = (state) => state.tracksList;

const mapDispatchToProps = (dispatch) => ({
    setTrackIndex: (trackIndex) => dispatch(setTrackIndex(trackIndex)),
    saveTrack: (trackId, accessToken) => dispatch(saveTrackRequest(trackId, accessToken)),
    removeTrack: (trackId, accessToken) => dispatch(removeTrackRequest(trackId, accessToken)),
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType))
});

TracksList.propTypes = {
    removeTrack: PropTypes.func,
    saveTrack: PropTypes.func,
    setTrackIndex: PropTypes.func,
    trackIndex: PropTypes.number,
    tracks: PropTypes.object.isRequired,
    type: PropTypes.string,
    updatePlayer: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(TracksList);