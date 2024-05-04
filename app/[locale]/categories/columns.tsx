"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Element } from '../../types';
import { ElementIcon } from '../../../components/ElementIcon/index';
import Image from 'next/image';
import { EquipmentDisplay } from '../../../components/EquipmentDisplay/index';
import { Translate } from "@/components/Translate";
import { TeamDisplay } from "@/components/TeamDisplay";

export type CategoryRow = {
  avatar_id: number;
  element: Element
  count: number
  name: string
  char_name: string
  add_date: string
  char_icon: string
  team: any[]
  calculations: any[]
}

export const columns: ColumnDef<CategoryRow>[] = [
  {
    header: "#",
    cell: ({ row } ) => (<span className="flex justify-center text-center">{row.index+1}</span>)
  },
  {
    header: "Leaderboard",
    cell: ({ row } ) => (
      <div className="w-auto inline-flex items-center justify-start gap-1">
        {/* <ElementIcon element={row.original.element} />
        <div className="mr-1">
          <Image width={35} height={35} src={row.original.char_icon} alt={row.original.char_name} />
        </div> */}
        <TeamDisplay team={row.original.team} />
        <a href={`/leaderboard/${row.original.calculations[0].calc_id}`} className="gap-4 hover:text-orange-300">
          <span className="inline-block align-middle mr-2"> {row.original.name}</span>
          <span className="inline-block align-middle "><Translate str={row.original.avatar_id}/></span>
       </a>
      </div>
    )
  },
  {
    header: "Entries",
    accessorKey: "count",
    cell: ({ row } ) => (<div className="">{row.original.count}</div>)
  },
  {
    header: "Lightcones",
    cell: ({ row } ) => (
      <EquipmentDisplay cones={row.original.calculations} keyIndex={row.index}/>
    )
  },
  // {
  //   header: 'Team',
  //   cell: ({ row }) => {
  //     return (
  //       <TeamDisplay team={row.original.team} />
  //     )
  //   }
  // },
  {
    accessorKey: "add_date",
    header: "Added",
    cell: ({row}) => {
      var date = new Date(Date.parse(row.original.add_date)).toLocaleDateString("en-US", {day: "numeric", year: "numeric", month: "short"})
      return <span>{date}</span>
    }
  },

]

