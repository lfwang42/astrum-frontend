"use client";
import { useFormatter } from "next-intl";

type TProps = {
  str: string;
};

export const TranslateDate: React.FC<TProps> = ({ str }) => {
  const format = useFormatter();
  const dateTime = new Date(str)
  return <span>{format.relativeTime(dateTime)}</span>;
};
