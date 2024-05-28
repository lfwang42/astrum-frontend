import { CoreStats } from "@/app/types";
import { StatFormat } from "@/lib/utils";
import { StatIcon } from "../StatIcon";

type StatsProps = {
  stats: CoreStats;
};

// TODO: Does this already exist somewhere? Because these need to be translated...
export const StatDisplayNames = {
  maxHP: "HP",
  atk: "ATK",
  def: "DEF",
  spd: "SPD",
  critRate: "CRIT Rate",
  critDmg: "CRIT DMG",
  energyRecharge: "Energy Regeneration Rate",
  healingBonus: "Outgoing Healing Boost",
  breakEffect: "Break Effect",
  effectHitRate: "Effect Hit Rate",
  StatusResistance: "Effect Res",
  quantumDamageBonus: "Quantum DMG Bonus",
  physicalDamageBonus: "Physical DMG Bonus",
  windDamageBonus: "Wind DMG Bonus",
  iceDamageBonus: "Ice DMG Bonus",
  imaginaryDamageBonus: "Imaginary DMG Bonus",
  lightningDamageBonus: "Lightning DMG Bonus",
  fireDamageBonus: "Fire DMG Bonus",
};

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  const statsDivs: JSX.Element[] = [];
  // TODO: This is executed during compile time... not sure if that's desired
  Object.keys(stats).forEach((key) => {
    console.log(key);
    statsDivs.push(
      <div className="flex">
        <StatIcon stat={key} />
        <span className="pl-2 pb-2">
          {StatDisplayNames[key as keyof typeof StatDisplayNames]}
        </span>
        <span className="pl-2 pb-2">
          {StatFormat[key](stats[key as keyof typeof stats])}
        </span>
      </div>
    );
  });

  return <div className="flex-col p-5">{statsDivs}</div>;
};
