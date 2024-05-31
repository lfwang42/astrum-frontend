"use client";
import { useFormatter } from "next-intl";


type TProps = {
  str: string;
  relative?: boolean;
  dateProps?: Object
};

export const TranslateDate: React.FC<TProps> = ({ str, relative, dateProps }) => {
  const dateTime = new Date(str)
  const format = useFormatter();
  if (relative)   return <span>{format.relativeTime(dateTime)}</span>;
  else return <span className="whitespace-nowrap">{format.dateTime(dateTime, dateProps)}</span>
};
