
'use client'
import axios from 'axios'
import { useMemo, useState } from 'react'
import { AvatarCategory } from '../../../types';
import { ConeDisplay } from "@/components/ConeDisplay";
import { StatFormat, getAPIURL, getParamsFromUrl, getRelativeStats } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { CoreStats, SetInfo } from '../../../types';
import { SetDisplay } from '../../../../components/SetDisplay/index';
import { CustomTable } from "@/components/CustomTable";
import React from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { StatIcon } from "@/components/StatIcon";
import Image from "next/image";
import { Translate } from "@/components/Translate";
import { TeamDisplay } from '@/components/TeamDisplay';
import avatar from '../../../assets/icon/AvatarIconGray.png'

interface LeaderboardCone {
  calc: string,
  calc_id: number,

  // lightcone: WeaponInfo
  name: string,
  promotion: number, 
  rank: number, 
  level: number,
  icon: string
  tid: number
}



export type LeaderboardRow = {
  avatar_id: number
  region: string
  rank: number
  bid: number
  uid: number
  score: number
  crit_value: number
  stats: CoreStats
  nickname: string
  platform: string
  calc_name: string
  sets: SetInfo[]
}

function getName(cats: AvatarCategory[], calc_id: number): string {
  // console.log(cats)
  for (let category of cats) {
    for (let calc of category.calculations) {
      if (calc.calc_id === +calc_id) {
        return category.score_name
      }
    }
  }
  return ""
}

function fetcher(params: any) {
  const [url, query] = params;
  const res = axios.get(url, query).then(res => res.data)
  res.catch((error) => {
    console.log(error)
    throw(error)
  })
  // axios.get(url, query).
  //   then(res => { return res.data })
  return res
}

export default function Leaderboard({ params }: { params: { calc_id: number }}) {
  const [data, setData] = useState<LeaderboardRow[]>([])
  const [calc, setCalc] = useState<AvatarCategory[]>([])
  const searchParams = useSearchParams()
  const p = getParamsFromUrl(searchParams)
  p.calc_id = params.calc_id
  const avatar_id = params?.calc_id.toString().slice(0, -2)
  console.log('here')
  const fetchCalc = async () => {
    if (!avatar_id) return;

    const opts = { params: { avatar_id: avatar_id } };
    const response = await axios.get(getAPIURL('/api/categories'), opts);
    const { data } = response.data;

    setData(data);
  };
  const leaderboardData = useSWR([getAPIURL('/api/leaderboard'), {params: {...p, calc_id: params.calc_id}}] , fetcher, {
    onErrorRetry: (error) => {
      return
    }
  })
  
  const calcs = useSWR([getAPIURL('/api/categories'), {params: {avatar_id: avatar_id}}] , fetcher, {
    onErrorRetry: (error) => {
      return
    }
  }) 
  const sortOptions = [
    { value: 'score', label: 'Score'},
    { value: 'spd', label: 'Speed' },
    { value: 'atk', label: 'Attack' },
    { value: 'def', label: 'Defence' },
    { value: 'maxHP', label: 'HP' },
    { value: 'breakEffect', label: 'Break Effect' },
    { value: 'StatusResistance', label: 'Effect Res' },
    { value: 'effectHitRate', label: 'Effect Hit Rate' },
    { value: 'energyRecharge', label: 'Energy Regen Rate' },
    { value: 'critRate', label: 'Crit Chance' },
    { value: 'critDmg', label: 'Crit DMG' }
  ]
  const columns = useMemo<ColumnDef<LeaderboardRow>[]>(() => [
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
            <a href={`../profile/${row.original.uid}`}><span onClick={(e)=> {e.stopPropagation()}} className="hover:text-orange-300">{row.original.nickname}</span></a>
          ),
        },
        {
          header: () => (
            <Image alt={'character'} className="" src={avatar} width={22} height={22} />
          ),
          accessorKey: "avatar_id",
          cell: ({ row } ) => (
            <Image alt={/*t*/(row.original.avatar_id?.toString())} src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${row.original.avatar_id}.png`} width={25} height={25} />
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
          cell: ({ row } ) => (
            <span>{(row.original.crit_value * 100).toFixed(1)}<span className="text-sm text-gray-400">{` (${(row.original.stats.critRate * 100).toFixed(1)}:${(row.original.stats.critDmg * 100).toFixed(1)})`}</span></span>
          ),
        },
        ...[0, 1, 2, 3, 4].map((i) => ({
          header: "-",
          id: `${i}`,
          cell: ({ row}: any ) => {
            const ordered = getRelativeStats(row?.original, !calcs.isLoading? calcs.data[0].element : "")
            // console.log(ordered)
            const key = ordered?.[i]
            if (key) return  (
            <div className="flex justify-start w-300 whitespace-nowrap gap-3 text-sm">
                <StatIcon stat={key}/>
                <span className="mt-2">{StatFormat[key](row.original.stats[key])}</span>
            </div>
            )
            else {
              return (<>-</>) 
            }
          }
        })),
        {
          accessorKey: "score",
          header: calcs.isLoading ? '??' : getName(calcs.data!, params.calc_id),
          cell: ({row}) => {
            return <span>{row.original.score?.toFixed(0)}</span>
          }
        },
      
      ], 
        [
          calcs,
          calcs.isLoading
        ]
  )

    return (
      <div className="min-h-screen container justify-center mx-auto py-1">
          <div className="mx-auto flex justify-between w-2/3" >
            <div className="flex mt-2">
              {
                calcs.isLoading ? <></> : 
                calcs.data.map((category: any) => {
                  return (
                    <div key={category.name} className="mt-1 mr-10">
                      <span className=" text-lg font-medium">{category.name}</span>
                        <div className="flex justify-start mt-1 whitespace-nowrap gap-2">
                        {category.calculations.map((calc: any) => {
                          // if (calc.calc_id === +params.calc_id) console.log('same')
                          return <div key={calc.calc_id} className={`p-2 hover:bg-slate-600 ${calc.calc_id === +params.calc_id ? "bg-slate-600" : ""}`}><a href={`${calc.calc_id}`}><ConeDisplay name={calc.name} icon={calc.icon} imposition={calc.rank}/></a></div>
                        })}
                        </div>
                    </div>
                    )
                })
              }
            </div>
            {
                calcs.isLoading ? <></> : 
                calcs.data.map((category: AvatarCategory) => {
                  for (let calc of category.calculations) {
                    if (calc.calc_id == params.calc_id) {
                      return (
                        <div className="flex justify-start items-center whitespace-nowrap gap-2">
                          <span><Translate str={'Team'} />: </span>
                          <TeamDisplay team={category.team!} short={false} />       
                        </div>
                      )
                    }
                  }               
               })
            }
            </div>
          <CustomTable
          fetchUrl={getAPIURL('/api/leaderboard')}
          columns={columns} 
          params={p}
          defaultSort="score"
          sortOptions={sortOptions}
          tableParams={
            {
              table: 'leaderboard',
              query: params.calc_id
            }
          }
          calc_id={params.calc_id}
          pagination
          />
        </div>
    );
  }