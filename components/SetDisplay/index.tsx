import { SetInfo } from '../../app/types';
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
                        <img className="h-auto w-8 m-1" src={SPRITE_URL + set.icon} />
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
