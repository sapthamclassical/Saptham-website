import React from 'react';
import logo from "../assets/logo.png";
import rangoli from "../assets/rangoli.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-[#1A3843] text-white" style={{ overflow: 'visible' }}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ overflow: 'visible' }}>
        {/* Spinning Rangoli Pattern - Left (Half visible from left edge) */}
        <div 
          className="absolute animate-spin-slow opacity-80" 
          style={{ 
            left: '-250px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            width: '500px',
            height: '500px'
          }}
        >
          <img 
            src={rangoli} 
            alt="Rangoli Left" 
            className="w-full h-full object-contain" 
            style={{ 
              filter: 'brightness(0) saturate(100%) invert(59%) sepia(31%) saturate(644%) hue-rotate(6deg) brightness(93%) contrast(88%) drop-shadow(0 0 20px rgba(204, 168, 66, 0.6))'
            }} 
          />
        </div>

        {/* Spinning Rangoli Pattern - Right (Half visible from right edge) */}
        <div 
          className="absolute animate-spin-slow-reverse opacity-80" 
          style={{ 
            right: '-250px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            width: '500px',
            height: '500px'
          }}
        >
          <img 
            src={rangoli} 
            alt="Rangoli Right" 
            className="w-full h-full object-contain" 
            style={{ 
              filter: 'brightness(0) saturate(100%) invert(59%) sepia(31%) saturate(644%) hue-rotate(6deg) brightness(93%) contrast(88%) drop-shadow(0 0 20px rgba(204, 168, 66, 0.6))'
            }} 
          />
        </div>

        <div className="relative text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" style={{ zIndex: 10 }}>

        {/* Club Name Logo */}
        <img
          src={logo}
          alt="Saptham Logo"
          className="mx-auto mb-6 drop-shadow-2xl"
          style={{ maxWidth: "320px", height: "auto" }}
        />

        {/* Description */}
        <p className="text-lg md:text-xl mb-4 text-gray-200 font-heading">
          The Official Classical Dance and Music Club of Anna University
        </p>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-manjari-gold mb-8 italic tracking-wide font-heading">
          "Where Tradition Meets Talent"
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/events">
            <button className="btn btn-primary bg-manjari-mustard text-white hover:bg-manjari-gold hover:text-white border-none transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Explore Events
            </button>
          </Link>
          <button className="btn bg-van-teal-mid text-white hover:bg-van-teal hover:text-white border-none transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Join Us
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hero;