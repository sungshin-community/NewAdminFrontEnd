import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";

export default function Pagenation({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
  totalPageNum,
}) {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <PaginationBox>
        <Pagination
          firstPageText={"<<"}
          lastPageText={">>"}
          prevPageText={"<"}
          nextPageText={">"}
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItems}
          pageRangeDisplayed={totalPageNum}
          onChange={handlePageChange}
        ></Pagination>
      </PaginationBox>
    </>
  );
}
const PaginationBox = styled.div`
  margin-top: 16px;
  .pagination {
    display: flex;
    justify-content: center;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin: 0px 3px;
    &:hover {
      background-color: #eeeeee;
      border-radius: 50px;
    }
  }

  ul.pagination li a {
    width: 42px;
    width: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 15px;
    color: #5e6f9e;
  }
  ul.pagination li.active a {
    color: #a055ff;
  }
  ul.pagination li.active {
    background-color: #f6efff;
    border-radius: 50px;
    width: 30px;
    height: 30px;
  }
`;
