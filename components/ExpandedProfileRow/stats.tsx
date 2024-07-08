import { CoreStats } from "@/app/types";
import { StatFormat } from "@/lib/utils";
import { StatIcon } from "../StatIcon";
import { Translate } from "../Translate";

type StatsProps = {
  stats: CoreStats;
};

// TODO: Does this already exist somewhere? Because these need to be translated...
//answer: yes you can use the translation component

// export const StatDisplayNames = {
//   maxHP: "HP",
//   atk: "ATK",
//   def: "DEF",
//   spd: "SPD",
//   critRate: "CRIT Rate",
//   critDmg: "CRIT DMG",
//   energyRecharge: "Energy Regeneration Rate",
//   healingBonus: "Outgoing Healing Boost",
//   breakEffect: "Break Effect",
//   effectHitRate: "Effect Hit Rate",
//   StatusResistance: "Effect Res",
//   quantumDamageBonus: "Quantum DMG Bonus",
//   physicalDamageBonus: "Physical DMG Bonus",
//   windDamageBonus: "Wind DMG Bonus",
//   iceDamageBonus: "Ice DMG Bonus",
//   imaginaryDamageBonus: "Imaginary DMG Bonus",
//   lightningDamageBonus: "Lightning DMG Bonus",
//   fireDamageBonus: "Fire DMG Bonus",
// };

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  // const statsKeysDivs: JSX.Element[] = [];
  // const statsValuesDivs: JSX.Element[] = [];
  
  //moved this to the component below and made slight modifications

  // TODO: This is executed during compile time... not sure if that's desired
  // Object.keys(stats).forEach((key) => {
  //   console.log(key);
  //   statsKeysDivs.push(
  //     <div className="flex">
  //       <StatIcon stat={key} />
  //       <span className="pl-2 pb-2">
  //         <Translate str={key} />
  //       </span>
  //     </div>
  //   );
  //   statsValuesDivs.push(
  //     <div className="flex justify-end">
  //       <span className="pl-2 pb-2">
  //         {StatFormat[key](stats[key as keyof typeof stats])}
  //       </span>
  //     </div>
  //   );
  // });

  return (
    <div className="flex flex-col mt-2 gap-[1px] w-[22%] max-w-[22%]">
      {Object.keys(stats).map((key) => {
        return (
          <div key={key} className="flex justify-between items-center min-w-[200px]">
            <div className="flex justify-start flex-row items-center">
              <StatIcon stat={key} />
              <span  className="whitespace-normal"><Translate str={key} /></span>
            </div>
            <span className="pl-2">
            {StatFormat[key](stats[key as keyof typeof stats])}
            </span>
          </div>
        );
      })}
    </div>
  );
};
