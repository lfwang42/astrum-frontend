"use client";
import { TableRow } from "../ui/table";
import { Translate } from "../Translate";
import { SkillTree, Point, Ascensions, Ascension } from "./skill_tree";
import { BuildRow } from "@/app/[locale]/profile/[uid]/columns";
import skillTree from "../../honker_skilltree.json";
import equipment from "../../honker_weps.json";
import chars from "../../honker_characters.json";
import { Eidolons } from "./eidolons";
import { Stats } from "./stats";
import { BuildRelicDisplay } from "../BuildRelicDisplay";
import axios from "axios";
import useSWR from "swr";
import { getAPIURL } from "@/lib/utils";
import { useEffect, useRef } from "react";
import Image from "next/image";
import ImageCanvas from "./imageCanvas";

const SPRITE_URL = `https://enka.network/ui/hsr/`;

type ExpandedProfileRowProps = {
  row: BuildRow;
  cols: number;
};

export const ExpandedProfileRow: React.FC<ExpandedProfileRowProps> = ({
  row,
  cols,
}) => {
  const avatar = row.avatar;
  const rarityStyle: Record<number, {stars: string, color: string}> = {
    3: {
      stars: "/misc/Rarity3.png",
      color: 'decoration-sky-300'
    } ,
    4: {
      stars: "/misc/Rarity4.png",
      color: 'decoration-purple-500'
    }, 
    5: {
      stars: "/misc/Rarity5.png",
      color: 'decoration-orange-400'
    } 
  };

  const romans: Record<number, string> = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
  };


  const colors: Record<
    string,
    {
      from: string;
      to: string;
      border: string;
      via?: string;
    }
  > = {
    Thunder: {
      from: "from-pink-900 ",
      to: "to-purple-950 ",
      border: " border-pink-700 ",
    },
    Imaginary: {
      from: "from-amber-600 ",
      to: "to-gray-700 ",
      via: 'via-yellow-600 ',
      border: "border-yellow-400 ",
    },
    Physical: {
      from: "from-slate-700 ",
      via: "via-gray-700 ",
      to: "to-gray-800 ",
      border: "border-gray-400 ",
    },     
    Wind: {
      from: "from-green-700 ",
      to: "to-teal-900 ",
      border: "border-green-500 ",
    },
    Fire: {
      from: "from-red-950 ",
      via: "via-red-800 ",
      to: "to-orange-800 ",
      border: "border-orange-600 ",
    },
    Quantum: {
      from: "from-purple-800 ",
      via: "via-purple-900 ",
      to: "to-fuchsia-950 ",
      border: "border-purple-600 ",
    },
    Ice: {
      from: "from-cyan-700 ",
      to: "to-sky-800 ",
      border: "border-sky-500 ",
    },
  };

  const getMaxLevel = (level: number | undefined) => {
    if (!level) return 20;
    const maxLvls: Record<number, number> = {
      1: 30,
      2: 40,
      3: 50,
      4: 60,
      5: 70,
      6: 80,
    };
    return maxLvls[level];
  };

  const fetcher = (params: any) => {
    const [url, query] = params;
    const res = axios.get(url, query).then((res) => res.data);
    res.catch((error) => {
      console.log(error);
      throw error;
    });
    return res;
  };

  const relics = useSWR(
    [getAPIURL(`/api/relics`), { params: { build_id: row.id } }],
    fetcher,
    {
      onErrorRetry: (error) => {
        return;
      },
    }
  );
  const cone_url = `https://enka.network/ui/hsr/SpriteOutput/LightConeFigures/${row.avatar.equipment.tid}.png`;
  let skillTreeMap = new Map<string, number>();
  for (let i = 0; i < row.avatar.skillTreeList.length; ++i) {
    skillTreeMap.set(
      row.avatar.skillTreeList[i].pointId.toString(),
      row.avatar.skillTreeList[i].level
    );
  }

  const createStatBonusesArray = () => {
    let statBonusPoints = [] as Point[];
    const ids =
      skillTree[row.avatar_id.toString() as keyof typeof skillTree]["1"];
    for (let i = 0; i < ids[3].length; ++i) {
      const level = skillTreeMap.get(ids[3][i]);
      if (level !== undefined)
        statBonusPoints.push({
          id: ids[3][i],
          level: level,
        });
    }
    return statBonusPoints;
  };

  const createAscObjects = () => {
    let ascensions = {} as Ascensions;
    const ids =
      skillTree[row.avatar_id.toString() as keyof typeof skillTree]["1"];
    for (let i = 0; i < 3; ++i) {
      let statBonusPoints = [];
      for (let j = 1; j < ids[i].length; ++j) {
        statBonusPoints.push({
          id: ids[i][j],
          level: skillTreeMap.get(ids[i][j]),
        } as Point);
      }
      switch (i) {
        case 0: {
          ascensions.a6 = {
            id: row.skill_levels.ascensions.a6.id,
            level: row.skill_levels.ascensions.a6.level,
            statBonuses: statBonusPoints,
          } as Ascension;
          break;
        }
        case 1: {
          ascensions.a4 = {
            id: row.skill_levels.ascensions.a4.id,
            level: row.skill_levels.ascensions.a4.level,
            statBonuses: statBonusPoints,
          } as Ascension;
          break;
        }
        case 2: {
          ascensions.a2 = {
            id: row.skill_levels.ascensions.a2.id,
            level: row.skill_levels.ascensions.a2.level,
            statBonuses: statBonusPoints,
          } as Ascension;
          break;
        }
      }
      statBonusPoints = [];
    }

    return ascensions;
  };

  const getCardColors = (avatar_id: number) => {
    const styleObj =
      colors[chars[avatar_id.toString() as keyof typeof chars].Element];
    const res = styleObj.border + styleObj.from + styleObj.to + (styleObj.via ? styleObj.via : "");
    return res;
  };


  return (
    <TableRow key={row.avatar_id + "expanded"} data-state={"selected"}>
      <td colSpan={150} className="bg-slate-800">
        <div
          className={`flex flex-col h-[90%] m-2 border-2 bg-gradient-to-b rounded-md 
          ${
            getCardColors(row.avatar_id)
          }`}
        >
          <div className="flex flex-row max-h-[430px] gap-1">
            <div
              className="relative 
              bg-no-repeat bg-contain 
              w-[300px] max-w-[300px] min-w-80 max-h-full h-[400px] overflow-hidden"
              // style={{
              //   backgroundImage: `
              //   linear-gradient(to bottom, transparent, #1E293B),
              //   url(${
              //     SPRITE_URL +
              //     "SpriteOutput/AvatarDrawCard/" +
              //     row.avatar_id +
              //     ".png"
              //   })`,
              // }}

              // style={{
              //   width: "300px",
              //   backgroundImage: `
              //   url(${
              //     SPRITE_URL +
              //     "SpriteOutput/AvatarDrawCard/" +
              //     row.avatar_id +
              //     ".png"
              //   })`,
              // }}
            >
              {/* <ImageCanvas
                backgroundImage={
                  SPRITE_URL +
                  "SpriteOutput/AvatarDrawCard/" +
                  row.avatar_id +
                  ".png"
                }
                className="absolute bg-no-repeat bg-contain h-[80%] w-80"
              /> */}
              {/* <div className="absolute"> */}
              <div className="relative top-0 left-0 h-[88%] w-[100%] max-w-[100%] overflow-hidden rounded-lg border-transparent border-2 mr-1">
                <ImageCanvas backgroundImage={SPRITE_URL +
                    "SpriteOutput/AvatarDrawCard/" +
                    row.avatar_id +
                    ".png"}/>
              </div>
              <div className="absolute flex flex-col top-1 left-1 z-10 pt-5 pl-5 text-lg [text-shadow:_0_2px_0_rgb(0_0_0_/_40%)]">
                <Translate str={row.avatar_id} />
                <span>
                  {row.avatar.level} / {row.avatar.promotion * 10 + 20}
                </span>
              </div>
              {/* </div> */}
              <div className="absolute bottom-0 pl-5">
                <Eidolons avatarId={row.avatar_id} eidolonLevel={row.eidolon} />
              </div>
            </div>
            <SkillTree
              basic={row.skill_levels.basic}
              statBonuses={createStatBonusesArray()}
              skill={row.skill_levels.skill}
              ult={row.skill_levels.ult}
              talent={row.skill_levels.talent}
              asc={createAscObjects()}
            />
            <Stats stats={row.stats} />
            <div className="flex flex-col my-1 w-[25%] mx-2">
              <div className="flex flex-col h-[91%] max-h-[91%]">
                <Translate
                  className={`text-base underline decoration-solid underline-offset-3 decoration-2
                    ${rarityStyle[
                      equipment[
                        row.avatar.equipment.tid.toString() as keyof typeof equipment
                      ].Rarity
                    ].color} [text-shadow:_0_2px_0_rgb(0_0_0_/_40%)]`}
                  str={row.avatar.equipment.tid}
                />
                <div className="relative h-[91%] max-h-[91%]">
                  <Image
                    src={cone_url}
                    width={200}
                    height={400}
                    alt="lightcone"
                    className="h-[100%] w-auto max-h-[100%]"
                  />
                  <Image
                    src={
                      rarityStyle[
                        equipment[
                          row.avatar.equipment.tid.toString() as keyof typeof equipment
                        ].Rarity
                      ].stars
                    }
                    width={50}
                    height={10}
                    alt="lc stars"
                    unoptimized
                    className="w-auto h-auto absolute bottom-0 left-[-10px]"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2 align-middle min-h-7 h-7 my-1">
                <span className="rounded-full w-7 h-7 text-center align-middle bg-gray-700 text-orange-300 p-1">
                  {romans[row.avatar.equipment.rank]}
                </span>
                <span className="items-center align-top text-lg ">
                  Lvl. {row.avatar.equipment.level}/
                  {getMaxLevel(row.avatar.equipment.promotion)}
                </span>
              </div>
            </div>
          </div>
          {!relics.isLoading ? (
            <BuildRelicDisplay relics={relics.data} vertical />
          ) : null}
        </div>
      </td>
    </TableRow>
  );
};
