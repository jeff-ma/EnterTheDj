import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Cookies} from 'react-cookie';
import PropTypes from 'prop-types';
import {setTrackIndex} from '../../redux/actions/tracksList';
import {playlistAddTrackRequest, playlistRemoveTrackRequest} from '../../redux/actions/playlist';
import {getSavedPlaylists} from '../../utils';
import playlist1 from '../../images/playlist1.svg';

const PlaylistDropdown = (props) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const {track, trackIndex} = props;    
    const paths = window.location.pathname.split("/");
    const [playlists, setPlaylists] = useState();

    const changeTrackIndex = () => {
        if (trackIndex) {
            props.setTrackIndex(trackIndex);
        }
    };

    const removeTrack = (playlistId, trackUri) => {
        // close track modal
        document.getElementById("track-modal-close").click();
        props.playlistRemoveTrack(playlistId, trackUri);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await getSavedPlaylists();
            setPlaylists(response);
        }
        fetchData();
    }, []);

    if (accessToken) {
    
        return (
            <div className={"dropdown option-box " + props.dropDirection}>
                <img className="option-icon dropdown-toggle" src={playlist1} alt="add to playlist" data-toggle="dropdown"/>
                <div className="dropdown-menu">
                    {paths[1] === "playlist" &&
                        <React.Fragment>
                            <div className="dropdown-item" onClick={() => removeTrack(paths[2], track.uri)}>Remove from playlist</div>
                            <hr/>
                        </React.Fragment>
                    }
                    <a href="#createPlaylistModal" className="dropdown-item" data-toggle="modal" onClick={changeTrackIndex}>Create playlist</a>
                    {/* <a href="#createPlaylistModal" className="dropdown-item" data-toggle="modal">Create playlist</a> */}
                    <hr/>
                    <p>Add to playlist</p>
                    {playlists && playlists.items && 
                        playlists.items.map((playlist) => 
                        <div className="dropdown-item" key={playlist.id} onClick={() => props.playlistAddTrack(playlist.id, track.uri)}>{playlist.name}</div>)
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