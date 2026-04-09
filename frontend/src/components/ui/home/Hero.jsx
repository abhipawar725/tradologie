import { Link } from "react-router-dom";
import Video from "../../../assets/banner-video-desktop.webm";

const Hero = () => {
  return (
    <>
      <div className="relative">
        <div className="w-full absolute top-1/2 -translate-y-1/2 z-10">
          <div className="container mx-auto py-6">
            <div className="w-1/2 space-y-2">
              <h1 className="text-5xl">World's 1st AI-Powered Global B2B Trade Hub</h1>
              <h2 className="text-primary">Connect. Exhibit. Trade 24*7</h2>
              <p className="text-text-primary">Join millions of verified buyers and sellers negotiate live - where 99.9% inquiries turn into successful export order.</p>
              <div className="flex items-center gap-4 mt-4">
                <Link className="btn btn-primary">I am Supplier</Link>
                <Link className="btn btn-primary">I am Buyer</Link>
              </div>
            </div>
          </div>
        </div>
        <video autoPlay loop muted className="w-full">
          <source src={Video} type="video/webm" />
        </video>
      </div>
    </>
  );
};

export default Hero;
