import Navbar from "../../../components/navbar";
import { CategoryRow, columns } from './columns';
import { CategoryTable } from './category-table';
import axios from 'axios'
import { getAPIURL } from "@/lib/utils";

async function getCategories(): Promise<CategoryRow[]> {
 const instance = axios.create();
  const res =  await axios.get(getAPIURL("/api/categories"), {headers: {'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '1000',}})
  return res.data
}

export default async function Leaderboard() {
    // const [data, setData] = useState<LeaderboardRow[]>();
    // useEffect(() => {
    //   async function getData() {
    //     const res: LeaderboardRow[] = await axios.get("localhost:3000/api/leaderboard")
    //     setData(res)
    //   }
    //   getData();
    // }, [])
    const categories = await getCategories()
    // console.log(categories)
    return (
      <>
        <div className="container mx-auto py-10">
          <CategoryTable columns={columns} data={categories} />
        </div>
      </>
    );
  }