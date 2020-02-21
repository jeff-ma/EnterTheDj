import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import {getCategoryRequest} from '../../redux/actions/category';
import Loader from '../presentational/Loader';
import Category from '../presentational/Category';

const CategoryContainer = (props) => {
    const { isLoading, onload } = props;
    const { search } = props.location;
    const { categoryId } = props.match.params;
    console.log(props);
    useLayoutEffect(() => {
        onload(categoryId, search);
    }, [onload, categoryId, search]);

    if (isLoading) {
        return <Loader/>
    } else {
        return <Category {...props}/>;
    }
};

const mapStateToProps = (state) => state.category;

const mapDispatchToProps = (dispatch) => ({
    onload: (categoryId, query) => dispatch(getCategoryRequest(categoryId, query))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);