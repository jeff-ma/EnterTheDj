import React from "react";
import {withRouter} from "react-router-dom";

const Pagination = ({history, limit = 20, location, page = 1, total}) => {
    if (total > limit) {
        const pages = Math.ceil(total/limit);
        const changePage = (pageNumber) => {
            history.push(`${location.pathname}?limit${limit}&page=${pageNumber}`);
        };
        page = parseInt(page);
        const prevPage = <button key="prev" className={page === 1 ? "d-none":"page-button"} onClick={() => changePage(page - 1)}><i className="fas fa-angle-left"></i></button>;
        const nextPage = <button key="next" className={page === pages ? "d-none":"page-button"} onClick={() => changePage(page + 1)}><i className="fas fa-angle-right"></i></button>;
        const pageButtons = [prevPage];
        for (let i = 1; i <= pages; i++) {
            pageButtons.push(<button key={i} className={page === i ? "page-button active" :"page-button" } onClick={() => changePage(i)} disabled={page === i}>{i}</button>);
        }
        pageButtons.push(nextPage);
        return <div className="pagination-container">{pageButtons}</div>;
    } else {
        return null;
    }
};

export default withRouter(Pagination);