"use client";
import { TableRow } from "../ui/table";
import Image from "next/image";
import { BuildRow } from "@/app/[locale]/profile/[uid]/columns";
const SPRITE_URL = `https://enka.network/ui/hsr/`;


type ExpandedProfileRowProps = {
  row: BuildRow;
  cols: number;
};


export const ExpandedProfileRow: React.FC<ExpandedProfileRowProps> = ({
  row,
  cols,
}) => {

  return (
    <TableRow key={row.avatar_id + "expanded"} data-state={"selected"}>
      <td colSpan={100}>
        ADD STUFF HERE
      </td>
    </TableRow>
  );
};
