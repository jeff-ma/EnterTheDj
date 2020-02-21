import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { getLibraryRequest } from '../../redux/actions/library';
import Library from '../presentational/Library';
import Login from '../presentational/Login';
import Loader from '../presentational/Loader';

const LibraryContainer = (props) => {
    const { isLoading, onload } = props;
    const accessToken = props.cookies.access_token;
    console.log("loadinf library....");
    useLayoutEffect(() => {
        console.log("getting library data....");
        onload(accessToken);
    }, [onload, accessToken]);
    
    if (!accessToken) {
        return <Login><p>Please log in to view your library.</p></Login>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        console.log("render libary....");
        return <Library {...props}/>;    
    }
};

const mapStateToProps = (state) => state.library;

const mapDispatchToProps = (dispatch) => ({
    onload: (accessToken) => dispatch(getLibraryRequest(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer);