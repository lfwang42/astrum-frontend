import React, { useState, useEffect } from "react";
import { Params } from "../CustomTable";
import { PaginationOptions } from "@tanstack/react-table";

interface PaginationProps {
    totalRows?: number,
    pageSize?: number;
    pageNumber?: number;
    setParams?: React.Dispatch<React.SetStateAction<Params>> | null;
    nextFunction: Function;
    // isFetchingPagination?: boolean;
    loading?: boolean;
    defaultSort: string;
    // order?: number;
    params: Params;
    rows?: any[];
}

const stats: Record<string, string> = {
    "Speed": "SpeedDelta",
    "FlatAttack": "AttackDelta",
    "FlatDefence": 'DefenceDelta',
    'FlatHP': 'HPDelta',
    'Attack': 'AttackAddedRatio',
    'Defence': 'DefenceAddedRatio',
    'HP': 'HPAddedRatio',
    'BreakEffect': 'BreakDamageAddedRatio',
    'StatusRes': 'StatusResistance',
    'EffectHitRate': 'StatusProbability',
    'EnergyRegen': 'SPRatio',
    'CriticalChance': 'CriticalChance',
    'CriticalDamage': 'CriticalDamage'
}

export const Pagination: React.FC<PaginationProps> = ({
    totalRows = 0, 
    pageSize = 20, 
    pageNumber = 0, 
    setParams = null, 
    loading = false, 
    defaultSort,
    rows = [],
    params,
    nextFunction,}) => {
  // State variable to hold the current page. This value is
  // passed to the callback provided by the parent
  const [currentPage, setCurrentPage] = useState(1);
  const [disableNext, toggleNext] = useState<boolean>(rows?.length >= pageSize ? false : true)
  const [disablePrev, togglePrev] = useState<boolean>(pageNumber === 1)
  useEffect(() => {
    if (rows && rows?.length >= pageSize) {
        toggleNext(false)
    }
    else {
        toggleNext(true)
    }
    if (rows || currentPage > 1) {
        togglePrev(false)
    }
    else {
        togglePrev(true)
    }
    // console.log(disableNext)
    // console.log(rows?.length)
  }, [rows])

  useEffect(() => {
    setCurrentPage(params.page ? params.page : 1)
    // console.log(disableNext)
    // console.log(rows?.length)
  }, [params])
  const firstItem = rows.length > 0 ? rows[0] : null;
  const lastItem = rows.length > 0 ? rows[rows.length - 1] : null;
  const getSortFieldValue = (row: any, sort: string | undefined) => {
    //check row then substats
    const sortstat = sort ? sort : defaultSort
    // console.log(row)
    // console.log(defaultSort)
    if (!row) return -1000
    if (row[sortstat] !== undefined) {
        return row[sortstat]
    }
    else {
        return row.stats[sortstat]
    }
  }
  const onNextPage = () => {
    if (!setParams || loading) return;
    
    const nextValue = getSortFieldValue(lastItem, params.sortStat);
    const query = {
        page: pageNumber + 1,
        value: nextValue,
        order: params.order,
        comp: 'lt',
        from: lastItem['hash']
    }
    setCurrentPage(currentPage + 1)
    nextFunction({...params, ...query})
    // setParams((prev: Params) => ({
    //     ...prev,
    //     ...query
    // }));
  };
  const onPrevPage = () => {
    if (!setParams || loading) return;
    
    const nextValue = getSortFieldValue(firstItem, params.sortStat);
    const query = {
        page: pageNumber - 1,
        // sortStat: params.sortStat,
        value: nextValue,
        order: params.order,
        comp: 'gt',
        from: firstItem['hash']
    }
    setCurrentPage(currentPage - 1)
    nextFunction({...params, ...query})
  }
//   const onPageSelect = (props.pageNumber) => setCurrentPage(pageNo);

  return (
    <div className="flex justify-center items-center">
    <button
        className=""
        onClick={onPrevPage}
        disabled={disablePrev}
    >
        {'<<'}
    </button>
    <span>{currentPage}</span>
    <button
        className=""
        onClick={onNextPage}
        disabled={disableNext}
    >
        {'>>'}
    </button>
    </div>
  );
};

export default Pagination;