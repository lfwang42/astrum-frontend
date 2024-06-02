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
  avatar_ids: Set<number>;
};

export const SimResultRound: React.FC<SimResultRoundProps> = ({
  trackedStat,
  prekey,
  log,
  avatar_ids,
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

  const roundMessage = (message: string) => {
    const arr = message.split('|')
    return (
      arr.map((str, index) => {
        if (str[0] == '@') {
          return <span key={index}>{str.slice(1)}</span>
        }
        else {
          return <Translate key={index} str={str}/>
        }
      })
    )
  }
  const roundResult = (res: SkillResult, prepend: boolean) => {
    if (res.type == "damage") {
      return (
        <span>
          {prepend ? " || " : ""}
          <Translate str="DamageDealt" />:{" "}
          <span
            className={`${
              avatar_ids.has(res.avatarId) && res.type == trackedStat
                ? "text-orange-400"
                : ""
            }`}
          >
            {res.value.toFixed(0)}
          </span>
        </span>
      );
    }
    else if (res.type == "shield") {
      return (
        <span>
          {prepend ? " || " : ""}
          <Translate str="Shield" />:{" "}
          <span
            className={`${
              avatar_ids.has(res.avatarId) && res.type == trackedStat
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
        {(log.energyGain.length || log.children.length || log.actionAdvance) ? expand ? <SlArrowUp /> : <SlArrowDown /> : null}
      </span>
      {expand ? (
        <div>
          <span className="text-center">
            {log.energyGain.map((epgain) => {
              if (!epgain) return null
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
            {log.actionAdvance?.map((advance) => {
              if (!advance) return null
              return (
                <span
                  key={`${prekey}-${log.id}-${advance.avatar_id}-advance`}
                  className="flex gap-1 justify-center items-center text-center"
                >
                  <Image
                    src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${advance.avatar_id}.png`}
                    width={20}
                    height={20}
                    unoptimized
                    alt="character image"
                  />
                  <Translate str={"ActionAdvance"} />
                  {": "}
                  {(advance.value * 100).toFixed(0) + "%"}
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
                  <Translate str={child.avatarId.toString()} />
                  {child.type != 'Message' ? <Translate str={child.type} /> : null}
                  {child.results.map((res, index) => {
                    return (
                      <span
                        key={`${prekey}-${child.id}-${child.avatarId}-${index}`}
                      >
                        {roundResult(res, false)}
                      </span>
                    );
                  })}
                  {child.message ? roundMessage(child.message) : null}
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
