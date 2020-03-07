import React, { useLayoutEffect } from 'react';
import {Cookies} from 'react-cookie';
import { connect } from 'react-redux';
import { getTopRequest } from '../../redux/actions/top';
import Top from '../presentational/Top';
import Login from '../presentational/Login';
import Loader from '../presentational/Loader';

const TopContainer = (props) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const { isLoading, onload } = props;

    useLayoutEffect(() => {
        onload(accessToken);
    }, [onload, accessToken]);
    
    if (!accessToken) {
        return <Login><p>Please log in to view your top most played.</p></Login>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Top {...props}/>;    
    }
};

const mapStateToProps = (state) => state.top;

const mapDispatchToProps = (dispatch) => ({
    onload: () => dispatch(getTopRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopContainer);