import React, { useLayoutEffect } from "react";
import {Cookies} from "react-cookie";
import {connect} from "react-redux";
import {getTopRequest} from "../../redux/actions/top";
import NotFound from "../presentational/NotFound";
import Login from "../presentational/Login";
import Loader from "../presentational/Loader";
import Top from "../presentational/Top";

const TopContainer = (props) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const {isLoading, getTop, error} = props;
    useLayoutEffect(() => {
        if (accessToken) {
            getTop();
        }
    }, [getTop, accessToken]);
    if (error) {
        return <NotFound/>;
    } else if (!accessToken) {
        return <Login><p>Please log in to view your top most played.</p></Login>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Top {...props}/>;    
    }
};

const mapStateToProps = (state) => state.top;

const mapDispatchToProps = (dispatch) => ({
    getTop: () => dispatch(getTopRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopContainer);