export interface CoreStats {
  MaxHP: number;
  Attack: number;
  Defence: number;
  Speed: number;
  CriticalChance: number;
  CriticalDamage: number;
  SPRatio: number;
  BreakDamage: number;
  StatusProbability: number;
  StatusResistance: number;
  HealRatioBase?: number;
  QuantumAddedRatio?: number;
  PhysicalAddedRatio?: number;
  WindAddedRatio?: number;
  IceAddedRatio?: number;
  ImaginaryAddedRatio?: number;
  ThunderAddedRatio?: number;
  FireAddedRatio?: number;
}

export type Element =
  | "Ice"
  | "Fire"
  | "Lightning"
  | "Quantum"
  | "Imaginary"
  | "Wind"
  | "Physical";

export type SetInfo = {
  name: string;
  icon: string;
};

export type EquipInfo = {
  calc_id?: number;
  name: string | number;
  promotion?: number;
  rank: number;
  level?: number;
  icon: string;
};


export interface Relic {
  type: number;
  tid: number;
  stats: Record<string, number>;
  set_id: number;
  main_stat_value: number;
  main_stat_name: string;
} 

export type AvatarCategory = {
  add_date: string,
  avatar_id: number,
  avatar_ids?: number[]
  char_name: string,
  calculations: Record<string, Record<string, LeaderboardCone>>,
  count: number,
  desc: string,
  default_calc_id: number,
  element: string,
  name: string,
  score_name: string,
  lightcones: Record<number, LeaderboardCone[]>,
  uncapped: boolean,
  team: Teammate[]
};

export interface SkillTreePoint {
  pointId: number;
  level: number;
}

export interface WeaponInfo {
  tid: number;
  rank: number;
  level: number;
  promotion: number;
  _flat?: Object; //@TODO: maybe dont do this (make it optional lol)
}

export interface AvatarInfo {
  skillTreeList: Array<SkillTreePoint>;
  equipment: WeaponInfo;
  avatarId: number;
  rank?: number;
  promotion: number;
  relicList: Array<RelicInfo>;
  level: number;
  _assist?: boolean;
  _flat?: Object;
  pos?: number;
}

export interface SubInfo {
  affixId: number;
  cnt: number;
  step?: number;
}

export interface RelicInfo {
  mainAffixId: number;
  tid: number;
  type: number;
  subAffixList: SubInfo[];
  level: number;
  _flat: {
    props: any[];
    setName: number;
    setID: number;
  };
}

export interface Teammate {
  avatar: string;
  desc: string;
  fromUser: boolean;
  icon?: string;
  element?: string;
}

export interface LeaderboardCone {
  calc_id: number;
  calc: string;
  name: string;
  promotion: number;
  rank: number;
  level: number;
  icon: string;
  tid: number;
  default_calc_id: number;
}
interface CalcResult {
  calc_id: number;
  rank: number;
  outof: number;
  icon: string;
  tids: number[];
  score_name: string;
}

export interface SkillResult {
  avatarId: number;
  type: string;
  value: number;
  // log?: SimLog
}

interface EPGain {
  avatar_id: number;
  energy: number;
  energyGained: number;
}

interface ActionAdvance {
  avatar_id: number;
  value: number;
}

export interface SimLog {
  actionAdvance?: ActionAdvance[];
  avatarId: number;
  av: number;
  id: number;
  type: string;
  results: SkillResult[];
  children: SimLog[];
  childDamage: number;
  message?: string;
  energyGain: EPGain[];
  // skillId: number | null;
  target?: number | null;
  effect?: Debuff;
  // spGain: SPGain[],
}

export interface Debuff {
  baseHitRate: number;
  char: any;
  source: number;
  received: number;
  isDebuff: boolean;
  effectHitRate: number;
  realHitRate: number;
  totalHitRate: number;
  trials: any[];
  reapply: boolean;
  stackable: boolean;
  dot?: {
    element: string;
    dmgRate: number;
  };
  props?: Prop[];
  statusEffect?: any;
  turns: number;
  stacks?: number;
  maxStacks?: number;
}

interface Prop {
  type: StatType;
  value: number;
  mult?: boolean;
}

interface LeaderboardResults {
  avatar_id: number;
  results: CalcResult[];
}
export interface User {
  headicon: number;
  level: number;
  nickname: string;
  platform: string | null;
  signature: string | null;
  uid: number;
  updated_at: string;
  achievementCount: number;
  ranks: LeaderboardResults[];
  ttl: number;
}

type StatType =
  | "BaseHP"
  | "HPAddedRatio"
  | "HPDelta"
  | "HPConvert"
  | "BaseAttack"
  | "AttackAddedRatio"
  | "AttackDelta"
  | "AttackConvert"
  | "BaseDefence"
  | "DefenceAddedRatio"
  | "DefenceDelta"
  | "DefenceConvert"
  | "BaseSpeed"
  | "SpeedAddedRatio"
  | "SpeedDelta"
  | "SpeedConvert"
  | "CriticalChance"
  | "CriticalDamage"
  | "SPRatio"
  | "SPRatioConvert"
  | "StatusProbability"
  | "StatusProbabilityConvert"
  | "StatusResistance"
  | "StatusResistanceConvert"
  | "HealRatioBase"
  | "HealRatioConvert"
  | "HealTakenRatio"
  | "ShieldAddedRatio"
  | "ShieldTakenRatio"
  | "AggroBase"
  | "AggroAddedRatio"
  | "AggroDelta"
  | "BreakDamageAddedRatio"
  | "BreakDamageAddedRatioBase"
  | "AllDamageTypeResistance"
  | "PhysicalResistanceDelta"
  | "FireResistanceDelta"
  | "IceResistanceDelta"
  | "ThunderResistanceDelta"
  | "QuantumResistanceDelta"
  | "ImaginaryResistanceDelta"
  | "WindResistanceDelta"
  | "PhysicalPenetrate"
  | "FirePenetrate"
  | "IcePenetrate"
  | "ThunderPenetrate"
  | "QuantumPenetrate"
  | "ImaginaryPenetrate"
  | "WindPenetrate"
  | "AllDamageTypeTakenRatio"
  | "PhysicalTakenRatio"
  | "FireTakenRatio"
  | "IceTakenRatio"
  | "ThunderTakenRatio"
  | "QuantumTakenRatio"
  | "ImaginaryTakenRatio"
  | "WindTakenRatio"
  | "AllDamageTypeAddedRatio"
  | "DOTDamageAddedRatio"
  | "PhysicalAddedRatio"
  | "FireAddedRatio"
  | "IceAddedRatio"
  | "ThunderAddedRatio"
  | "QuantumAddedRatio"
  | "ImaginaryAddedRatio"
  | "WindAddedRatio"
  | "StanceBreakAddedRatio"
  | "AllDamageReduce"
  | "FatigueRatio"
  | "MinimumFatigueRatio"
  | "FollowAddedRatio"
  | "UltAddedRatio"
  | "BasicAddedRatio"
  | "SkillAddedRatio"
  | "UltCritDamage"
  | "DefenceIgnore";
