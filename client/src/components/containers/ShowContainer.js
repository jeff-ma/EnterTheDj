import React, {useLayoutEffect} from 'react';
import { connect } from 'react-redux';
import {getShowRequest, removeShowRequest, saveShowRequest} from '../../redux/actions/show';
import { updatePlayer } from '../../redux/actions/player';
// import Show from '../presentational/Show';
import AlbumPlaylist from '../presentational/AlbumPlaylist';
import Loader from '../presentational/Loader';

const ShowContainer = (props) => {
    const {showId} = props.match.params;
    const onload = props.onload

    useLayoutEffect(() => {
        onload(showId);
    },[onload, showId]);

    if (props.isLoading) {
        return <Loader/>;
    } else {
        return <AlbumPlaylist collection={props.show} {...props}/>
    }
};

const mapStateToProps = (state) => {
    return state.show;
};

const mapDispatchToProps = (dispatch) => ({
    onload: (showId) => dispatch(getShowRequest(showId)),
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType)),
    removeShow: (showId) => dispatch(removeShowRequest(showId)),
    saveShow: (showId) => dispatch(saveShowRequest(showId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer);