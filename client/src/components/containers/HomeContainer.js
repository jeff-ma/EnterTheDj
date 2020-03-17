import React, {useLayoutEffect} from "react";
import {connect} from "react-redux";
import {getHomeRequest} from "../../redux/actions/home";
import NotFound from "../presentational/NotFound";
import Loader from "../presentational/Loader";
import Home from "../presentational/Home";

const HomeContainer = (props) => {
    const {isLoading, getHome, error} = props;
    useLayoutEffect(() => {
        getHome();
    }, [getHome]);
    if (error) {
        return <NotFound/>;
    } else if(isLoading) {
        return <Loader/>;
    } else {
        return <Home {...props}/>;
    }
}

const mapStateToProps = (state) => state.home;

const mapDispatchToProps = (dispatch) => ({
    getHome: () => dispatch(getHomeRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);