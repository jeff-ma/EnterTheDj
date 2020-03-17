import React, {useLayoutEffect} from "react";
import {connect} from "react-redux";
import {getPlaylistsRequest} from "../../redux/actions/playlists";
import NotFound from "../presentational/NotFound";
import Loader from "../presentational/Loader";
import Playlists from "../presentational/Playlists";

const PlaylistsContainer = (props) => {
    const {isLoading, getPlaylists, error} = props;
    useLayoutEffect(() => {
        getPlaylists();
    }, [getPlaylists]);
    if (error) {
        return <NotFound/>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Playlists {...props}/>;
    }
};

const mapStateToProps = (state) => state.playlists;

const mapDispatchToProps = (dispatch) => ({
    getPlaylists: () => dispatch(getPlaylistsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsContainer);