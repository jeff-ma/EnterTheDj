import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { saveTrackRequest, removeTrackRequest} from '../../redux/actions/tracksList';
import { updatePlayer} from '../../redux/actions/player';
import { formatDuration } from '../../utils';
import TrackModal from './TrackModal';
import '../../styles/trackList.scss';



const TrackList = (props) => {
    const { collection, updatePlayer} = props;
    // const { collection, removeTrack, saveTrack, updatePlayer} = props;
    const [selectedTrack, setSelectedTrack] = useState(0);
    console.log(props);
    // if (collection && collection.tracks.items) {
        

        return (
            <React.Fragment>
            <ul className="list-container">
            {collection.tracks.items.map((item, index) => {
                // const heartIcon = item.isSaved ? "/images/heart_solid.svg" : "/images/heart_outline.svg";
                // const updateLibraryTrack = item.isSaved ? removeTrack : saveTrack;
                if (collection.type === "album") {
                    return (
                        <li className="album-list-item" key={index}>
                            <div onClick={() => updatePlayer(item.id, "track")}>
                                <i className="fas fa-play list-player-icon"></i>
                            </div>
                            <div className="list-details">
                                <div className="tile-track">{item.name}</div>
                                <div>{formatDuration(item.duration_ms)}</div>
                            </div>
                            <div>
                                <a href="#track-modal" data-toggle="modal" onClick={() => setSelectedTrack(index)}>
                                <img className="playlist-icon" src="/images/more.svg" alt="add to playlist"/>
                                </a> 
                            </div>
                        </li>
                    );
                } else {
                
                return (
                <li className="list-item" key={index}>
                    <div onClick={() => updatePlayer(item.id, "track")}>
                        <i className="fas fa-play list-player-icon"></i>
                    </div>
                    <div className="list-image">
                    <Link to={"/album/" + item.album.id}>
                            <img src={item.album.images[0].url} alt={item.name}/>
                        </Link>
                    </div>
                    <div className="list-details">
                        <div>
                            <Link to={"/album/" + item.album.id} className="track-link">
                            <div className="tile-track">{item.name}</div>
                            <div className="tile-artist">{item.artists[0].name} &middot; {item.album.name}</div>
                            </Link>
                        </div>
                        <div>{formatDuration(item.duration_ms)}</div>
                    </div>
                    {/* <div className="list-icons">
                        <img className="playlist-icon" src="/images/add_playlist.svg" alt="add to playlist"/> <i className="far fa-heart"></i>
                    </div> */}
                    <div>
                        {/* <span className="track-duration">{formatDuration(item.track.duration_ms)}</span> */}
                        {/* <img className="playlist-icon" src="/images/add_playlist.svg" alt="add to playlist"/> */}
                        <a href="#track-modal" data-toggle="modal" onClick={() => setSelectedTrack(index)}>
                        <img className="playlist-icon" src="/images/more.svg" alt="add to playlist"/>
                        </a> 
                        {/* <img className="playlist-icon" src={heartIcon} alt="like" onClick={()=> updateLibraryTrack(item.id, props.cookies.access_token)}/> */}
                        {/* <i className="far fa-heart"></i> */}
                    </div>
                </li>
            );
        }
            })}
        </ul>
        <TrackModal track={collection.tracks.items[selectedTrack]}/>
        </React.Fragment>
        );
    // } else {
    //     return <div>Nothing to load</div>;
    // }
};

// TrackList.propTypes = {
//     tracks: PropTypes.object
// };

const mapDispatchToProps = (dispatch) => ({
    saveTrack: (trackId, accessToken) => dispatch(saveTrackRequest(trackId, accessToken)),
    removeTrack: (trackId, accessToken) => dispatch(removeTrackRequest(trackId, accessToken)),
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType))
});

export default connect(null, mapDispatchToProps)(TrackList);