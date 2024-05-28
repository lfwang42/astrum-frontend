import { TableRow } from "../ui/table";
import { Translate } from "../Translate";
import { SkillTree, Point, Ascensions, Ascension } from "./skill_tree";
import { BuildRow } from "@/app/[locale]/profile/[uid]/columns";
import skillTree from "../../honker_skilltree.json";
import { Eidolons } from "./eidolons";
import { Stats } from "./stats";
// import * as Constants from "../constants";

const SPRITE_URL = `https://enka.network/ui/hsr/`;

type ExpandedProfileRowProps = {
  row: BuildRow;
  cols: number;
};

export const ExpandedProfileRow: React.FC<ExpandedProfileRowProps> = ({
  row,
  cols,
}) => {
  // const fetcher = (params: any) => {
  //   const [url, query] = params;
  //   const res = axios.get(url, query).then((res) => res.data);
  //   res.catch((error) => {
  //     console.log(error);
  //     throw error;
  //   });
  //   return res;
  // };

  // const relics = useSWR(
  //   [getAPIURL(`/api/relics`), { params: { build_id: row.bid } }],
  //   fetcher,
  //   {
  //     onErrorRetry: (error) => {
  //       return;
  //     },
  //   }
  // );

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

  console.log(row);

  return (
    <TableRow key={row.avatar_id + "expanded"} data-state={"selected"}>
      <td colSpan={100}>
        <div className="flex bg-slate-800">
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
            <div className="pt-5 pl-5">
              <Translate str={row.avatar_id} />
            </div>
            <div className="pl-5">
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
        </div>
      </td>
    </TableRow>
  );
};
