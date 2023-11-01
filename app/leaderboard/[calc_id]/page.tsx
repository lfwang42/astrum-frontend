import Navbar from "../../../components/navbar";
import { LeaderboardRow, columns } from './columns';
import { DataTable } from "./data-table"
import axios from 'axios'
import react, { useEffect, useState } from 'react'

async function getData(): Promise<LeaderboardRow[]> {
  const res =  await axios.get("http://localhost:3000/api/leaderboard")
  return res.data
}

async function getName(calc: number): Promise<string> {
  const cat = await axios.get("http://localhost:3000/api/categories", { params: {avatar_id: calc.toString().slice(0, 4)}})
  return cat.data.score_name
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
    const data = await getData()
    const name = await getName(params.calc_id)
    console.log(data[0].sets)
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} score_name={name} />
        </div>
      </>
    );
  }