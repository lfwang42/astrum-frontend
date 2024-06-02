"use client"
import { ColumnDef } from "@tanstack/react-table"
import React from 'react';
import Link from 'next/link';
import { Translate } from '@/components/Translate';
import { TranslateDate } from "@/components/TranslateDate";
import { getRegion } from "@/lib/utils";

export type ProfileRow = {
  region: string//maybe do region serverside lol idk @TODO
  uid: number
  achievementCount: number
  nickname: string
  updated_at: string,
  level: number,
  signature: string,
}

export const columns: ColumnDef<ProfileRow>[] = [
  {
    header: "#",
    cell: ({ row } ) => (<div>{row.index+1}</div>)
  },
  {
    header: () => {
      return (<Translate str={'Name'} />)
    },
    accessorKey: "nickname",
    cell: ({ row }) => (
      <React.Fragment>
        <Link href={`../profile/${row.original.uid}`}>
          <span
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-base hover:text-orange-300 mr-1 "
          >
            {row.original.nickname}
          </span>

        </Link>
        <span className="text-sm text-gray-500">{getRegion(row.original.uid)}</span>
      </React.Fragment>
    ),
  },
  {
    header: () => {
      return (<Translate str={'Bio'} />)
    },
    accessorKey: "signature",
    cell: ({ row } ) => {
      return (
        <span className="w-32 min-w-32 whitespace-nowrap">{row.original.signature}</span>
    )}
  },
  {
    header: () => {
      return (<span className="whitespace-nowrap"><Translate str={'TLevel'} /></span>)
    },
    accessorKey: "level",
    cell: ({ row } ) => {
      return (
        <span className="">{row.original.level}</span>
    )}
  },
  {
    header: () => {
      return (<Translate str={'Achievements'} />)
    },
    accessorKey: "achievementCount",
    cell: ({row}) => {
      // return <span>{row.original.main_stat_value}{" " + row.original.mainStat}</span>
      return <span>{row.original.achievementCount}</span>
    }
  },
  {
    header: () => {
      return (<Translate str={'Refreshed'} />)
    },
    accessorKey: "updated_at",
    cell: ({row}) => {
      // return <span>{row.original.main_stat_value}{" " + row.original.mainStat}</span>
      return (<span className="whitespace-nowrap"><TranslateDate str={row.original.updated_at} relative/></span>)
    }
  },
]

