import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { getTopRequest } from '../../redux/actions/top';
import Top from '../presentational/Top';
import Login from '../presentational/Login';
import Loader from '../presentational/Loader';

const TopContainer = (props) => {
    const { isLoading, onload } = props;
    const accessToken = props.cookies.access_token;

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
    onload: (accessToken) => dispatch(getTopRequest(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopContainer);