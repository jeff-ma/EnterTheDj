import React, {useLayoutEffect} from "react";
import {connect} from "react-redux";
import {Cookies} from "react-cookie";
import {getLibraryRequest} from "../../redux/actions/library";
import NotFound from "../presentational/NotFound";
import Loader from "../presentational/Loader";
import Login from "../presentational/Login";
import Library from "../presentational/Library";

const LibraryContainer = (props) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const {isLoading, getLibrary, error} = props;
    useLayoutEffect(() => {
        if (accessToken) {
            getLibrary();
        }
    }, [getLibrary, accessToken]);
    if (error) {
        return <NotFound/>;
    } else if (!accessToken) {
        return <Login><p>Please log in to view your library.</p></Login>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Library {...props}/>;    
    }
};

const mapStateToProps = (state) => state.library;

const mapDispatchToProps = (dispatch) => ({
    getLibrary: () => dispatch(getLibraryRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer);