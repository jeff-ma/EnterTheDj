import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import Pagination from "./Pagination";
import Tiles from "./Tiles";

const Browse = ({categories, query}) => {
    const {page} = queryString.parse(query);
    return (
        <div className="container">
            <section> 
                <h2 className="section-title">Browse</h2>
                <Tiles data={categories} path="category"/>
                <Pagination page={page} limit={categories.limit} total={categories.total}/>
            </section>
        </div>
    );
};

Browse.propTypes = {
    categories: PropTypes.object,
    query: PropTypes.string
};

export default Browse;