import Image from 'next/image';  
import { FaUser } from "react-icons/fa";
import avatar from '../../app/assets/icon/AvatarIcon.png'
import './style.css'
type TeamProps = {
    team: Teammate[]
    short: boolean
};


interface Teammate {
  avatar: string,
  desc: string,
  fromUser: boolean,
  icon?: string,
  element?: string,
}

const colors: Record<string, any> = {
  "Thunder": {
    back: "bg-purple-500",
    border: 'border-purple-400'
  },
  'Imaginary': {
    back: 'bg-amber-300',
    border: 'border-amber-200',
  },
  'Physical': {
    back: 'bg-gray-300',
    border: 'border-gray-200',
  },
  'Wind': {
    back: 'bg-green-600',
    border: 'border-green-500',
  },
  'Fire': {
    back: 'bg-red-600',
    border: 'border-red-500',
  },
  'Quantum': {
    back: 'bg-indigo-700',
    border: 'border-indigo-500',
  },
  'Ice': {
    back: 'bg-sky-500',
    border: 'border-sky-400'
  }
}

export const TeamDisplay: React.FC<TeamProps> = ({ team, short }) => {
  // const rt = team;
  const arr = short ? team.slice(0, 2).toReversed() : team
  // if (team) team.reverse()
        return (
          <div className="flex justify-start w-300 whitespace-nowrap gap-1 text-sm mr-1">
            {arr ? arr.map((teammate, index) => {
              if (teammate.avatar === 'any' || teammate.avatar == 'none') {
                return (
                <div key={teammate.avatar + index} className={`bg-gray-700 p-[2px] rounded-md bg-opacity-75 flex justify-center items-center align-middle border-gray-400 border-2`}>
                  <Image width="25" height="25" className="w-7 h-auto " 
                      src={'/avatar/anon.png'} alt={teammate.desc}        
                      title={teammate.desc}
                      unoptimized/>
                </div>)
              }
              else {
                return (
                <div key={teammate.avatar + index} className={` ${colors[teammate.element!].back} ${colors[teammate.element!].border} p-[2px] rounded-md relative items-center align-middle flex bg-opacity-75 border-2`}>
                  <Image width="25" height="25" className="w-7 h-auto "  
                  src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${teammate.avatar}.png`} 
                  alt={teammate.desc} 
                  title={teammate.desc}
                  unoptimized/>
                  {teammate.fromUser ?
                   <Image width={17} height={17} className="text-gray-100 absolute right-[-5px] bottom-[-5px] border-gray-100 border-2 rounded-md bg-gray-600"
                   src={avatar} 
                   alt={'Character taken from user'}
                   title="Character fetched from user" 
                   />: <></>}
                </div>)
              }
            })
            :
            <></>
          }
        </div>
        );
  
};