import React, {useLayoutEffect} from "react";
import {connect} from "react-redux";
import {Cookies} from "react-cookie";
import {getRecentRequest} from "../../redux/actions/recent";
import NotFound from "../presentational/NotFound";
import Loader from "../presentational/Loader";
import Login from "../presentational/Login";
import Recent from "../presentational/Recent";

const RecentContainer = (props) => {
    const cookies = new Cookies();
    const accessToken = cookies.get("access_token");
    const {isLoading, getRecent, error} = props;
    useLayoutEffect(() => {
        if (accessToken) {
            getRecent();
        }
    }, [accessToken, getRecent]);
    if (error) {
        return <NotFound/>;
    } else if (!accessToken) {
        return <Login><p>Please log in to view your recently played tracks.</p></Login>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Recent {...props}/>;   
    }
};

const mapStateToProps = (state) => state.recent;

const mapDispatchToProps = (dispatch) => ({
    getRecent: () => dispatch(getRecentRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentContainer) ;