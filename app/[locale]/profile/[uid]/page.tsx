'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import avatars from '../../../../honker_avatars.json'
import axios from 'axios'
import { columns } from './columns'
import { CustomTable } from '../../../../components/CustomTable/index';
import { getAPIURL, getRegion } from '../../../../lib/utils';
import { Timer } from '@/components/Timer'
import { IoMdRefresh } from "react-icons/io";
import { User } from '@/app/types'
import { ResultsDisplay } from '@/components/ResultsDisplay'
import { ProfilesContext } from '@/contexts/PinnedProfiles/ProfilesContext'
import { TranslateDate } from '@/components/TranslateDate'
import { Translate } from '@/components/Translate'
import { useNow } from 'next-intl'

export default function Profile({ params }: { params: { uid: number }}) {
  const [refreshTime, setRefreshTime] = useState<number>();
  const [enableRefresh, setEnableRefresh] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>()
  const [profilePic, setProfilePic] = useState<string>(`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/UI_Message_Contacts_Anonymous.png`)
  const { profiles, addTab } = useContext(ProfilesContext)
  const uid = params.uid
  // const [uid, setUID] = useState<number>(params.uid)
  const fetchURL =`/api/builds/${params.uid}`

  const [error, setError] = useState<any>(false)
  const fetchProfile = (uid: string, refresh: boolean) => {
    setUserData(undefined)
    const url = refresh ? getAPIURL(`/api/users/${uid}/refresh`) : getAPIURL(`/api/users/${uid}`)
    axios.get(url)
    .then((res) => res.data)
    .then((data) => setUserData(data))
    .catch((error) => {
      setError(error.response.data)
    })
    // var date = new Date(Date.parse(res.data.updated_at)).getTime()
  }

  useEffect(() => {
    handleNewTab(userData)
  }, [profiles, userData])

  useEffect(() => {
    fetchProfile(params.uid.toString(), false)
  }, []) 

  useEffect(()=> {

  }, [params.uid]) 

  // useEffect(() => {
  //   // setUID((prev) => {
  //   //   console.log('uid prev: ')
  //   //   console.log(prev)
  //   //   return params.uid
  //   // })
  // }, [uid]) 

  useEffect(() => {
    if (!userData || error) return
    console.log(userData)
    const ic = avatars[(userData.headicon.toString() as keyof typeof avatars)] ?  //if i dont update it shouldnt crash lol
      avatars[(userData.headicon.toString() as keyof typeof avatars)].Icon
      : avatars["200001"].Icon
    setProfilePic(`https://enka.network/ui/hsr/${ic}`)
    const now = new Date().getTime();
    const cooldown = now + (userData.ttl);
    setRefreshTime(cooldown)
    if (userData.ttl === 0) {
      setEnableRefresh(true)
    }
  }, [userData])
  
  const handleNewTab = (userData: User | undefined) => {
    if (!params.uid || !userData) return;
    console.log(userData)
    const nickname = userData?.nickname || "???";
    addTab(params.uid.toString(), nickname);
    document.title = `${nickname}'s Profile - Belobog`;
  };


  const enableRefreshButton = () => {
    setEnableRefresh(true);
  };
  const disableRefreshButton = () => {
    setEnableRefresh(false);
  };

  const refreshData = async () => {
    if (!params.uid) return;
    setEnableRefresh(false);
    fetchProfile(params.uid.toString(), true)
    if (!error) {
      const now = new Date().getTime();
      const cooldown = now + (userData!.ttl);
      setRefreshTime(cooldown);
    }
    else {

    }
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
          label={""}
          onFinish={enableRefreshButton}
        />
      ) : (
        <span><Translate str="Refreshed" />: <TranslateDate str={userData ? userData.updated_at : ""} relative updateNow/></span>
      )}
       
    </div>
  );
    const sortOptions = [
      { value: 'Speed', label: 'Speed' },
      { value: 'Attack', label: 'Attack' },
      { value: 'Defence', label: 'Defence' },
      { value: 'MaxHP', label: 'MaxHP' },
      { value: 'BreakDamage', label: 'BreakDamage' },
      { value: 'StatusResistance', label: 'StatusResistance' },
      { value: 'StatusProbability', label: 'StatusProbability' },
      // { value: 'SPRatio', label: 'Energy Regen Rate' },
      { value: 'CriticalChance', label: 'CriticalChance' },
      { value: 'CriticalDamage', label: 'CriticalDamage' }
    ]


  if (error) {
    return (
      <div className="min-h-screen container flex items-center justify-center mx-auto ">
        <div className='h-1/2 items-center justify-center flex flex-col mb-20'>
          <div className="text-center text-4xl">An Error Occured</div>
          <div className="text-center text-2xl text-gray-200">{error}</div>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen container mx-auto py-10">
        {refreshButton}
        <div style={{backgroundImage: `url('/Palace.png')`}} className="min-h-20 w-50 p-1 border-solid rounded-sm gap-2 m-2 bg-origin-border bg-fixed">
          <div className='flex flex-grow-1 flex-shrink-0 p-1 gap-2 border-solid border-4 border-gray-800 rounded-sm w-1/3'>
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
              
              <div className='flex whitespace-normal break-all max-w-[100%]'>{userData.signature}</div>
            </div>: 
            <div className="h-10 w-1/4">
            {'Loading...'}
            </div>}
          </div>
        </div>
        <ResultsDisplay user={userData}/>
        {/* for now force table to load after user data has loaded, but change this later*/}
        {userData ? 
          <CustomTable 
          tableParams={uid}
          fetchUrl={fetchURL}
          columns={columns} 
          defaultSort={'Speed'} 
          sortOptions={sortOptions}
          params={p}
          pagination
          />
        :
        null}
      </div>
  )
}
