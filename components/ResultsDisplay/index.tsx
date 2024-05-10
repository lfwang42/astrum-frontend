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
              <div className="justify-center align-middle text-center bg-slate-700 py-[4px] px-[6px] hover:bg-slate-400 max-w-28 min-h-34 hover:border-sky-900 border-2 border-none">
                <div className="flex align-middle items-center justify-center min-h-8">
                  <span className="text-center text-xs items-center align-middle font-medium text-wrap">
                    {best.score_name}
                  </span>
                </div>
                <div className="flex justify-center gap-[2px] mb-[1px]">
                  {avatar_ids?.map((avatar_id, index) => {
                    return (
                      <Image
                        key={`${user.uid}-${avatar_id}-${index}`}
                        src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${avatar_id}.png`}
                        className=""
                        unoptimized
                        height={28}
                        width={28}
                        alt="character image"
                      />
                    );
                  })}
                  <Image
                    src={`/icon/${best.tids[0]}.png`}
                    className="ml-1"
                    height={30}
                    width={30}
                    alt="lightcone image"
                    unoptimized
                  />
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
