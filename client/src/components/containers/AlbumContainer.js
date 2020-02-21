import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { getAlbumRequest } from '../../redux/actions/album';
import { updatePlayer } from '../../redux/actions/player';
import {removeAlbumRequest, saveAlbumRequest} from '../../redux/actions/library';
import Loader from '../presentational/Loader';
import AlbumPlaylist from '../presentational/AlbumPlaylist';

const AlbumContainer = (props) => {
    const { album, isLoading, onload } = props;
    const {albumId} = props.match.params;
    useLayoutEffect(() => {
        onload(albumId);
    }, [onload, albumId]);
    if (isLoading) {
        return <Loader/>;
    } else {
        return <AlbumPlaylist collection={album} cookies={props.cookies} updatePlayer={props.updatePlayer} removeAlbum={props.removeAlbum} saveAlbum={props.saveAlbum}/>;
    }
};

const mapStateToProps = (state) => state.album;

const mapDispatchToProps = (dispatch) => ({
    onload: (albumId) => dispatch(getAlbumRequest(albumId)),
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType)),
    removeAlbum: (albumId, accessToken) => dispatch(removeAlbumRequest(albumId, accessToken)),
    saveAlbum: (albumId, accessToken) => dispatch(saveAlbumRequest(albumId, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);