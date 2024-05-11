import { TableRow } from "../ui/table";
import { SkillTree } from "./skill_tree";
// import * as Constants from "../constants";

const SPRITE_URL = `https://enka.network/ui/hsr/`;

type ExpandedBuildRowProps = {
  row: any;
  cols: number;
};

export const ExpandedProfileCharRow: React.FC<ExpandedBuildRowProps> = ({
  row,
  cols,
}) => {
  // const fetcher = (params: any) => {
  //   const [url, query] = params;
  //   const res = axios.get(url, query).then((res) => res.data);
  //   res.catch((error) => {
  //     console.log(error);
  //     throw error;
  //   });
  //   return res;
  // };

  // const relics = useSWR(
  //   [getAPIURL(`/api/relics`), { params: { build_id: row.bid } }],
  //   fetcher,
  //   {
  //     onErrorRetry: (error) => {
  //       return;
  //     },
  //   }
  // );

  return (
    <TableRow key={row.avatar_id + "expanded"} data-state={"selected"}>
      <td colSpan={100}>
        <SkillTree basic={} skill={} ult={} talent={} asc={} />
      </td>
    </TableRow>
  );
};
