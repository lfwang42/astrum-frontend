'use client'
import axios from "axios";
import { TableCell, TableRow } from "../ui/table";
import { StatFormat, getAPIURL } from "@/lib/utils";
import { useRef, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { StatDisplay } from "../StatDisplay";
import { StatIcon } from "../StatIcon";
import { RelicCanvas } from "../RelicCanvas";

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
        return res
      }

    const relics = useSWR([getAPIURL(`/api/relics`),  { params: {build_id: row.bid}}] , fetcher, {
        onErrorRetry: (error) => {
          return
        }
      }) 


    return (<TableRow
                    key={row.id + 'expanded'}
                    data-state={"selected"}
                  >
                    <td colSpan={100} ><div className="bg-slate-800 flex justify-center whitespace-nowrap gap-10">{!relics.isLoading ? 
                    relics.data.map((relic: Relic) => {
                        console.log(relic)
                        return(
                        <div key={row.id + relic.tid} className="flex justify-center items-center border-slate-400 border-2 p-2">
                            <div className="justify-center">
                                <RelicCanvas backgroundImage={relic.icon}/>
                                {/* <Image src={relic.icon} alt="" height={50} width={50}  /> */}
                                <div className="bg-slate-800 flex justify-start items-center text-sm">
                                    <StatIcon stat={relic.main_stat_name} /><span> {StatFormat[relic.main_stat_name](relic.main_stat_value)}</span>
                                </div>
                            </div>
                            <div className="justify-start">
                                {Object.keys(relic.stats).map((stat) => {
                                    return (<div key={row.id + relic.tid + stat} className="bg-slate-800 flex justify-start items-center text-sm gap-0"><StatIcon stat={stat} /><span> {StatFormat[stat](relic.stats[stat])}</span></div>)
                                })}
                            </div>
                        </div>)
                    })
                    : <></>    
                }</div> </td>
                   
        </TableRow>)
  
};

