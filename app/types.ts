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
    calc_id: number,
    name: string,
    promotion: number, 
    rank: number, 
    level: number,
    icon: string
}
 