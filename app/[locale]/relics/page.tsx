import Navbar from "../../../components/navbar";
import { columns } from './columns';
import { RelicTable } from './relic-table';
import axios from 'axios'
import useSWR from 'swr'
import { Suspense } from 'react'
import { getAPIURL } from "@/lib/utils";
const relicFetcher = (url: string) => axios.get(url).then(res => res.data)

async function fetchRelics() {
  const res = await axios.get(getAPIURL(`/api/relics`))
  return res.data
}


export default async function Relics() {
  const data = await fetchRelics();

  // const {data, error, isLoading} = useSWR('http://localhost:3000/api/relics', relicFetcher)
    return (
      <>
        <div className="container mx-auto py-10">
          {/* {(error) && <p>Failed to load.</p>}
          {(isLoading) && <p>Loading...</p>}
          {(!isLoading && !error) && <RelicTable columns={columns} data={data} />} */}
           <RelicTable columns={columns} data={data} />
        </div>
      </>
    );
  }