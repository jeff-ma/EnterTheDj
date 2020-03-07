import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import {Cookies} from 'react-cookie';
import { getLibraryRequest } from '../../redux/actions/library';
import Library from '../presentational/Library';
import Login from '../presentational/Login';
import Loader from '../presentational/Loader';

const LibraryContainer = (props) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const { isLoading, onload } = props;
    useLayoutEffect(() => {
        if (accessToken) {
            onload();
        }
    }, [onload, accessToken]);
    
    if (!accessToken) {
        return <Login><p>Please log in to view your library.</p></Login>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Library {...props}/>;    
    }
};

const mapStateToProps = (state) => state.library;

const mapDispatchToProps = (dispatch) => ({
    onload: () => dispatch(getLibraryRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer);