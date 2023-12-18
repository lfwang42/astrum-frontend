'use client'
import { columns } from './columns';
import { RelicTable } from './relic-table';
import axios from 'axios'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { getAPIURL } from "@/lib/utils";
import { CustomTable, Params } from '@/components/CustomTable';
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
  const res = axios.get(url, query).then(res => res.data)
  // axios.get(url, query).
  //   then(res => { return res.data })
  return res
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

function getParamsFromUrl(): Params {
  const searchParams = useSearchParams()
  const defaultParams: Params = {sortStat: 'Speed', comp: 'gt', page: 1, order: -1, size: 20, value: -1}
  if (searchParams.size === 0) {
    return defaultParams
  }
  else {
    const newParams: any = {}
    const it = searchParams.entries()
    searchParams.forEach((value, key) => {
      const actualValue = isNaN(+value) ? value : +value;
      if ((defaultParams as any)?.[key]?.toString() !== actualValue) {
        newParams[key] = actualValue;
      }
    })
    return {
      ...defaultParams,
      ...newParams
    }
  }
}



export default function Relics() {
  //THE PROBLEM WITH THE FETCHING/UNDEFINED IS BASICALLY CLIENT SIDE FETCHING/THE DATA HASN"T LOADED IN YET..  JUST WAIT FOR IT TO FETCH.  
  //or find a way to get search params on server side (maybe not possible)


  // const data = await fetchRelics();
  const p = getParamsFromUrl()
  // console.log(p)
  const relicData = useSWR([getAPIURL('/api/relics'), {params: p}] , fetcher) 
//   const sortOptions: Record<string, string> = {
//     "Speed": "Speed",
//     "Flat ATK": "FlatAttack",
//     "Flat DEF": 'FlatDefence',
//     'Flat HP': 'FlatHP',
//     'ATK%': 'Attack',
//     'DEF%': 'Defence',
//     'HP%': 'HP',
//     'Break Effect': 'BreakEffect',
//     'Status Res': 'StatusRes',
//     'Effect Hit Rate': 'EffectHitRate',
//     'Energy Regen': 'EnergyRegen',
//     'Crit Chance': 'CriticalChance',
//     'Crit DMG': 'CriticalDamage'
// }
const sortOptions = [
  { value: 'Speed', label: 'Speed' },
  { value: 'FlatAttack', label: 'Flat ATK' },
  { value: 'FlatDefence', label: 'Flat DEF' },
  { value: 'FlatHP', label: 'Flat HP' },
  { value: 'Attack', label: 'ATK%' },
  { value: 'Defence', label: 'DEF%' },
  { value: 'HP', label: 'HP%' },
  { value: 'BreakEffect', label: 'Break Effect' },
  { value: 'StatusRes', label: 'Status Res' },
  { value: 'EffectHitRate', label: 'Effect Hit Rate' },
  { value: 'EnergyRegen', label: 'Energy Regen' },
  { value: 'CriticalChance', label: 'Crit Chance' },
  { value: 'CriticalDamage', label: 'Crit DMG' }
]
  // const rowCount = await fetchRowCount();
  // const countData = useSWR([getAPIURL('/api/rowcount'), {params: {table: 'relics'}}] , fetcher) 
  // const {data, error, isLoading} = useSWR('http://localhost:3000/api/relics', relicFetcher)
    return (
      <>
        <div className="container mx-auto py-10">
          {/* {(error) && <p>Failed to load.</p>}
          {(isLoading) && <p>Loading...</p>}
          {(!isLoading && !error) && <RelicTable columns={columns} data={data} />} */}
           <CustomTable columns={columns} data={relicData.data} isLoading={relicData.isLoading} params={p} sortOptions={sortOptions}/>
        </div>
      </>
    );
  }