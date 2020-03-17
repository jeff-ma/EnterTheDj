import React, {useLayoutEffect} from "react";
import {connect} from "react-redux";
import {getBrowseRequest} from "../../redux/actions/browse";
import NotFound from "../presentational/NotFound";
import Loader from "../presentational/Loader";
import Browse from "../presentational/Browse";

const BrowseContainer = (props) => {
    const {isLoading, getBrowse, error} = props;
    const {search} = props.location;
    useLayoutEffect(() => {
        getBrowse(search);
    }, [getBrowse, search]);
    if (error) {
        return <NotFound/>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Browse {...props}/>;    
    }
};

const mapStateToProps = (state) => state.browse;

const mapDispatchToProps = (dispatch) => ({
    getBrowse: (query) => dispatch(getBrowseRequest(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseContainer);