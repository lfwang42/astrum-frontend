'use client'
import { columns } from './columns';
import { useSearchParams } from 'next/navigation'
import { getAPIURL } from "@/lib/utils";
import { CustomTable, Params } from '@/components/CustomTable';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Relics() {
  const t = useTranslations();

  const p: Params = {
    pageSize: 20,
    sortStat: 'SpeedDelta'
  }
  
  useEffect(() => {
    const str = t('Relics')
    document.title = str
  }, [])
  
const sortOptions =
[
  { value: 'SpeedDelta', label: 'Speed' },
  { value: 'AttackDelta', label: 'Flat Attack' },
  { value: 'DefenceDelta', label: 'Flat Defence' },
  { value: 'HPDelta', label: 'Flat HP' },
  { value: 'AttackAddedRatio', label: 'Attack%' },
  { value: 'DefenceAddedRatio', label: 'Defence%' },
  { value: 'HPAddedRatio', label: 'HP%' },
  { value: 'BreakDamageAddedRatio', label: 'Break Effect' },
  { value: 'StatusResistance', label: 'Effect Res' },
  { value: 'StatusProbability', label: 'Effect Hit Rate' },
  { value: 'SPRatio', label: 'Energy Regen' },
  { value: 'CriticalChance', label: 'Crit Chance' },
  { value: 'CriticalDamage', label: 'Crit DMG' }
]
    return (
      <>
        <div className="container mx-auto py-10">
           <CustomTable
           tableParams={
              {table: 'relics'}
           }
           fetchUrl={getAPIURL('/api/relics')}
           columns={columns} 
           params={p} 
           sortOptions={sortOptions}
           defaultSort='SpeedDelta'
           pagination/>
        </div>
      </>
    );
  }