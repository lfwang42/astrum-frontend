"use client";

import { StatFormat } from "../../lib/utils";
import { useTranslations } from "next-intl";
type StatProps = {
  type: string;
  value: number;
};

export const StatDisplay: React.FC<StatProps> = ({ type, value }) => {
  const t = useTranslations();
  return (
    <div className="flex justify-start whitespace-nowrap gap-5">
      <div className="relative text-[12px]">
        {/* <img className="h-auto w-8 m-1" src={SPRITE_URL + set.icon} /> */}
        <span>{StatFormat[type](value)}</span>
        <span className=''>{` ${t(type)}`}</span>
      </div>
    </div>
  );
};
