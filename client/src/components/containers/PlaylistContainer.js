import React, {useLayoutEffect} from 'react';
import { connect } from 'react-redux';
import { getPlaylistRequest} from '../../redux/actions/playlist';
// import { updateAudio } from '../../redux/actions/footer';
import {removePlaylistRequest, savePlaylistRequest} from '../../redux/actions/playlist';
import { updatePlayer } from '../../redux/actions/player';
import Loader from '../presentational/Loader';
import AlbumPlaylist from '../presentational/AlbumPlaylist';

const PlaylistContainer = (props) => {
    const { isLoading, onload } = props;
    const { playlistId } = props.match.params;
    useLayoutEffect(() => {
        onload(playlistId);
    }, [onload, playlistId]);
    if (isLoading) {
        return <Loader/>;
    } else {
        return <AlbumPlaylist collection={props.playlist} updatePlayer={props.updatePlayer} removePlaylist={props.removePlaylist} savePlaylist={props.savePlaylist}/>;
    }
};

const mapStateToProps = (state) => state.playlist;

const mapDispatchToProps = (dispatch) => ({
    onload: (playlistId) => dispatch(getPlaylistRequest(playlistId)),
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType)),
    removePlaylist: (playlistId) => dispatch(removePlaylistRequest(playlistId)),
    savePlaylist: (playlistId) => dispatch(savePlaylistRequest(playlistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);