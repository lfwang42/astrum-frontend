import React from "react";
import { LeaderboardCone } from "../../app/types";
import { ConeDisplay } from "../ConeDisplay";
type ConeProps = {
  cones: Record<string, Record<string, LeaderboardCone>>;
  keyIndex: number;
};

export const EquipmentDisplay: React.FC<ConeProps> = ({ cones, keyIndex }) => {
  if (cones) {
    return (
      <div className="flex justify-start whitespace-nowrap gap-2">
        {Object.entries(cones).map((aid) => {
          return (
            <React.Fragment key={`${aid[0]}-conedisplay`}>
            {Object.values(aid[1]).map((cone) => {
                return (
                  <ConeDisplay
                    key={`${keyIndex}-${cone.name}`}
                    name={cone.name.toString()}
                    icon={cone.icon}
                    imposition={cone.rank}
                  />
                );
              })
            }
            </React.Fragment>
          )
        })}
      </div>
    );
  }
};
