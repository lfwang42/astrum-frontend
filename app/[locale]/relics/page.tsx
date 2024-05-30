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
  { value: 'SpeedDelta', label: 'SpeedDelta' },
  { value: 'AttackDelta', label: 'AttackDelta' },
  { value: 'DefenceDelta', label: 'DefenceDelta' },
  { value: 'HPDelta', label: 'HPDelta' },
  { value: 'AttackAddedRatio', label: 'AttackAddedRatio' },
  { value: 'DefenceAddedRatio', label: 'DefenceAddedRatio' },
  { value: 'HPAddedRatio', label: 'HPAddedRatio' },
  { value: 'BreakDamageAddedRatio', label: 'BreakDamage' },
  { value: 'StatusResistance', label: 'StatusResistance' },
  { value: 'StatusProbability', label: 'StatusProbability' },
  { value: 'CriticalChance', label: 'CriticalChance' },
  { value: 'CriticalDamage', label: 'CriticalDamage' }
]
    return (
      <>
        <div className="container mx-auto py-10">
           <CustomTable
           fetchUrl={'/api/relics'}
           columns={columns} 
           params={p} 
           sortOptions={sortOptions}
           defaultSort='SpeedDelta'
           pagination/>
        </div>
      </>
    );
  }