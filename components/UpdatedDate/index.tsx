import React, { useEffect, useState } from "react";

type UpdatedDateProps = {
  lastUpdate?: string;
};

type Timestamp = {
  prefix?: string;
  value: number;
  text: string;
};

export const UpdatedDate: React.FC<UpdatedDateProps> = ({ lastUpdate }) => {
  const [timestamp, setTimestamp] = useState<Timestamp>({ value: 0, text: "" });

  const formatLastUpdate = () => {
    if (!lastUpdate) return { value: 0, text: "" };
    var updateMS = new Date(Date.parse(lastUpdate)).getTime();
    const now = new Date().getTime();
    const then = Math.abs(updateMS - now);

    const secondsCount = +(then / 1000).toFixed(0);
    const minutesCount = +(secondsCount / 60).toFixed(0);
    const hoursCount = +(minutesCount / 60).toFixed(0);
    const daysCount = +(hoursCount / 24).toFixed(0);

    const oneMinute = 1000 * 60;
    if (then < oneMinute) {
      return { prefix: "<", value: 1, text: ` minute ago` };
    }
    const oneHour = oneMinute * 60;
    if (then < oneHour) {
      return { value: minutesCount, text: ` minute(s) ago` };
    }
    const oneDay = oneHour * 24;
    if (then < oneDay) {
      return { value: hoursCount, text: ` hour(s) ago` };
    }
    return { value: daysCount, text: ` day(s) ago` };
  };

  useEffect(() => {
    // initial set
    setTimestamp(formatLastUpdate());
    // update every minute
    const updateTimer = setInterval(() => {
      const ts = formatLastUpdate();
      setTimestamp(ts);
    }, 60000);

    return () => clearInterval(updateTimer);
  }, [lastUpdate]);

  if (!timestamp) return null;

  return (
    <span className="text-slate-200 text-base">
      <span>{timestamp.value ? "Refreshed " : ""}</span>
      <span>{timestamp.prefix ? timestamp.prefix : <></>}</span>{" "}
      <span>{timestamp.value ? timestamp.value : null}</span>
      <span>{timestamp.text}</span>
    </span>
  );
};
