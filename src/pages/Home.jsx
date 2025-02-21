import React from "react";
import  { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#070625] via-40% to-[#3D348E] text-white">
        {/* Logo */}
        <div className="absolute top-4 left-4">
          <img src="logo.png" alt="Game Logo" className="w-12 h-12" />
        </div>

        {/* Title */}
        <p className="text-[100px] text-center text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#A2FEFE_0%,#D5F6FA_40%,#DDF5F9_60%,#E9DBFC_80%,#ADC3FC_100%)] font-[Saira_Stencil_One] drop-shadow-[-15px_4px_8px_#6B1868]">
          Bait or Legit?
        </p>
        {/* Subtitle */}
        <p className="mt-2 w-[750px] text-[45px] text-center text-white font-[Paytone-One] font-[900]">
          Test your wits to crack the ultimate phishing game !
        </p>

        {/* Start Button */}
        <Link to='/levels' className="mt-6 px-8 py-3 text-black  rounded-full shadow-lg hover:scale-105 transition-all duration-300 bg-[linear-gradient(to_bottom,#FDFEF2_0%,#FDF045_10%,#FDE409_40%,#FAC206_80%)] font-[Paytone-One] font-[700] text-[20px] drop-shadow-[0px_0px_10px_#72314B]">
          Start Game
        </Link>
        <p className="mt-2 text-[20px] text-center text-white font-[Paytone-One] font-[900] absolute bottom-4 right-4">
        Privacy Policy | Terms of Use
        </p>
      </div>
    </>
  );
};

export default Home;
