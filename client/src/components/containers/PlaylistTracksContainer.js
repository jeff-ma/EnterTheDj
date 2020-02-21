import React, {useLayoutEffect} from 'react';
import { connect } from 'react-redux';
import { getPlaylistTracksRequest, getPlaylistLyricsRequest} from '../../redux/actions/playlistTracks';
// import { updateAudio } from '../../redux/actions/footer';
import {removePlaylistRequest, savePlaylistRequest} from '../../redux/actions/library';
import { updatePlayer } from '../../redux/actions/player';
import Loader from '../presentational/Loader';
// import PlaylistTracks from '../presentational/PlaylistTracks';
import AlbumPlaylist from '../presentational/AlbumPlaylist';

const PlaylistTracksContainer = (props) => {
    const { isLoading, onload } = props;
    const { playlistId } = props.match.params;
    const accessToken = props.cookies.access_token;
    useLayoutEffect(() => {
        onload(playlistId);
    }, [onload, playlistId]);
    if (isLoading) {
        return <Loader/>;
    } else {
        return <AlbumPlaylist collection={props.playlistTracks} cookies={props.cookies} updatePlayer={props.updatePlayer} removePlaylist={props.removePlaylist} savePlaylist={props.savePlaylist}/>;
        // return <PlaylistTracks {...props}/>;
    }
};

const mapStateToProps = (state) => state.playlistTracks;

const mapDispatchToProps = (dispatch) => ({
    onload: (playlistId) => dispatch(getPlaylistTracksRequest(playlistId)),
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType)),
    getLyrics: (tracks) => dispatch(getPlaylistLyricsRequest(tracks)),
    removePlaylist: (playlistId, accessToken) => dispatch(removePlaylistRequest(playlistId, accessToken)),
    savePlaylist: (playlistId, accessToken) => dispatch(savePlaylistRequest(playlistId, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTracksContainer);