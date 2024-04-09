"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {useTranslations} from 'next-intl';
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { useRouter } from 'next/navigation'
import { ExpandedBuildRow } from "../ExpandedBuildRow";
import axios from "axios";
import { getAPIURL } from "@/lib/utils";


interface tableParams {
  table: string,
  query?: number
}


interface CustomTableProps<TData, TValue> {
  fetchUrl: string,
  columns: ColumnDef<TData, TValue>[],
  params?: Params,
    // sortOptions?: Record<string, string>
  tableParams: tableParams,
  sortOptions?: any[]
  defaultSort: string
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
}

export function CustomTable<TData, TValue>({
  fetchUrl,
  columns,
  tableParams,
  // totalRows,
  // isLoading,
  params,
  sortOptions,
  defaultSort
}: CustomTableProps<TData, TValue>) {
  const [rows, setRows] = useState<TData[]>([])
  const [isLoading, setLoading] = useState<boolean>(true)
  const [tableSizeLoading, setTableSizeLoading] = useState<boolean>(true)
  const [tableSize, setTableSize] = useState<number>(0)
  const router = useRouter()  


  const fetchTableSize = async () => {
    setTableSizeLoading(true)
    const res = await axios.get(getAPIURL('/api/tablesize'), {params: tableParams})
    setTableSize(res.data)
    // console.log(tableSize)
    setTableSizeLoading(false)
    // console.log(tableSizeLoading)
  };

  useEffect(() => {
    fetchTableSize()
  }, [])


  
  const table = useReactTable({
    columns,
    data: rows,    
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  })
  const pageSize = 20;
  const defaultParams: Params =  {
    sortStat: defaultSort,
    order: 'desc',
    size: pageSize,
    page: 1,
  };
  if (params && params.calc_id) {
    defaultParams.calc_id = params.calc_id
  }
  const [searchParams, setParams] = useState<Params>(defaultParams)
  useEffect(() => {
    setLoading(true)
    const res = axios.get(fetchUrl, {params: searchParams}) // Use the correct URL, it can be an API Route URL, an external URL...
    .then((res) => res.data)
    .then((data) => setRows(data))
    .then(() => setLoading(false))
    .catch((error) => {
        console.log(error);
      });
  }, [JSON.stringify(searchParams), fetchUrl])
  
  const t = useTranslations();
  function navigateNext(newParams: Params) {
    const stringParams: any = {}
    for (const key in newParams) {
      if (newParams[key]) stringParams[key] = newParams[key]?.toString()

    }
    const paramString = new URLSearchParams(stringParams).toString()
    // console.log(paramString)
    // router.push(`?${paramString}`, {scroll: false})
    setParams(stringParams)
  }
  // useEffect(() => {
  //   const stringParams: any = {}
  //   for (const key in searchParams) {
  //     stringParams[key] = searchParams[key]?.toString()
  //   }
  //   const paramString = new URLSearchParams(stringParams).toString()
  //   console.log(paramString)
  //   router.push(`/relics/${paramString}`)
  // }, [JSON.stringify(searchParams)])
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {(sortOptions && sortOptions!.length > 0) ? 
      <div>
      <span>Sort By:</span>
      <select defaultValue={params?.sortStat ? params?.sortStat : defaultSort} className="text-black" onChange={e => navigateNext({...defaultParams, ...{sortStat: e.target.value, page: 1}})}>
        {sortOptions?.map(option => {
          return (<option key={option.value} value={option.value}>{option.label}</option>)
        })}
      </select>
      </div> : 
      <></>}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {(!isLoading && rows && table.getRowModel().rows?.length) ? (
              table.getRowModel().rows.map((row) => {
                const buildrow: any = row.original
                // console.log(buildrow.bid)
                // console.log(row)
                // const fetchRelics = async () => {
                //   const relics = await axios.get(getAPIURL(`/api/relics`),  { params: {bid: buildrow.bid}})
                //   console.log(relics)
                // }
                // fetchRelics()
                // console.log(row.id)
                return (
                <React.Fragment key={row.id}>
                  <TableRow
                    
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      const r: any = row.original
                        if (r.score)                        row.toggleExpanded()

                    }
                  } 
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-3 py-1">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                   {row.getIsExpanded() && 
                    <ExpandedBuildRow row={buildrow} cols={columns.length}/>
                   }
                </React.Fragment>
              )})
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination 
          tableSize={tableSize} 
          tableSizeLoading={tableSizeLoading}
          pageSize = {searchParams.size ? searchParams.size : 20}
          pageNumber = {searchParams.page} 
          setParams = {setParams}
          nextFunction = {navigateNext}
          loading = {isLoading}
          defaultSort = {defaultSort}
          // order = {searchParams.order}
          rows = {rows}
          params={searchParams!}
          />
      </div>
    </div>
  )
}
