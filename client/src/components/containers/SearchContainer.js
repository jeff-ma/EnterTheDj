import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
// import queryString from 'query-string';
import { getSearchRequest } from '../../redux/actions/search';
import Loader from '../presentational/Loader';
import Search from '../presentational/Search';

const SearchContainer = (props) => {
    console.log(props);
    const { q } = props.match.params;
    // const { q } =  queryString.parse(props.location.search);
    const { isLoading, search } = props;    
    useLayoutEffect(() => {
        console.log("serching");
            search(q);
    }, [q, search]);

    if (isLoading) {
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