import React from "react";
import { LeaderboardCone } from "../../app/types";
import { ConeDisplay } from "../ConeDisplay";
import Image from "next/image";
import Link from "next/link";
type ConeProps = {
  cones: Record<string, LeaderboardCone[]>;
  keyIndex: number;
};

export const EquipmentDisplay: React.FC<ConeProps> = ({ cones, keyIndex }) => {
  if (cones) {
    return (
      <div className="flex justify-start whitespace-nowrap gap-1">
        {Object.keys(cones).map((avatar_id) => {
          return (
            <div
              key={`${avatar_id}-conedisplay`}
              className="flex flex-row items-center"
            >
              {/* if its a team laderabord display the avatar picture*/ }
              {Object.keys(cones).length > 1 ? (
                <Image
                  width={40}
                  height={40}
                  className="w-[40px] h-auto m-[6px]"
                  src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${avatar_id}.png`}
                  alt="icon"
                  unoptimized
                />
              ) : null}
              {Object.values(cones[avatar_id]).map((cone) => {
                // console.log(cone)
                return (
                  <Link key={`${keyIndex}-${cone.tid}`} href={`/leaderboard/${cone.calc_id}`} className="hover:bg-slate-600">
                    <ConeDisplay
                      // name={cone.name.toString()}
                      name={'lightcone'}
                      tid={cone.tid}
                      imposition={cone.rank}
                      height={40}
                      width={40}
                    />
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
};
