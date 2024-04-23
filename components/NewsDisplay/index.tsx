'use client'
import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { getAPIURL } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface Message  {
    message: string,
    time: number,
    author: any, 
    id: number
}

export const NewsDisplay: React.FC = () => {
  const [newsData, setNewsData] = useState<Message[]>();
  const [error, setError] = useState<string>();

  const fetchNews = async () => {
    console.log('yo')
    try {
      const res  = await axios.get(getAPIURL('/api/news'));
      console.log(res)
      if (!res.data) return;
      setNewsData(res.data);
    } catch (err) {
      setError("Failed to fetch the news");
    }
  };

  useEffect(() => {
    fetchNews()
  }, [])

  const displayNewsMessage = (message: Message) => {
    const date = new Date(message.time)
    const avatarURL = `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`;
    const profileLink = "/profile/600549550";
    return (
      <div key={message.id} className="p-3 border-black bg-slate-850 min-w-96 text-slate-150 hover:bg-slate-900">
        <div className="flex justify-start gap-3 mb-2 items-center">
          <Link href={profileLink}>
            <Image className="rounded-full" src={avatarURL} width={40} height={4} unoptimized alt="profile pic" />
          </Link>
          <Link className="hover:text-orange-400 text-lg" href={profileLink}>{message.author.username}</Link>
            <span className="text-sm text-gray-400">{date.toLocaleDateString("en-CA", {day: "numeric", year: "numeric", month: "numeric"})}</span>
        </div>
        <div>
          <div className="">
            {message.message}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-1/2 w-3/4 border-gray-600 border-8 mb-1 rounded-sm">
        {newsData ? (
          newsData.map(displayNewsMessage)
        ) : (
          <div>{'Loading...'}</div>
        )}
    </div>
  );
};
