import { SimLog } from '@/app/types';
import Image from 'next/image';
import { SlArrowDown,SlArrowUp  } from "react-icons/sl";
import { useEffect, useState } from 'react';
import { Translate } from '../Translate';
import axios from 'axios';
import { getAPIURL } from '@/lib/utils';
import { SimResultRound } from '../SimResultRound';
const SPRITE_URL = `https://enka.network/ui/hsr/`
const meme = "SPRITE_URL + set.icon"
type SimResultProps = {
  // logs: SimLog[][];
  avatar_id: number;
  bid: number;
  calc_id: number | undefined
};

export const SimResult: React.FC<SimResultProps> = ({ avatar_id, bid, calc_id }) => {
    const [trackedStat, setTrackedStat] = useState<string>('')
    const [logs, setLogs] = useState<SimLog[][]>([])
    const [expand, setExpand] = useState<Boolean>(false)
    const [roundExpand, setRoundExpand] = useState<Boolean[]>([])
    const tempMap: Record<string, string> = {
      "1": '/avatar/phantalyia.webp',
      "2": '/avatar/destruction.webp',
      "3": '/avatar/abundance.webp',
    }
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
        setLogs(res.data.logs)
        setTrackedStat(res.data.trackedStat)
      }
      setExpand((prev) => { 
        return !prev
      })
    } 
    if (calc_id) {
        return (
        <div key={`${bid}-${calc_id}-sim-wrapper`} className='flex flex-col items-center align-middle p-1' >
            <div className='flex items-center gap-1 mx-auto hover:text-orange-300' onClick={onExpand}>{expand ? "Hide" : "Show"} Simulation result {expand ? <SlArrowUp /> : <SlArrowDown />}</div>
            {expand ? 
                <div className="flex-col gap-1">
                    {logs.map((round, index) => {
                        
                    return (
                      <div key={`${bid}-${calc_id}-sim-round-${index}`} className='flex flex-col items-center align-middle p-1'>
                        <span className="flex items-center gap-1 hover:text-orange-300" onClick={() => setRoundExpand((prev) => {
                          const prevValue = prev[index]
                          const arr = [...prev]
                          arr.splice(index, 1, !prevValue)
                          return arr
                        })}><Translate str={'Cycles'}/>{' '}{index+1}{roundExpand[index] ? <SlArrowUp /> : <SlArrowDown />}</span>
                        {roundExpand[index] ? round.map((log) => {
                            // const roundAvatarId = log.avatarId
                            // var src = ""
                            // if (tempMap[roundAvatarId.toString()] != undefined) {
                            //   src = tempMap[roundAvatarId.toString()]
                            // }
                            // else {
                            //   src = `https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${roundAvatarId}.png`
                            // }
                            // return (
                            //   <div key={`${bid}-${calc_id}-sim-round-${index}-${log.id}`} className='flex flex-col items-center align-middle'>
                            //     {/* results display (ie.. seele -> enemy | damage) */}
                            //     <span className='flex gap-1 items-center'>
                            //       <Image src={src} width={25} height={25} unoptimized alt="character image"/>
                            //       <Translate str={log.avatarId.toString()}/>
                            //       {' '}
                            //       <Translate str={log.type} />
                            //       {log.target ? 
                            //         <span>{'--> '}
                            //         <Translate str={log.target.toString()}/>
                            //         </span>
                            //         :
                            //         <></>
                            //       } 
                            //       {log.results.map((res) => {
                            //         if (res.type == 'damage') {
                            //           return(<span key={`${bid}-${calc_id}-sim-round-${index}-${log.id}-damage`}>{' || '}<Translate str='DamageDealt'/>: <span className={`${(res.avatarId == avatar_id && res.type == trackedStat) ? 'text-orange-400' : ''}`}>{res.value.toFixed(0)}</span></span>)
                            //         }
                            //         if (res.type == 'shield') {
                            //           return(<span key={`${bid}-${calc_id}-sim-round-${index}-${log.id}-shield`}>{' || '}<Translate str='Shield'/>: <span className={`${(res.avatarId == avatar_id && res.type == trackedStat) ? 'text-orange-400' : ''}`}>{res.value.toFixed(0)}</span></span>)
                            //         }
                            //       })}
                            //     </span>
                                
                            //   </div>
                            // )
                            return (<SimResultRound trackedStat={trackedStat} log={log} key={`${bid}-${calc_id}-sim-round-${index}`} avatar_id={avatar_id} />)
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
