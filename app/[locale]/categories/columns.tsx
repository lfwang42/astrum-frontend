"use client"

import { createColumnHelper, ColumnDef } from "@tanstack/react-table"
import { CoreStats, SetInfo, Element } from '../../types';
import { ElementIcon } from '../../../components/ElementIcon/index';
import Image from 'next/image';
import { EquipmentDisplay } from '../../../components/EquipmentDisplay/index';
import { Translate } from "@/components/Translate";

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

const columnHelper = createColumnHelper<CategoryRow>()

export const columns: ColumnDef<CategoryRow>[] = [
  {
    header: "#",
    cell: ({ row } ) => (<div>{row.index+1}</div>)
  },
  {
    header: "Leaderboard",
    cell: ({ row } ) => (
      <div className="w-auto inline-flex items-center justify-start gap-4">
        <ElementIcon element={row.original.element} />
        <div>
          <Image width={40} height={40} src={row.original.char_icon} alt={row.original.char_name} />
        </div>
        <a href={`/leaderboard/${row.original.calculations[0].calc_id}`} className="gap-5 hover:text-orange-300">
          <span className="inline-block align-middle mr-2"> {row.original.name}</span>
          <span className="inline-block align-middle "><Translate str={row.original.avatar_id}/></span>
       </a>
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
      <EquipmentDisplay cones={row.original.calculations} keyIndex={row.index}/>
    )
  },
  {
    header: 'Team',
    cell: ({ row }) => {
      return (
        <div className="flex justify-start whitespace-nowrap gap-2">
          {row.original.team ? row.original.team.map((teammate, index) => {
            if (teammate.avatar === 'any' || teammate.avatar == 'none') {
              return (<Image width="25" height="25" className="w-8 h-auto m-1" 
              src={'/avatar/anon.png'} alt={teammate.desc} 
              key={row.original.char_name + index}
              title={teammate.desc}/>)
            }
            else {
              return (<Image width="25" height="25" className="w-8 h-auto m-1" 
              src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${teammate.avatar}.png`} 
              alt={teammate.desc} 
              key={row.original.char_name + index}
              title={teammate.desc}/>)
            }
            })
            :
            <></>
          }
        </div>
      )
    }
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

