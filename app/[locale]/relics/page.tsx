'use client'
import { columns } from './columns';
import { RelicTable } from './relic-table';
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { getAPIURL } from "@/lib/utils";
function relicFetcher(params: any) {
  const [url, query] = params;
  const r = axios.get(url, query).then(res => res.data)
  return r
}

async function fetchRelics() {
  const { data, error, isLoading } = useSWR([getAPIURL('/api/relics'), {params: {stat: 'Speed', sort: -1, amount: 20}}] , relicFetcher) 
  // const res = await axios.get(getAPIURL(`/api/relics`), {params: {stat: 'Speed', sort: -1, amount: 20}})
  return data
  //return res.data
}

function fetcher(params: any) {
  const [url, query] = params;
  const r = axios.get(url, query).then(res => res.data)
  return r
}

function countFetcher(params: any) {
  const [url, query] = params;
  const r = axios.get(url, query).then(res => res.data)
  return r
}
async function fetchRowCount() {
  // const res = await axios.get(getAPIURL(`/api/rowcount`), {params: {table: 'relics'}})
  // return res.data
  const { data, error, isLoading } = useSWR([getAPIURL('/api/relics'), {params: {stat: 'Speed', sort: -1, amount: 20}}] , fetcher) 
}

function getParamsFromUrl() {

}


export default function Relics() {
  // const data = await fetchRelics();
  const searchParams = useSearchParams();
  console.log(searchParams)
  const relicData = useSWR([getAPIURL('/api/relics'), {params: {stat: 'Speed', sort: -1, amount: 20}}] , fetcher) 
  // const rowCount = await fetchRowCount();
  const countData = useSWR([getAPIURL('/api/rowcount'), {params: {table: 'relics'}}] , fetcher) 
  // const {data, error, isLoading} = useSWR('http://localhost:3000/api/relics', relicFetcher)
    return (
      <>
        <div className="container mx-auto py-10">
          {/* {(error) && <p>Failed to load.</p>}
          {(isLoading) && <p>Loading...</p>}
          {(!isLoading && !error) && <RelicTable columns={columns} data={data} />} */}
           <RelicTable columns={columns} data={relicData.data} pageCount={Math.ceil(countData.data/10)}/>
        </div>
      </>
    );
  }