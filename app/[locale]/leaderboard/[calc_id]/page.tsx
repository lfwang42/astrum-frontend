import Navbar from "../../../../components/navbar";
import { LeaderboardRow, columns } from './columns';
import { DataTable } from "./data-table"
import axios from 'axios'
import react, { useEffect, useState } from 'react'
import { AvatarCategory } from '../../../types';
import Image from 'next/image';
import Link from 'next/link';
import { ConeDisplay } from "@/components/ConeDisplay";
import { Span } from "next/dist/trace";
import { getAPIURL } from "@/lib/utils";

async function getData(calc_id: number): Promise<LeaderboardRow[]> {
  const res =  await axios.get(getAPIURL(`/api/leaderboard`), { params: {calc_id: calc_id } })
  return res.data
}

async function getCalcs(calc: number): Promise<AvatarCategory[]> {
  const res = await axios.get(getAPIURL('/api/categories'), { params: {avatar_id: calc.toString().slice(0, 4)}})
  return res.data
}

function getName(cats: AvatarCategory[], calc_id: number): string {
  console.log(cats)
  for (let category of cats) {
    for (let calc of category.calculations) {
      if (calc.calc_id === calc_id) {
        return category.score_name
      }
    }
  }
  return ""
}

//params: {avatar_id: 1104}
export default async function Leaderboard({ params }: { params: { calc_id: number }}) {
    // const [data, setData] = useState<LeaderboardRow[]>();
    // useEffect(() => {
    //   async function getData() {
    //     const res: LeaderboardRow[] = await axios.get("localhost:3000/api/leaderboard")
    //     setData(res)
    //   }
    //   getData();
    // }, [])
    const data = await getData(params.calc_id)
    const calcs = await getCalcs(params.calc_id)
    const name = getName(calcs, +params.calc_id)
    return (
      <>
        <div className="container mx-auto py-10">
          <div className="flex py-10">
            {
              calcs.map((category) => {
                return (
                  <div key={category.name}>
                    <span className="my-4 text-lg">{category.name}</span>
                      <div className="flex justify-start whitespace-nowrap gap-5">
                      {category.calculations.map((calc) => {
                        // if (calc.calc_id === +params.calc_id) console.log('same')
                        return <div key={calc.calc_id} className={calc.calc_id === +params.calc_id ? "p-2 bg-slate-600" : "p-2"}><a href={`${calc.calc_id}`}><ConeDisplay icon={calc.icon} imposition={calc.rank}/></a></div>
                      })}
                      </div>
                  </div>
                  )
              })
            }
          </div>
          <DataTable columns={columns} data={data} score_name={name} />
        </div>
      </>
    );
  }