import Hero from "../components/ui/home/Hero"
import RightSidebar from "../components/layout/RightSidebar"
import LeftSidebar from "../components/layout/LeftSidebar"

const Home = () => {
  return (
    <>
     <Hero />
     <div className="flex gap-4">
       <div className="basis-2/12 w-full">
        <LeftSidebar />
       </div>
       <div className="basis-7/12 w-full">
         main section
       </div>
       <div className="basis-3/12 w-full">
        <RightSidebar />
       </div>
     </div>
    </>
  )
}

export default Home