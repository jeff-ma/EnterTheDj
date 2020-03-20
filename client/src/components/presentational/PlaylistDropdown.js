import React from "react";
import {connect} from "react-redux";
import {Cookies} from "react-cookie";
import PropTypes from "prop-types";
import {setTrackIndex} from "../../redux/actions/tracksList";
import {playlistAddTrackRequest, playlistRemoveTrackRequest} from "../../redux/actions/playlist";
import playlistIcon from "../../images/playlist-icon.svg";

const PlaylistDropdown = ({dropDirection, track, trackIndex, setTrackIndex, playlists, playlistRemoveTrack, playlistAddTrack}) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const paths = window.location.pathname.split("/");
    const removeTrack = (playlistId, trackUri) => {
        // close track modal
        document.getElementById("track-modal-close").click();
        playlistRemoveTrack(playlistId, trackUri);
    }
    if (accessToken) {
        return (
            <div className={"dropdown option-box " + dropDirection}>
                <img className="option-icon dropdown-toggle" src={playlistIcon} alt="add to playlist" data-toggle="dropdown"/>
                <div className="dropdown-menu">
                    {paths[1] === "playlist" &&
                        <React.Fragment>
                            <div className="dropdown-item" onClick={() => removeTrack(paths[2], track.uri)}>Remove from playlist</div>
                            <hr/>
                        </React.Fragment>
                    }
                    <a href="#createPlaylistModal" className="dropdown-item" data-toggle="modal" onClick={() => setTrackIndex(trackIndex)}>Create playlist</a>
                    <hr/>
                    <p>Add to playlist</p>
                    {playlists && playlists.items && 
                        playlists.items.map((playlist) => 
                        <div className="dropdown-item" key={playlist.id} onClick={() => playlistAddTrack(playlist.id, track.uri)}>{playlist.name}</div>)
                    }
                </div>
            </div>
        );
    } else {
        return null;
    }
};

const mapDispatchToProps = (dispatch) => ({
    setTrackIndex: (trackIndex) => dispatch(setTrackIndex(trackIndex)),
    playlistAddTrack: (trackId, trackUri) => dispatch(playlistAddTrackRequest(trackId, trackUri)),
    playlistRemoveTrack: (trackId, trackUri) => dispatch(playlistRemoveTrackRequest(trackId, trackUri)),
});

PlaylistDropdown.propTypes = {
    dropDirection: PropTypes.string,
    playlistAddTrack: PropTypes.func,
    playlistRemoveTrack: PropTypes.func,
    setTrackIndex: PropTypes.func,
    track: PropTypes.object
};

export default connect(null, mapDispatchToProps)(PlaylistDropdown);