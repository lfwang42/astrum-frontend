'use client'
import React, { FormEvent } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import debounce from 'debounce'
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
            axios.get(`http://localhost:3000/api/users/${uid}`, { params: {check: "exists" } })
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
        <div className="flex w-30 gap-1">
            <form onSubmit={debounced}>
                <input className="text-black" type="text" name="uid" value={uid} placeholder="enter UID" 
                onChange={e => setUid(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
        );
};