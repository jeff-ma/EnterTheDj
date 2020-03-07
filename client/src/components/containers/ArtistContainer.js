import React, {useLayoutEffect} from 'react';
import { connect } from 'react-redux';
import { getArtistRequest } from '../../redux/actions/artist';
import {removeArtistRequest, saveArtistRequest} from '../../redux/actions/artist';
import Artist from '../presentational/Artist';
import Loader from '../presentational/Loader';

const ArtistContainer = (props) => {
    const {isLoading, onload } = props;
    const {artistId} = props.match.params;
    // const accessToken = props.cookies.access_token;
    useLayoutEffect(() => {
        onload(artistId);
    },[artistId, onload]);
    if (isLoading) {
        return <Loader/>;
    } else {
        return <Artist {...props}/>;        
    }
};

const mapStateToProps = (state) =>  state.artist;

const mapDispatchToProps = (dispatch) => ({
    onload: (artistId) => dispatch(getArtistRequest(artistId)),
    removeArtist: (artistId) => dispatch(removeArtistRequest(artistId)),
    saveArtist: (artistId) => dispatch(saveArtistRequest(artistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistContainer);