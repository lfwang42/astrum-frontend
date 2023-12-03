"use client"
import {useTranslations} from 'next-intl';
import { ColumnDef } from "@tanstack/react-table"
import { StatDisplay } from '../../../components/StatDisplay';
import { RelicDisplay } from '../../../components/RelicDisplay';
import { StatIcon } from '../../../components/StatIcon';
import { StatFormat } from '../../../lib/utils';
export type RelicRow = {
  region: string//maybe do region serverside lol idk @TODO
  rank: number
  crit_value: number
  substats: object
  nickname: string
  mainStat: string
  main_stat_value: number
  main_stat_name: string
  icon: string
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
  {
    header: "Region",
    accessorKey: "region"
  },
  {
    header: "Owner",
    accessorKey: "nickname"
  },
  {
    header: "Relic",
    cell: ({ row } ) => {
      return (
        <RelicDisplay icon={row.original.icon} tid={row.original.tid} />
    )}
  },
  {
    header: "Main Stat",
    cell: ({row}) => {
      // return <span>{row.original.main_stat_value}{" " + row.original.mainStat}</span>
      return <span><StatDisplay type={row.original.main_stat_name} value={row.original.main_stat_value} /></span>
    }
  },
  ...[0, 1, 2, 3].map((i) => ({
    //like is this inefficient? yeah.  should i do it on server side? probably.  
    //if this ever lags too much just switch it to server side (but its probably fine tbh)
    header: "-",
    cell: ({row}: any) => {
      // return <span>{row.original.main_stat_value}{" " + row.original.mainStat}</span>
      const ordered = orderSubstats(row?.original?.substats)
      const key = ordered?.[i]
      if (key) return  (
      <div className="flex justify-start w-300 whitespace-nowrap gap-3 text-sm">
          <StatIcon stat={key}/>
          <span className="mt-2">{StatFormat[key](row.original.substats[key])}</span>
      </div>
      )
      else {
        return (<>-</>) 
      }
    }
  })),
]

