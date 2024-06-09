"use client";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { AvatarCategory } from "../../../types";
import { ConeDisplay } from "@/components/ConeDisplay";
import {
  StatFormat,
  getAPIURL,
  getParamsFromUrl,
  getRegion,
  getRelativeStats,
} from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { CoreStats, SetInfo } from "../../../types";
import { SetDisplay } from "../../../../components/SetDisplay/index";
import { CustomTable } from "@/components/CustomTable";
import React from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { StatIcon } from "@/components/StatIcon";
import Image from "next/image";
import { Translate } from "@/components/Translate";
import { TeamDisplay } from "@/components/TeamDisplay";
import avatar from "../../../assets/icon/AvatarIconGray.png";
import calcdetails from "../../../calcdetails.json";
import Link from "next/link";
import NoPrefetchLink from "@/components/NoFetchLink";
export type LeaderboardRow = {
  avatar_id: number;
  region: string;
  rank: number;
  bid: number;
  uid: number;
  score: number;
  crit_value: number;
  stats: CoreStats;
  nickname: string;
  platform: string;
  calc_name: string;
  sets: SetInfo[];
  cone_tid?: number;
  cone_rank?: number;
  cone_level?: number;
  eidolon?: number;
};

function fetcher(params: any) {
  const [url, query] = params;
  const res = axios.get(url, query).then((res) => res.data);
  res.catch((error) => {
    console.log(error);
    throw error;
  });
  // axios.get(url, query).
  //   then(res => { return res.data })
  return res;
}

export default function Leaderboard({
  params,
}: {
  params: { calc_id: number };
}) {
  const capped = calcdetails[params.calc_id.toString() as keyof typeof calcdetails].capped
  const cids = params.calc_id.toString().match(/.{1,6}/g);
  var team_id = "";
  const aidOrdered: string[] = [];
  const a_ids: Record<string, string> = {};
  for (let cid of cids!) {
    const aid: string = cid.slice(0, 4);
    const calc: string = cid.slice(-2);
    aidOrdered.push(aid);
    a_ids[aid] = calc;
    team_id = team_id + aid;
  }

  useEffect(() => {
    document.title = "Leaderboards"
  }, [])
  const generateURL = (avatar_id: string, calc: string) => {
    var url = "/leaderboard/";
    for (let aid of aidOrdered) {
      url += aid;
      if (aid == avatar_id) {
        url += calc;
      } else {
        url += a_ids[aid];
      }
    }
    // console.log(url)
    return url;
  };
  const checkCategory = (category: AvatarCategory) => {
    for (let avatar_id in a_ids) {
      if (!category.calculations[avatar_id][a_ids[avatar_id]]) {
        return false;
      }
    }
    return true;
  };

  const displayCones = (category: AvatarCategory) => {
    return (
      <div className="flex-wrap flex gap-2">
        {Object.entries(category.calculations).map((calc) => {
          return (
            <div
              key={`${calc[0]}-lightcones`}
              className="flex flex-row gap-1 min-h-20 items-center"
            >
              <Image
                width={25}
                height={25}
                className="w-auto h-8 m-1"
                src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${calc[0]}.png`}
                alt="icon"
                unoptimized
              />
              {Object.entries(calc[1]).map((cone) => {
                const combo_id = calc[0] + cone[0];
                return (
                  <div
                    key={`${combo_id}-cone`}
                    className={`flex justify-center p-1 min-h-12 min-w-12  hover:bg-slate-600 ${
                      a_ids[calc[0]] === cone[0] ? "bg-slate-600" : ""
                    } `}
                  >
                    <NoPrefetchLink href={generateURL(calc[0], cone[0])}>
                      <ConeDisplay
                        name={cone[1].name}
                        tid={cone[1].tid}
                        imposition={cone[1].rank}
                        width={35}
                        height={35}
                      />
                    </NoPrefetchLink>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };
  const searchParams = useSearchParams();
  const p = getParamsFromUrl(searchParams);
  p.calc_id = params.calc_id;
  const calcs = useSWR(
    [getAPIURL("/api/categories"), { params: { avatar_id: team_id } }],
    fetcher,
    {
      onErrorRetry: (error) => {
        return;
      },
    }
  );

  const sortOptions = [
    // { value: "score", label: "Score" },
    { value: "Speed", label: "Speed" },
    { value: "Attack", label: "Attack" },
    { value: "Defence", label: "Defence" },
    { value: "HP", label: "MaxHP" },
    { value: "breakEffect", label: "BreakDamage" },
    { value: "StatusResistance", label: "StatusResistance" },
    { value: "effectHitRate", label: "StatusProbability" },
    { value: "critRate", label: "CriticalChance" },
    { value: "critDmg", label: "CriticalDamage" },
  ];


  const uncappedCols: ColumnDef<LeaderboardRow>[] = capped ? [] 
  : 
  [{
    header: () => {
      return (<Translate str={'Lightcone'} />)
    },
    accessorKey: "Lightcone",
    enableSorting: false,

    cell: ({ row } ) => row.original.cone_tid? <ConeDisplay name={"lightcone"} imposition={row.original.cone_rank!} tid={row.original.cone_tid} />
      : <></>
  },]
  
  const columns = useMemo<ColumnDef<LeaderboardRow>[]>(
    () => [
      {
        accessorKey: "rank",
        header: "#",
        enableSorting: true,

      },
      // {
      //   header: "Region",
      //   accessorKey: "region",
      // },
      {
        header: () => {
          return <Translate str={"Trailblazer"} />;
        },
        accessorKey: "nickname",
        enableSorting: false,

        cell: ({ row }) => (
          <React.Fragment>
            <Link href={`../profile/${row.original.uid}`}>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-base hover:text-orange-300 mr-1 "
              >
                {row.original.nickname}
              </span>
            </Link>
            <span className="text-sm text-gray-500">{getRegion(row.original.uid)}</span>
          </React.Fragment>
        ),
      },
      {
        header: () => (
          <Image
            alt={"character"}
            className="h-auto min-w-5"
            src={avatar}
            width={22}
            height={22}

          />
        ),
        accessorKey: "avatar_id",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="relative pr-[6px] pb-[4px]">
            <Image
              alt={/*t*/ row.original.avatar_id?.toString()}
              src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${row.original.avatar_id}.png`}
              width={25}
              height={25}
              className="h-auto min-w-6"
            />
            {!capped ? 
                <span className="absolute right-0 bottom-0 font-medium text-gray-50 drop-shadow">
                    {`E${row.original.eidolon}`}
                </span>
                : 
                null}
          </div>
        ),
      },
      ...uncappedCols,
      {
        header: () => {
          return <Translate str={"Relics"} />;
        },
        accessorKey: "set",
        enableSorting: false,

        cell: ({ row }) => <SetDisplay sets={row.original.sets} />,
      },
      {
        header: "Crit Value",
        enableSorting: false,
        cell: ({ row }) => (
          <span>
            {(row.original?.crit_value * 100).toFixed(1)}
            <span className="text-sm text-gray-400">{` (${(
              row.original?.stats.CriticalChance * 100
            ).toFixed(1)}:${(row.original?.stats.CriticalDamage * 100).toFixed(
              1
            )})`}</span>
          </span>
        ),
      },
      ...[0, 1, 2, 3].map((i) => ({
        header: "-",
        id: `${i}`,
        enableSorting: false,
        cell: ({ row }: any) => {
          const ordered = getRelativeStats(
            row?.original,
            !calcs.isLoading ? calcs.data[0].element : "",
            false
          );
          const key = ordered?.[i];
          // console.log(key)
          if (key)
            return (
              <div className="flex justify-start whitespace-nowrap gap-1 text-sm">
                <StatIcon stat={key} />
                <span className="pt-1">
                  {StatFormat[key](row.original.stats[key])}
                </span>
              </div>
            );
          else {
            return <>-</>;
          }
        },
      })),
      {
        accessorKey: "score",
        enableSorting: true,
        header: calcs.isLoading
          ? "??"
          : calcdetails[params.calc_id.toString() as keyof typeof calcdetails]?.score_name,
        cell: ({ row }) => {
          return <span>{row.original.score?.toFixed(0)}</span>;
        },

      },
    ],
    [calcs, calcs.isLoading]
  );

  return (
    <div className="min-h-screen flex flex-col container items-center overflow-auto mx-auto py-1">
      <div className="flex flex-wrap justify-between min-w-1/3 max-w-[70%] mb-2">
        <div className="flex flex-row w-1/2 min-w-[200px] justify-start mt-2">
          {calcs.isLoading ? (
            <></>
          ) : (
            calcs.data.map((category: AvatarCategory) => {
              return (
                <div key={category.name} className="min-w-1/2 mt-1 p-1 mr-1">
                  <span className="whitespace-normal text-lg font-normal">
                    {category.name}
                  </span>
                  <div className="flex justify-start mt-1 whitespace-nowrap gap-2">
                    {displayCones(category)}
                  </div>
                </div>
              );
            })
          )}
        </div>
        {calcs.isLoading ? (
          <></>
        ) : (
          calcs.data.map((category: AvatarCategory) => {
            if (checkCategory(category)) {
              return (
                <div
                  key={`category-${category.name}-team`}
                  className="flex flex-col p-2 mt-2 min-w-[200px] max-w-1/2 w-1/2"
                >
                  <span className="mb-3 whitespace-normal">
                    {category.desc}
                  </span>
                  <span>
                    <Translate str={"Team"} />:{" "}
                  </span>
                  <TeamDisplay team={category.team!} short={false} />
                </div>
              );
            }
          })
        )}
      </div>
      <CustomTable
        fetchUrl={"/api/leaderboard"}
        columns={columns}
        params={p}
        defaultSort="score"
        sortOptions={sortOptions}
        tableParams={params.calc_id}
        calc_id={params.calc_id}
        pagination
      />
    </div>
  );
}
