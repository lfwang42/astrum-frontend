"use client";
import { useFormatter, useNow } from "next-intl";

type TProps = {
  str: string;
  relative?: boolean;
  updateNow?: boolean;
  dateProps?: Object
};

export const TranslateDate: React.FC<TProps> = ({ str, relative, updateNow, dateProps 
}) => {
  const dateTime = new Date(str)
  const usenow = useNow({
    updateInterval: 1000 * 60 //update every minute
  })
  const now = new Date()
  const unit = ((now.getTime() - dateTime.getTime()) > (1000 * 60 * 60 * 24) ? 'day' : 'hour')
  const format = useFormatter();
  if (!str.length) return <span>...</span>
  if (relative)   return <span>{format.relativeTime(dateTime, {now: updateNow ? usenow : now, ...dateProps, unit: unit})}</span>;
  else return <span className="whitespace-nowrap">{format.dateTime(dateTime, {timeZone: 'EST'} )}</span>
};
