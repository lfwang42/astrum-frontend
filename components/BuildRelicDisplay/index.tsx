import Image from "next/image";
import { Translate } from "../Translate";
import { Relic } from "@/app/types";
import { RelicCanvas } from "../RelicCanvas";
import { StatIcon } from "../StatIcon";
import { StatFormat } from "@/lib/utils";

type BuildRelicsProps = {
    relics: Relic[],
    vertical?: boolean
  };
  
  export const BuildRelicDisplay: React.FC<BuildRelicsProps> = ({
    relics,
    vertical
  }) => {
    return (
      <div className=" flex flex-wrap justify-center whitespace-normal gap-[1px] overflow-auto">
      {relics.map((relic: Relic) => {
          const img_url = `https://enka.network/ui/hsr/SpriteOutput/ItemIcon/RelicIcons/IconRelic_${relic.set_id}_${relic.tid.toString().slice(-1)}.png`

          return (
            <div
              key={relic.tid.toString()}
              className="flex justify-center items-center bg-slate-800 border-slate-400 border-2 p-[2px] min-w-[155px] w-[15%]"
            >
              <div className="justify-center">
                <RelicCanvas backgroundImage={img_url} />
                {/* <Image src={relic.icon} alt="" height={50} width={50}  /> */}
                <div className=" flex justify-start items-center text-sm">
                  <StatIcon stat={relic.main_stat_name}/>
                  <span>
                    {" "}
                    {StatFormat[relic.main_stat_name](
                      relic.main_stat_value
                    )}
                  </span>
                </div>
              </div>
              <div className="justify-start">
                {Object.keys(relic.stats).map((stat) => {
                  return (
                    <div
                      key={relic.tid + stat}
                      className=" flex justify-start items-center text-[13px] gap-0"
                    >
                      <StatIcon stat={stat} size={6} />
                      <span> {StatFormat[stat](relic.stats[stat])}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
