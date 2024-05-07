import Image from "next/image";
import CritRate from "../../app/assets/icon/CriticalChance.png";
import CritDmg from "../../app/assets/icon/CriticalDamage.png";
import Speed from "../../app/assets/icon/Speed.png";
import Attack from "../../app/assets/icon/Attack.png";
import Defence from "../../app/assets/icon/Defence.png";
import HitRate from "../../app/assets/icon/EffectHitRate.png";
import StatusRes from "../../app/assets/icon/EffectRes.png";
import BreakEffect from "../../app/assets/icon/BreakEffect.png";
import HP from "../../app/assets/icon/HP.png";

import QuantumBoost from "../../app/assets/icon/QuantumBoost.png";
import FireBoost from "../../app/assets/icon/FireBoost.png";
import IceBoost from "../../app/assets/icon/IceBoost.png";
import LightningBoost from "../../app/assets/icon/LightningBoost.png";
import WindBoost from "../../app/assets/icon/WindBoost.png";
import PhysicalBoost from "../../app/assets/icon/PhysicalBoost.png";
import ImaginaryBoost from "../../app/assets/icon/ImaginaryBoost.png";
import HealBoost from "../../app/assets/icon/HealBoost.png";
import { StatFormat } from "../../lib/utils";
const substatOrder = [
  "CriticalChance",
  "CriticalDamage",
  "SpeedDelta",
  "AttackAddedRatio",
  "BreakDamageAddedRatio",
  "HPAddedRatio",
  "DefenceAddedRatio",
  "StatusProbability",
  "StatusResistance",
  "HPDelta",
  "AttackDelta",
  "DefenceDelta",
];

function orderSubstats(substats: any) {
  const reordered: any[] = [];
  const arr = [...substatOrder];
  arr.forEach((key) => {
    if (!substats[key]) return;
    reordered.push(key);
  });
  while (reordered.length < 4) {
    reordered.push("");
  }

  return reordered;
}

const statIcons: {
  [key: string]: any;
} = {
  // "Ice": '../../assets/icon/Ice.png',
  // "Quantum": '../../assets/icon/Quantum.png',
  CriticalChance: CritRate,
  CriticalDamage: CritDmg,
  SpeedDelta: Speed,
  AttackAddedRatio: Attack,
  BreakDamageAddedRatio: BreakEffect,
  HPAddedRatio: HP,
  DefenceAddedRatio: Defence,
  StatusProbability: HitRate,
  StatusResistance: StatusRes,
  HPDelta: HP,
  AttackDelta: Attack,
  DefenceDelta: Defence,
};

type SubStatProps = {
  substats: any;
};

export const SubStatDisplay: React.FC<SubStatProps> = ({ substats }) => {
  const ordered = orderSubstats(substats);
  if (substats) {
    return (
      <div className="flex justify-start w-300 whitespace-nowrap gap-3 text-sm">
        {ordered.map((k: string) => {
          return (
            <div key={k} className="flex w-30 gap-1">
              <Image
                className="h-auto w-8 m-1"
                width={20}
                height={20}
                src={statIcons[k]}
                alt={k}
              />
              <span className="mt-2">{StatFormat[k](substats[k])}</span>
            </div>
          );
        })}
      </div>
    );
  }
};
