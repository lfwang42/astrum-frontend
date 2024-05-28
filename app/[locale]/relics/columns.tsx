"use client"
import {NumberFormatOptions, useTranslations} from 'next-intl';
import { ColumnDef } from "@tanstack/react-table"
import { StatDisplay } from '../../../components/StatDisplay';
import { RelicDisplay } from '../../../components/RelicDisplay';
import { StatIcon } from '../../../components/StatIcon';
import { StatFormat } from '../../../lib/utils';
import React from 'react';
import Link from 'next/link';
import { Translate } from '@/components/Translate';
export type RelicRow = {
  region: string//maybe do region serverside lol idk @TODO
  uid: number
  rank: number
  crit_value: number
  stats: object
  nickname: string
  mainStat: string
  main_stat_value: number
  main_stat_name: string
  hash: string
  set_id: number
  type: number
  tid: number //can localize locally later
}

const substatOrder = ["CriticalChance",
"CriticalDamage",
"SpeedDelta",
"AttackAddedRatio",
"BreakDamageAddedRatio",
"HPAddedRatio",
"DefenceAddedRatio",
"StatusProbability",
"StatusResistance",
"HPDelta",
"AttackDelta",
"DefenceDelta",]

function orderSubstats(substats: any) {
  if (substats) {
    const reordered: any[] = [];
    const arr = [...substatOrder]; 
    arr.forEach((key) => {
      if (!substats[key]) return;
      reordered.push(key);
    });
  
    return reordered;
  }  
  return []
} 

interface Props {
  row: RelicRow;
}

export const columns: ColumnDef<RelicRow>[] = [
  {
    header: "#",
    cell: ({ row } ) => (<div>{row.index+1}</div>)
  },
  // {
  //   header: "Region",
  //   accessorKey: "region"
  // },
  {
    header: () => {
      return (<Translate str={'Trailblazer'} />)
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
        <span className="text-sm text-gray-500">{row.original.region}</span>
      </React.Fragment>
    ),
  },
  {
    header: () => {
      return (<Translate str={'Relics'} />)
    },
    accessorKey: "Relic",
    cell: ({ row } ) => {
      return (
        <RelicDisplay set_id={row.original.set_id} tid={row.original.tid} />
    )}
  },
  {
    header: () => {
      return (<Translate str={'Main Stat'} />)
    },
    accessorKey: "Main Stat",
    cell: ({row}) => {
      // return <span>{row.original.main_stat_value}{" " + row.original.mainStat}</span>
      return <span><StatDisplay type={row.original.main_stat_name} value={row.original.main_stat_value} /></span>
    }
  },
  ...[0, 1, 2, 3].map((i) => ({
    //like is this inefficient? yeah.  should i do it on server side? probably.  
    //if this ever lags too much just switch it to server side (but its probably fine tbh)
    header: "-",
    id: `${i}`,
    cell: ({row}: any) => {
      // return <span>{row.original.main_stat_value}{" " + row.original.mainStat}</span>
      const ordered = orderSubstats(row?.original?.stats)
      const key = ordered?.[i]
      if (key) return  (
      <div key={`${row.index}` + `${i}`} className="flex justify-start w-300 whitespace-nowrap gap-3 text-sm">
          <StatIcon stat={key}/>
          <span className="mt-2">{StatFormat[key](row.original.stats[key])}</span>
      </div>
      )
      else {
        return (<div key={`${row.index}` + `${i}`} >-</div>) 
      }
    }
  })),
]

