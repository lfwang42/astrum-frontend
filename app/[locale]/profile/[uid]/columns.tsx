"use client"

import { createColumnHelper, ColumnDef } from "@tanstack/react-table"
import { AvatarInfo, CoreStats, SetInfo } from '../../../types';
import { SetDisplay } from '../../../../components/SetDisplay/index';
import { EquipmentDisplay } from '../../../../components/EquipmentDisplay/index';
import {useTranslations} from 'next-intl';
import Image from 'next/image'
import { getRelativeStats } from '../../../../lib/utils';
import { StatIcon } from '../../../../components/StatIcon/index';
import { StatFormat } from '../../../../lib/utils';
import { Translate } from "@/components/Translate";
import { ConeDisplay } from "@/components/ConeDisplay";
import { SkillLevels } from "@/components/ExpandedBuildRow";

export type BuildRow = {
  avatar_id: number;
  eidolon: number
  promotion: number
  type: String
  level: number
  rank: number
  crit_value: number
  stats: CoreStats
  nickname: string
  lightcone: any[]
  sets: SetInfo[]
  cone_tid: number
  cone_rank: number,
  cone_promotion?: number;
  avatar: AvatarInfo
  skill_levels: SkillLevels;
}

const columnHelper = createColumnHelper<BuildRow>()

export const columns: ColumnDef<BuildRow>[] = [
  {
    header: "#",
    cell: ({ row } ) => (<div>{row.index+1}</div>)
  },
  {
    header: () => {
      return (<Translate str={'Characters'} />)
    },
    accessorKey: "Name",
    cell: ({ row } ) => { 
      return (<div className="inline-flex gap-2 p-0">
      <div className="table-icon">
        <Image alt={/*t*/(row.original.avatar_id.toString())} src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${row.original.avatar_id}.png`} fill={true} />
      </div>
      {/* <span className="mt-1">{t(row.original.avatar_id.toString())}</span> */}
      <Translate str={row.original.avatar_id.toString()} />
      </div>)
    }
  },
  {
    header: () => {
      return (<Translate str={'Eidolon'} />)
    },
    accessorKey: "eidolon",
  },
  {
    header: () => {
      return (<Translate str={'Lightcone'} />)
    },
    accessorKey: "Lightcone",
    cell: ({ row } ) => row.original.cone_tid? <ConeDisplay name={"lightcone"} imposition={row.original.cone_rank} icon={`/icon/${row.original.cone_tid}.png`} />
      : <></>
  },
  {
    header: () => {
      return (<Translate str={'Relics'} />)
    },
    accessorKey: "Sets",
    cell: ({ row } ) => <SetDisplay sets={row.original.sets}/>
  },
  ...[0, 1, 2, 3, 4].map((i) => ({
    header: "-",
    id: `${i}`,
    cell: ({ row}: any ) => {
      const ordered = getRelativeStats(row?.original, row?.original.type, true)
      // console.log(ordered)
      const key = ordered?.[i]
      console.log(key)
      if (key) return  (
      <div key={`${row.index}` + `${i}`} className="flex justify-start w-300 whitespace-nowrap gap-3 text-sm">
          <StatIcon stat={key}/>
          <span className="mt-2">{StatFormat[key](row.original.stats[key])}</span>
      </div>
      )
      else {
        return (<div key={`${row.index}` + `${i}`}>-</div>) 
      }
    }
  })),
]
