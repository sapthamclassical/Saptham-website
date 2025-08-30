import React from 'react';
import logo from "../assets/logo.png";

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-r from-[#763C91] to-[#F26B1D] text-white overflow-hidden">
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        {/* Club Name Logo */}
        <img
          src={logo}
          alt="Saptham Logo"
          className="mx-auto mb-6 drop-shadow-lg"
          style={{ maxWidth: "320px", height: "auto" }}
        />

        {/* Description */}
        <p className="text-lg md:text-xl mb-4 text-gray-200">
            The Official Classical Dance and Music Club of Anna University
        </p>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-yellow-400 mb-8 italic tracking-wide">
        "Where Tradition Meets Talent"
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-white text-[#763C91] hover:bg-gray-100 rounded-md font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Explore Events
          </button>
          <button className="px-6 py-3 bg-white text-[#ec6517] hover:bg-gray-100 rounded-md font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero