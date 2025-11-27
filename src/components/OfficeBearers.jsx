import React from "react";
import AH from "../assets/OB/ahalya.webp";
import SR from "../assets/OB/soumya.webp";
import DA from "../assets/OB/dhanyaa.jpg";
import MA from "../assets/OB/maha.jpg";
import AN from "../assets/OB/Anujan.jpeg";
import DV from "../assets/OB/dhanyaV.jpg";
import KR from "../assets/OB/keshav.png";
import AV from "../assets/OB/abinaya.jpg";
import HR from "../assets/OB/harini.jpg";
import TM from "../assets/OB/tanmaya.jpg";
import VS from "../assets/OB/vishruthi.jpg";
import AS from "../assets/OB/ashwin.jpg";
import RS from "../assets/OB/ritika.jpg";

const OfficeBearers = () => {
  const officers = [
    { name: "Ahalya V S", dept: "CSE", position: "President", image: AH },
    { name: "Soumya R", dept: "IT", position: "Vice President", image: SR },
    { name: "Dhanya A", dept: "IBT", position: "Head of Dance", image: DA },
    { name: "Mahalakshmi S", dept: "IT", position: "Head of Dance", image: MA },
    { name: "Anujan K", dept: "Chemical", position: "Head of Music", image: AN },
    { name: "Dhanya V", dept: "BME", position: "Head of Music", image: DV },
    { name: "Keshavkrishna N R", dept: "CSE", position: "Head of Instruments", image: KR },
    { name: "Abinaya V", dept: "IBT", position: "Head of Social Media & Content", image: AV },
    { name: "Harini", dept: "Chemical", position: "Head of Social Media & Content", image: HR },
    { name: "Tanmaya M S", dept: "ECE", position: "Head of Design", image: TM },
    { name: "Vishruthi", dept: "CSE", position: "Head of Design", image: VS },
    { name: "Ashwin S", dept: "Mechanical", position: "Head of Logistics", image: AS },
    { name: "Ritika S", dept: "Geo Informatics", position: "Head of Logistics", image: RS },
  ];

  return (
    <section id="office-bearers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
            Meet Our <span className="text-orange-500">Office Bearers 2025–2026</span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-orange-500 mx-auto"></div>
        </div>

        <div className="carousel w-full rounded-box">
  {officers.map((officer, index) => (
    <div
      key={index}
      className="carousel-item w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2 pb-4"
    >
      <div className="card bg-white aspect-square shadow-md rounded-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
        <div className="card-body items-center text-center p-6">

          {/* Decorative Icon */}
          <div className="p-3 rounded-full bg-orange-100 text-orange-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          {/* Text */}
          <h4 className="text-lg font-semibold text-gray-900">{officer.name}</h4>
          <p className="text-sm text-gray-500">{officer.dept}</p>
          <p className="text-orange-600 font-medium text-sm">{officer.position}</p>

        </div>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default OfficeBearers;
