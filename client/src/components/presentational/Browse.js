import React from 'react';
// import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import queryString from 'query-string';
import Pagination from './Pagination';
import Tiles from './Tiles';
// import '../../styles/browse.scss';

const Browse = (props) => {
    const { query } = props;
    const data = props.categories;
    const { page } = queryString.parse(query);

    return (
        <div id="main-wrapper" className="container">
            <section> 
                <h2 className="section-title">Browse</h2>
                <Tiles data={data} path="category"/>
                <Pagination page={page} limit={data.limit} total={data.total}/>
            </section>
        </div>
    );

};

// Browse.propTypes = {
//     categories: PropTypes.object
// };

export default Browse;