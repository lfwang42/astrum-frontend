"use client";
import { useFormatter, useNow } from "next-intl";


type TProps = {
  str: string;
  relative?: boolean;
  updateNow?: boolean;
  // dateProps?: Object
};

export const TranslateDate: React.FC<TProps> = ({ str, relative, updateNow
  // dateProps 
}) => {
  const dateTime = new Date(str)
  const usenow = useNow({
    updateInterval: 1000 * 60 //update ever minute
  })
  const now = new Date()
  const format = useFormatter();
  if (!str.length) return <span>...</span>
  if (relative)   return <span>{format.relativeTime(dateTime, updateNow ? usenow : now)}</span>;
  else return <span className="whitespace-nowrap">{format.dateTime(dateTime)}</span>
};
