import { SimLog } from '@/app/types';
import Image from 'next/image';
import { SlArrowDown,SlArrowUp  } from "react-icons/sl";
import { useEffect, useState } from 'react';
import { Translate } from '../Translate';
import axios from 'axios';
import { getAPIURL } from '@/lib/utils';
const SPRITE_URL = `https://enka.network/ui/hsr/`
const meme = "SPRITE_URL + set.icon"
type SimResultRoundProps = {
  trackedStat: string;
  key: string;
  log: SimLog;
  avatar_id: number;
};

export const SimResultRound: React.FC<SimResultRoundProps> = ({ trackedStat, key, log, avatar_id }) => {
    const [expand, setExpand] = useState<Boolean>(false)
    const tempMap: Record<string, string> = {
      "1": '/avatar/phantalyia.webp',
      "2": '/avatar/destruction.webp',
      "3": '/avatar/abundance.webp',
    }

    const roundAvatarId = log.avatarId
    var src = ""
    if (tempMap[roundAvatarId.toString()] != undefined) {
        src = tempMap[roundAvatarId.toString()]
    }
    else {
        src = `https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${roundAvatarId}.png`
    }
    return (
      <div key={`${key}-${log.id}`} className='flex flex-col items-center align-middle' onClick={() => setExpand((prev) => !prev)}>
        {/* results display (ie.. seele -> enemy | damage) */}
        <span className='flex gap-1 items-center'>
            <Image src={src} width={25} height={25} unoptimized alt="character image"/>
            <Translate str={log.avatarId.toString()}/>
            {' '}
            <Translate str={log.type} />
            {log.target ? 
            <span>{'--> '}
            <Translate str={log.target.toString()}/>
            </span>
            :
            <></>
            } 
            {log.results.map((res) => {
            if (res.type == 'damage') {
                return(<span key={`${key}-${log.id}-damage`}>{' || '}<Translate str='DamageDealt'/>: <span className={`${(res.avatarId == avatar_id && res.type == trackedStat) ? 'text-orange-400' : ''}`}>{res.value.toFixed(0)}</span></span>)
            }
            if (res.type == 'shield') {
                return(<span key={`${key}-${log.id}-shield`}>{' || '}<Translate str='Shield'/>: <span className={`${(res.avatarId == avatar_id && res.type == trackedStat) ? 'text-orange-400' : ''}`}>{res.value.toFixed(0)}</span></span>)
            }
            })}

            {expand ? <SlArrowUp /> : <SlArrowDown />}
        </span>
        {expand ? 
          <span className='text-center'>
            {log.energyGain.map((epgain) => {
              return (<span key={`${key}-${log.id}-${epgain.avatar_id}-energy`} className='flex gap-1 justify-center items-center text-center'>
                <Image src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${epgain.avatar_id}.png`} width={20} height={20} unoptimized alt="character image"/>
                {'Energy Received: '}{epgain.energyGained.toFixed(1)}
                {' || '}
                {'Current Energy: '}{epgain.energy.toFixed(0)}
                </span>)
            })} 
          </span> 
          : 
          <></>}
      </div>
    )
}

