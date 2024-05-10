import { User } from "@/app/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatRankNumber } from "../../lib/utils";
import { Router } from "next/router";
import Link from "next/link";

type ResultsProps = {
  user?: User;
};

export const ResultsDisplay: React.FC<ResultsProps> = ({ user }) => {
  return (
    <div className="flex justify-start px-2 gap-2 m-2">
      {user ? (
        user.ranks.map((result) => {
          var best = result.results[0];
          for (let calcresult of result.results) {
            if (calcresult.rank > best.rank) best = calcresult;
          }
          const topPercentage = Math.min(
            100,
            Math.ceil((best.rank / best.outof) * 100)
          );
          const avatar_ids = result.avatar_id.toString().match(/.{1,4}/g);

          return (
            <Link
              key={`result-${user.uid}-${result.avatar_id}`}
              href={`/leaderboard/${best.calc_id}/`}
            >
              <div className="justify-center align-middle text-center bg-slate-700 py-[1px] px-[4px] hover:bg-slate-400 max-w-28 min-h-[128px] hover:border-sky-900 border-2 border-none">
                <div className="flex align-middle items-center justify-center min-h-6">
                  <span className="text-center text-xs items-center align-middle font-medium text-wrap">
                    {best.score_name}
                  </span>
                </div>
                <div className={`flex ${avatar_ids?.length == 1 ? 'flex-row justify-center' : `flex-col`} items-center min-h-[50px]`} >
                  <div className="flex justify-center gap-[1px] mb-[1px]">
                  {avatar_ids?.map((avatar_id, index) => {
                    const size = avatar_ids.length == 1 ? 35 : 24

                    return (
                      <Image
                        key={`${user.uid}-${avatar_id}-${index}`}
                        src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${avatar_id}.png`}
                        className=""
                        unoptimized
                        height={size}
                        width={size}
                        alt="character image"
                      />
                    );
                  })}
                  </div>
                  <div className="flex justify-center gap-[1px]">
                  {best.tids.map((tid, index) => {
                    const size = avatar_ids?.length == 1 ? 35 : 24
                    return (
                      <Image
                        key={`${tid}-index`}
                        src={`/icon/${tid}.png`}
                        className=""
                        height={size}
                        width={size}
                        alt="lightcone image"
                        unoptimized
                      />
                    );
                  })}
                  </div>
                 
                </div>
                <div className="text-sm">{`Top ${topPercentage || "?"}%`}</div>
                <span className="text-sm">
                  {best.rank}/{formatRankNumber(best.outof)}
                </span>
              </div>
            </Link>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};
