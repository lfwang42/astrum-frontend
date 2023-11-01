'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import avatars from '../honker_avatars.json'
import Navbar from '../components/navbar';


export default function Home() {
  const [icon, setIcon] = useState<string>("");
useEffect(() => {
  fetch("http://localhost:3000/api/users/600549550").then(
    response => response.json()
  ).then(
    data => {
      console.log(data)
      const h = data.headicon;
      setIcon(`https://enka.network/ui/hsr/${avatars[(h as keyof typeof avatars)].Icon}`)
    }
  )
})

  return (
    <main className="">
      <Navbar />
      <img src={icon} />
    </main>
  )
}
