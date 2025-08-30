import React, { useState, useEffect } from "react";


const OfficeBearers = () => {
  const officers = [
    { name: "Ahalya V S", dept: "CSE", position: "President", image: "src/assets/ahalya.webp" },
    { name: "Soumya R", dept: "IT", position: "Vice President", image: "src/assets/soumya.webp" },
    { name: "Dhanya A", dept: "IBT", position: "Head of Dance", image: "src/assets/dhanyaa.jpg" },
    { name: "Mahalakshmi S", dept: "IT", position: "Head of Dance", image: "src/assets/maha.jpg" },
    { name: "Anujan K", dept: "Chemical", position: "Head of Music", image: "src/assets/Anujan.jpeg" },
    { name: "Dhanya V", dept: "BME", position: "Head of Music", image: "src/assets/Dhanya Vikram.jpg" },
    { name: "Keshavkrishna N R", dept: "CSE", position: "Head of Instruments", image: "src/assets/keshav.png" },
    { name: "Abinaya V", dept: "IBT", position: "Head of Social Media & Content", image: "src/assets/abinaya.jpg" },
    { name: "Harini", dept: "Chemical", position: "Head of Social Media & Content", image: "src/assets/harini.jpg" },
    { name: "Tanmaya M S", dept: "ECE", position: "Head of Design", image: "src/assets/tanmaya.jpg" },
    { name: "Vishruthi", dept: "CSE", position: "Head of Design", image: "src/assets/vishruthi.jpg" },
    { name: "Ashwin S", dept: "Mechanical", position: "Head of Logistics", image: "src/assets/Ashwin.jpg" },
    { name: "Ritika S", dept: "Geo Informatics", position: "Head of Logistics", image: "src/assets/ritika.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // items visible per screen size
  const getVisibleCount = () => {
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    if (window.innerWidth < 1280) return 3; // laptop
    return 4; // large desktop
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 > officers.length - visibleCount ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? officers.length - visibleCount : prev - 1
    );
  };

  return (
    <section id="office-bearers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
            Meet Our <span className="text-orange-500">Office Bearers 2025-2026</span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-orange-500 mx-auto"></div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {officers.map((officer, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ flex: `0 0 ${100 / visibleCount}%` }}
                >
                  <div className="bg-white rounded-xl p-5 shadow-md flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300">
                    {/* Profile Image */}
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-orange-500/70 shadow mb-4">
                      <img
                        src={officer.image}
                        alt={officer.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <h4 className="text-lg font-semibold text-gray-900">{officer.name}</h4>
                    <p className="text-sm text-gray-500">{officer.dept}</p>
                    <p className="text-orange-600 font-medium text-sm">{officer.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2
              w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-500 text-white flex items-center justify-center
              shadow-md hover:bg-orange-600 transition-colors duration-300"
          >
            ←
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2
              w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-500 text-white flex items-center justify-center
              shadow-md hover:bg-orange-600 transition-colors duration-300"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default OfficeBearers;
