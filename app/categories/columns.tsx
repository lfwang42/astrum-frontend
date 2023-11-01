"use client"

import { createColumnHelper, ColumnDef } from "@tanstack/react-table"
import { CoreStats, SetInfo, Element } from '../types';
import { SetDisplay } from '../../components/SetDisplay/index';
import { getRegion } from '../../lib/utils';
import { ElementIcon } from '../../components/ElementIcon/index';
import Image from 'next/image';
import { EquipmentDisplay } from '../../components/EquipmentDisplay/index';

export type CategoryRow = {
  element: Element
  count: number
  name: string
  char_name: string
  add_date: string
  char_icon: string
  lightcones: any[]
}

const columnHelper = createColumnHelper<CategoryRow>()

export const columns: ColumnDef<CategoryRow>[] = [
  {
    header: "#",
    cell: ({ row } ) => (<div>{row.index+1}</div>)
  },
  {
    header: "Leaderboard",
    cell: ({ row } ) => (
      <div  className="w-full inline-flex justify-start gap-5">
        <ElementIcon element={row.original.element} />
        <Image width="25" height="25" className="w-8 h-auto m-1" src={row.original.char_icon} alt={row.original.char_name} />
        <span className="inline-block align-middle mt-2"> {row.original.name}</span>
        <span className="inline-block align-middle mt-2"> {row.original.char_name}</span>
       </div>
    )
  },
  {
    header: "Entries",
    accessorKey: "count"
  },
  {
    header: "Lightcones",
    cell: ({ row } ) => (
      <EquipmentDisplay cones={row.original.lightcones} />
    )
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

