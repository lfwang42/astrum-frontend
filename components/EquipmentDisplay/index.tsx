import { SetInfo, EquipInfo } from '../../app/types';
import { ConeDisplay } from '../ConeDisplay';
const SPRITE_URL = `https://enka.network/ui/hsr/`
const meme = "SPRITE_URL + set.icon"
type ConeProps = {
  cones: EquipInfo[];
  keyIndex: number;
};

export const EquipmentDisplay: React.FC<ConeProps> = ({ cones, keyIndex }) => {
    if (cones) {
        return (
            <div className="flex justify-start whitespace-nowrap gap-3">
            {cones.map((cone) => {
                return(<ConeDisplay key={`${keyIndex}-${cone.name}`} name={cone.name.toString()} icon={cone.icon} imposition={cone.rank} />)
            })}
            </div>
          );
    }
  
};
