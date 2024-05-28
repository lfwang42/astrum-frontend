"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
type RelicProps = {
  set_id: number;
  tid: number;
};

export const RelicDisplay: React.FC<RelicProps> = ({ set_id, tid }) => {
  const t = useTranslations();
  const img_url = `https://enka.network/ui/hsr/SpriteOutput/ItemIcon/RelicIcons/IconRelic_${set_id}_${tid.toString().slice(-1)}.png`
  return (
    <div className="flex justify-start whitespace-nowrap items-center gap-1 m-[2px]">
      <Image className="relative w-auto " src={img_url} alt="" width={20} height={20} />
      <span className="">{t(tid.toString())}</span>
    </div>
  );
};
