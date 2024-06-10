"use client";
import axios from "axios";
import { TableRow } from "../ui/table";
import { StatFormat, getAPIURL } from "@/lib/utils";
import useSWR from "swr";
import { StatIcon } from "../StatIcon";
import { RelicCanvas } from "../RelicCanvas";
import { SimResultDisplay } from "../SimResult";
import skills from "../../honker_skills.json";
import Image from "next/image";
const SPRITE_URL = `https://enka.network/ui/hsr/`;
interface Relic {
  type: number;
  tid: number;
  stats: Record<string, number>;
  set_id: number;
  main_stat_value: number;
  main_stat_name: string;
}

type ExpandedBuildRowProps = {
  row: any;
  cols: number;
  calc_id?: number;
};

interface Level {
  id: string;
  level: number;
  cappedLevel: number;
}

interface Point {
  id: string;
  level: number;
}
interface Ascensions {
  a2: Point;
  a4: Point;
  a6: Point;
}

export interface SkillLevels {
  basic: Level;
  skill: Level;
  ult: Level;
  talent: Level;
  ascensions: Ascensions;
}

export const ExpandedBuildRow: React.FC<ExpandedBuildRowProps> = ({
  row,
  cols,
  calc_id,
}) => {
  function fetcher(params: any) {
    const [url, query] = params;
    const res = axios.get(url, query).then((res) => res.data)
    .then((data) =>  data.sort((a: Relic, b: Relic) => (a.tid % 10 > b.tid % 10 ? 1 : -1))
  );
    res.catch((error) => {
      console.log(error);
      throw error;
    });
    return res;
  }
  // console.log(row.eidolon != undefined ? row.eidolon : 'undefined eidolon')
  const displayAscension = (asc: Ascensions) => {
    const skillclass = "flex items-center";
    const iconSize = 30;
    return (
      <div className="flex justify-start gap-2 m-2">
        <div className={skillclass}>
          <Image
            className={`${asc.a2.level ? "opacity-100" : "opacity-30"}`}
            src={SPRITE_URL + skills[asc.a2.id as keyof typeof skills].IconPath}
            width={iconSize}
            height={iconSize}
            alt={"a2"}
          />
        </div>
        <div className={skillclass}>
          <Image
            className={asc.a4.level ? "opacity-100" : "opacity-30"}
            src={SPRITE_URL + skills[asc.a4.id as keyof typeof skills].IconPath}
            width={iconSize}
            height={iconSize}
            alt={"a4"}
          />
        </div>
        <div className={skillclass}>
          <Image
            className={asc.a6.level ? "opacity-100" : "opacity-30"}
            src={SPRITE_URL + skills[asc.a6.id as keyof typeof skills].IconPath}
            width={iconSize}
            height={iconSize}
            alt={"a6"}
          />
        </div>
      </div>
    );
  };
  const displaySkills = (skill_levels: SkillLevels) => {
    // console.log(skill_levels)
    const skillclass = "flex gap-1 items-center";
    const iconSize = 30;
    return (
      <div className="flex justify-start gap-2 my-2">
        <div className={skillclass}>
          <Image
            src={
              SPRITE_URL +
              skills[skill_levels.basic.id as keyof typeof skills].IconPath
            }
            width={iconSize}
            height={iconSize}
            alt={"basic"}
          />
          <span
            className={`font-medium bg-slate-900  rounded-xl py-[2px] px-2 ${
              skill_levels.basic.level > 6 ? "text-cyan-400" : "text-gray-100"
            }`}
          >
            {skill_levels.basic.level}
          </span>
        </div>
        <div className={skillclass}>
          <Image
            src={
              SPRITE_URL +
              skills[skill_levels.skill.id as keyof typeof skills].IconPath
            }
            width={iconSize}
            height={iconSize}
            alt={"skill"}
          />
          <span
            className={`font-medium  bg-slate-900 rounded-xl py-[2px] px-2 ${
              skill_levels.skill.level > 10 ? "text-cyan-400" : "text-gray-100"
            }`}
          >
            {skill_levels.skill.level}
          </span>
        </div>
        <div className={skillclass}>
          <Image
            src={
              SPRITE_URL +
              skills[skill_levels.ult.id as keyof typeof skills].IconPath
            }
            width={iconSize}
            height={iconSize}
            alt={"ult"}
          />
          <span
            className={`font-medium  bg-slate-900 rounded-xl py-[2px] px-2 ${
              skill_levels.ult.level > 10 ? "text-cyan-400" : "text-gray-100"
            }`}
          >
            {skill_levels.ult.level}
          </span>
        </div>
      </div>
    );
  };

  const relics = useSWR(
    [getAPIURL(`/api/relics`), { params: { build_id: row.bid } }],
    fetcher,
    {
      onErrorRetry: (error) => {
        return;
      },
    }
  );

  return (
    <TableRow key={row.id + "expanded"} data-state={"selected"}>
      <td colSpan={100}>
        <div className="bg-slate-800 flex justify-center items-center pl-3 pt-[2px] whitespace-nowrap gap-2">
          <Image
            alt={/*t*/ row.avatar_id.toString()}
            src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${row.avatar_id}.png`}
            width={30}
            height={30}
            className="h-8 w-auto"
          />
          {displaySkills(row.skill_levels)}
          {displayAscension(row.skill_levels.ascensions)}
        </div>
        <div className="bg-slate-800 flex flex-wrap justify-center whitespace-normal gap-[1px] overflow-auto">
          {!relics.isLoading ? (
            relics.data.map((relic: Relic) => {
              const img_url = `https://enka.network/ui/hsr/SpriteOutput/ItemIcon/RelicIcons/IconRelic_${relic.set_id}_${relic.tid.toString().slice(-1)}.png`

              return (
                <div
                  key={row.id + relic.tid.toString()}
                  className="flex justify-center items-center border-slate-400 border-2 p-[2px] min-w-[155px] w-[15%]"
                >
                  <div className="justify-center">
                    <RelicCanvas backgroundImage={img_url} />
                    {/* <Image src={relic.icon} alt="" height={50} width={50}  /> */}
                    <div className="bg-slate-800 flex justify-start items-center text-sm">
                      <StatIcon stat={relic.main_stat_name}/>
                      <span>
                        {" "}
                        {StatFormat[relic.main_stat_name](
                          relic.main_stat_value
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="justify-start">
                    {Object.keys(relic.stats).map((stat) => {
                      return (
                        <div
                          key={row.id + relic.tid + stat}
                          className="bg-slate-800 flex justify-start items-center text-[13px] gap-0"
                        >
                          <StatIcon stat={stat} size={6} />
                          <span> {StatFormat[stat](relic.stats[stat])}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className="bg-slate-700">
          <SimResultDisplay
            cbid={row.cbid}
            calc_id={calc_id}
            avatar_id={row.avatar_id}
          />
        </div>
      </td>
    </TableRow>
  );
};
