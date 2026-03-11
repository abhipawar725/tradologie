import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Banner from "../ui/home/Banner";
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Banner />
      <div className="flex">
        <LeftSidebar />
        {children}
        <RightSidebar />
      </div>
      <Footer />
    </>
  );
}
