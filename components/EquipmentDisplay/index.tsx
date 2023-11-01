import { SetInfo, EquipInfo } from '../../app/types';
const SPRITE_URL = `https://enka.network/ui/hsr/`
const meme = "SPRITE_URL + set.icon"
type ConeProps = {
  cones: EquipInfo[];
};

export const EquipmentDisplay: React.FC<ConeProps> = ({ cones }) => {
    if (cones) {
        return (
            <div className="flex justify-start whitespace-nowrap gap-5">
            {cones.map((cone) => {
                return (
                    <div key={cone.name} className="relative">
                        <img className="h-auto w-8 m-1" src={cone.icon} />
                        <span className="absolute right-0 bottom-0">
                        {cone.rank? cone.rank : 1}
                        </span>
                    </div>
                    );
            })}
            </div>
          );
    }
  
};
