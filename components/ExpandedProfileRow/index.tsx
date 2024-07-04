import { TableRow } from "../ui/table";
import { Translate } from "../Translate";
import { SkillTree, Point, Ascensions, Ascension } from "./skill_tree";
import { BuildRow } from "@/app/[locale]/profile/[uid]/columns";
import skillTree from "../../honker_skilltree.json";
import equipment from "../../honker_weps.json";
import { Eidolons } from "./eidolons";
import { Stats } from "./stats";
import { BuildRelicDisplay } from "../BuildRelicDisplay";
import axios from "axios";
import useSWR from "swr";
import { getAPIURL } from "@/lib/utils";
import Image from "next/image";

const SPRITE_URL = `https://enka.network/ui/hsr/`;

type ExpandedProfileRowProps = {
  row: BuildRow;
  cols: number;
};

export const ExpandedProfileRow: React.FC<ExpandedProfileRowProps> = ({
  row,
  cols,
}) => {



  const starPics: Record<number, string> = {
    3: '/misc/Rarity3.png',
    4: '/misc/Rarity4.png',
    5: '/misc/Rarity5.png',
  }

  const romans: Record<number, string> = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V'
  }

  const colors: Record<string, any> = {
    Thunder: {
      back: "bg-purple-500",
      border: "border-purple-400",
    },
    Imaginary: {
      back: "bg-amber-300",
      border: "border-amber-200",
    },
    Physical: {
      back: "bg-gray-300",
      border: "border-gray-200",
    },
    Wind: {
      back: "bg-green-600",
      border: "border-green-500",
    },
    Fire: {
      back: "bg-red-600",
      border: "border-red-500",
    },
    Quantum: {
      back: "bg-indigo-700",
      border: "border-indigo-500",
    },
    Ice: {
      back: "bg-sky-500",
      border: "border-sky-400",
    },
  };
  


  const getMaxLevel = (level: number |  undefined) => {
    if (!level) return 20
    const maxLvls: Record<number, number> = {
      1: 30,
      2: 40, 
      3: 50,
      4: 60,
      5: 70,
      6: 80
    }
    return maxLvls[level]
  }

  
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
  const cone_url = `https://enka.network/ui/hsr/SpriteOutput/LightConeFigures/${row.avatar.equipment.tid}.png`
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

  // console.log(row);

  return (
    <TableRow key={row.avatar_id + "expanded"} data-state={"selected"}>
      <td colSpan={150}>
        <div className="flex flex-col">
          <div className="flex flex-row bg-slate-800 max-h-[410px]">
            <div
              className="relative bg-no-repeat bg-contain w-80"
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent, #1E293B),
                url(${
                  SPRITE_URL +
                  "SpriteOutput/AvatarDrawCard/" +
                  row.avatar_id +
                  ".png"
                })`,
              }}
            >
              <div className="pt-5 pl-5 text-lg">
                <Translate str={row.avatar_id} />
              </div>
              <div className="pl-5 text-lg">
                <span>
                  {row.avatar.level} / {row.avatar.promotion * 10 + 20}
                </span>
              </div>
              <div className="absolute bottom-0 pl-5 pb-5">
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
            <div className="flex flex-col m-3">
              <div className="relative flex-col h-[92%]">
                <Image src={cone_url} width={200} height={400} alt="lightcone" className="w-auto h-[100%]"/>
                <Image src={starPics[equipment[row.avatar.equipment.tid.toString() as keyof typeof equipment].Rarity]} width={50} height={10} alt="lc stars" unoptimized className="w-auto h-auto absolute bottom-0 left-0"/>
              </div>
              <div className="flex flex-row gap-2 align-middle my-1 min-h-7 h-7">
                <span className="rounded-full w-7 h-7 text-center align-middle bg-gray-700 text-orange-300 p-1">{romans[row.avatar.equipment.rank]}</span>
                <span className="items-center align-bottom pt-1">Lvl. {row.avatar.equipment.level}/{getMaxLevel(row.avatar.equipment.promotion)}</span>
              </div>
            </div>
          </div>
          {!relics.isLoading ? <BuildRelicDisplay relics={relics.data} vertical/> : null}

        </div>
      </td>
    </TableRow>
  );
};
