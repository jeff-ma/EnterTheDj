import React, {useLayoutEffect} from "react";
import {connect} from "react-redux";
import {getCategoryRequest} from "../../redux/actions/category";
import NotFound from "../presentational/NotFound";
import Loader from "../presentational/Loader";
import Browse from "../presentational/Browse";

const CategoryContainer = (props) => {
    const {isLoading, getCategory, error} = props;
    const {search} = props.location;
    const {categoryId} = props.match.params;
    useLayoutEffect(() => {
        getCategory(categoryId, search);
    }, [getCategory, categoryId, search]);
    if (error) {
        return <NotFound/>;
    } else if (isLoading) {
        return <Loader/>;
    } else {
        return <Browse {...props}/>;
    }
};

const mapStateToProps = (state) => state.category;

const mapDispatchToProps = (dispatch) => ({
    getCategory: (categoryId, query) => dispatch(getCategoryRequest(categoryId, query))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);