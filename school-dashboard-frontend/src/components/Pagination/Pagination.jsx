import React from "react";
import "./Pagination.css";

const Pagination = (props) => {
  const { paginationDetails, paginate } = props;
  const { totalPages, currentPage } = paginationDetails;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav>
      <ul className="pagination-container">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-number ${
              currentPage === number ? "current-page" : "remaining-page"
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
