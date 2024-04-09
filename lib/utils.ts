import { Params } from "@/components/CustomTable"
import { type ClassValue, clsx } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getParamsFromUrl(searchParams: ReadonlyURLSearchParams, defaultSort?: string ): Params {

    const defaultParams: Params = {page: 1, order: 'desc', size: 20}
    if (defaultSort) defaultParams.sortStat = defaultSort
    if (searchParams.size === 0) {
      return defaultParams
    }
    else {
      const newParams: any = {}
      const it = searchParams.entries()
      searchParams.forEach((value, key) => {
        const actualValue = isNaN(+value) ? value : +value;
        if ((defaultParams as any)?.[key]?.toString() !== actualValue) {
          newParams[key] = actualValue;
        }
      })
      return {
        ...defaultParams,
        ...newParams
      }
    }
  }

export const StatFormat: Record<string, Function> = {
    "maxHP": formatFlat,
    "Attack": formatFlat,
    "Defence":formatFlat,
    "Speed":formatFlat,
    "CriticalChance":formatPercent,
    "CriticalDamage":formatPercent,
    "CriticalChanceBase":formatPercent,
    "CriticalDamageBase":formatPercent,
    "BreakDamageAddedRatioBase":formatPercent,
    'BreakDamageAddedRatio':formatPercent,
    "HealRatioBase":formatPercent,
    "HealRatio":formatPercent,
    "SPRatio":formatPercent,
    "SPRatioBase":formatPercent,
    'StatusProbability': formatPercent,
    "StatusProbabilityBase":formatPercent,
    "StatusResistance":formatPercent,
    "PhysicalAddedRatio":formatPercent,
    "FireAddedRatio":formatPercent,
    "IceAddedRatio":formatPercent,
    "ThunderAddedRatio":formatPercent,
    "WindAddedRatio":formatPercent,
    "QuantumAddedRatio":formatPercent,
    "ImaginaryAddedRatio":formatPercent,
    "HPDelta":formatFlat,
    "HPAddedRatio":formatPercent,
    "AttackDelta":formatFlat,
    "AttackAddedRatio":formatPercent,
    "DefenceDelta":formatFlat,
    "DefenceAddedRatio":formatPercent,
    "SpeedDelta":formatFlat,
    "atk": formatFlat,
    "def": formatFlat,
    "spd": formatFlat,
    "critDmg": formatPercent,
    "critRate": formatPercent,
    "breakEffect": formatPercent,
    "effectHitRate": formatPercent,
    'iceDamageBonus': formatPercent,
    'quantumDamageBonus': formatPercent,
    'fireDamageBonus': formatPercent,
    'windDamageBonus': formatPercent,
   'imaginaryDamageBonus': formatPercent,
    'physicalDamageBonus': formatPercent,
    'lightningDamageBonus': formatPercent,
    'healingBonus': formatPercent,
    'energyRecharge': formatPercent
}

function formatPercent(val: number): string {
    return (val * 100).toFixed(1) + "%"
}

function formatFlat(val: number): string {
    return val.toFixed(0)
}

export function getRegion(uid: number | string): string {
    if (uid) {
        const firstDigit = typeof uid === 'number' ? +uid.toString()[0] : +uid[0]
        switch (firstDigit) {
            case 1:
            case 2:
                return "CN"
            case 5:
                return "BL"
            case 6:
                return "NA"
            case 7: 
                return "EU"
            case 8:
                return "ASIA"
            case 9:
                return "TW"
        }
    }
    return "?"
}

export function getAPIURL(route: string): string {
    return process.env.NEXT_PUBLIC_API_HOST + route
}


const bonuses: {
    [key: string]: string;
  } = {
    "Ice": 'iceDamageBonus',
    "Quantum": 'quantumDamageBonus',
    'Fire': 'fireDamageBonus',
    'Wind': 'windDamageBonus',
    'Imaginary': 'imaginaryDamageBonus',
    'Physical': 'physicalDamageBonus',
    'Lightning': 'lightningDamageBonus'
  }


const rv: {
    [key: string]: number;
  } = {
    atk: 19,
    def: 19,
    spd: 2.3,
    maxHP: 38,
    critDmg: 0.058,
    critRate: 0.029,
    breakEffect: 0.058,
    effectHitRate: 0.038,
}

const threshold: {
    [key: string]: number;
  } = {
    atk: 1600,
    def: 1500,
    spd: 0,
    maxHP: 3500,
    critDmg: 1,
    critRate: 0.3,
    breakEffect: 0.2,
    effectHitRate: 0.3,
    healingBonus: 0.2,
    energyRecharge: 1.05
}

const sortOrder = [
    "spd", "healingBonus", "critDmg", "critRate", "atk", "breakEffect", "effectHitRate", "maxHP", "def", "energyRecharge" 
]

const padOrder = [ 
    "spd", "atk", "maxHP", "def", "energyRecharge", "critDmg", "critRate", "healingBonus"
]


function padStats(stats: string[], buildRow: any) {
    while (stats.length <= 5) {
        for (let stat of padOrder) {
            if (!stats.includes(stat)) {
                stats.push(stat);
                break;
            }
        }
    }
}

//just need 4 stats.  can ignore work for the rest.
export function getRelativeStats(buildRow: any, type: string) {

    const stats = buildRow.stats;
    const res = []
    if (type) {
        if (stats[bonuses[type]] > 0) {
            res.push(bonuses[type])
        }
    }

    for (let stat in threshold) {
        if (stats[stat] > threshold[stat] && res.length <= 5) res.push(stat) 
    }
    if (res.length < 5) padStats(res, buildRow);
    // function compare( a: any, b: any ) {
    //     if ( a.value < b.value ){
    //       return 1;
    //     }
    //     if ( a.value > b.value ){
    //       return -1;
    //     }
    //     return 0;
    // }
    // res.sort( compare )
    // console.log(res)
    return res;
}

export const formatRankNumber = (n: number) => {
    if (n > 9999) {
      const thousands = n / 1000;
  
      // if above 100k then dont show decimals
      if (thousands > 99) {
        return `${Math.round(thousands)}k`;
      }
  
      // if below 100k then show one decimal ( e.g. 56.6k )
      const rounded = thousands.toFixed(1);
  
      return `${rounded}k`;
    }
    return n;
  };