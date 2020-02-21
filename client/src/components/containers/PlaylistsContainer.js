import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { getPlaylistsRequest} from '../../redux/actions/playlists';
import Loader from '../presentational/Loader';
import Playlists from '../presentational/Playlists';

const PlaylistsContainer = (props) => {
    const { cookies, isLoading, onload } = props;

    useLayoutEffect(() => {
        onload(cookies.access_token);
    }, [onload, cookies]);
    
    if (isLoading) {
        return <Loader/>;
    } else {
        return <Playlists {...props}/>;        
    }
};

const mapStateToProps = (state) => state.playlists;

const mapDispatchToProps = (dispatch) => ({
    onload: (accessToken) => dispatch(getPlaylistsRequest(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsContainer);