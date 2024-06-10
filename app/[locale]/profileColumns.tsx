"use client"
import { ColumnDef } from "@tanstack/react-table"
import React from 'react';
import Link from 'next/link';
import { Translate } from '@/components/Translate';
import { TranslateDate } from "@/components/TranslateDate";
import { getRegion } from "@/lib/utils";
import { GiPolarStar } from "react-icons/gi";
import Image from "next/image";

export type ProfileRow = {
  region: string//maybe do region serverside lol idk @TODO
  uid: number
  achievementCount: number
  nickname: string
  updated_at: string,
  level: number,
  signature: string,
  abyssStars: number,
}


const starColors: Record<number, string> = {//this doesnt work for moc lolz
  12: 'text-yellow-500',
  11: "text-purple-700",
  10: 'text-sky-700',
  9: 'text-green-600',
}

function levelColors(level: number): string {
  if (level == 70) return 'text-yellow-500'
  else if (level >= 65) return "text-purple-700"
  else if (level >= 60) return 'text-sky-600'
  else return 'text-green-600'
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
            className="text-base hover:text-orange-300  mr-1 "
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
        <span className={`${levelColors(row.original.level)}`}>{row.original.level}</span>
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
      return (<div className="flex flex-row items-center">
        <Image src='/Abyss.png' width={20} height={20} className="w-auto h-6 " alt="moc icon"/>
        <Image src='/PF.svg' width={18} height={18} className="w-auto h-5" alt="moc icon"/></div>)
    },
    accessorKey: "abyssStars",
    cell: ({row}) => {
      // return <span>{row.original.main_stat_value}{" " + row.original.mainStat}</span>
      return <span className="flex flex-row gap-[1px] items-center">
        {row.original.abyssStars ? (<>
          <GiPolarStar className="fill-orange-300"/>
          <span className={`${starColors[row.original.abyssStars] ? starColors[row.original.abyssStars] : 'text-gray-200'}`}>{row.original.abyssStars}</span>
          </>)
         : '?'}
        </span>
    }
  },
  {
    header: () => {
      return (<Translate str={'Refreshed'} />)
    },
    accessorKey: "updated_at",
    cell: ({row}) => {
      // return <span>{row.original.main_stat_value}{" " + row.original.mainStat}</span>
      return (<span className="whitespace-nowrap"><TranslateDate str={row.original.updated_at} relative dateProps={{}}/></span>)
    }
  },
]

