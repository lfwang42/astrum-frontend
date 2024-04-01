'use client'
import { columns } from './columns';
import { RelicTable } from './relic-table';
import axios from 'axios'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { getAPIURL, getParamsFromUrl } from "@/lib/utils";
import { CustomTable, Params } from '@/components/CustomTable';
function relicFetcher(params: any) {
  const [url, query] = params;
  const r = axios.get(url, query).then(res => res.data)
  return r
}



function fetcher(params: any) {
  const [url, query] = params;
  const res = axios.get(url, query).then(res => res.data)
  // axios.get(url, query).
  //   then(res => { return res.data })
  return res
}



// function getParamsFromUrl(searchParams: ReadonlyURLSearchParams ): Params {

//   const defaultParams: Params = {sortStat: 'Speed', comp: 'gt', page: 1, order: -1, size: 20, value: -1}
//   if (searchParams.size === 0) {
//     return defaultParams
//   }
//   else {
//     const newParams: any = {}
//     const it = searchParams.entries()
//     searchParams.forEach((value, key) => {
//       const actualValue = isNaN(+value) ? value : +value;
//       if ((defaultParams as any)?.[key]?.toString() !== actualValue) {
//         newParams[key] = actualValue;
//       }
//     })
//     return {
//       ...defaultParams,
//       ...newParams
//     }
//   }
// }



export default function Relics() {
  //THE PROBLEM WITH THE FETCHING/UNDEFINED IS BASICALLY CLIENT SIDE FETCHING/THE DATA HASN"T LOADED IN YET..  JUST WAIT FOR IT TO FETCH.  
  //or find a way to get search params on server side (maybe not possible)

  const searchParams = useSearchParams()
  // const data = await fetchRelics();
  // const p = getParamsFromUrl(searchParams, 'SpeedDelta')
  const p: Params = {
    pageSize: 20,
    sortStat: 'SpeedDelta'
  }
  // console.log(p)
  const relicData = useSWR([getAPIURL('/api/relics'), {params: p}] , fetcher) 
const sortOptions =
[
  { value: 'SpeedDelta', label: 'Speed' },
  { value: 'AttackDelta', label: 'Flat Attack' },
  { value: 'DefenceDelta', label: 'Flat Defence' },
  { value: 'HPDelta', label: 'Flat HP' },
  { value: 'AttackAddedRatio', label: 'Attack%' },
  { value: 'DefenceAddedRatio', label: 'Defence%' },
  { value: 'HPAddedRatio', label: 'HP%' },
  { value: 'BreakDamageAddedRatio', label: 'Break Effect' },
  { value: 'StatusResistance', label: 'Effect Res' },
  { value: 'StatusProbability', label: 'Effect Hit Rate' },
  { value: 'SPRatio', label: 'Energy Regen' },
  { value: 'CriticalChance', label: 'Crit Chance' },
  { value: 'CriticalDamage', label: 'Crit DMG' }
]
  // const rowCount = await fetchRowCount();
  // const countData = useSWR([getAPIURL('/api/rowcount'), {params: {table: 'relics'}}] , fetcher) 
  // const {data, error, isLoading} = useSWR('http://localhost:3000/api/relics', relicFetcher)
    return (
      <>
        <div className="container mx-auto py-10">
           <CustomTable
           fetchUrl={getAPIURL('/api/relics')}
           columns={columns} 
           data={relicData.data} 
           isLoading={relicData.isLoading} 
           params={p} 
           sortOptions={sortOptions}
           defaultSort='SpeedDelta'/>
        </div>
      </>
    );
  }