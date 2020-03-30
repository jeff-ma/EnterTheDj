import React from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";
import Pagination from "./Pagination";
import Tiles from "./Tiles";

const Browse = ({data, query}) => {
    const {page} = queryString.parse(query);
    return (
        <section className="container"> 
            <h2 className="section-title">{data.name ? data.name : "Browse"}</h2>
            <Tiles data={data} path={data.name ? "playlist" : "category"}/>
            <Pagination page={page} limit={data.limit} total={data.total}/>
        </section>
    );
};

Browse.propTypes = {
    data: PropTypes.object,
    query: PropTypes.string
};

export default withRouter(Browse);