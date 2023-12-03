import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import avatars from '../../../../honker_avatars.json'
import axios from 'axios'
import { columns } from './columns'
import { CustomTable } from '../../../../components/CustomTable/index';
import { getRegion } from '../../../../lib/utils';
export default async function Profile({ params }: { params: { uid: number }}) {
    let icon = ""
    var user = ""
    var level = 0;
    let data: any = null;
    const res = await axios.get(`http://localhost:3000/api/users/${params.uid}`)
    .then(
        res => {
        // console.log(res.data)
        const h = res.data.headicon;
        icon = `https://enka.network/ui/hsr/${avatars[(h as keyof typeof avatars)].Icon}`
        user = res.data.nickname
        level = res.data.level;
        }
    )
    const r = await axios.get(`http://localhost:3000/api/builds/${params.uid}`)
    .then(
      res => {
        data = res.data
      }
  )
  return (
      <div className="container mx-auto py-10">
        <div style={{backgroundImage: `url('/Palace.png')`}} className="w-50 p-1 border-solid rounded-sm gap-2 m-2 bg-origin-border bg-fixed">
          <div className='flex justify-left gap-2 border-solid border-2 border-black w-1/4'>
            <Image src={icon} height={60} width={60} alt="yo"/>
            <span className="text-lg  text-shadow-sm shadow-black-2000">{user}</span>
            <div className="flex justify-end p-1 gap-4 w-full font-sans font-bold text-lg" >

              <span>{getRegion(params.uid)}</span>
              <span>{`TL${level}`}</span>
            </div>
          </div>
          
        </div>
        
        <CustomTable columns={columns} data={data}/>
      </div>
  )
}
