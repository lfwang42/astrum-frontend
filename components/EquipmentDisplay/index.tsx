import React from "react";
import { LeaderboardCone } from "../../app/types";
import { ConeDisplay } from "../ConeDisplay";
import Image from "next/image";
import Link from "next/link";
type ConeProps = {
  cones: Record<string, Record<string, LeaderboardCone>>;
  keyIndex: number;
};

export const EquipmentDisplay: React.FC<ConeProps> = ({ cones, keyIndex }) => {
  if (cones) {
    return (
      <div className="flex justify-start whitespace-nowrap gap-1">
        {Object.entries(cones).map((aid) => {
          return (
            <div
              key={`${aid[0]}-conedisplay`}
              className="flex flex-row items-center"
            >
              {Object.keys(cones).length > 1 ? (
                <Image
                  width={25}
                  height={25}
                  className="w-auto h-7 m-1"
                  src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${aid[0]}.png`}
                  alt="icon"
                  unoptimized
                />
              ) : null}
              {Object.values(aid[1]).map((cone) => {
                return (
                  <Link key={`${keyIndex}-${cone.name}`} href={`/leaderboard/${cone.calc_id}`} className="hover:bg-slate-600">
                    <ConeDisplay
                      name={cone.name.toString()}
                      icon={cone.icon}
                      imposition={cone.rank}
                      height={42}
                      width={25}
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
