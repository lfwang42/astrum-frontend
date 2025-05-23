import { SimLog } from "@/app/types";
import Image from "next/image";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useEffect, useState } from "react";
import { Translate } from "../Translate";
import axios from "axios";
import { getAPIURL } from "@/lib/utils";
import { SimResultRound } from "../SimResultRound";
const SPRITE_URL = `https://enka.network/ui/hsr/`;
const meme = "SPRITE_URL + set.icon";
type SimResultProps = {
  // logs: SimLog[][];
  avatar_id: number;
  cbid: number;
  calc_id: number | undefined;
};
export const SimResultDisplay: React.FC<SimResultProps> = ({
  avatar_id,
  cbid,
  calc_id,
}) => {
  const [trackedStat, setTrackedStat] = useState<string>("");
  const [trackedAvatars, setTrackedAvatars] = useState<Set<number>>(new Set())
  const [logs, setLogs] = useState<SimLog[][]>([]);
  const [expand, setExpand] = useState<Boolean>(false);
  const [roundExpand, setRoundExpand] = useState<Boolean[]>([]);
  const tempMap: Record<string, string> = {
    "1": "/avatar/phantalyia.webp",
    "2": "/avatar/destruction.webp",
    "3": "/avatar/abundance.webp",
  };
  useEffect(() => {
    const r = [];
    for (let log of logs) {
      r.push(false);
    }
    setRoundExpand(r);
  }, [logs]);

  const onExpand = async () => {
    if (logs.length == 0) {
      const res = await axios.get(getAPIURL("/api/simulation/"), {
        params: { bid: cbid, calc_id: calc_id },
      });
      setLogs(res.data.logs);
      setTrackedStat(res.data.trackedStat);
      console.log(res.data.trackedAvatars)
      setTrackedAvatars(new Set(res.data.trackedAvatars))
    }
    setExpand((prev) => {
      return !prev;
    });
  };
  if (calc_id) {
    return (
      <div
        key={`${cbid}-${calc_id}-sim-wrapper`}
        className="flex flex-col items-center align-middle p-1"
      >
        <div
          className="flex items-center gap-1 mx-auto hover:text-orange-300"
          onClick={onExpand}
        >
          {expand ? <Translate str="Hide" /> : <Translate str="Show" />} <Translate str="Result" />{" "}
          {expand ? <SlArrowUp /> : <SlArrowDown />}
        </div>
        {expand ? (
          <div className="flex-col gap-1">
            {logs.map((round, index) => {
              return (
                <div
                  key={`${cbid}-${calc_id}-sim-round-${index}`}
                  className="flex flex-col items-center align-middle p-1"
                >
                  <span
                    className="flex items-center gap-1 hover:text-orange-300"
                    onClick={() =>
                      setRoundExpand((prev) => {
                        const prevValue = prev[index];
                        const arr = [...prev];
                        arr.splice(index, 1, !prevValue);
                        return arr;
                      })
                    }
                  >
                    <Translate str={"Cycles"} /> {index + 1}
                    {roundExpand[index] ? <SlArrowUp /> : <SlArrowDown />}
                  </span>
                  {roundExpand[index] ? (
                    round.map((log, logind) => {
                      return (
                        <SimResultRound
                          trackedStat={trackedStat}
                          log={log}
                          key={`${cbid}-${calc_id}-sim-round-${index}-${logind}`}
                          prekey={`${cbid}-${calc_id}-${avatar_id}-sim-round-${index}`}
                          avatar_ids={trackedAvatars}
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
};
