import React from 'react';
import PropTypes from 'prop-types';
import { CPagination, CPaginationItem } from '@coreui/react';

const Paging = ({ paging, onPageChange, itemsPerPage  }) => {
  const { currentPage, totalPages, hasPreviousPage, hasNextPage } = paging;

  const renderPaginationItems = () => {
    const items = [];
    const startPage = Math.floor((currentPage - 1) / itemsPerPage ) * itemsPerPage  + 1;
    const endPage = Math.min(startPage + itemsPerPage -1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <CPaginationItem
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </CPaginationItem>
      );
    }

    return items;
  };

  return (
    <CPagination aria-label="Page navigation example" align="center">
      <CPaginationItem
        aria-label="First"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(1)}
      >
        <span aria-hidden="true">««</span>
      </CPaginationItem>
      <CPaginationItem
        aria-label="Previous"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <span aria-hidden="true">«</span>
      </CPaginationItem>
      {renderPaginationItems()}
      <CPaginationItem
        aria-label="Next"
        disabled={!hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <span aria-hidden="true">»</span>
      </CPaginationItem>
      <CPaginationItem
        aria-label="Last"
        disabled={!hasNextPage}
        onClick={() => onPageChange(totalPages)}
      >
        <span aria-hidden="true">»»</span>
      </CPaginationItem>
    </CPagination>
  );
};

Paging.propTypes = {
  paging: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    hasPreviousPage: PropTypes.bool,
    hasNextPage: PropTypes.bool,
  }),
  onPageChange: PropTypes.func,
  itemsPerPage: PropTypes.number.isRequired, // 추가된 prop
};

export default Paging;
