import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import '../../styles/pagination.scss';

const Pagination = (props) => {
    const { limit = 20, path = props.location.pathname, total } = props;
    const pages = Math.ceil(total/limit);
    let { page = 1 } = props;
    
    if (typeof page === "string") {
        page = parseInt(page);
    }

    const changePage = (pageNumber) => {
        let search = queryString.parse(props.location.search);
        search = queryString.stringify(Object.assign(search, {limit, page: pageNumber}));
        props.history.push(`${path}?${search}`) 
    };
    const prevPage = <button key="prev" className={page === 1 ? "d-none":"page-button"} onClick={() => changePage(page - 1)}><i className="fas fa-angle-left"></i></button>;
    const nextPage = <button key="next" className={page === pages ? "d-none":"page-button"} onClick={() => changePage(page + 1)}><i className="fas fa-angle-right"></i></button>;
    const pageButtons = [prevPage];
    
    for (let i = 1; i <= pages; i++) {
        pageButtons.push(<button key={i} className={page === i ? "page-button active" :"page-button" } onClick={() => changePage(i)} disabled={page === i}>{i}</button>);
    }

    pageButtons.push(nextPage);
    
    if (total > limit) {
        return <div id="pagination-container">{pageButtons}</div>;
    } else {
        return null;
    }
};

export default withRouter(Pagination);