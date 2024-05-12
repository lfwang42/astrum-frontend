"use client";
import Image from "next/image";
// import { useTranslation } from 'react-i18next';
import { useTranslations } from "next-intl";
type RelicProps = {
  icon: string;
  tid: number;
};

export const RelicDisplay: React.FC<RelicProps> = ({ icon, tid }) => {
  const t = useTranslations();
  return (
    <div className="flex justify-start whitespace-nowrap items-center gap-1 m-[2px]">
      <Image className="relative w-auto " src={icon} alt="" width={20} height={20} />
      <span className="">{t(tid.toString())}</span>
    </div>
  );
};
