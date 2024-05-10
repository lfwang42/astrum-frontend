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
import { User } from '@/app/types'
import { ResultsDisplay } from '@/components/ResultsDisplay'

export default function Profile({ params }: { params: { uid: number }}) {
  const [refreshTime, setRefreshTime] = useState<number>();
  const [enableRefresh, setEnableRefresh] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>()
  const [profilePic, setProfilePic] = useState<string>(`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/UI_Message_Contacts_Anonymous.png`)
  const router = useRouter()
  const fetchURL = getAPIURL(`/api/builds/${params.uid}`)
  const fetchProfile = async (uid: string) => {
    const res = await axios.get(getAPIURL(`/api/users/${params.uid}`))
    setUserData(res.data)
    var date = new Date(Date.parse(res.data.updated_at)).getTime()
  }

  // useEffect(() => {
  //   console.log('changed')
  // }, [params.uid])

  useEffect(() => {
    fetchProfile(params.uid.toString())
  }, []) 

  useEffect(() => {
    if (!userData) return
    setProfilePic(`https://enka.network/ui/hsr/${avatars[(userData.headicon.toString() as keyof typeof avatars)].Icon}`)
    const now = new Date().getTime();
    const cooldown = now + (userData.ttl);
    setRefreshTime(cooldown)
    if (userData.ttl === 0) {
      setEnableRefresh(true)
    }
  }, [userData])
  
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
    location.reload()
  };

  const getTimestamp = () => {
    if (!refreshTime) return 0;
    const now = new Date().getTime();
    const then = refreshTime - now;
    return then;
  };

  const p = {}

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
        <div style={{backgroundImage: `url('/Palace.png')`}} className="min-h-20 w-50 p-1 border-solid rounded-sm gap-2 m-2 bg-origin-border bg-fixed">
          <div className='flex flex-grow-1 flex-shrink-0 p-1 gap-2 border-solid border-4 border-gray-800 rounded-sm w-1/4'>
            <Image src={profilePic} height={30} width={30} unoptimized className="mt-1 h-16 w-auto" alt="profile picture"/>
            {userData ? 
            <div className='flex w-full flex-col'>   
              <div className="flex justify-between min-w-20" >
                <span className="text-lg  font-sans font-bold">{userData.nickname}</span>
                <div className="flex flex-row-reverse gap-3 w-full font-sans font-bold text-lg mr-2 " >
                  <span>{getRegion(params.uid)}</span>
                  <span>{`TL${userData.level}`}</span>
                </div>
              </div>
              
              <div className='flex whitespace-break-spaces break-all'>{userData.signature}</div>
            </div>: 
            <div className="h-10 w-1/4">
            {'Loading...'}
            </div>}
            
          </div>
          
        </div>
        <ResultsDisplay user={userData}/>
        {userData && <CustomTable 
        tableParams={
          {
            table: 'builds',
            query: params.uid
          }
        }
        fetchUrl={fetchURL}
        columns={columns} 
        defaultSort={'spd'} 
        sortOptions={sortOptions}
        params={p}
        pagination
        />}
      </div>
  )
}
