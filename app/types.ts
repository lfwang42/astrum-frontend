export interface CoreStats {
    maxHP: number, 
    atk: number, 
    def: number,
    spd: number,
    critRate: number, 
    critDmg: number, 
    energyRecharge: number, 
    healingBonus: number, 
    breakEffect: number,
    effectHitRate: number,
    quantumDamageBonus: number,
    physicalDamageBonus: number, 
    windDamageBonus: number, 
    iceDamageBonus: number,
    imaginaryDamageBonus: number, 
    lightningDamageBonus: number, 
    fireDamageBonus: number,
}

export type Element = 'Ice' | 'Fire' | 'Lightning' | 'Quantum' | 'Imaginary' | 'Wind' | 'Physical';

export type SetInfo = {
    name: string
    icon: string
  };

export type EquipInfo = {
    calc_id?: number,
    name: string | number,
    promotion?: number, 
    rank: number, 
    level?: number,
    icon: string
}

export interface AvatarCategory {
    name: string,
    avatar_id: number,
    score_name: string,
    element: string,
    char_name: string,
    add_date: string,
    char_icon: string,
    desc: string,
    calculations: LeaderboardCone[],
    count?: number,
    team?: Teammate[]
}

export interface Teammate {
  avatar: string,
  desc: string,
  fromUser: boolean,
  icon?: string,
  element?: string,
}

export interface LeaderboardCone {
    calc: string,
    calc_id: number,

    // lightcone: WeaponInfo
    name: string,
    promotion: number, 
    rank: number, 
    level: number,
    icon: string
}

interface CalcResult {
    calc_id: number, 
    rank: number, 
    outof: number,
    icon: string,
    tid: number
}

export interface SkillResult {
    avatarId: number
	type: string
	value: number
    // log?: SimLog
}

interface EPGain {
    avatar_id: number,
    energy: number,
    energyGained: number
}

export interface SimLog {
    avatarId: number;
    id: number;
    type: string;
    av: number;
    results: SkillResult[]
    children: SimLog[],
    childDamage: number,
    message?: string,
    energyGain: EPGain[]
    skillId: number | null,
    target?: number | null,
    effect?: Debuff
    // spGain: SPGain[],
}

export interface Debuff {
    baseHitRate: number
    char: any,
    source: number;
    received: number;
    isDebuff: boolean;
    effectHitRate: number,
    realHitRate: number,
    totalHitRate: number,
    trials: any[],
    reapply: boolean,
    stackable: boolean,
    dot?: {
        element: string,
        dmgRate: number
    }
    props?: Prop[],
    statusEffect?: any,
    turns: number,
    stacks?: number,
    maxStacks?: number,
}

interface Prop {
	type: StatType
	value: number
	mult?: boolean
}


interface LeaderboardResults {
    avatar_id: number,
    results: CalcResult[],
    score_name: string,
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

type StatType = 'BaseHP' | 'HPAddedRatio' | 'HPDelta' | 'HPConvert' |  
'BaseAttack' | 
'AttackAddedRatio' | 
'AttackDelta' | 
'AttackConvert' | 
'BaseDefence' | 
'DefenceAddedRatio' | 
'DefenceDelta' | 
'DefenceConvert' | 
'BaseSpeed' | 
'SpeedAddedRatio' | 
'SpeedDelta' | 
'SpeedConvert' | 
'CriticalChance' | 
'CriticalDamage' | 
'SPRatio' | 
'SPRatioConvert' | 
'StatusProbability' | 
'StatusProbabilityConvert' | 
'StatusResistance' | 
'StatusResistanceConvert' | 
'HealRatioBase' | 
'HealRatioConvert' | 
'HealTakenRatio' | 
'ShieldAddedRatio' | 
'ShieldTakenRatio' | 
'AggroBase' | 
'AggroAddedRatio' | 
'AggroDelta' | 
'BreakDamageAddedRatio' | 
'BreakDamageAddedRatioBase' | 
'AllDamageTypeResistance' | 
'PhysicalResistanceDelta' | 
'FireResistanceDelta' | 
'IceResistanceDelta' | 
'ThunderResistanceDelta' | 
'QuantumResistanceDelta' | 
'ImaginaryResistanceDelta' | 
'WindResistanceDelta' | 
'PhysicalPenetrate' | 
'FirePenetrate' | 
'IcePenetrate' | 
'ThunderPenetrate' | 
'QuantumPenetrate' | 
'ImaginaryPenetrate' | 
'WindPenetrate' | 
'AllDamageTypeTakenRatio' | 
'PhysicalTakenRatio' | 
'FireTakenRatio' | 
'IceTakenRatio' | 
'ThunderTakenRatio' | 
'QuantumTakenRatio' | 
'ImaginaryTakenRatio' | 
'WindTakenRatio' | 
'AllDamageTypeAddedRatio' | 
'DOTDamageAddedRatio' | 
'PhysicalAddedRatio' | 
'FireAddedRatio' | 
'IceAddedRatio' | 
'ThunderAddedRatio' | 
'QuantumAddedRatio' | 
'ImaginaryAddedRatio' | 
'WindAddedRatio' | 
'StanceBreakAddedRatio' | 
'AllDamageReduce' | 
'FatigueRatio' | 
'MinimumFatigueRatio' |
"FollowAddedRatio" | 
"UltAddedRatio" | 
"BasicAddedRatio" | 
"SkillAddedRatio" |
"UltCritDamage" |
"DefenceIgnore";