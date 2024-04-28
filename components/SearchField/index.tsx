'use client'
import React, { FormEvent } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import debounce from 'debounce'
import { getAPIURL } from '../../lib/utils';
interface FormData {
    uid: string;
}



const meme = (e: any) => {
    console.log(e.target.value)
}


export default function SearchField() {
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
        <div className="flex w-30 gap-1 p-1">
            <form onSubmit={debounced}>
                <input className="text-gray-200 bg-slate-900 rounded-sm p-1 min-w-5 " type="text" name="uid" value={uid} placeholder="Enter UID" 
                onChange={e => setUid(e.target.value)} autoComplete='off'/>
                <button type="submit" className="ml-2 text-gray-200 hover:text-orange-300">{'-->'}</button>
            </form>
        </div>
        );
};