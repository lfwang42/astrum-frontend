import React, { useState, useEffect } from "react";
import { Params } from "../CustomTable";
import { PaginationOptions } from "@tanstack/react-table";

interface PaginationProps {
    totalRows?: number,
    pageSize?: number;
    pageNumber?: number;
    setParams?: React.Dispatch<React.SetStateAction<Params>> | null;
    // isFetchingPagination?: boolean;
    loading?: boolean;
    rows?: any[];
}


export const Pagination: React.FC<PaginationProps> = ({
    totalRows = 0, 
    pageSize = 0, 
    pageNumber = 0, 
    setParams = null, 
    loading = false, 
    rows = []}) => {
  // State variable to hold the current page. This value is
  // passed to the callback provided by the parent
  const [currentPage, setCurrentPage] = useState(1);
  const firstItem = rows.length > 0 ? rows[0] : null;
  const lastItem = rows.length > 0 ? rows[rows.length - 1] : null;
  const onNextPage = () => {
    if (!setParams || loading) return;

    // const nextValue = accessFieldByString(lastItem, sort);
    // // const smallerNextValue = isNaN(+nextValue) ? nextValue : (+nextValue).toFixed(2);

    // const p =
    //   nextValue !== "" ? `${order === -1 ? "lt" : "gt"}|${nextValue || 0}` : "";

    // if (!p && setHideIndexColumn && setUnknownPage) {
    //   setHideIndexColumn(false);
    //   setUnknownPage(false);
    // }

    // setParams((prev: FetchParams) => ({
    //   ...prev,
    //   page: p ? prev.page + 1 : 1,
    //   p,
    //   fromId: lastItem?._id,
    // }));
  };
  const onPrevPage = () => setCurrentPage(currentPage - 1);
//   const onPageSelect = (props.pageNumber) => setCurrentPage(pageNo);

  return (
    <div className="">
      <div className="">
        <button
          className=""
          onClick={onPrevPage}
        >
          &#8249;
        </button>
        <button
          className=""
          onClick={onNextPage}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Pagination;