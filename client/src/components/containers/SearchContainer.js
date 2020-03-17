import React, {useLayoutEffect} from "react";
import {connect} from "react-redux";
import {getSearchRequest} from "../../redux/actions/search";
import NotFound from "../presentational/NotFound";
import Loader from "../presentational/Loader";
import Search from "../presentational/Search";

const SearchContainer = (props) => {
    const {q} = props.match.params;
    const {isLoading, search, error} = props;    
    useLayoutEffect(() => {
        search(q);
    }, [q, search]);
    if (error) {
        return <NotFound/>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Search {...props}/>;
    }
};

const mapStateToProps = (state) => state.search;

const mapDispatchToProps = (dispatch) => ({
    search: (query) => dispatch(getSearchRequest(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);