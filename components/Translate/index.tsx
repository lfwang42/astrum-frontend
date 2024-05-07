"use client";
import { useTranslations } from "next-intl";

type TProps = {
  str: string | number;
};

export const Translate: React.FC<TProps> = ({ str }) => {
  const t = useTranslations();
  return <span>{t(str.toString())}</span>;
};
