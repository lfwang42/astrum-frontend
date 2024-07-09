'use client'

import { getAPIURL } from "@/lib/utils";
import { CustomTable, Params } from "../CustomTable";
import { columns } from "@/app/[locale]/profileColumns";
import { ProfilesContext } from "@/contexts/PinnedProfiles/ProfilesContext";
import { useContext, useMemo } from "react";
type ProfileProps = {
};

export const ProfileTable: React.FC<ProfileProps> = () => {
  const { profiles } = useContext(ProfilesContext);
  // console.log(profiles)
  const uidsQuery = useMemo(() => {
    const uids = profiles.map((p) => p.uid)
    let ret = ""
    uids.forEach((uid) => {
      if (!uid) return
      if (ret.length) ret += '|' 
      ret += uid.toString()
    })
    console.log('uids: ' + ret)
    return ret
  },
    [profiles.length]
  );

  const params: Params = {
    uids: uidsQuery
  }
  return (
    
    <div className="justify-start w-full min-w-[525px]">
      <CustomTable
      fetchUrl={"/api/profiles"}
      columns={columns}
      params={params}
      defaultSort="achievementCount"
      tableParams={uidsQuery}
      pagination
    />
    </div>
  );
  
};
