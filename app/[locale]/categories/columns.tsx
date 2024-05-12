"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AvatarCategory, Element, LeaderboardCone, Teammate } from '../../types';
import { EquipmentDisplay } from '../../../components/EquipmentDisplay/index';
import { Translate } from "@/components/Translate";
import { TeamDisplay } from "@/components/TeamDisplay";


export const columns: ColumnDef<AvatarCategory>[] = [
  {
    header: "#",
    cell: ({ row } ) => (<span className="flex justify-center text-center">{row.index+1}</span>)
  },
  {
    header: "Leaderboard",
    cell: ({ row } ) => (
      <div className="w-auto inline-flex items-center justify-start gap-1">
        <TeamDisplay team={row.original.team} short={true} />
        <a href={`/leaderboard/${row.original.default_calc_id}`} className="gap-4 hover:text-orange-300">
          <span className="inline-block align-middle mr-2"> {row.original.name}</span>
          <span className="inline-block align-middle "><Translate str={row.original.avatar_id}/></span>
       </a>
      </div>
    )
  },
  {
    header: "Lightcones",
    cell: ({ row } ) => (
      <EquipmentDisplay cones={row.original.calculations} keyIndex={row.index}/>
    )
  },
  {
    header: 'Team',
    cell: ({ row }) => {
      return (
        <TeamDisplay team={row.original.team} short={false}/>
      )
    }
  },
  {
    header: "Entries",
    accessorKey: "count",
    cell: ({ row } ) => (<div className="">{row.original.count}</div>)
  },
  {
    accessorKey: "add_date",
    header: "Added",
    cell: ({row}) => {
      var date = new Date(Date.parse(row.original.add_date)).toLocaleDateString("en-US", {day: "numeric", year: "numeric", month: "short"})
      return <span>{date}</span>
    }
  },
]

