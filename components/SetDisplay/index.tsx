import { SetInfo } from '../../app/types';
import Image from 'next/image';
const SPRITE_URL = `https://enka.network/ui/hsr/`
const meme = "SPRITE_URL + set.icon"
type SetProps = {
  sets: SetInfo[];
};

export const SetDisplay: React.FC<SetProps> = ({ sets }) => {
    if (sets) {
        return (
            <div className="flex justify-start whitespace-nowrap gap-5">
            {sets.map((set, ind) => {
                if (set) {
                return (
                    <div key={set.name} className="relative">
                        <div className="table-icon">
                        <Image alt={""} width={22} height={22}  className="h-auto w-auto" src={SPRITE_URL + set.icon} />
                        </div>
                        <span className="absolute right-0 bottom-0">
                        {ind === 2 ? 4 : 2}
                        </span>
                    </div>
                    );
                }
            })}
            </div>
          );
    }
  
};
