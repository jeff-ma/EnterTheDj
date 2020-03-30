import React from "react";
import {connect} from "react-redux";
import {Cookies} from "react-cookie";
import PropTypes from "prop-types";
import {playlistAddTrackRequest, playlistRemoveTrackRequest} from "../../redux/actions/playlist";
import playlistMenu from "../../images/playlist-menu.svg";

const PlaylistDropdown = ({dropDirection, track, playlists, playlistRemoveTrack, playlistAddTrack}) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const paths = window.location.pathname.split("/");
    const removeTrack = (playlistId, trackUri) => {
        // close track modal
        document.getElementById("track-modal-close").click();
        playlistRemoveTrack(playlistId, trackUri);
    };
    if (accessToken) {
        return (
            <div className={"dropdown option-box " + dropDirection}>
                <img className="option-icon dropdown-toggle" src={playlistMenu} alt="add to playlist" data-toggle="dropdown"/>
                <div className="dropdown-menu">
                    {paths[1] === "playlist" &&
                        <React.Fragment>
                            <div className="dropdown-item" onClick={() => removeTrack(paths[2], track.uri)}>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="56.311 -86.198 266.97 244.377" xmlSpace="preserve">
                                    <path d="M273.783,86.507L246.46,59.184l-22.175,22.174l27.324,27.323l-27.324,27.323l22.175,22.175l27.323-27.323 l27.322,27.322l22.175-22.174l-27.323-27.323l27.323-27.323l-22.175-22.174L273.783,86.507L273.783,86.507z M289.27-86.198H56.311 v31.36H289.27V-86.198z M289.27,3.402H56.311v31.36H289.27V3.402z M56.311,124.362h143.736V93.002H56.311V124.362z"/>
                                </svg>
                                &nbsp;
                                Remove from playlist
                            </div>
                            <hr/>
                        </React.Fragment>
                    }
                    <a href="#createPlaylistModal" className="dropdown-item" data-toggle="modal">
                        <svg version="1.1" viewBox="0 0 32 32" width="32px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
                            <g><rect fill="none" height="32" width="32"/></g>
                            <g>
                                <path d="M28,15.518V4L8,0v16.35C7.373,16.127,6.702,16,6,16c-3.316,0-6,2.691-6,6c0,3.314,2.684,6,6,6c3.311,0,6-2.686,6-6V6l12,2   v6.059C23.671,14.022,23.338,14,23,14c-4.973,0-9,4.027-9,9c0,4.971,4.027,8.998,9,9c4.971-0.002,8.998-4.029,9-9   C31.999,19.879,30.411,17.132,28,15.518z M23,29.883c-3.801-0.009-6.876-3.084-6.885-6.883c0.009-3.801,3.084-6.876,6.885-6.885   c3.799,0.009,6.874,3.084,6.883,6.885C29.874,26.799,26.799,29.874,23,29.883z"/>
                                <g><polygon points="28,22 24.002,22 24.002,18 22,18 22,22 18,22 18,24 22,24 22,28 24.002,28 24.002,24 28,24"/></g>
                            </g>
                        </svg>
                        &nbsp;
                        Create playlist
                    </a>
                    <hr/>
                    {/* <div className="dropdown-item-text">Add to playlist</div> */}
                        {playlists && playlists.items && 
                            playlists.items.map((playlist) => 
                            <div className="dropdown-item" key={playlist.id} onClick={() => playlistAddTrack(playlist.id, track.uri)}>
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="344.104 99.402 271.793 249.2" xmlSpace="preserve">
                                    <path d="M577.256,278.602v-38.641h-31.359v38.641h-38.641v31.359h38.641v38.641h31.359v-38.641h38.641v-31.359 H577.256L577.256,278.602z M577.063,99.402H344.104v31.36h232.959V99.402z M577.063,189.002H344.104v31.359h232.959V189.002z M344.104,309.961H487.84v-31.359H344.104V309.961z"/>
                                </svg>
                                &nbsp;
                                {playlist.name}
                            </div>
                            )
                        }
                </div>
            </div>
        );
    } else {
        return null;
    }
};

const mapDispatchToProps = (dispatch) => ({
    playlistAddTrack: (trackId, trackUri) => dispatch(playlistAddTrackRequest(trackId, trackUri)),
    playlistRemoveTrack: (trackId, trackUri) => dispatch(playlistRemoveTrackRequest(trackId, trackUri)),
});

PlaylistDropdown.propTypes = {
    dropDirection: PropTypes.string.isRequired,
    playlistAddTrack: PropTypes.func.isRequired,
    playlistRemoveTrack: PropTypes.func.isRequired,
    track: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(PlaylistDropdown);