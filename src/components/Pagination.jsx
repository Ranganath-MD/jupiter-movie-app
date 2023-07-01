import React from "react";
import Pagination from "react-js-pagination";
import "../styles/pagination.css";
export const PaginationComponent = ({ totalCount, handlePageChange, page }) => {
  return (
    <Pagination
      activePage={page}
      totalItemsCount={totalCount}
      pageRangeDisplayed={5}
      onChange={(item) => handlePageChange(item)}
      prevPageText="Previous"
      nextPageText="Next"
      innerClass="pagination-style"
      itemClass="item"
      activeClass="active-item"
      activeLinkClass="active-link"
    />
  );
};
