import React, {useLayoutEffect} from "react";
import {connect} from "react-redux";
import {getArtistRequest} from "../../redux/actions/artist";
import {removeArtistRequest, saveArtistRequest} from "../../redux/actions/artist";
import Artist from "../presentational/Artist";
import Loader from "../presentational/Loader";
import NotFound from "../presentational/NotFound";

const ArtistContainer = (props) => {
    const {isLoading, getArtist, error} = props;
    const {artistId} = props.match.params;
    useLayoutEffect(() => {
        getArtist(artistId);
    },[artistId, getArtist]);
    if (error) {
        return <NotFound/>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Artist {...props}/>;        
    }
};

const mapStateToProps = (state) =>  state.artist;

const mapDispatchToProps = (dispatch) => ({
    getArtist: (artistId) => dispatch(getArtistRequest(artistId)),
    remove: (artistId) => dispatch(removeArtistRequest(artistId)),
    save: (artistId) => dispatch(saveArtistRequest(artistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistContainer);