import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Pagination from './Pagination';
import Tiles from './Tiles';

const Category = (props) => {
    const { query } = props;
    const data = props.playlists;
    const { page } = queryString.parse(query);
    
    return (
        <div id="main-wrapper" className="container">
            <section>
                <h2 className="section-title">{data.name}</h2>
                <Tiles data={data} path="playlist"/>
                <Pagination page={page} limit={data.limit} total={data.total}/>
            </section>
        </div>
    );
};

Category.propTypes = {
    playlists: PropTypes.object,
    isLoading: PropTypes.bool
};

export default Category;