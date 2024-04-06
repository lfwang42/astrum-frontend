'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import avatars from '../../../../honker_avatars.json'
import axios from 'axios'
import { columns } from './columns'
import { CustomTable } from '../../../../components/CustomTable/index';
import { getAPIURL, getRegion } from '../../../../lib/utils';
import useSWR from 'swr'
import { Timer } from '@/components/Timer'
import { IoMdRefresh } from "react-icons/io";
import { UpdatedDate } from '@/components/UpdatedDate'
import { useRouter } from 'next/navigation'

export default function Profile({ params }: { params: { uid: number }}) {
  const [refreshTime, setRefreshTime] = useState<number>();
  const [enableRefresh, setEnableRefresh] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()
  const fetchProfile = async (uid: string) => {
    const res = await axios.get(getAPIURL(`/api/users/${params.uid}`))
    setUserData(res.data)
    var date = new Date(Date.parse(res.data.updated_at)).getTime()
    console.log(date)
  }

  useEffect(() => {
    fetchProfile(params.uid.toString())
  }, []) 

  useEffect(() => {
    if (!userData) return
    const now = new Date().getTime();
    const cooldown = now + (userData.ttl);
    setRefreshTime(cooldown)
    if (userData.ttl === 0) {
      setEnableRefresh(true)
    }
  }, [params.uid, userData])
  
  function fetcher(params: any) {
    const [url, query] = params;
    const res = axios.get(url, query).then(res => {
      return res.data
    })
    res.catch((error) => {
      console.log(error)
      throw(error)
    })
    return res
  }

  function profileFetcher(params: any) {
    const [url, query] = params;
    const res = axios.get(url, query).then(res => {
      if (res.data.ttl !== undefined) {
        console.log(res.data.ttl)
        setRefreshTime(res.data.ttl)
      }
      console.log('ttl: ' + refreshTime)
      return res.data
    })
    res.catch((error) => {
      console.log(error)
      throw(error)
    })
    return res
  }

  const enableRefreshButton = () => {
    setEnableRefresh(true);
  };
  const disableRefreshButton = () => {
    setEnableRefresh(false);
  };

  const refreshData = async () => {
    if (!params.uid) return;
    setEnableRefresh(false);
    const res = await axios.get(getAPIURL(`/api/users/${params.uid}/refresh`));
    const now = new Date().getTime();
    const cooldown = now + (res.data.ttl);
    setRefreshTime(cooldown);
    router.refresh()
  };

  const getTimestamp = () => {
    if (!refreshTime) return 0;
    const now = new Date().getTime();
    const then = refreshTime - now;
    return then;
  };

  const p = {}

  // const userData = useSWR([getAPIURL(`/api/users/${params.uid}`), {}] , profileFetcher, {
  //   onErrorRetry: (error) => {
  //     return
  //   }
  // })

  const refreshButton = (
    <div className='flex justify-start items-center'>
      <div
        title="Refresh builds"
        className={`p-1 cursor-pointer ${enableRefresh ? 'hover:text-orange-400' : 'pointer-events-none'}`}
        onClick={refreshData}
      >
        <IoMdRefresh />
      </div>
      {refreshTime && getTimestamp() > 0 ? (
        <Timer
          until={refreshTime}
          label={"Refresh Cooldown: "}
          onFinish={enableRefreshButton}
        />
      ) : (
        <UpdatedDate lastUpdate={userData ? userData.updated_at : ""}/>
      )}
       
    </div>
  );

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
        
        {refreshButton}
        <div style={{backgroundImage: `url('/Palace.png')`}} className="min-h-18 w-50 p-1 border-solid rounded-sm gap-2 m-2 bg-origin-border bg-fixed">
          <div className='flex justify-left gap-2 border-solid border-2 border-black w-1/4'>
            {userData ? 
            <>
              <Image src={`https://enka.network/ui/hsr/${avatars[(userData.headicon as keyof typeof avatars)] ? 
              avatars[(userData.headicon as keyof typeof avatars)].Icon : 
              avatars[200001].Icon}`} height={60} width={60} alt="yo"/>
              <span className="text-lg  text-shadow-sm shadow-black-2000">{userData.nickname}</span>
              <div className="flex justify-end p-1 gap-4 w-full font-sans font-bold text-lg" >

                <span>{getRegion(params.uid)}</span>
                <span>{`TL${userData.level}`}</span>
              </div>
            </> : 
            <div className="h-10">
            </div>}
            
          </div>
          
        </div>
        <CustomTable 
        tableParams={
          {
            table: 'builds',
            query: params.uid
          }
        }
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
