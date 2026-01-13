import React from "react";

const Pagination = ({ pagination, handlePageChange, students }) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
      <div className="text-muted">
        Showing {students.length} of {pagination.total} students (Page{" "}
        {pagination.page} of {pagination.totalPages})
      </div>
      <nav>
        <ul className="pagination mb-0">
          <li
            className={`page-item ${pagination.page === 1 ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(1)}
              disabled={pagination.page === 1}
            >
              First
            </button>
          </li>
          <li
            className={`page-item ${pagination.page === 1 ? "disabled" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(pagination.totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                pagination.page === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                // style={{ backgroundColor: "green" }}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              pagination.page === pagination.totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </button>
          </li>
          <li
            className={`page-item ${
              pagination.page === pagination.totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(pagination.totalPages)}
              disabled={pagination.totalPages}
            >
              Last
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
