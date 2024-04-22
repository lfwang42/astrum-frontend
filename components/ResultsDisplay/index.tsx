import { User } from "@/app/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatRankNumber } from '../../lib/utils';
import { Router } from "next/router";
import Link from "next/link";

type ResultsProps = {
  user?: User
};

export const ResultsDisplay: React.FC<ResultsProps> = ({
    user
}) => {
  return (
    <div className="flex justify-start px-3 gap-2 m-2">
        {user ? (user.ranks.map((result) => {
            var best = result.results[0]
            for (let calcresult of result.results) {
                if (calcresult.rank > best.rank) best = calcresult
            }
            const topPercentage = Math.min(100, Math.ceil((best.rank / best.outof) * 100));
            return(
            <Link key={`result-${user.uid}-${result.avatar_id}`} href={`/leaderboard/${best.calc_id}/`}>
              <div  className="justify-center text-center bg-slate-700 p-2 hover:bg-slate-400 hover:border-sky-900 border-2 border-none">
              <span className="text-sm mb-1 font-medium">{result.score_name}</span>
              <div className="flex justify-start gap-1">
                    <Image src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${result.avatar_id}.png`} className="m-1" unoptimized quality={100} height={30} width={30}  alt="character image" />
                    <Image src={`/icon/${best.tid}.png`} className="r-0" height={30} width={30} alt="lightcone image" unoptimized />
                  </div>  
                  <div className="text-sm">{`Top ${topPercentage || "?"}%`}</div>
                  <span className="text-sm">{best.rank}/{formatRankNumber(best.outof)}</span>
                


      
              </div>
            </Link>)
        })) 
        : 
        <></>}
    </div>
  );
}
