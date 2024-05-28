import Image from "next/image";
import ranks from "../../honker_ranks.json";
import characters from "../../honker_characters.json";
import lock from "../../public/lock.svg";
const SPRITE_URL = `https://enka.network/ui/hsr/`;

type EidolonsProps = {
  avatarId: number;
  eidolonLevel: number;
};

export const Eidolons: React.FC<EidolonsProps> = ({
  avatarId,
  eidolonLevel,
}) => {
  const eidolonDivs = [];
  const eidolonIds =
    characters[avatarId.toString() as keyof typeof characters].RankIDList;
  for (let i = 0; i < 6; ++i) {
    console.log(eidolonLevel);
    eidolonDivs.push(
      // Adding unique key here surpresses warning
      <div key={i} className="flex items-center justify-center">
        <Image
          className={
            eidolonLevel >= i + 1 ? "opacity-100 p-1" : "opacity-30 p-1"
          }
          src={
            SPRITE_URL +
            ranks[eidolonIds[i].toString() as keyof typeof ranks].IconPath
          }
          alt="Eidolon" // TODO: Shouldn't be hardcoded
          width="45"
          height="45"
        />
        <Image
          className={eidolonLevel >= i + 1 ? "hidden" : "absolute"}
          src={lock}
          alt="Locked" // TODO: Shouldn't be hardcoded
          width="15"
          height="15"
        />
      </div>
    );
  }
  return <div className="flex">{eidolonDivs}</div>;
};
