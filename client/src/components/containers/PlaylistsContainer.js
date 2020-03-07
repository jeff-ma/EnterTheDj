import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { getPlaylistsRequest} from '../../redux/actions/playlists';
import Loader from '../presentational/Loader';
import Playlists from '../presentational/Playlists';

const PlaylistsContainer = (props) => {
    const {isLoading, onload } = props;

    useLayoutEffect(() => {
        onload();
    }, [onload]);
    
    if (isLoading) {
        return <Loader/>;
    } else {
        return <Playlists {...props}/>;        
    }
};

const mapStateToProps = (state) => state.playlists;

const mapDispatchToProps = (dispatch) => ({
    onload: () => dispatch(getPlaylistsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsContainer);