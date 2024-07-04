import Image from "next/image";
import skills from "../../honker_skills.json";
const SPRITE_URL = `https://enka.network/ui/hsr/`;

interface Level {
  id: string;
  level: number;
  cappedLevel: number;
}

// The level property should be treated as a boolean (i.e. activated or not)
export interface Point {
  id: string;
  level: number;
}

export interface Ascension extends Point {
  statBonuses: Point[];
}

export interface Ascensions {
  a2: Ascension;
  a4: Ascension;
  a6: Ascension;
}

type SkillTreeProps = {
  basic: Level;
  statBonuses: Point[];
  skill: Level;
  ult: Level;
  talent: Level;
  asc: Ascensions;
};

export const SkillTree: React.FC<SkillTreeProps> = ({
  basic,
  statBonuses,
  skill,
  ult,
  talent,
  asc,
}) => {
  const combatSkillIconClassName = "flex items-center";
  const combatSkillContainerClassName = "relative items-center p-5";
  const largerIconSize = 40;
  const smallerIconSize = 25;

  const displayStatBonuses = (statBonuses: Point[]) => {
    const statBonusDivs = [];
    for (let i = 0; i < statBonuses.length; ++i) {
      statBonusDivs.push(
        // Adding unique key here surpresses warning
        <div key={i} className="flex items-center">
          <Image
            className={
              statBonuses[i].level ? "opacity-100 p-1" : "opacity-30 p-1"
            }
            src={
              SPRITE_URL +
              skills[statBonuses[i].id as keyof typeof skills].IconPath
            }
            alt="Stat Bonus" // TODO: Shouldn't be hardcoded
            width={smallerIconSize}
            height={smallerIconSize}
          />
          <hr
            className={
              i === statBonuses.length - 1 ? "hidden" : "h-0.5 w-2 bg-white"
            }
          />
        </div>
      );
    }
    return <div className="flex">{statBonusDivs}</div>;
  };

  const displayAscStatBonuses = (asc: Ascension) => {
    const statBonusDivs = [];
    for (let i = 0; i < asc.statBonuses.length; ++i) {
      statBonusDivs.push(
        // Adding unique key here surpresses warning
        <div key={i} className="flex items-center">
          <Image
            className={
              asc.statBonuses[i].level ? "opacity-100 p-1" : "opacity-30 p-1"
            }
            src={
              SPRITE_URL +
              skills[asc.statBonuses[i].id as keyof typeof skills].IconPath
            }
            alt="Stat Bonus" // TODO: Shouldn't be hardcoded
            width={smallerIconSize}
            height={smallerIconSize}
          />
          <hr
            className={
              i === asc.statBonuses.length - 1 ? "hidden" : "h-0.5 w-2 bg-white"
            }
          />
        </div>
      );
    }
    return <div className="flex">{statBonusDivs}</div>;
  };

  return (
    <div className="flex-col m-1  ml-0">
      <div className="flex">
        <div className={combatSkillContainerClassName}>
          <Image
            className={combatSkillIconClassName}
            src={SPRITE_URL + skills[basic.id as keyof typeof skills].IconPath}
            alt="Basic"
            width={largerIconSize}
            height={largerIconSize}
          />
          <span className="absolute -m-2 left-14">{basic.level}</span>
        </div>
        <div className="flex items-center">
          {displayStatBonuses(statBonuses)}
        </div>
      </div>
      <div className="flex">
        <div className={combatSkillContainerClassName}>
          <Image
            className={combatSkillIconClassName}
            src={SPRITE_URL + skills[skill.id as keyof typeof skills].IconPath}
            alt="Skill"
            width={largerIconSize}
            height={largerIconSize}
          />
          <span className="absolute -m-2 left-14">{skill.level}</span>
        </div>
        <div className="flex items-center">
          <Image
            className={asc.a2.level ? "opacity-100" : "opacity-30"}
            src={SPRITE_URL + skills[asc.a2.id as keyof typeof skills].IconPath}
            alt="A2"
            width={largerIconSize}
            height={largerIconSize}
          />
          {displayAscStatBonuses(asc.a2)}
        </div>
      </div>
      <div className="flex">
        <div className={combatSkillContainerClassName}>
          <Image
            className={combatSkillIconClassName}
            src={SPRITE_URL + skills[ult.id as keyof typeof skills].IconPath}
            alt="Ult"
            width={largerIconSize}
            height={largerIconSize}
          />
          <span className="absolute -m-2 left-14">{ult.level}</span>
        </div>
        <div className="flex items-center">
          <Image
            className={asc.a4.level ? "opacity-100" : "opacity-30"}
            src={SPRITE_URL + skills[asc.a4.id as keyof typeof skills].IconPath}
            alt="A4"
            width={largerIconSize}
            height={largerIconSize}
          />
          {displayAscStatBonuses(asc.a4)}
        </div>
      </div>
      <div className="flex">
        <div className={combatSkillContainerClassName}>
          <Image
            className={combatSkillIconClassName}
            src={SPRITE_URL + skills[talent.id as keyof typeof skills].IconPath}
            alt="Talent"
            width={largerIconSize}
            height={largerIconSize}
          />
          <span className="absolute -m-2 left-14">{talent.level}</span>
        </div>
        <div className="flex items-center">
          <Image
            className={asc.a6.level ? "opacity-100" : "opacity-30"}
            src={SPRITE_URL + skills[asc.a6.id as keyof typeof skills].IconPath}
            alt="A6"
            width={largerIconSize}
            height={largerIconSize}
          />
          {displayAscStatBonuses(asc.a6)}
        </div>
      </div>
    </div>
  );
};
