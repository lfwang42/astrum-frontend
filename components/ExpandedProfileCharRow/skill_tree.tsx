import Image from "next/image";
import skills from "../../honker_skills.json";
import skilltree from "../../honker_skills.json";
const SPRITE_URL = `https://enka.network/ui/hsr/`;

interface Level {
  id: string;
  level: number;
  cappedLevel: number;
}

interface Point {
  id: string;
  level: number;
}

interface Ascension extends Point {
  statBonuses: [Point];
}

interface Ascensions {
  a2: Ascension;
  a4: Ascension;
  a6: Ascension;
}

type SkillTreeProps = {
  basic: Level;
  skill: Level;
  ult: Level;
  talent: Level;
  asc: Ascensions;
};

export const SkillTree: React.FC<SkillTreeProps> = ({
  basic,
  skill,
  ult,
  talent,
  asc,
}) => {
  const combatSkillIconClassName = "flex items-center";
  const displayStatBonuses = (asc: Ascension) => {
    // const statBonuses = [];
    // for (let i = 0; i < ; i++) {
    //     statsBonuses.push(<div />);
    // }
    // return <tbody>{statBonuses}</tbody>;
    // <hr className="h-1 border-spacing-0 bg-white"/>
    //       <Image
    //         className={asc.a2.level ? "opacity-100" : "opacity-30"}
    //         src={SPRITE_URL + skills[asc.a2.id as keyof typeof skills].IconPath}
    //         alt="Basic"
    //       />
  };
  console.log(asc.a2.level);
  return (
    <div className="flex-row p-0">
      <div className="flex-col p-0">
        <div className="relative text-center p-6">
          <Image
            className={combatSkillIconClassName}
            src={SPRITE_URL + skills[basic.id as keyof typeof skills].IconPath}
            alt="Basic"
          />
          <span className="absolute m-0">{basic.level}</span>
        </div>
        <div className="relative text-center p-6">
          <Image
            className={combatSkillIconClassName}
            src={SPRITE_URL + skills[skill.id as keyof typeof skills].IconPath}
            alt="Skill"
          />
          <span className="absolute m-0">{skill.level}</span>
        </div>
        <div className="relative text-center p-6">
          <Image
            className={combatSkillIconClassName}
            src={SPRITE_URL + skills[ult.id as keyof typeof skills].IconPath}
            alt="Ult"
          />
          <span className="absolute m-0">{basic.level}</span>
        </div>
        <div className="relative text-center p-6">
          <Image
            className={combatSkillIconClassName}
            src={SPRITE_URL + skills[talent.id as keyof typeof skills].IconPath}
            alt="Talent"
          />
          <span className="absolute m-0">{talent.level}</span>
        </div>
      </div>
      <div className="flex-col p-0">
        <div className="flex-row relative text-center p-6">
          <Image
            className={asc.a2.level ? "opacity-100" : "opacity-30"}
            src={SPRITE_URL + skills[asc.a2.id as keyof typeof skills].IconPath}
            alt="A2"
          />
        </div>
        <div className="flex-row relative text-center p-6">
          <Image
            className={asc.a2.level ? "opacity-100" : "opacity-30"}
            src={SPRITE_URL + skills[asc.a4.id as keyof typeof skills].IconPath}
            alt="A4"
          />
        </div>
        <div className="flex-row relative text-center p-6">
          <Image
            className={asc.a6.level ? "opacity-100" : "opacity-30"}
            src={SPRITE_URL + skills[asc.a2.id as keyof typeof skills].IconPath}
            alt="A6"
          />
        </div>
      </div>
    </div>
  );
};

// export const EquipmentDisplay: React.FC<ConeProps> = ({ cones, keyIndex }) => {
//   if (cones) {
//     return (
//       <div className="flex justify-start whitespace-nowrap gap-2">
//         {cones.map((cone) => {
//           return (
//             <ConeDisplay
//               key={`${keyIndex}-${cone.name}`}
//               name={cone.name.toString()}
//               icon={cone.icon}
//               imposition={cone.rank}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// };
