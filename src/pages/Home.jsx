import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-4 flex flex-col items-center justify-center">
      {/* Title */}
      <p className="mt-6 md:mt-40 text-6xl md:text-8xl text-center text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#A2FEFE_0%,#D5F6FA_40%,#DDF5F9_60%,#E9DBFC_80%,#ADC3FC_100%)] font-saira drop-shadow-[-15px_4px_8px_#6B1868]">
        Bait or Legit?
      </p>
      {/* Subtitle */}
      <p className="mt-6 w-full max-w-2xl text-2xl md:text-4xl text-center text-white font-paytone">
        Test your wits to crack the ultimate phishing game !
      </p>

      {/* Start Button */}
      <Link to='/levels' className="mt-6 px-8 py-3 text-black font-paytone rounded-full shadow-lg hover:scale-105 transition-all duration-300 bg-[linear-gradient(to_bottom,#FDFEF2_0%,#FDF045_10%,#FDE409_40%,#FAC206_80%)] font-[Paytone-One] font-[700] text-[20px] drop-shadow-[0px_0px_10px_#72314B]">
        Start Game
      </Link>
    </div>
  );
};

export default Home;
