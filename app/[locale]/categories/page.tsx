import { columns } from './columns';
import { getAPIURL } from "@/lib/utils";
import { CustomTable } from "@/components/CustomTable";

export default async function Leaderboard() {
    return (
        <div className="h-screen container mx-auto py-3">
          <div className="h-20 container mx-auto mb-6 p-3">
            <span className=''>All leaderboards use your character and run it in an MOC simulator for 4 turns, taking the average result (e.g. average of crits, debuff application).  
              Your lightcone is overwritten and your character is capped at E0 (including skill levels).  You can view a simulations result for a build in its spot on the leaderboard.  
              Uncapped (e.g. no limits on Eidolons) leaderboards will be available soon.</span>
            </div>
          <CustomTable columns={columns} fetchUrl={getAPIURL('/api/categories')} defaultSort="" pagination={false}/>
        </div>
    );
  }