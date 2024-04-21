import { SimLog } from '@/app/types';
import Image from 'next/image';
import results from '@/app/test.json'
import { useEffect, useState } from 'react';
import { Translate } from '../Translate';
import axios from 'axios';
import { getAPIURL } from '@/lib/utils';
const SPRITE_URL = `https://enka.network/ui/hsr/`
const meme = "SPRITE_URL + set.icon"
type SimResultProps = {
  // logs: SimLog[][];
  avatar_id: number;
  bid: number;
  calc_id: number | undefined
};

export const SimResult: React.FC<SimResultProps> = ({ avatar_id, bid, calc_id }) => {

    const [logs, setLogs] = useState<SimLog[][]>([])
    const [expand, setExpand] = useState<Boolean>(false)
    const [roundExpand, setRoundExpand] = useState<Boolean[]>([])
    useEffect(() => {
      const r = []
      for (let log of logs) {
        r.push(false)
      }
      setRoundExpand(r)
    }, [logs])

    const onExpand = async () => {
      if (logs.length == 0) {
        const res = await axios.get(getAPIURL('/api/simulation/'), {params: {bid: bid, calc_id: calc_id,}})
        setLogs(res.data)
      }
      setExpand((prev) => { 
        return !prev
      })
    } 
    if (calc_id) {
        return (
        <div key={`${bid}-${calc_id}-sim-wrapper`} className='flex flex-col items-center align-middle p-1' >
            <div className='mx-auto' onClick={onExpand}>{expand ? "Hide" : "Show"} Simulation result</div>
            {expand ? 
                <div className="flex-col gap-1">
                    {logs.map((round, index) => {
                        
                    return (
                        <div key={`${bid}-${calc_id}-sim-round-${index}`} className='flex flex-col items-center align-middle p-1'>
                        <span className="hover:text-orange-300" onClick={() => setRoundExpand((prev) => {
                          const prevValue = prev[index]
                          const arr = [...prev]
                          arr.splice(index, 1, !prevValue)
                          return arr
                        })}>Round: {index+1}</span>
                        {roundExpand[index] ? round.map((log) => {
                            return (
                              <div key={`${bid}-${calc_id}-sim-round-${index}-${log.id}`} className='flex flex-col items-center align-middle'>
                                <span>
                                  <Translate str={log.avatarId.toString()}/>
                                  {' '}
                                  <Translate str={log.type} />
                                  {log.target ? 
                                    <span>{'-->'}
                                    <Translate str={log.target.toString()}/>
                                    </span>
                                    :
                                    <></>
                                  }
                                </span>
                                {log.results.map((res) => {
                                  if (res.type == 'damage') {
                                    return(<span key={`${bid}-${calc_id}-sim-round-${index}-${log.id}-damage`}><Translate str='DamageDealt'/>: <span className={`${res.avatarId == avatar_id ? 'text-orange-400' : ''}`}>{res.value.toFixed(1)}</span></span>)
                                  }
                                })}
                              </div>
                            )
                        })
                        :
                        <></>
                        }
                        </div>
                    )  
                    })}
                </div>
                :
                <></>
            }  
        </div>
        )
    }
}
