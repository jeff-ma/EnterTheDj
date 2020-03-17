import React, {useLayoutEffect} from "react";
import {connect} from "react-redux";
import {getPlaylistRequest, removePlaylistRequest, savePlaylistRequest} from "../../redux/actions/playlist";
import NotFound from "../presentational/NotFound";
import Loader from "../presentational/Loader";
import Collection from "../presentational/Collection";

const PlaylistContainer = ({isLoading, getPlaylist, playlist, removePlaylist, savePlaylist, match, error}) => {
    const {playlistId} = match.params;
    useLayoutEffect(() => {
        getPlaylist(playlistId);
    }, [getPlaylist, playlistId]);
    if (error) {
        return <NotFound/>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Collection collection={playlist} remove={removePlaylist} save={savePlaylist}/>;
    }
};

const mapStateToProps = (state) => state.playlist;

const mapDispatchToProps = (dispatch) => ({
    getPlaylist: (playlistId) => dispatch(getPlaylistRequest(playlistId)),
    removePlaylist: (playlistId) => dispatch(removePlaylistRequest(playlistId)),
    savePlaylist: (playlistId) => dispatch(savePlaylistRequest(playlistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistContainer);