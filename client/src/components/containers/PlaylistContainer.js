import React, {useLayoutEffect} from 'react';
import { connect } from 'react-redux';
import { getPlaylistRequest} from '../../redux/actions/playlist';
// import { updateAudio } from '../../redux/actions/footer';
import {removePlaylistRequest, savePlaylistRequest} from '../../redux/actions/library';
import { updatePlayer } from '../../redux/actions/player';
import Loader from '../presentational/Loader';
import AlbumPlaylist from '../presentational/AlbumPlaylist';

const PlaylistContainer = (props) => {
    const { isLoading, onload } = props;
    const { playlistId } = props.match.params;
    useLayoutEffect(() => {
        onload(playlistId);
        console.log("gettting collection...");
    }, [onload, playlistId]);
    if (isLoading) {
        return <Loader/>;
    } else {
        return <AlbumPlaylist collection={props.playlist} cookies={props.cookies} updatePlayer={props.updatePlayer} removePlaylist={props.removePlaylist} savePlaylist={props.savePlaylist}/>;
        // return <playlist {...props}/>;
    }
};

const mapStateToProps = (state) => state.playlist;

const mapDispatchToProps = (dispatch) => ({
    onload: (playlistId) => dispatch(getPlaylistRequest(playlistId)),
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType)),
    removePlaylist: (playlistId, accessToken) => dispatch(removePlaylistRequest(playlistId, accessToken)),
    savePlaylist: (playlistId, accessToken) => dispatch(savePlaylistRequest(playlistId, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);