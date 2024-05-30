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
import EnergyRecharge from "../../app/assets/icon/EnergyRecharge.png";
const statIcons: {
  [key: string]: any;
} = {
  // "Ice": '../../assets/icon/Ice.png',
  // "Quantum": '../../assets/icon/Quantum.png',
  CriticalChance: CritRate,
  CriticalChanceBase: CritRate,
  CriticalDamage: CritDmg,
  CriticalDamageBase: CritDmg,
  SpeedDelta: Speed,
  AttackAddedRatio: Attack,
  BreakDamageAddedRatio: BreakEffect,
  BreakDamageAddedRatioBase: BreakEffect,
  HPAddedRatio: HP,
  DefenceAddedRatio: Defence,
  StatusProbability: HitRate,
  StatusProbabilityBase: HitRate,
  StatusResistance: StatusRes,
  HPDelta: HP,
  AttackDelta: Attack,
  DefenceDelta: Defence,
  iceDamageBonus: IceBoost,
  quantumDamageBonus: QuantumBoost,
  fireDamageBonus: FireBoost,
  windDamageBonus: WindBoost,
  imaginaryDamageBonus: ImaginaryBoost,
  physicalDamageBonus: PhysicalBoost,
  lightningDamageBonus: LightningBoost,
  IceAddedRatio: IceBoost,
  QuantumAddedRatio: QuantumBoost,
  FireAddedRatio: FireBoost,
  WindAddedRatio: WindBoost,
  ImaginaryAddedRatio: ImaginaryBoost,
  PhysicalAddedRatio: PhysicalBoost,
  ThunderAddedRatio: LightningBoost,
  healingBonus: HealBoost,
  HealRatioBase: HealBoost,
  effectHitRate: HitRate,

  MaxHP: HP,
  Speed: Speed,
  Attack: Attack,
  def: Defence,
  Defence: Defence,
  energyRecharge: EnergyRecharge,
  SPRatio: EnergyRecharge,

  critDmg: CritDmg,
  critRate: CritRate,
  breakEffect: BreakEffect,
  BreakDamage: BreakEffect,

  SPRatioBase: EnergyRecharge,
};

type StatProps = {
  stat: string;
  scale?: number;
};

export const StatIcon: React.FC<StatProps> = ({ stat, scale }) => {
  return (
    <Image
      className="w-auto"
      width={18 * (scale != undefined ? scale : 1)}
      height={18 * (scale != undefined ? scale : 1)}
      src={statIcons[stat]}
      alt={stat}
    />
  );
};
