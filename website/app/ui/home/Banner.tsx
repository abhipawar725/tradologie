import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="bg-white relative">
      <div className="absolute inset-0 flex items-center justify-start">
        <div className="container mx-auto">
          <div className="w-1/2">
            <h1 className="text-uppercase text-4xl font-semibold mb-4">
              World's 1<sup className="text-lowercase fs-2">st</sup> AI-Powered
              <br className="d-none d-lg-block" />
              Global B2B Trade Hub
              <br className="d-none d-lg-block" />
              <span className="fs-1">Connect. Exhibit. Trade 24*7</span>
            </h1>
            <p className="text-xl">
              Join millions of verified buyers and sellers negotiate live -
              where 99.9% inquiries turn into successful export order.
            </p>
          </div>
        </div>
      </div>
      <video className="w-full" autoPlay muted loop>
        <source src="/banner-video-desktop.webm" type="video/webm" />
      </video>
    </section>
  );
};

export default Banner;
