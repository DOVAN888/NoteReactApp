// Pagination.js
import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          disabled={currentPage === idx + 1}
          style={{
            margin: '2px',
            padding: '4px 8px',
            backgroundColor: currentPage === idx + 1 ? '#007bff' : '#f0f0f0',
            color: currentPage === idx + 1 ? '#fff' : '#333',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
