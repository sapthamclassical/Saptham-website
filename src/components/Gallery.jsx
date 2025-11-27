import React, { useState, useEffect } from "react";
import GalleryCarousel from "./GalleryCarousel";

// Import Images
import g1 from "../assets/Gallery/General/1.webp";
import g2 from "../assets/Gallery/General/2.webp";
import g3 from "../assets/Gallery/General/3.webp";
import g4 from "../assets/Gallery/General/4.webp";
import g5 from "../assets/Gallery/General/5.webp";
import g6 from "../assets/Gallery/General/6.webp";
import g7 from "../assets/Gallery/General/7.webp";
import g8 from "../assets/Gallery/General/8.webp";
import g9 from "../assets/Gallery/General/9.webp";
import g10 from "../assets/Gallery/General/10.webp";
import g11 from "../assets/Gallery/General/11.webp";
import g12 from "../assets/Gallery/General/12.webp";
import g13 from "../assets/Gallery/General/13.webp";
import g14 from "../assets/Gallery/General/14.webp";

import p1 from "../assets/Gallery/Payanam/1.webp";
import p2 from "../assets/Gallery/Payanam/2.webp";
import p3 from "../assets/Gallery/Payanam/3.webp";
import p4 from "../assets/Gallery/Payanam/4.webp";
import p5 from "../assets/Gallery/Payanam/5.webp";
import p6 from "../assets/Gallery/Payanam/6.webp";
import p7 from "../assets/Gallery/Payanam/7.webp";

import v1 from "../assets/Gallery/Vishwam/1.jpeg";
import v2 from "../assets/Gallery/Vishwam/2.jpeg";
import v3 from "../assets/Gallery/Vishwam/3.jpeg";
import v4 from "../assets/Gallery/Vishwam/4.jpeg";
import v5 from "../assets/Gallery/Vishwam/5.jpeg";
import v6 from "../assets/Gallery/Vishwam/6.jpeg";
import v7 from "../assets/Gallery/Vishwam/7.jpeg";
import v8 from "../assets/Gallery/Vishwam/8.jpeg";

import y1 from "../assets/Gallery/Yaathra/1.webp";
import y2 from "../assets/Gallery/Yaathra/2.webp";
import y3 from "../assets/Gallery/Yaathra/3.webp";
import y4 from "../assets/Gallery/Yaathra/4.webp";  
import y5 from "../assets/Gallery/Yaathra/5.webp";
import y6 from "../assets/Gallery/Yaathra/6.webp";
import y7 from "../assets/Gallery/Yaathra/7.webp";
import y8 from "../assets/Gallery/Yaathra/8.webp";

import pr1 from "../assets/Gallery/PremaVaibhavam/1.webp"; 
import pr2 from "../assets/Gallery/PremaVaibhavam/2.webp";
import pr3 from "../assets/Gallery/PremaVaibhavam/3.webp";
import pr4 from "../assets/Gallery/PremaVaibhavam/4.webp";  
import pr5 from "../assets/Gallery/PremaVaibhavam/5.webp";
import pr6 from "../assets/Gallery/PremaVaibhavam/6.webp";

import r1 from "../assets/Gallery/Rasaleela/1.webp";
import r2 from "../assets/Gallery/Rasaleela/2.webp";
import r3 from "../assets/Gallery/Rasaleela/3.webp";
import r4 from "../assets/Gallery/Rasaleela/4.webp";  
import r5 from "../assets/Gallery/Rasaleela/5.webp";
import r6 from "../assets/Gallery/Rasaleela/6.webp";
import r7 from "../assets/Gallery/Rasaleela/7.webp";
import r8 from "../assets/Gallery/Rasaleela/8.webp";
import r9 from "../assets/Gallery/Rasaleela/9.webp";
import r10 from "../assets/Gallery/Rasaleela/10.webp";

const Gallery = () => {
  const galleryData = {
    General: [g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12,g13,g14],
    Payanam: [p1, p2, p3, p4, p5, p6, p7],
    Vishwam: [v6, v7, v8, v5, v3, v1, v4,v2],
    Rasaleela: [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10],
    Yaathra: [y1, y2, y3, y4, y5, y6, y7, y8],
    "Prema Vaibhavam": [pr1, pr2, pr3, pr4, pr5, pr6],
  };

  const categories = Object.keys(galleryData);
  const [active, setActive] = useState("General");
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowLeft")
        setCurrentIndex((i) => (i - 1 + galleryData[active].length) % galleryData[active].length);
      if (e.key === "ArrowRight")
        setCurrentIndex((i) => (i + 1) % galleryData[active].length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, active]);
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
            Our <span className="text-orange-500">Gallery</span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-orange-500 mx-auto"></div>
        </div>
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActive(cat);
              setCarouselOpen(false);
            }}
            className={`btn ${
              active === cat
                ? "bg-orange-500 text-white border-none"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid OR Carousel */}
      {!carouselOpen ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {galleryData[active].map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setModalOpen(true);
              }}
              className="block w-full text-left"
              aria-label={`Open image ${idx + 1} in full view`}
            >
              <img
                src={img}
                alt={`Gallery ${active} ${idx + 1}`}
                className="w-full h-auto rounded-xl shadow-md hover:scale-105 transition-transform duration-200"
              />
            </button>
          ))}
        </div>
      ) : (
        <div>
          <GalleryCarousel images={galleryData[active]} />

          <div className="text-center mt-6">
            <button
              onClick={() => setCarouselOpen(false)}
              className="btn bg-gray-900 text-white"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      )}

      {/* Modal / Lightbox for full image view */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 btn btn-circle btn-ghost text-white"
            onClick={() => setModalOpen(false)}
            aria-label="Close full view"
          >
            ✕
          </button>

          <div className="relative max-w-5xl w-full max-h-full">
            <img
              src={galleryData[active][currentIndex]}
              alt={`Full view ${currentIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg bg-black"
            />

            {/* Prev / Next Controls */}
            <button
              onClick={() => setCurrentIndex((i) => (i - 1 + galleryData[active].length) % galleryData[active].length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle text-white"
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              onClick={() => setCurrentIndex((i) => (i + 1) % galleryData[active].length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle text-white"
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
