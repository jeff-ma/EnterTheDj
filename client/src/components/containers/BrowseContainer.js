import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { getBrowseRequest } from '../../redux/actions/browse';
import Browse from '../presentational/Browse';
import Loader from '../presentational/Loader';

const BrowseContainer = (props) => {
    const { isLoading, onload } = props;
    const { search } = props.location;
    useLayoutEffect(() => {
        onload(search);
    }, [onload, search]);
    
    if (isLoading) {
        return <Loader/>;
    } else {
        return <Browse {...props}/>;    
    }
};

const mapStateToProps = (state) => state.browse;

const mapDispatchToProps = (dispatch) => ({
    onload: (query) => dispatch(getBrowseRequest(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseContainer);