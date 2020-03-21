import React, {useLayoutEffect} from "react";
import {connect} from "react-redux";
import {getShowRequest, removeShowRequest, saveShowRequest} from "../../redux/actions/show";
import NotFound from "../presentational/NotFound";
import Loader from "../presentational/Loader";
import Collection from "../presentational/Collection";

const ShowContainer = ({isLoading, getShow, show, removeShow, saveShow, match, error}) => {
    const {showId} = match.params;
    useLayoutEffect(() => {
        getShow(showId);
    },[getShow, showId]);
    if (error) {
        return <NotFound/>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Collection collection={show} remove={removeShow} save={saveShow}/>;
    }
};

const mapStateToProps = (state) => state.show;

const mapDispatchToProps = (dispatch) => ({
    getShow: (showId) => dispatch(getShowRequest(showId)),
    removeShow: (showId) => dispatch(removeShowRequest(showId)),
    saveShow: (showId) => dispatch(saveShowRequest(showId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer);