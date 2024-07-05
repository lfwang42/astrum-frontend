"use client";
import { useTranslations } from "next-intl";

type TProps = {
  str: string | number;
  className?: string;
};

export const Translate: React.FC<TProps> = ({ str, className }) => {
  const t = useTranslations();
  return <span className={className? className : ""}>{t(str.toString())}</span>;
};
