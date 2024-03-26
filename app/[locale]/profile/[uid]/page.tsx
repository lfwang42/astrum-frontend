'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import avatars from '../../../../honker_avatars.json'
import axios from 'axios'
import { columns } from './columns'
import { CustomTable } from '../../../../components/CustomTable/index';
import { getAPIURL, getRegion } from '../../../../lib/utils';
import useSWR from 'swr'
export default function Profile({ params }: { params: { uid: number }}) {

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
    let icon = ""
    var user = ""
    var level = 0;
    let data: any = null;
    const p = {}

    const userData = useSWR([getAPIURL(`/api/users/${params.uid}`), {}] , fetcher, {
      onErrorRetry: (error) => {
        return
      }
    })

    const profileData = useSWR([getAPIURL(`/api/builds/${params.uid}`), {}] , fetcher, {
      onErrorRetry: (error) => {
        return
      }
    })
    const sortOptions = [
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

  return (
      <div className="min-h-screen container mx-auto py-10">
        <div style={{backgroundImage: `url('/Palace.png')`}} className="min-h-18 w-50 p-1 border-solid rounded-sm gap-2 m-2 bg-origin-border bg-fixed">
          <div className='flex justify-left gap-2 border-solid border-2 border-black w-1/4'>
            {!userData.isLoading ? 
            <>
              <Image src={`https://enka.network/ui/hsr/${avatars[(userData.data.headicon as keyof typeof avatars)].Icon}`} height={60} width={60} alt="yo"/>
              <span className="text-lg  text-shadow-sm shadow-black-2000">{userData.data.nickname}</span>
              <div className="flex justify-end p-1 gap-4 w-full font-sans font-bold text-lg" >

                <span>{getRegion(params.uid)}</span>
                <span>{`TL${level}`}</span>
              </div>
            </> : 
            <div className="h-10">
            </div>}
            
          </div>
          
        </div>
        <CustomTable 
        fetchUrl={getAPIURL(`/api/builds/${params.uid}`)}
        columns={columns} 
        defaultSort={'spd'} 
        data={profileData.data} 
        isLoading={profileData.isLoading} 
        sortOptions={sortOptions}
        params={p}
        />
      </div>
  )
}
