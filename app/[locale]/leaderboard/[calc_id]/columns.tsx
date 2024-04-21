"use client"

import { createColumnHelper, ColumnDef } from "@tanstack/react-table"
import { CoreStats, SetInfo } from '../../../types';
import { SetDisplay } from '../../../../components/SetDisplay/index';
import { getRegion } from '../../../../lib/utils';

export type LeaderboardRow = {
  region: string
  rank: number
  bid: number
  uid: number
  avatar_id: number,
  score: number
  crit_value: number
  stats: CoreStats
  nickname: string
  platform: string
  calc_name: string
  sets: SetInfo[]
}

const columnHelper = createColumnHelper<LeaderboardRow>()

export const columns: ColumnDef<LeaderboardRow>[] = [
  {
    accessorKey: "rank",
    header: "#",
  },
  {
    header: "Region",
    accessorKey: "region"
  },
  {
    header: "Owner",
    accessorKey: "nickname",
    cell: ({ row } ) => (
      <a href={`../profile/${row.original.uid}`}><span className="hover:text-orange-400">{row.original.nickname}</span></a>
    ),
  },
  {
    header: "Sets",
    accessorKey: "set",
    cell: ({ row} ) => (
      <SetDisplay sets={row.original.sets} />
    ),
  },
  {
    header: "Crit Value",
    accessorFn: row => (row.crit_value * 100).toFixed(1)
  },
  {
    header: "HP",
    accessorFn: row => (row.stats.maxHP).toFixed(0)
  },
  {
    header: "ATK",
    accessorFn: row => (row.stats.atk).toFixed(0)
  },
  {
    header: "DEF",
    accessorFn: row => (row.stats.def).toFixed(0)
  },
  {
    header: "SPD",
    accessorFn: row => (row.stats.spd).toFixed(0)
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({row}) => {
      return <span>{row.original.score.toFixed(0)}</span>
    }
  },

]
