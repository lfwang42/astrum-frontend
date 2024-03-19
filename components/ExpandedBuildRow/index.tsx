'use client'
import axios from "axios";
import { TableCell, TableRow } from "../ui/table";
import { StatFormat, getAPIURL } from "@/lib/utils";
import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { StatDisplay } from "../StatDisplay";
import { StatIcon } from "../StatIcon";

interface Relic {
    type: number,
    tid: number,
    stats: Record<string, number>,
    icon: string,
    main_stat_value: number, 
    main_stat_name: string,
}

type ExpandedBuildRowProps = {
  row: any;
  cols: number;
};

export const ExpandedBuildRow: React.FC<ExpandedBuildRowProps> = ({ row, cols }) => {
    // var [relics, setRelics] = useState<Relic[]>([]);
    function fetcher(params: any) {
        const [url, query] = params;
        const res = axios.get(url, query).then(res => res.data)
        res.catch((error) => {
          console.log(error)
          throw(error)
        })
        // axios.get(url, query).
        //   then(res => { return res.data })
        return res
      }

    const relics = useSWR([getAPIURL(`/api/relics`),  { params: {build_id: row.bid}}] , fetcher, {
        onErrorRetry: (error) => {
          return
        }
      }) 
    // axios.get(getAPIURL(`/api/relics`),  { params: {build_id: row.bid}})
    // .then((res) => {
    //     setRelics(res.data)
    //     console.log('set')
    // })
    return (<TableRow
                    key={row.id + 'expanded'}
                    data-state={"selected"}
                  >
                    <td colSpan={100} ><div className="bg-slate-800 flex justify-center whitespace-nowrap gap-12">{!relics.isLoading ? 
                    relics.data.map((relic: Relic) => {
                        console.log(relic)
                        return(
                        <div className="flex justify-center items-center border-slate-400 border-2 p-2">
                            <div className="justify-center">
                                <Image src={relic.icon} alt="" height={50} width={50}  />
                                <div className="bg-slate-800 flex justify-start w-300 items-center whitespace-nowrap text-sm">
                                    <StatIcon stat={relic.main_stat_name} /><span> {StatFormat[relic.main_stat_name](relic.main_stat_value)}</span>
                                </div>
                            </div>
                            <div key={relic.tid} className="justify-start">
                                {Object.keys(relic.stats).map((stat) => {
                                    return (<div className="bg-slate-800 flex justify-start w-300 items-center whitespace-nowrap text-sm"><StatIcon stat={stat} /><span> {StatFormat[stat](relic.stats[stat])}</span></div>)
                                })}
                            </div>
                        </div>)
                    })
                    : <></>    
                }</div> </td>
                   
        </TableRow>)
  
};

