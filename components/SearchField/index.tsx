'use client'
import React from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import debounce from 'debounce'
import { getAPIURL } from '../../lib/utils';
import { useTranslations } from "next-intl";

interface FormData {
    uid: string;
}


export default function SearchField() {
  const t = useTranslations();
  const inputText = t('InputHere')
  // const uidNick = "UID / " + t('Nickname')
  const uidNick = t('EnterUID')

    const router = useRouter()
    const [uid, setUid] = React.useState("")
    const debounced = debounce(onSubmit, 300, true);
    
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!(uid.length === 9 && Number.isInteger(+uid))) { 
            console.log('invalid id')
        }
        else {
            axios.get(getAPIURL(`/api/users/${uid}`), { params: {check: "exists" } })
            .then((response: AxiosResponse) => {
                console.log(response.data.uid)
                try { 
                    router.push(`/profile/${response.data.uid}`)
                } 
                catch(error) {
                    console.log(error);
                }
            })    
            .catch(function (error: AxiosError) {
                if (error.response) {
                    console.log(error.response.status)
                }
            })
        }
    }
    
    return (
        <div className="flex flex-col justify-center w-30 gap-1 p-1">
          <p className='m-1 text-center pr-8'>{uidNick}</p>
            <form onSubmit={debounced}>
                <input className="text-gray-200 bg-slate-900 rounded-sm p-1 min-w-5 " type="text" name="uid" value={uid} placeholder={inputText} 
                onChange={e => setUid(e.target.value)} autoComplete='off'/>
                <button type="submit" className="ml-2 text-gray-200 hover:text-orange-300">{'-->'}</button>
            </form>
        </div>
        );
};