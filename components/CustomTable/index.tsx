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
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { useRouter } from 'next/navigation'
import Select from 'react-select'

interface CustomTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[], 
  totalRows?: number,
  isLoading?: boolean,
  params?: Params,
  // sortOptions?: Record<string, string>
  sortOptions?: any[]
}

export type Params = {
  [key: string]: number | string | undefined;
  sortStat?: string;
  order?: number;
  value?: number;
  size?: number;
  filter?: string;
  uids?: string;
  comp?: string;
  page: number;
}

export function CustomTable<TData, TValue>({
  columns,
  data,
  totalRows,
  isLoading,
  params,
  sortOptions
}: CustomTableProps<TData, TValue>) {
  const router = useRouter()
  const temp: any[] = [{"nickname":"AkoDako","uid":600549550,"tid":51081,"set_id":108,"main_affix_id":1,"hash":"8a0d01a7d26704bfeaa36fa51348dcf6924578c8","main_stat_value":469.64736,"main_stat_name":"HPDelta","substats":{"DefenceDelta":15.241518000000001,"CriticalDamage":0.150336,"AttackAddedRatio":0.065664,"DefenceAddedRatio":0.03888},"mainStat":"HPDelta","icon":"https://enka.network/ui/hsr/SpriteOutput/ItemIcon/RelicIcons/IconRelic_108_1.png","region":"NA"}]
  const table = useReactTable({
    columns,
    data,    
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  })
  const pageSize = 10;
  const defaultParams: Params =  {
    sortStat: "Speed",
    order: -1,
    size: pageSize,
    page: 1,
  };
  const [searchParams, setParams] = useState<Params>(params ? params : defaultParams)
  const t = useTranslations();
  function navigateNext(newParams: Params) {
    const stringParams: any = {}
    for (const key in newParams) {
      stringParams[key] = newParams[key]?.toString()
    }
    const paramString = new URLSearchParams(stringParams).toString()
    // console.log(paramString)
    router.push(`/relics?${paramString}`)
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
    <div className="flex flex-col justify-center items-center">
      {(sortOptions && sortOptions!.length > 0) ? 
      <div>
      <span>Sort By:</span>
      <select className="text-black" onChange={e => navigateNext({...searchParams, ...{sortStat: e.target.value}})}>
        {sortOptions?.map(option => {
          return (<option key={option.value} value={option.value}>{option.label}</option>)
        })}
      </select>
      </div> : 
      <></>}
      {/* <Select className="text-black" value={sortOptions!.filter(function(option) {
          return option.value === selectedOption;
        })} options={sortOptions} onChange={(newValue: any) => navigateNext({...searchParams, ...{sortStat: newValue}})}/> */}
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
            {(!isLoading && table.getRowModel().rows?.length) ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3 py-1">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
          totalRows={totalRows} 
          pageSize = {10}
          pageNumber = {params?.page ? params.page : 1} 
          setParams = {setParams}
          nextFunction = {navigateNext}
          loading = {isLoading}
          // sortStat = {searchParams.sortStat}
          // order = {searchParams.order}
          rows = {data}
          params={params!}
          />
      </div>
    </div>
  )
}
