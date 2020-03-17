import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import Pagination from "./Pagination";
import Tiles from "./Tiles";

const Category = ({playlists, query}) => {
    const {page} = queryString.parse(query);
    return (
        <div id="main-wrapper" className="container">
            <section>
                <h2 className="section-title">{playlists.name}</h2>
                <Tiles data={playlists} path="playlist"/>
                <Pagination page={page} limit={playlists.limit} total={playlists.total}/>
            </section>
        </div>
    );
};

Category.propTypes = {
    playlists: PropTypes.object.isRequired,
    query: PropTypes.string
};

export default Category;