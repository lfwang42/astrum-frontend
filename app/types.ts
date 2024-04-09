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
    score_name: string,
    element: string,
    char_name: string,
    add_date: Date,
    char_icon: string,
    desc: string,
    calculations: LeaderboardCone[],
    count?: number
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

interface LeaderboardResults {
    avatar_id: number,
    results: CalcResult[]
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