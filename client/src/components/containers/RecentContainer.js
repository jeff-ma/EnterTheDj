import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { getRecentRequest } from '../../redux/actions/recent';
import { removeTrackRequest, saveTrackRequest } from '../../redux/actions/library';
import Loader from '../presentational/Loader';
import Login from '../presentational/Login';
import Recent from '../presentational/Recent';

const RecentContainer = (props) => {
    const { isLoading, onload } = props;
    const accessToken  = props.cookies.access_token;

    useLayoutEffect(() => {
        onload(accessToken);
    }, [onload, accessToken]);
    
    if (!accessToken) {
        return <Login><p>Please log in to view your recently played tracks.</p></Login>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Recent {...props}/>;   
    }
};

const mapStateToProps = (state) => state.recent;

const mapDispatchToProps = (dispatch) => ({
    onload: (accessToken) => dispatch(getRecentRequest(accessToken)),
    removeTrack: (trackId, accessToken) => dispatch(removeTrackRequest(trackId, accessToken)),
    saveTrack: (trackId, accessToken) => dispatch(saveTrackRequest(trackId, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentContainer) ;