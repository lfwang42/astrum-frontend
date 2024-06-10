"use client";

import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { useRouter } from "next/navigation";
import { ExpandedBuildRow } from "../ExpandedBuildRow";
import axios from "axios";
import { getAPIURL, percents } from "@/lib/utils";
import { AvatarCategory } from "@/app/types";
import { ExpandedProfileRow } from "../ExpandedProfileRow";
import { Translate } from "../Translate";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

interface tableParams {
  table: string;
  query?: number | string;
}

interface CustomTableProps<TData, TValue> {
  fetchUrl: string;
  columns: ColumnDef<any, TValue>[];
  params?: Params;
  // sortOptions?: Record<string, string>
  // tableParams?: tableParams;
  tableParams?: string | number;
  sortOptions?: any[];
  defaultSort: string;
  calc_id?: number;
  pagination: boolean;
}

export type Params = {
  [key: string]: number | string | undefined;
  sortStat?: string;
  order?: string;
  value?: number;
  size?: number;
  filter?: string;
  uids?: string;
  comp?: string;
  page?: number;
  from?: string;
};

export function CustomTable<TData, TValue>({
  fetchUrl,
  columns,
  tableParams,
  // totalRows,
  // isLoading,
  params,
  sortOptions,
  defaultSort,
  calc_id,
  pagination,
}: CustomTableProps<TData, TValue>) {
  const [rows, setRows] = useState<TData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [tableSizeLoading, setTableSizeLoading] = useState<boolean>(true);
  const [tableSize, setTableSize] = useState<number>(0);
  const [rowSpan, setRowSpan] = useState<number>(0);
  const [rowExpand, setRowExpand] = useState<{ expand: boolean; row: any }[]>(
    []
  );

  const t = useTranslations();

  const collections: Record<string, string> = {
    "/api/profiles": "profiles",
    "/api/relics": "relics",
    "/api/builds": "builds",
    "/api/leaderboard": "leaderboard",
  };
  const tableName = fetchUrl.startsWith("/api/builds")
    ? "builds"
    : collections[fetchUrl];

  const fetchTableSize = async () => {
    if (
      fetchUrl == "/api/categories" ||
      (fetchUrl == "/api/profiles" && !tableParams)
    )
      return;
    console.log("fetching tablesizxe");
    setTableSizeLoading(true);
    const p: any = { table: tableName };
    // console.log(tableParams)
    if (tableParams) p.query = tableParams;
    const res = await axios.get(getAPIURL("/api/tablesize"), {
      params: p,
    });
    setTableSize(res.data);
    // console.log(tableSize)
    setTableSizeLoading(false);
    // console.log(tableSizeLoading)
  };

  const filterCellName = (name: string) => {
    if (
      name == "score" ||
      name == "rank" ||
      name == "region" ||
      name == "nickname"
    )
      return true;
    return false;
  };

  useEffect(() => {
    fetchTableSize();
  }, [tableParams]);

  const table = useReactTable({
    columns,
    data: rows,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });
  const pageSize = params?.size || 20;
  const defaultParams: Params = {
    sortStat: defaultSort,
    order: "desc",
    uids: "",
    size: pageSize,
    page: 1,
  };
  if (params && params.calc_id) {
    defaultParams.calc_id = params.calc_id;
  }
  const [searchParams, setParams] = useState<Params>(defaultParams);

  //update searchparams when uids get loaded
  useEffect(() => {
    setParams({ ...searchParams, uids: params?.uids });
  }, [params?.uids]);

  useEffect(() => {
    // console.log(getAPIURL(fetchUrl))
    if (fetchUrl == "/api/profiles" && params && !params.uids?.length) {
      return;
    }
    setLoading(true);
    const res = axios
      .get(getAPIURL(fetchUrl), { params: searchParams }) // Use the correct URL, it can be an API Route URL, an external URL...
      .then((res) => res.data)
      .then((data) => {
        if (defaultSort == "count") {
          data.sort((a: AvatarCategory, b: AvatarCategory) =>
            a.count < b.count ? 1 : b.count < a.count ? -1 : 0
          );
        }
        setRows(data);
        setRowSpan(data[0].hasMultiRows ? data[0].bids.length : 1);
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error);
      });
  }, [JSON.stringify(searchParams), fetchUrl]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < Math.floor(rows.length / rowSpan); i++) {
      arr.push({ row: rows[Math.floor(i / rowSpan)], expand: false });
    }
    setRowExpand(arr);
  }, [rowSpan]);

  //set params -> fetch data
  function navigateNext(newParams: Params) {
    const stringParams: any = {};
    for (const key in newParams) {
      if (newParams[key]) stringParams[key] = newParams[key]?.toString();
    }
    const paramString = new URLSearchParams(stringParams).toString();
    // console.log(paramString)
    // router.push(`?${paramString}`, {scroll: false})
    console.log(stringParams);
    setParams(stringParams);
  }

  const handleSort = (column: Column<any>) => {
    const sortable =
      column.columnDef.enableSorting != undefined
        ? column.columnDef.enableSorting
        : false;

    console.log(column.id + " " + sortable);
    console.log(searchParams.order);
    console.log(searchParams.sortStat);
    if (sortable) {
      if (column.id == searchParams.sortStat) {
        console.log({
          ...defaultParams,
          sortStat: searchParams.sortStat,
          order: searchParams.order == "desc" ? "asc" : "desc",
        });
        navigateNext({
          ...defaultParams,
          sortStat: searchParams.sortStat,
          order: searchParams.order == "desc" ? "asc" : "desc",
        });
      }
    }
  };
  const expandRow = (row: any, rowIndex: number) => {
    if (row?.score) {
      if (rowSpan == 1) {
        return (
          <>
            {rowExpand.length && rowExpand[rowIndex].expand ? (
              <ExpandedBuildRow
                row={rowExpand[Math.floor(rowIndex / rowSpan)].row}
                cols={columns.length}
                calc_id={calc_id}
              />
            ) : null}
          </>
        );
      } else {
        return (
          <>
            {rowExpand.length &&
            rowExpand[Math.floor(rowIndex / rowSpan)].expand &&
            rowSpan > 1 &&
            rowIndex % rowSpan == rowSpan - 1 ? (
              <ExpandedBuildRow
                row={rowExpand[Math.floor(rowIndex / rowSpan)].row}
                cols={columns.length}
                calc_id={calc_id}
              />
            ) : null}
          </>
        );
      }
    }
    if (tableName == "builds") {
      return (
        <>
          {rowExpand.length && rowExpand[rowIndex].expand ? (
            <ExpandedProfileRow row={row} cols={columns.length} />
          ) : null}
        </>
      );
    }
  };

  const sortHeader = (col: Column<any, unknown>) => {
    if (!col.columnDef.enableSorting) return null;
    if (col.id == searchParams.sortStat) {
      return <div className="text-orange-300">
        {searchParams.order == 'desc' ? <SlArrowDown /> : <SlArrowUp />}
      </div>
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {sortOptions && sortOptions!.length > 0 && rowSpan == 1 ? (
        <div className="mb-1">
          <Translate str="SortOrder" />
          {": "}
          <select
            defaultValue={params?.sortStat ? params?.sortStat : defaultSort}
            className="text-black"
            onChange={(e) =>
              navigateNext({
                ...defaultParams,
                ...{ sortStat: e.target.value, page: 1 },
              })
            }
          >
            {sortOptions?.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {`${t(option.label)}${
                    percents[option.label] ? percents[option.label] : ""
                  }`}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div className="mb-2"></div>
      )}
      <div className="border border-gray-200 w-[80%] min-w-[800px]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      onClick={(event) => handleSort(header.column)}
                      className={`pl-3 pr-1 py-2
                      ${header.column.id == searchParams.sortStat ? 'text-orange-300' : "text-gray-200"}
                      ${header.column.columnDef.enableSorting ? "cursor-pointer" : "cursor-default"}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : <div className="flex flex-row items-center gap-1">{flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {sortHeader(header.column)}</div>}

                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!isLoading && rows && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => {
                const buildrow: any = row.original;
                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className={`select-none ${
                        rowSpan == 1 ? "hover:bg-muted/50" : ""
                      }`}
                      onClick={() => {
                        if (rowSpan == 1) {
                          const index = rowIndex;
                          setRowExpand((prev) => {
                            const prevValue = prev[index];
                            const arr = [...prev];
                            var newBool = false;
                            if (prevValue.row.avatar_id == buildrow.avatar_id) {
                              newBool = !prevValue.expand;
                            } else {
                              newBool = true;
                            }
                            arr.splice(index, 1, {
                              expand: newBool,
                              row: buildrow,
                            });
                            return arr;
                          });
                        }
                      }}
                    >
                      {row.original.hasMultiRows ? (
                        <>
                          {row.getVisibleCells().map((cell, indexForCell) => {
                            if (filterCellName(cell.column.id)) {
                              if (rowIndex % rowSpan == 0) {
                                return (
                                  <TableCell
                                    key={cell.id}
                                    rowSpan={row.original.bids.length}
                                    className="px-3 py-[2px]"
                                  >
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </TableCell>
                                );
                              }
                            } else {
                              return (
                                <TableCell
                                  key={cell.id}
                                  className="px-3 py-[2px] cursor-pointer"
                                  onClick={() => {
                                    const index = Math.floor(
                                      rowIndex / rowSpan
                                    );
                                    setRowExpand((prev) => {
                                      const prevValue = prev[index];
                                      const arr = [...prev];
                                      var newBool = false;
                                      if (
                                        prevValue.row.avatar_id ==
                                        buildrow.avatar_id
                                      ) {
                                        newBool = !prevValue.expand;
                                      } else {
                                        newBool = true;
                                      }
                                      arr.splice(index, 1, {
                                        expand: newBool,
                                        row: buildrow,
                                      });
                                      return arr;
                                    });
                                  }}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              );
                            }
                          })}
                        </>
                      ) : (
                        <>
                          {row.getVisibleCells().map((cell, indexForCell) => (
                            <TableCell key={cell.id} className="px-3 py-[3px]">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </>
                      )}
                    </TableRow>
                    {expandRow(buildrow, rowIndex)}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <span>No results.</span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {pagination && (
          <Pagination
            tableSize={tableSize}
            tableSizeLoading={tableSizeLoading}
            pageSize={searchParams.size ? searchParams.size : 20}
            pageNumber={searchParams.page}
            setParams={setParams}
            nextFunction={navigateNext}
            loading={isLoading}
            defaultSort={defaultSort}
            // order = {searchParams.order}
            rows={rows}
            params={searchParams!}
          />
        )}
      </div>
    </div>
  );
}
