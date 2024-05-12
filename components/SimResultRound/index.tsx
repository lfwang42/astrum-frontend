import { SimLog, SkillResult } from "@/app/types";
import Image from "next/image";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useEffect, useState } from "react";
import { Translate } from "../Translate";
const SPRITE_URL = `https://enka.network/ui/hsr/`;
type SimResultRoundProps = {
  trackedStat: string;
  prekey: string;
  log: SimLog;
  avatar_id: number;
};

export const SimResultRound: React.FC<SimResultRoundProps> = ({
  trackedStat,
  prekey,
  log,
  avatar_id,
}) => {
  const [expand, setExpand] = useState<Boolean>(false);
  const tempMap: Record<string, string> = {
    "2": "/avatar/phantalyia.webp",
    "1": "/avatar/destruction.webp",
    "3": "/avatar/abundance.webp",
  };

  const getImgURL = (id: number) => {
    if (tempMap[id.toString()] != undefined) {
      return tempMap[id.toString()];
    } else {
      return `https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${id}.png`;
    }
  };

  const roundAvatarId = log.avatarId;
  var src = getImgURL(roundAvatarId);

  const roundResult = (res: SkillResult, prepend: boolean) => {
    if (res.type == "damage") {
      return (
        <span>
          {prepend ? " || " : ""}
          <Translate str="DamageDealt" />:{" "}
          <span
            className={`${
              res.avatarId == avatar_id && res.type == trackedStat
                ? "text-orange-400"
                : ""
            }`}
          >
            {res.value.toFixed(0)}
          </span>
        </span>
      );
    }
    if (res.type == "shield") {
      return (
        <span>
          {prepend ? " || " : ""}
          <Translate str="Shield" />:{" "}
          <span
            className={`${
              res.avatarId == avatar_id && res.type == trackedStat
                ? "text-orange-400"
                : ""
            }`}
          >
            {res.value.toFixed(0)}
          </span>
        </span>
      );
    }
    return <></>;
  };

  return (
    <div
      key={`${prekey}-${log.id}`}
      className="flex flex-col items-center align-middle"
      onClick={() => setExpand((prev) => !prev)}
    >
      {/* results display (ie.. seele -> enemy | damage) */}
      <span className="flex gap-1 items-center">
        <Image
          src={src}
          width={25}
          height={25}
          unoptimized
          alt="character image"
        />
        <Translate str={log.avatarId.toString()} /> <Translate str={log.type} />
        {log.target ? (
          <span>
            {"--> "}
            <Translate str={log.target.toString()} />
          </span>
        ) : (
          <></>
        )}
        {log.results.map((res) => {
          return (
            <span key={`${prekey}-${log.id}-${res.type}`}>
              {roundResult(res, true)}
            </span>
          );
        })}
        {log.childDamage > 0 ? (
          <span>
            {" || Damage Received: "}
            {log.childDamage.toFixed(0)}
          </span>
        ) : (
          <></>
        )}
        {expand ? <SlArrowUp /> : <SlArrowDown />}
      </span>
      {expand ? (
        <div>
          <span className="text-center">
            {log.energyGain.map((epgain) => {
              return (
                <span
                  key={`${prekey}-${log.id}-${epgain.avatar_id}-energy`}
                  className="flex gap-1 justify-center items-center text-center"
                >
                  <Image
                    src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${epgain.avatar_id}.png`}
                    width={20}
                    height={20}
                    unoptimized
                    alt="character image"
                  />
                  <Translate str={"EnergyGained"} />
                  {": "}
                  {epgain.energyGained.toFixed(1)}
                  {" || "}
                  <Translate str={"Energy"} />
                  {": "}
                  {epgain.energy.toFixed(0)}
                </span>
              );
            })}
          </span>
          <span className="text-center">
            {log.children.map((child) => {
              return (
                // <div >
                <span
                  key={`${prekey}-${child.id}-${child.avatarId}`}
                  className="flex gap-1 justify-center items-center text-center"
                >
                  <Image
                    src={getImgURL(child.avatarId)}
                    width={20}
                    height={20}
                    unoptimized
                    alt="character image"
                  />
                  <Translate str={child.avatarId.toString()} />{" "}
                  <Translate str={child.type} />
                  {child.results.map((res, index) => {
                    return (
                      <span
                        key={`${prekey}-${child.id}-${child.avatarId}-${index}`}
                      >
                        {roundResult(res, false)}
                      </span>
                    );
                  })}
                  {child.message ? ": " + child.message : ""}
                </span>
                // </div>
              );
            })}
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
