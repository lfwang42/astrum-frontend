"use client";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { AvatarCategory, LeaderboardCone } from "../../../types";
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
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
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


  const cid = params.calc_id.toString()
  const capped = calcdetails[params.calc_id.toString() as keyof typeof calcdetails].capped;

  const team_id = params.calc_id.toString().slice(0, -2);
  //store current calculation info
  const [calculation, setCalculation] = useState<Record<string, LeaderboardCone>>()
  // console.log(team_id);

  useEffect(() => {
    document.title = "Leaderboards";
  }, []);

  const calcs = useSWR(
    [getAPIURL("/api/categories"), { params: { avatar_id: team_id } }],
    fetcher,
    {
      onErrorRetry: (error) => {
        return;
      },
    }
  );

  useEffect(() => {
    if (!calcs.isLoading && calcs.data) {
      for (let category of calcs.data) {
        for (let calc_id in category.calculations) {
          if (category.calculations[calc_id] == params.calc_id) {
            setCalculation(category.caltulations[calc_id])
            return
          }
        }
      }
    }
  }, [calcs.isLoading])

  const generateURL = (avatar_id: string, calc: string) => {
    var url = "/leaderboard/";
    console.log(calcs.data);
    // for (let aid of aidOrdered) {
    //   url += aid;
    //   if (aid == avatar_id) {
    //     url += calc;
    //   } else {
    //     url += a_ids[aid];
    //   }
    // }
    // console.log(url)
    return url;
  };

  const displayCalculation = (
    calc_id: string,
    calculation: Record<string, LeaderboardCone>
  ) => {
    return (
      <div
        key={`${calc_id}-lightcones`}
        className={`flex flex-row gap-1 min-h-16 items-center hover:bg-slate-600 ${calc_id == params.calc_id.toString() ? "bg-slate-600" : ""}`}
      >
      <NoPrefetchLink href={`/leaderboard/${calc_id}`} className="flex flex-row gap-1 min-h-20 items-center">

        {Object.entries(calculation).map((avatar_cone_pair) => {
          const cone = avatar_cone_pair[1]
          return (

            <div
              key={`${calc_id + avatar_cone_pair[0]}-cone`}
              className={`flex justify-center p-1 min-h-12 min-w-12 `}
            >


              <Image
                width={25}
                height={25}
                className="w-auto h-8 m-1"
                src={`https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/${avatar_cone_pair[0]}.png`}
                alt="icon"
                unoptimized
              />

                <ConeDisplay
                  name={cone.name}
                  tid={cone.tid}
                  imposition={cone.rank}
                  width={35}
                  height={35}
                />

            </div>

          );
        })}
      </NoPrefetchLink>
      </div>
    );
  };
  const displayCones = (category: AvatarCategory) => {
    return (
      <div className="flex-wrap flex gap-2">
        {Object.keys(category.calculations).map((calc_id) => {
          return (displayCalculation(calc_id, category.calculations[calc_id]))
        })}
      </div>
    );
  };
  const searchParams = useSearchParams();

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

  const uncappedCols: ColumnDef<LeaderboardRow>[] = capped
    ? []
    : [
        {
          header: () => {
            return <Translate str={"Lightcone"} />;
          },
          accessorKey: "Lightcone",
          enableSorting: false,

          cell: ({ row }) =>
            row.original.cone_tid ? (
              <ConeDisplay
                name={"lightcone"}
                imposition={row.original.cone_rank!}
                tid={row.original.cone_tid}
              />
            ) : (
              <></>
            ),
        },
      ];

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
          return (
            <span className="min-w-[130px]">
              <Translate str={"Trailblazer"} />
            </span>
          );
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
            <span className="text-sm text-gray-500">
              {getRegion(row.original.uid)}
            </span>
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
            {!capped ? (
              <span className="absolute right-0 bottom-0 font-medium text-gray-50 drop-shadow">
                {`E${row.original.eidolon}`}
              </span>
            ) : null}
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
        header: () => {
          return <span className="min-w-12">-</span>;
        },
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
              <div className="flex justify-start min-w-12 whitespace-nowrap gap-1 text-sm">
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
        header: () => {
          return (
            <span>
              {calcs.isLoading
                ? "??"
                : calcdetails[
                    params.calc_id.toString() as keyof typeof calcdetails
                  ]?.score_name}
            </span>
          );
        },
        cell: ({ row }) => {
          return <span>{row.original.score?.toFixed(0)}</span>;
        },
      },
    ],
    [calcs, calcs.isLoading]
  );

  const p = getParamsFromUrl(searchParams);
  p.calc_id = params.calc_id;
  p.size = 10;

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
            if (true) {
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
