import Hero from "../components/ui/home/Hero"
import RightSidebar from "../components/layout/RightSidebar"
import LeftSidebar from "../components/layout/LeftSidebar"
import { api } from "../api/api"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
const Home = () => {

  const getData = async() => {
   const res = await api.get("/category")
   return res?.data?.data?.categories
  }

  const {data, isFetched, isError, isLoading, status} = useQuery({queryKey: ['categories'], queryFn: getData})
 
  console.log(data)
  return (
    <>
     <Hero />
     <div className="flex gap-4 bg-bg-primary py-6">
       <div className="basis-2/12 w-full">
        <LeftSidebar />
       </div>
       {isLoading && <p>Loading...</p>}
       <div className="basis-7/12 w-full">
         <div className="bg-white rounded-lg p-6">
           <h3 className="text-center mb-5">Explore the Wide Range of Commodities on Our Platform</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           {data?.filter(cat => cat.parentId === null).map((item) => (
            <Link key={item._id} to={`/category/${item.slug}`} className="flex flex-col gap-3 rounded-lg border-border-primary">
              <div className="flex items-center justify-center bg-bg-primary rounded-full w-14 h-14">
              <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} className="w-8" />
              </div>
              <p className="text-text-primary">{item.name}</p> 
              <p className="text-sm">{item.shortDescription}</p>
            </Link>
           ))}   
           </div>
         </div>
       </div>
       <div className="basis-3/12 w-full">
        <RightSidebar />
       </div>
     </div>
    </>
  )
}

export default Home