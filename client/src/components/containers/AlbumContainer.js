import React, {useLayoutEffect} from 'react';
import {connect} from 'react-redux';
import {getAlbumRequest, removeAlbumRequest, saveAlbumRequest} from '../../redux/actions/album';
import NotFound from '../presentational/NotFound';
import Loader from '../presentational/Loader';
import Collection from '../presentational/Collection';

const AlbumContainer = ({album, isLoading, error, getAlbum, removeAlbum, saveAlbum, match}) => {
    const {albumId} = match.params;
    useLayoutEffect(() => {
        getAlbum(albumId);
    }, [getAlbum, albumId]);
    if (error) {
        return <NotFound/>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Collection collection={album} remove={removeAlbum} save={saveAlbum}/>;
    }
};

const mapStateToProps = (state) => state.album;

const mapDispatchToProps = (dispatch) => ({
    getAlbum: (albumId) => dispatch(getAlbumRequest(albumId)),
    removeAlbum: (albumId, accessToken) => dispatch(removeAlbumRequest(albumId, accessToken)),
    saveAlbum: (albumId, accessToken) => dispatch(saveAlbumRequest(albumId, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumContainer);