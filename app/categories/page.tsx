import Navbar from "../../components/navbar";
import { CategoryRow, columns } from './columns';
import { CategoryTable } from './category-table';
import axios from 'axios'

async function getCategories(): Promise<CategoryRow[]> {
  const res =  await axios.get("http://localhost:3000/api/categories")
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
        <Navbar />
        <div className="container mx-auto py-10">
          <CategoryTable columns={columns} data={categories} />
        </div>
      </>
    );
  }