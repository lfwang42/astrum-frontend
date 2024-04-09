
'use client'
import { DataTable } from "./data-table"
import axios from 'axios'
import react, { useEffect, useMemo, useState } from 'react'
import { AvatarCategory } from '../../../types';
import { ConeDisplay } from "@/components/ConeDisplay";
import { StatFormat, getAPIURL, getParamsFromUrl, getRelativeStats } from "@/lib/utils";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table"
import { CoreStats, SetInfo } from '../../../types';
import { SetDisplay } from '../../../../components/SetDisplay/index';
import { getRegion } from '../../../../lib/utils';
import { CustomTable } from "@/components/CustomTable";
import React from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { StatIcon } from "@/components/StatIcon";


export type LeaderboardRow = {
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

async function getData(calc_id: number): Promise<LeaderboardRow[]> {
  const res =  await axios.get(getAPIURL(`/api/leaderboard`), { params: {calc_id: calc_id } })
  return res.data
}

async function getCalcs(calc: number): Promise<AvatarCategory[]> {
  const res = await axios.get(getAPIURL('/api/categories'), { params: {avatar_id: calc.toString().slice(0, 4)}})
  return res.data
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
  // const [data, setData] = useState<LeaderboardRow[]>();
  // useEffect(() => {
  //   async function getData() {
  //     const res: LeaderboardRow[] = await axios.get("localhost:3000/api/leaderboard")
  //     setData(res)
  //   }
  //   getData();
  // }, [])
  const [data, setData] = useState<LeaderboardRow[]>([])
  const [calc, setCalc] = useState<AvatarCategory[]>([])
  const searchParams = useSearchParams()
  const p = getParamsFromUrl(searchParams)
  p.calc_id = params.calc_id
  const avatar_id = params?.calc_id.toString().slice(0, 4)
  // useEffect(() => {
  //   fetchData()
  // }, [avatar_id])

  // const fetchData = async () => {
  //   if (!avatar_id) return;

  //   const opts = { params: {calc_id: params.calc_id} };
  //   const response = await axios.get(getAPIURL('/api/leaderboard'), opts);
  //   const { data } = response.data;

  //   setData(data);
  // };

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
  // const data = await getData(params.calc_id)
  // const calcs = await getCalcs(params.calc_id)
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
        // {
        //   header: "HP",
        //   accessorFn: row => (row.stats.maxHP).toFixed(0)
        // },
        // {
        //   header: "ATK",
        //   accessorFn: row => (row.stats.atk).toFixed(0)
        // },
        // {
        //   header: "DEF",
        //   accessorFn: row => (row.stats.def).toFixed(0)
        // },
        // {
        //   header: "SPD",
        //   accessorFn: row => (row.stats.spd).toFixed(0)
        // },
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
      <>
        <div className="min-h-screen container mx-auto py-1">
          <div className="flex py-1">
            {
              calcs.isLoading ? <></> : 
              calcs.data.map((category: any) => {
                return (
                  <div key={category.name}>
                    <span className="my-4 text-lg">{category.name}</span>
                      <div className="flex justify-start whitespace-nowrap gap-5">
                      {category.calculations.map((calc: any) => {
                        // if (calc.calc_id === +params.calc_id) console.log('same')
                        return <div key={calc.calc_id} className={calc.calc_id === +params.calc_id ? "p-2 bg-slate-600" : "p-2"}><a href={`${calc.calc_id}`}><ConeDisplay name={calc.name} icon={calc.icon} imposition={calc.rank}/></a></div>
                      })}
                      </div>
                  </div>
                  )
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
          }/>
        </div>
      </>
    );
  }