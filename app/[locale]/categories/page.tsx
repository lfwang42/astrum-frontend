import { columns } from './columns';
import { getAPIURL } from "@/lib/utils";
import { CustomTable } from "@/components/CustomTable";
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Categories',
}
export default async function Leaderboard() {
    return (
        <div className="min-h-screen container mx-auto py-3">
          <div className="h-20 container mx-auto mb-6 p-3">
            <span className=''>All leaderboards use your character and run it in an MOC simulator for 4 turns, taking the average result (e.g. average of crits, debuff application).  
              Your lightcone is overwritten and your character is capped at E0 (including skill levels).  <span className='font-bold'>Only your relics and talent levels matter.</span>   You can view a simulations result for a build in its spot on the leaderboard.  
            </span>
            </div>
          <CustomTable columns={columns} fetchUrl={'/api/categories'} defaultSort="count" pagination={false}/>
        </div>
    );
  }